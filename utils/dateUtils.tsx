export const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateForInputDateField = (dateString?: string): string => {
  if (!dateString) return "";

  const safeString = dateString.replace(" ", "T");

  const date = new Date(safeString);
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear().toString().padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // formato aceito por input type="date"
};
