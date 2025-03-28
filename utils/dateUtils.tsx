export const formatDate = (
  dateString?: string,
  locale: string = "pt-BR"
): string => {
  if (!dateString) return "Data inválida";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Data inválida";

  return new Intl.DateTimeFormat(locale).format(date);
};
