export function handlePlural(value: number, type: string, shouldTruncate: boolean = false): string {
   type = " " + type;
   if (value > 1) {
      type += "s";
   }

   if (shouldTruncate && value > 1000) {
      value = Math.floor(value / 1000);
      type = "K" + type;
   } else {
      const formattedNumber = new Intl.NumberFormat('en-US').format(value);
      return `${formattedNumber}${type}`;
   }

   return `${value}${type}`;
}