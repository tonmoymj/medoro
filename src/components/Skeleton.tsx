export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-[length:200%_100%] bg-gradient-to-r from-line via-white to-line animate-shimmer ${className}`}
    />
  );
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-cardbg border border-line animate-pulse overflow-hidden flex flex-col">
      <div className="h-1 w-full bg-line" />
      <div className="p-5 flex flex-col flex-1">
        {/* avatar + name */}
        <div className="flex items-start gap-4 mb-4">
          <SkeletonLine className="h-14 w-14 shrink-0" />
          <div className="flex-1 pt-0.5">
            <SkeletonLine className="h-2.5 w-24 mb-2" />
            <SkeletonLine className="h-5 w-36 mb-1" />
            <SkeletonLine className="h-4 w-28" />
          </div>
        </div>
        {/* degree */}
        <SkeletonLine className="h-3 w-full mb-1.5" />
        <SkeletonLine className="h-3 w-3/4 mb-4" />
        {/* divider */}
        <div className="border-t border-dashed border-line mb-4" />
        {/* meta */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <SkeletonLine className="h-3 w-full" />
          <SkeletonLine className="h-3 w-full" />
          <SkeletonLine className="h-3 w-full col-span-2" />
        </div>
        {/* fee */}
        <SkeletonLine className="h-6 w-28 mb-4" />
        {/* cta */}
        <SkeletonLine className="h-9 w-full mt-auto" />
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
