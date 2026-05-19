import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Modern Card Component with animations
 */
export function Card({
  children,
  className = "",
  interactive = false,
  hover = true,
  ...props
}) {
  const baseClasses =
    "bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-100 dark:border-neutral-700 transition-all duration-300";

  const interactiveClasses = interactive ? "cursor-pointer" : "";
  const hoverClasses = hover ? "hover:shadow-lg hover:border-primary-300" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(baseClasses, interactiveClasses, hoverClasses, className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card with header and content sections
 */
export function CardHeader({ children, className = "" }) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-b border-neutral-100 dark:border-neutral-700",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={cn("px-6 py-4", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "" }) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
}
