import {useCallback, useEffect, useState} from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import { Pencil, PlusCircle, X } from "lucide-react";
import clsx from "clsx";
import { compressImage } from "@/lib/compressImage";
export default function DropZone({ onDropFile, editingBookImageUrl }: { onDropFile: (file: File | null) => void,editingBookImageUrl:string }) {
   const [image, setImage] = useState<File | null>(null);
   const [previewUrl, setPreviewUrl] = useState(editingBookImageUrl);
   const handleRemoveImage = () => {
      setImage(null);
      setPreviewUrl("");
      if (typeof onDropFile === 'function') {
         onDropFile(null);
      }
   };
   useEffect(() => {
        if (editingBookImageUrl) {
             setPreviewUrl(editingBookImageUrl);
        }
   }, [editingBookImageUrl]);
   const onDrop = useCallback((acceptedFiles: File[]) => {
      
      console.log(acceptedFiles[0]); // Process the dropped files

      const file = acceptedFiles[0];
      console.log(compressImage(file))
      if (file) {
         setImage(file); // Save the file for further use

         // Generate a preview URL
         const reader = new FileReader();
         reader.onloadend = () => {
            if (typeof reader.result === 'string') {
               setPreviewUrl(reader.result); // Set the preview URL to the result
            }
         };
         reader.readAsDataURL(file);
         onDropFile(file);
      }
   }, [onDropFile]);

   const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
      accept: {
         'image/png': ['.png', '.jpg', '.jpeg'],
      },
      noClick: true,
      maxFiles: 1,
      onDrop
   });
   return (

      <div
         {...getRootProps()}
         className={clsx(
            'group  border-2 border-dashed rounded-r-2xl rounded-l-md p-2 border-gray-400 text-center relative w-[270px] lg:w-[350px] min-[1480px]:w-[280px] ',
            {
               'bg-green-500': isDragActive,
               'dark:bg-slate-600': !isDragActive
            }
         )}
      >
         <Input {...getInputProps()} />
         <div className="h-full ">
            {
               image || previewUrl ? (
                  <img src={previewUrl}
                     alt="Preview"
                     className="object-center rounded-r-xl rounded-l-sm h-full group-hover:brightness-50 group-hover:blur-[3px] transition-all " />
               )
                  : (
                     <div className="grid place-content-center h-full">
                        {/* <p>Drag 'n' drop some files here, or click to select files</p>
                           <em>(Only *.jpeg and *.png images will be accepted)</em> */}
                        <div className="">
                           <PlusCircle className="size-10 mx-auto opacity-60 hover:opacity-100 cursor-pointer" onClick={open} />
                           <p>Click to upload</p>
                           <em>Only accepted *.png/jpg/jpeg</em>
                        </div>
                     </div>
                  )
            }

         </div>
         <div className="absolute transition-all top-[55%] left-1/2 -translate-x-1/2 group-hover:top-1/2 opacity-0 group-hover:opacity-100 -translate-y-1/2">
            {
                (image || previewUrl )&& (
                  <div className="flex items-center gap-3 ">
                     <div className="bg-sky-500/70 text-white grid place-content-center size-10 rounded-full cursor-pointer hover:bg-sky-500" onClick={open}>
                        <Pencil className="size-5"/>
                     </div>
                     <div className="bg-red-500/70 !text-white rounded-full p-2 hover:bg-red-500 cursor-pointer" onClick={handleRemoveImage}>
                        <X/>
                     </div>
                  </div>
               )
            }
         </div>
      </div>

   )
}