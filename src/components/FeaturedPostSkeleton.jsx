import React from "react";

const FeaturedPostSkeleton = () => (
  <div className="relative w-full min-h-[22rem] rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col md:flex-row mt-8 border border-cyan-100 animate-pulse">
    {/* Image Section Skeleton */}
    <div className="md:w-[44%] w-full h-56 md:h-auto relative flex items-center justify-center bg-gradient-to-tr from-cyan-100 via-white to-cyan-50">
      <div className="w-[90%] h-[80%] bg-slate-200 rounded-xl"></div>
      <div className="absolute top-4 left-4 w-24 h-7 bg-cyan-100 rounded-full"></div>
    </div>
    {/* Content Section Skeleton */}
    <div className="flex-1 flex flex-col justify-center px-8 py-8 md:py-0 bg-gradient-to-br from-white via-cyan-50 to-white">
      <div className="flex flex-wrap gap-3 items-center mb-3">
        <div className="w-24 h-7 bg-cyan-50 rounded-full"></div>
        <div className="w-20 h-7 bg-cyan-50 rounded-full"></div>
        <div className="w-20 h-7 bg-cyan-50 rounded-full"></div>
      </div>
      <div className="w-3/4 h-10 bg-slate-200 rounded mb-3"></div>
      <div className="w-full h-6 bg-slate-100 rounded mb-2"></div>
      <div className="w-2/3 h-6 bg-slate-100 rounded mb-8"></div>
      <div className="w-32 h-10 bg-cyan-100 rounded-full"></div>
    </div>
    {/* Decorative accent shapes */}
    <div className="absolute -top-8 -right-8 w-32 h-32 bg-cyan-200 rounded-full opacity-20 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-customTeal rounded-full opacity-10 pointer-events-none"></div>
  </div>
);

export default FeaturedPostSkeleton;