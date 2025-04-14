export const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0]; // retorna "2025-04-11"
};
