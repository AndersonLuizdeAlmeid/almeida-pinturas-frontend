export const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return "";

  const [day, month, year] = dateString.split("/");
  if (!day || !month || !year) return "";

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
};
