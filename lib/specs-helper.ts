export interface CustomSpecification {
  id?: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface ParsedPropertySpecs {
  show_bedrooms: boolean;
  show_bathrooms: boolean;
  amenities: string[];
  custom_specs: CustomSpecification[];
  active_custom_specs: CustomSpecification[];
}

const TOGGLE_PREFIX = '__toggle_config:';
const SPEC_PREFIX = '__custom_spec:';

/**
 * Parses raw features array into:
 * - clean amenities list (without internal meta tags)
 * - bedroom / bathroom toggle states
 * - custom key-value specifications with toggle states
 */
export function parsePropertySpecs(
  rawFeatures: string[] | undefined | null,
  bedrooms: number = 0,
  bathrooms: number = 0
): ParsedPropertySpecs {
  const features = Array.isArray(rawFeatures) ? rawFeatures : [];

  let show_bedrooms: boolean = Number(bedrooms) > 0;
  let show_bathrooms: boolean = Number(bathrooms) > 0;
  const amenities: string[] = [];
  const custom_specs: CustomSpecification[] = [];

  for (const item of features) {
    if (!item || typeof item !== 'string') continue;

    if (item.startsWith(TOGGLE_PREFIX)) {
      try {
        const json = JSON.parse(item.slice(TOGGLE_PREFIX.length));
        if (typeof json.show_bedrooms === 'boolean') {
          show_bedrooms = json.show_bedrooms;
        }
        if (typeof json.show_bathrooms === 'boolean') {
          show_bathrooms = json.show_bathrooms;
        }
      } catch (e) {
        console.warn('Failed to parse toggle config:', e);
      }
    } else if (item.startsWith(SPEC_PREFIX)) {
      try {
        const json = JSON.parse(item.slice(SPEC_PREFIX.length));
        if (json && typeof json.key === 'string') {
          custom_specs.push({
            id: json.id || `spec-${Math.random().toString(36).slice(2, 9)}`,
            key: json.key.trim(),
            value: String(json.value ?? '').trim(),
            enabled: json.enabled !== false,
          });
        }
      } catch (e) {
        console.warn('Failed to parse custom specification:', e);
      }
    } else {
      // Normal property amenity
      amenities.push(item);
    }
  }

  const active_custom_specs = custom_specs.filter(
    (s) => s.enabled && s.key.trim().length > 0 && s.value.trim().length > 0
  );

  return {
    show_bedrooms,
    show_bathrooms,
    amenities,
    custom_specs,
    active_custom_specs,
  };
}

/**
 * Serializes amenities, bedroom/bathroom toggles, and custom specs
 * into a single string array that safely persists in the database features column.
 */
export function serializePropertyFeatures(
  amenities: string[],
  show_bedrooms: boolean,
  show_bathrooms: boolean,
  custom_specs: CustomSpecification[]
): string[] {
  const result: string[] = [];

  // 1. Clean amenities
  if (Array.isArray(amenities)) {
    for (const a of amenities) {
      if (a && typeof a === 'string') {
        const trimmed = a.trim();
        if (trimmed && !trimmed.startsWith('__')) {
          result.push(trimmed);
        }
      }
    }
  }

  // 2. Bedroom / Bathroom toggle configuration
  result.push(
    `${TOGGLE_PREFIX}${JSON.stringify({
      show_bedrooms: Boolean(show_bedrooms),
      show_bathrooms: Boolean(show_bathrooms),
    })}`
  );

  // 3. Custom key-value specifications
  if (Array.isArray(custom_specs)) {
    for (const s of custom_specs) {
      if (s && typeof s.key === 'string' && s.key.trim()) {
        result.push(
          `${SPEC_PREFIX}${JSON.stringify({
            id: s.id || `spec-${Math.random().toString(36).slice(2, 9)}`,
            key: s.key.trim(),
            value: String(s.value ?? '').trim(),
            enabled: s.enabled !== false,
          })}`
        );
      }
    }
  }

  return result;
}
