import clsx from "clsx";

/**
 * Utility function to merge classnames
 * @param {...args} args - Classes to merge
 * @returns {string} Merged className
 */
export const cn = (...args) => clsx(args);

export default cn;
