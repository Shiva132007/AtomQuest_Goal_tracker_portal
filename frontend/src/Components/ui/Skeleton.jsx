import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Skeleton Loader Component
 */
export function Skeleton({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
  className = "",
  count = 1,
}) {
  const skeletons = Array.from({ length: count });

  return (
    <div className="space-y-3">
      {skeletons.map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={cn(
            "bg-neutral-200 dark:bg-neutral-700",
            width,
            height,
            rounded,
            className
          )}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for card layout
 */
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 space-y-4">
      <Skeleton height="h-6" width="w-3/4" />
      <Skeleton height="h-4" width="w-full" count={2} />
      <div className="flex gap-2 pt-2">
        <Skeleton height="h-8" width="w-20" rounded="rounded-full" />
        <Skeleton height="h-8" width="w-20" rounded="rounded-full" />
      </div>
    </div>
  );
}
