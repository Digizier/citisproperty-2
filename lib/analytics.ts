import { supabase } from './supabase';
import { PropertyAnalyticsRecord, AnalyticsSummary } from './types';

/**
 * Tracks a user engagement event ('view' | 'whatsapp' | 'call')
 * Uses client-side session deduplication for views so page reloads aren't double counted.
 * Calls atomic database stored procedure 'record_analytics_event'.
 */
export async function trackEvent(
  eventType: 'view' | 'whatsapp' | 'call',
  property?: {
    id?: string;
    title?: string;
    slug?: string;
    type?: string;
  }
): Promise<void> {
  if (typeof window === 'undefined') return;

  const propId = property?.id || 'site';
  const today = new Date().toISOString().split('T')[0];

  // Prevent spamming views from same browser session on same day
  if (eventType === 'view') {
    const sessionKey = `citis_view_${propId}_${today}`;
    try {
      if (sessionStorage.getItem(sessionKey)) {
        return; // Already recorded in this session
      }
      sessionStorage.setItem(sessionKey, '1');
    } catch {
      // Ignore storage errors (private mode)
    }
  }

  // Fire and forget - never block UI or navigation
  try {
    const rpcCall = supabase.rpc('record_analytics_event', {
      p_property_id: propId,
      p_property_title: property?.title || (propId === 'site' ? 'General Website' : 'Untitled Listing'),
      p_property_slug: property?.slug || '',
      p_property_type: property?.type || 'General',
      p_event_type: eventType,
    });

    // Run asynchronously without awaiting to ensure 0ms latency for user clicks
    rpcCall.then(({ error }) => {
      if (error) {
        console.warn('Analytics event note:', error.message);
      }
    });
  } catch (err) {
    console.warn('Analytics track skipped:', err);
  }
}

/**
 * Fetches analytics summary for admin dashboard.
 * Automatically triggers 'clean_old_analytics' to purge any previous months.
 * Calculates daily (Day 1 to 31), weekly, and property-wise engagement breakdowns.
 */
export async function getAnalyticsData(
  filterRange: 'today' | 'week' | 'month' = 'month'
): Promise<AnalyticsSummary> {
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7); // 'YYYY-MM'
  const todayStr = now.toISOString().split('T')[0];

  // 1. Automatically wipe previous months to maintain 0.1 MB feather-light table size
  try {
    await supabase.rpc('clean_old_analytics');
  } catch (err) {
    console.warn('Old analytics cleanup notice:', err);
  }

  // 2. Fetch current month records
  try {
    let query = supabase
      .from('property_analytics')
      .select('*')
      .eq('month_key', currentMonth);

    if (filterRange === 'today') {
      query = query.eq('date', todayStr);
    } else if (filterRange === 'week') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      query = query.gte('date', sevenDaysAgo);
    }

    const { data, error } = await query.order('date', { ascending: true });

    if (error) throw error;

    const records: PropertyAnalyticsRecord[] = data || [];

    // Calculate totals
    let totalViews = 0;
    let totalWhatsApp = 0;
    let totalCalls = 0;

    // Daily breakdown: 1 to 31 map
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const dailyMap: { [day: number]: { day: number; views: number; whatsapp: number; calls: number; date: string } } = {};

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = `${currentMonth}-${String(d).padStart(2, '0')}`;
      dailyMap[d] = { day: d, date: dayDate, views: 0, whatsapp: 0, calls: 0 };
    }

    // Property-wise aggregation map
    const propertyMap: {
      [id: string]: {
        property_id: string;
        property_title: string;
        property_slug?: string;
        property_type?: string;
        views: number;
        whatsapp: number;
        calls: number;
      };
    } = {};

    records.forEach((rec) => {
      totalViews += rec.views || 0;
      totalWhatsApp += rec.whatsapp_clicks || 0;
      totalCalls += rec.call_clicks || 0;

      // Add to daily chart
      const dayNum = rec.day || (rec.date ? parseInt(rec.date.split('-')[2], 10) : 1);
      if (dailyMap[dayNum]) {
        dailyMap[dayNum].views += rec.views || 0;
        dailyMap[dayNum].whatsapp += rec.whatsapp_clicks || 0;
        dailyMap[dayNum].calls += rec.call_clicks || 0;
      }

      // Add to property map (grouping same property across days)
      const pId = rec.property_id || 'site';
      if (!propertyMap[pId]) {
        propertyMap[pId] = {
          property_id: pId,
          property_title: rec.property_title || (pId === 'site' ? 'General Website' : 'Property Listing'),
          property_slug: rec.property_slug,
          property_type: rec.property_type,
          views: 0,
          whatsapp: 0,
          calls: 0,
        };
      }
      propertyMap[pId].views += rec.views || 0;
      propertyMap[pId].whatsapp += rec.whatsapp_clicks || 0;
      propertyMap[pId].calls += rec.call_clicks || 0;
    });

    const dailyChart = Object.values(dailyMap).map((d) => ({
      day: d.day,
      date: d.date,
      views: d.views,
      whatsapp: d.whatsapp,
      calls: d.calls,
    }));

    const topProperties = Object.values(propertyMap)
      .map((p) => ({
        ...p,
        totalEngagement: (p.views || 0) + (p.whatsapp || 0) * 2 + (p.calls || 0) * 3,
      }))
      .sort((a, b) => b.totalEngagement - a.totalEngagement);

    return {
      totalViews,
      totalWhatsApp,
      totalCalls,
      currentMonth,
      records,
      dailyChart,
      topProperties,
    };
  } catch (err) {
    console.error('Failed to load analytics data:', err);
    return {
      totalViews: 0,
      totalWhatsApp: 0,
      totalCalls: 0,
      currentMonth,
      records: [],
      dailyChart: [],
      topProperties: [],
    };
  }
}

/**
 * Admin action to permanently clear current analytics data if requested
 */
export async function adminResetAnalytics(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('property_analytics')
      .delete()
      .not('id', 'is', null);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Failed to reset analytics:', err);
    return false;
  }
}

/**
 * Admin action to delete a single analytics record
 */
export async function adminDeleteAnalyticsRecord(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('property_analytics')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Failed to delete analytics record:', err);
    return false;
  }
}
