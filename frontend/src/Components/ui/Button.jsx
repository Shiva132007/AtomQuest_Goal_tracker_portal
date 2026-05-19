import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Modern Button Component
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-primary-500 to-accent-600 text-white shadow-[0_4px_14px_0_rgb(14,165,233,0.39)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.23)] hover:scale-[1.02] disabled:opacity-50 border border-white/10",
    secondary:
      "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700",
    danger:
      "bg-danger-500 text-white hover:bg-danger-600 disabled:opacity-50",
    ghost:
      "text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-neutral-800",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full w-4 h-4 border-2 border-current border-t-transparent" />
      ) : Icon ? (
        <Icon size={18} />
      ) : null}
      {children}
    </motion.button>
  );
}
