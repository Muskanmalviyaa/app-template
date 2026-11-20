/**
 * Currency formatter for Indian Rupee (INR)
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
};

/**
 * Format date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Validate email address
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

