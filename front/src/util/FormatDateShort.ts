export const formatDateShort = (date: Date): string => {
  const format = `${date.toLocaleString('en-US', {month: 'short', day: "2-digit"})}`;
  return format;
}