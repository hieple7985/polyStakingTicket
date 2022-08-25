export const FormatDateAndTimeFull = (date: Date): {date: string, time: string} => {
  const format: {
    date: string,
    time: string,
  } = {
    date: `
      ${date.toLocaleString('en-US', {month: 'long', day: "2-digit"})}, 
      ${date.getFullYear()}
    `,
    time: `
      ${date.toLocaleString('en-US', {weekday: 'long', hour: '2-digit', minute:'2-digit'})}
    `
  }
    
  return format;
}