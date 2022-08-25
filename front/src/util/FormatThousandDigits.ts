const formatDigits = (num: number, condition: number, postfix: string): string => {
  let fNum = '';
  if (num >= condition) {
    fNum = (Math.floor(num / condition)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    num % condition ? fNum += `${postfix}+` : fNum += `${postfix}`;
    return fNum;
  }
  return num.toString();
}

export const FormatThousandDigits = (num: number): string => {
  if (num >= 1000) {
    return formatDigits(num, 1000, 'K');
  }
  return num.toString();  
}