/**
 * Format number to percentage
 */
export const toPercent = (value) => {
  return `${Math.round(value)}%`;
};

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US").format(num);
};

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current, target) => {
  if (target === 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 50) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

/**
 * Format time ago
 */
export const formatTimeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = now - past;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
};
