import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import DropZone from "@/components/DropZone";
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { format } from "date-fns"
import { CalendarIcon, X } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { supabase } from '@/lib/supabaseClient'
import { usePostBook } from '../../../../hooks/admin/usePostBook';
import { AddBookPayload, PostBookPayload } from '@/models/PostBookPayload'
import { compressImage } from '@/lib/compressImage'
import { useGetAllGenres } from '@/hooks/book/useGetAllGenres'
const formSchema = z.object({
   title: z.string().min(1, 'Title is required'),
   author: z.string().min(1, 'Author is required'),
   publisher: z.string().min(1, 'Publisher  is required'),
   description: z.string().optional(),
   authorDescription: z.string().optional(),
   format: z.string().min(1, 'Format is required'),
   releaseDate: z.date({
      required_error: "Release date is required.",
   }),
   numPages: z.number().min(8, 'Minimum 8 pages').max(10000, 'Maximum 10000 pages'),
   isbn10: z.string().optional(),
   isbn13: z.string().min(13, 'ISBN13 is required').max(13, 'ISBN13 is required'),
   language: z.string().min(1, 'Language is required'),
   genres: z.string().optional(),
   totalQuantity: z.union([z.number().min(0), z.string().transform(v => v === '' ? undefined : parseInt(v, 10))]),
   availableQuantity: z.union([z.number().min(0), z.string().transform(v => v === '' ? undefined : parseInt(v, 10))]),
})

export default function AddBookForm() {
   const { data: genres } = useGetAllGenres();
   const [suggestGenres, setSuggestGenres] = useState<string[]>([]);
   const [tags, setTags] = useState<string[]>([]);
   const [genreQuery, setGenreQuery] = useState('');
   const [image, setImage] = useState<File | null>(null);
   const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(0);
   const [tagsIndices, setTagsIndices] = useState<number[]>([]);
   const firstInputRef=useRef<HTMLInputElement>(null);
   const { mutate: createBook, isPending } = usePostBook();
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: '',
         author: '',
         publisher: '',
         language: '',
         description: '',
         authorDescription: '',
         format: '',
         releaseDate: new Date(),
         numPages: 0,
         isbn10: '',
         isbn13: '',
         genres: '',
         totalQuantity: 0,
         availableQuantity: 0,
      },
   })
   const uploadImageToSupabase = async (file: File) => {
      // return;
      const compressedFile = await compressImage(file);
      if (!compressedFile) return { data: null, error: new Error('Failed to upload Image') };

      const { data, error } = await supabase.storage
         .from('bookcover')
         .upload(`public/${encodeURIComponent(file.name)}-${new Date().getTime()}`, compressedFile);
      if (error) {
         return { data: null, error }
      }
      const fileUrl = `${import.meta.env.VITE_SUPABASE_BUCKET_URL}/${data.fullPath}`
      return { data: fileUrl, error: null };
   };

   async function onSubmit(values: z.infer<typeof formSchema>) {

      // console.log(await compressImage(image as File));
      const { data: publicUrl, error } = await uploadImageToSupabase(image as File);
      if (error) {
         toast({
            title: "Error",
            description: `${error.message}`,
            className: "!bg-red-500 mb-4",
         });
         return;
      }
      const book: PostBookPayload = {
         ...values,
         releaseDate: values.releaseDate.toISOString(),
         imageUrl: publicUrl,
         description: values.description || '',
         authorDescription: values.authorDescription || '',
      };
      const payload: AddBookPayload = {
         genres: tagsIndices.join(','),
         internalBook: book,
      };
      createBook(payload);

   }

   console.log(tagsIndices)
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && genreQuery.trim() !== '') {
         e.preventDefault();
         if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestGenres.length) {
           const selectedGenre = suggestGenres[selectedSuggestionIndex];
           if (!tags.includes(selectedGenre)) {
             setTags([...tags, selectedGenre]);
             setTagsIndices([...tagsIndices, genres.indexOf(selectedGenre)]);
           }
           setGenreQuery('');
           setSuggestGenres([]);
           setSelectedSuggestionIndex(0);
         } else if (!tags.includes(genreQuery.trim())) {
         //   setTags([...tags, genreQuery.trim()]);
           setGenreQuery('');
         }
       } else if (e.key === 'ArrowDown') {
         e.preventDefault();
         setSelectedSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestGenres.length);
       } else if (e.key === 'ArrowUp') {
         e.preventDefault();
         setSelectedSuggestionIndex((prevIndex) => (prevIndex - 1 + suggestGenres.length) % suggestGenres.length);
       }
    };
  
    const handleRemoveTag = (tag: string) => {
      setTags(tags.filter(t => t !== tag));
      setTagsIndices(tagsIndices.filter((tagIndex) => tags[tagIndex] !== tag));
    };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
               <div className=' w-full h-[420px] lg:w-[350px] min-[1480px]:w-[280px] flex justify-center'>
                  <DropZone onDropFile={setImage} />
               </div>
               <div className="space-y-4 flex-1">

                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Title</FormLabel>
                           <FormControl>
                              <Input {...field} ref={firstInputRef} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="author"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Author</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="language"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Language</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className='grid grid-cols-2 gap-6'>
                     <FormField
                        control={form.control}
                        name="publisher"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Publisher</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="releaseDate"
                        render={({ field }) => (
                           <FormItem className="">
                              <FormLabel>Release Date</FormLabel>
                              <Popover>
                                 <PopoverTrigger asChild>
                                    <FormControl>
                                       <Button
                                          variant={"outline"}
                                          className={cn(
                                             "w-full text-left font-normal",
                                             !field.value && "text-muted-foreground"
                                          )}
                                       >
                                          {field.value ? (
                                             format(field.value, "dd/MM/yyyy")
                                          ) : (
                                             <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                       </Button>
                                    </FormControl>
                                 </PopoverTrigger>
                                 <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                       mode="single"
                                       selected={field.value}
                                       onSelect={field.onChange}
                                       disabled={(date) =>
                                          date > new Date() || date < new Date("1900-01-01")
                                       }
                                       initialFocus
                                    />
                                 </PopoverContent>
                              </Popover>

                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <FormField
                        control={form.control}
                        name="format"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Format</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="numPages"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Num of pages</FormLabel>
                              <FormControl>
                                 <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value) || "")}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
            </div>
            <div className="space-y-4">

               <div className="grid grid-cols-2 gap-6">
                  <FormField
                     control={form.control}
                     name="isbn13"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>ISBN13</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="isbn10"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>ISBN10</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormField
              control={form.control}
              name="genres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl >
                    <Input
                      {...field}
                      value={genreQuery}
                      onChange={(e) => {
                        field.onChange(e);
                        setGenreQuery(e.target.value);
                        setSuggestGenres(genres.map((genre: string) => genre.toLowerCase()).filter((genre: string | string[]) => genre.includes(e.target.value.toLowerCase())));
                      }}
                      onKeyDown={handleKeyDown}
                      autoComplete="off"
                    />
                   
                  </FormControl>
                  {suggestGenres.length > 0 && (
                      <div className="absolute dark:bg-gray-600 border border-gray-300 rounded-md mt-1  z-10 overflow-hidden">
                        {suggestGenres.map((genre: string,index:number) => (
                          <div
                            key={genre}
                            className={`p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700/70  ${index === selectedSuggestionIndex ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                              if (!tags.includes(genre)) {
                                setTags([...tags, genre]);
                                 setTagsIndices([...tagsIndices, index]);
                              }
                              setGenreQuery('');
                              setSuggestGenres([]);
                            }}
                          >
                            {genre}
                          </div>
                        ))}
                      </div>
                    )}
                  <FormMessage />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <div key={tag} className="bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center dark:bg-gray-700">
                        {tag}
                        <button
                          type="button"
                          className="ml-2 text-red-500"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className='size-4' />
                        </button>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <Textarea {...field} className='min-h-[200px]' />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="authorDescription"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Author Description</FormLabel>
                        <FormControl>
                           <Textarea {...field} className='min-h-[200px]' />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <Button type="submit" className="" disabled={isPending}>Add Book</Button>
         </form>
      </Form >
   )
}