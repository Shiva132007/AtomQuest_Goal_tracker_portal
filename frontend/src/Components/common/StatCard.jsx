import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/Card";
import { cn } from "../../utils/cn";

/**
 * Modern Stats Card Component with animations
 */
export function StatCard({
  title,
  value,
  subtitle = "",
  icon: Icon = null,
  trend = null,
  color = "primary",
  delay = 0,
}) {
  const colorClasses = {
    primary: "from-primary-400 to-primary-600",
    success: "from-success-400 to-success-600",
    warning: "from-warning-400 to-warning-600",
    danger: "from-danger-400 to-danger-600",
    accent: "from-accent-400 to-accent-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card interactive hover>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            {/* Left Section */}
            <div className="flex-1">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                {title}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                  {typeof value === "number" ? value.toLocaleString() : value}
                </h3>
                {trend && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "text-sm font-semibold px-2 py-1 rounded-full",
                      trend > 0
                        ? "bg-success-100 text-success-700"
                        : "bg-danger-100 text-danger-700"
                    )}
                  >
                    {trend > 0 ? "+" : ""}{trend}%
                  </motion.span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-neutral-500 mt-2">{subtitle}</p>
              )}
            </div>

            {/* Icon Section */}
            {Icon && (
              <motion.div
                className={cn(
                  "w-12 h-12 bg-gradient-to-br rounded-lg flex items-center justify-center text-white",
                  colorClasses[color]
                )}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Icon size={24} />
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
