export const ConvertToPercent = (a: number, b: number): number => {
  return (Math.round(((a / b) * 100) * 100) / 100);
}