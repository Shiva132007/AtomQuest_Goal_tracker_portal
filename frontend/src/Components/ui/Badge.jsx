import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Badge Component for status, tags, categories
 */
export function Badge({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200",
    success: "bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-200",
    warning: "bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-200",
    danger: "bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-200",
    neutral: "bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-medium",
    md: "px-3 py-1.5 text-sm font-medium",
    lg: "px-4 py-2 text-base font-medium",
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-block rounded-full whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
}
