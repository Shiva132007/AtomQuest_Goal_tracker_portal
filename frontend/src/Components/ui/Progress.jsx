import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Progress Bar Component with animations
 */
export function ProgressBar({
  value = 0,
  max = 100,
  size = "md",
  color = "primary",
  animated = true,
  showLabel = true,
  className = "",
}) {
  const percentage = Math.min(100, (value / max) * 100);

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const colorGradients = {
    primary: "from-primary-400 to-primary-600",
    success: "from-success-400 to-success-600",
    warning: "from-warning-400 to-warning-600",
    danger: "from-danger-400 to-danger-600",
  };

  return (
    <div className={className}>
      <div
        className={cn(
          "w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden",
          sizeClasses[size]
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: "easeOut",
          }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            colorGradients[color]
          )}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            {value} / {max}
          </span>
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Circular Progress Component
 */
export function CircularProgress({
  value = 0,
  max = 100,
  size = "md",
  color = "primary",
  showLabel = true,
}) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    primary: "text-primary-600",
    success: "text-success-600",
    warning: "text-warning-600",
    danger: "text-danger-600",
  };

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45"
            className="fill-none stroke-neutral-200 dark:stroke-neutral-700"
            strokeWidth="4"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45"
            className={cn("fill-none", colorClasses[color])}
            strokeWidth="4"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8 }}
            strokeLinecap="round"
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
