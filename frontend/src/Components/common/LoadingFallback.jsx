import { motion } from "framer-motion";
import { Skeleton } from "../ui/Skeleton";

/**
 * Loading Fallback Component for Suspense
 */
export function LoadingFallback() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Skeleton height="h-12" width="w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
        <Skeleton height="h-64" />
      </div>
    </div>
  );
}
