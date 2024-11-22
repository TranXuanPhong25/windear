export const compressImage = async (file: File): Promise<File | null> => {
   return new Promise((resolve, reject) => {
      if (file) {
         const reader = new FileReader();

         reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
               // Create a canvas and draw the image on it
               const canvas = document.createElement('canvas');
               const ctx = canvas.getContext('2d');

               // Set canvas size to match the image size
               canvas.width = img.width;
               canvas.height = img.height;

               // Draw the image on the canvas
               if (ctx) {
                  ctx.drawImage(img, 0, 0);
               }

               // Use toBlob for better performance
               canvas.toBlob((blob) => {
                  if (blob) {
                     // Create a new File object from the blob
                     const compressedFile = new File([blob], file.name.replace(/\..+/,"") + '.jpg', {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                     });
                     resolve(compressedFile);
                  } else {
                     reject(new Error('Failed to compress image'));
                  }
               }, 'image/jpeg', 0.6); // Compress to JPEG with 60% quality
            };
            if (e.target?.result) {
               img.src = e.target.result as string;
            }
         };
         reader.readAsDataURL(file);
      } else {
         reject(new Error('No file provided'));
      }
   });
};