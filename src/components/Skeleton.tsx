export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-[length:200%_100%] bg-gradient-to-r from-line via-white to-line animate-shimmer ${className}`}
    />
  );
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-cardbg border border-line animate-pulse overflow-hidden flex flex-col justify-between h-full rounded-sm">
      <div className="h-1.5 w-full bg-line" />
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <SkeletonLine className="h-3 w-20 mb-3" />
        {/* avatar + name */}
        <div className="flex items-start gap-3 mb-3">
          <SkeletonLine className="h-16 w-16 rounded-full shrink-0" />
          <div className="flex-1 pt-0.5">
            <SkeletonLine className="h-4 w-32 mb-2" />
            <SkeletonLine className="h-3 w-full mb-1" />
            <SkeletonLine className="h-3 w-3/4" />
          </div>
        </div>
        {/* meta */}
        <SkeletonLine className="h-12 w-full mb-3 rounded-sm" />
        {/* fee */}
        <SkeletonLine className="h-4 w-full mb-3" />
        {/* cta */}
        <SkeletonLine className="h-8 w-full mt-auto rounded-sm" />
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
