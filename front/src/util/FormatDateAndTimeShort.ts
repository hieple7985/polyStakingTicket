export const formatDateAndTimeShort = (date: Date): string => {
  const format = `
    ${date.toLocaleString('en-US', {month: 'short', day: "2-digit"})}, 
    ${date.getFullYear()}, 
    ${date.toLocaleString('en-US', {hour: '2-digit', minute:'2-digit'})}
  `;
  return format;
}