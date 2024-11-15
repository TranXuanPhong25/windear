export  function parseLinks(text: string) {
   const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
   const parts = [];
   let lastIndex = 0;
   let match;

   while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
         parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(`<a href="${match[1]}" class="text-blue-500 dark:text-blue-400 hover:underline">${match[2]}</a>`);
      lastIndex = match.index + match[0].length;
   }
   if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
   }
   return parts.join('');
}
