export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-[length:200%_100%] bg-gradient-to-r from-line via-white to-line animate-shimmer ${className}`}
    />
  );
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-white border border-line perf-top pt-5 animate-pulse">
      <div className="px-5 pb-5">
        <SkeletonLine className="h-3 w-28 mb-3" />
        <SkeletonLine className="h-6 w-48 mb-2" />
        <SkeletonLine className="h-4 w-36 mb-4" />
        <div className="pt-4 border-t border-dashed border-line flex justify-between">
          <SkeletonLine className="h-3 w-20" />
          <SkeletonLine className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ListRowSkeleton() {
  return (
    <div className="py-5 flex items-center justify-between gap-4 animate-pulse">
      <div className="flex-1">
        <SkeletonLine className="h-5 w-56 mb-2" />
        <SkeletonLine className="h-3 w-32" />
      </div>
      <SkeletonLine className="h-8 w-24 shrink-0" />
    </div>
  );
}
