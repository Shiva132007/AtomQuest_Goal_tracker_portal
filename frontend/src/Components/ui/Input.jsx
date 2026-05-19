import { cn } from "../../utils/cn";

/**
 * Input Component
 */
export function Input({
  label = "",
  error = "",
  icon: Icon = null,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <Icon size={18} />
          </div>
        )}
        <input
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
            Icon && "pl-10",
            error && "border-danger-500 focus:ring-danger-500",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-danger-500 mt-1">{error}</p>
      )}
    </div>
  );
}

/**
 * Textarea Component
 */
export function Textarea({
  label = "",
  error = "",
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none",
          error && "border-danger-500 focus:ring-danger-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-danger-500 mt-1">{error}</p>
      )}
    </div>
  );
}

/**
 * Select Component
 */
export function Select({
  label = "",
  error = "",
  options = [],
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <select
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
          error && "border-danger-500 focus:ring-danger-500",
          className
        )}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-danger-500 mt-1">{error}</p>
      )}
    </div>
  );
}
