import React from 'react';

export default function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
      {/* Image Skeleton with flash shimmer */}
      <div className="relative h-56 bg-slate-200 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Price & Badge */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-28 bg-slate-200 rounded" />
          <div className="h-5 w-16 bg-slate-200 rounded-full" />
        </div>

        {/* Title */}
        <div className="h-4 w-5/6 bg-slate-200 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 rounded" />

        {/* Location */}
        <div className="h-3 w-1/2 bg-slate-200 rounded" />

        {/* Specs row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="h-4 w-12 bg-slate-200 rounded" />
          <div className="h-4 w-12 bg-slate-200 rounded" />
          <div className="h-4 w-16 bg-slate-200 rounded" />
        </div>

        {/* Buttons */}
        <div className="pt-2 flex gap-2">
          <div className="h-9 flex-1 bg-slate-200 rounded-lg" />
          <div className="h-9 flex-1 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
