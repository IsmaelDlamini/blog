import React from "react";

const BlogObjectSkeleton = () => (
  <div className="flex w-[600px] max-w-2xl h-[200px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 animate-pulse relative">
    {/* Accent bar */}
    <div className="w-2 bg-gradient-to-b from-cyan-200 to-cyan-100"></div>
    {/* Image skeleton */}
    <div className="w-[200px] h-full bg-slate-200 relative flex-shrink-0">
      <div className="absolute top-3 left-3 w-16 h-6 bg-cyan-100 rounded-full"></div>
    </div>
    {/* Content skeleton */}
    <div className="flex flex-col flex-1 px-6 py-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-16 h-4 bg-slate-200 rounded"></div>
        <div className="w-10 h-4 bg-slate-100 rounded"></div>
        <div className="w-10 h-4 bg-slate-200 rounded"></div>
      </div>
      <div className="w-2/3 h-6 bg-slate-200 rounded mb-2"></div>
      <div className="w-full h-4 bg-slate-100 rounded mb-2"></div>
      <div className="w-1/2 h-4 bg-slate-100 rounded mb-4"></div>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-16 h-4 bg-slate-200 rounded"></div>
        <div className="w-16 h-4 bg-slate-200 rounded"></div>
        <div className="ml-auto w-20 h-4 bg-slate-100 rounded"></div>
      </div>
    </div>
  </div>
);

export default BlogObjectSkeleton;