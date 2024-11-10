
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { useState, useEffect } from "react"
const FormSchema = z.object({
   username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
   }),
   location: z.string().optional(),
   bio: z
      .string()
      .min(10, {
         message: "Bio must be at least 10 characters.",
      })
      .max(160, {
         message: "Bio must not be longer than 30 characters.",
      }),
   pronouns: z.string().optional(),
})


function ProfileInput() {
   const { user, getAccessTokenSilently } = useAuth0();
   // const getUserMetadata_ = async (userId: string | undefined) => {
   //    const accessToken = await getAccessTokenSilently({
   //       authorizationParams: {
   //          audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
   //          scope: "read:current_user",
   //       },
   //    });
      
   //    console.log(accessToken)
   //    const user_metadata = await getUserMetadata(userId, accessToken);
   //    console.log(user_metadata);
   //    return user_metadata;
   // }
   const [userMetadata, setUserMetadata] = useState(null);

   useEffect(() => {
      const getUserMetadata = async () => {
        const domain = `${import.meta.env.VITE_AUTH0_DOMAIN}`;
    
        try {
           const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                 audience: `https://${domain}/api/v2/`,
                 scope: "read:current_user",
                 prompt: "none",
               },
            });
            console.log(accessToken);
          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
    
          const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          const { user_metadata } = await metadataResponse.json();
          console.log(user_metadata);
          setUserMetadata(user_metadata);
        } catch (e) {
          console.error(e);
        }
      };
    
      getUserMetadata();
   }, [getAccessTokenSilently, user?.sub]);
   console.log(userMetadata);
   // const { isLoading, error, data } = useQuery({
   //    queryKey: ["userMetadata", user?.sub],
   //    queryFn: () => getUserMetadata_(user?.sub)
   // });
   // console.log(error);
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         username: user?.nickname,
         location: "",
         bio: "",
         pronouns: "",
      },
   })

   function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
         title: "You submitted the following values:",
         description: (
            <pre className="mt-2 w-[340px] rounded-md  dark:bg-gray-800/90 bg-gray-600 p-4">
               <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
         ),
         className: "mb-4  dark:bg-gray-700 ",
      })
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-6">
            <FormField
               control={form.control}
               name="username"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Username</FormLabel>
                     <FormControl>
                        <Input  {...field} />
                     </FormControl>
                     <FormDescription>
                        This is your public display name.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="bio"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Bio</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder="Tell us a little bit about yourself"
                           {...field}
                        />
                     </FormControl>
                     <FormDescription>
                        You can <span>@mention</span> other users and organizations.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="pronouns"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Pronouns</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Don't specify" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="she/her">she/her</SelectItem>
                           <SelectItem value="he/his">he/his</SelectItem>
                           <SelectItem value="they/their">they/their</SelectItem>
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="location"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Location</FormLabel>
                     <FormControl>
                        <Input  {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>

               )}
            />
            <FormDescription>
               All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears. Please see our
               <Link to="/privacy" className="text-blue-500"> Privacy Policy </Link>
               to learn more about how we use this information.
            </FormDescription>
            <Button type="submit">Update profile</Button>
         </form>
      </Form>
   )
}

export default ProfileInput