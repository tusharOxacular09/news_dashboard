/**
 * Format Date
 */
export const formatDate = (date: Date | null): string | null => {
  if (!date) return null;

  // Create a formatted date (YYYY-MM-DD)
  return date.toISOString().split("T")[0];
};
