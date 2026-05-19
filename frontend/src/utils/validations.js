/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password) => {
  return password.length >= 6;
};

/**
 * Validate goal weightage
 */
export const isValidWeightage = (weightage) => {
  const num = Number(weightage);
  return num >= 10 && num <= 100;
};

/**
 * Validate goal target
 */
export const isValidTarget = (target) => {
  return Number(target) > 0;
};
