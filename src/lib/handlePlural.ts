export function handlePlural(value: number, unit: string, shouldTruncate: boolean = false): string {
   unit = " " + unit;
   if (value > 1) {
      unit += "s";
   }

   if (shouldTruncate && value > 1000) {
      value = Math.floor(value / 1000);
      unit = "K" + unit;
   } else {
      const formattedNumber = new Intl.NumberFormat('en-US').format(value);
      return `${formattedNumber}${unit}`;
   }

   return `${value}${unit}`;
}