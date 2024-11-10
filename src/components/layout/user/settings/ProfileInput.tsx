
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
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
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
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         username: user?.nickname,
         location: "",
         bio: "",
         pronouns: "",
      },
   })
   const { isLoading, error } = useQuery({
      queryKey: ['user', user?.sub],
      queryFn: async () => {
         const domain = `${import.meta.env.VITE_AUTH0_DOMAIN}`;

         const accessToken = await getAccessTokenSilently({
            authorizationParams: {
               audience: `https://${domain}/api/v2/`,
               scope: "read:current_user ",
               prompt: "none",
            },
         });
         const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
         const { user_metadata } = await axios(userDetailsByIdUrl, {
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         }).then(response => response.data)
            .catch((error) => {
               console.error(error);
            })
         if (user_metadata) {
            form.reset({
               username: user?.nickname || "",
               location: user_metadata?.location || "",
               bio: user_metadata?.bio || "",
               pronouns: user_metadata?.pronouns || "",
            });
         }

         return user_metadata;
      },
      enabled: !!user?.sub,
   });
   if (error) return <div>Something went wrong</div>

   function onSubmit(submitData: z.infer<typeof FormSchema>) {
      const updateUserMetadata = async () => {
         const domain = `${import.meta.env.VITE_AUTH0_DOMAIN}`;

         try {
            const accessToken = await getAccessTokenSilently({
               authorizationParams: {
                  audience: `https://${domain}/api/v2/`,
                  scope: "read:current_user update:users, update:users_app_metadata, update:current_user_metadata ",
                  prompt: "none",
               },
            });
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

            await axios.request(
               {
                  method: 'patch',
                  url: userDetailsByIdUrl,
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                  },
                  data:
                  {
                     "user_metadata": {
                        "username": submitData.username,
                        "location": submitData.location,
                        "bio": submitData.bio,
                        "pronouns": submitData.pronouns,
                     }
                  }
               }
            ).then(response => response.data);
            
         } catch (e) {
            
            console.error(e);
            toast(
               {
                  title: "Error",
                  description: e.status===429 ? "Too many requests. Please try again later." : "An error occurred. Please try again later.",
                  className: "!bg-red-500",
               }
            )
            return;
         }
         toast({
            title: "Success",
            description: "Your profile has been updated.",
            className: "mb-4  dark:bg-green-600  ",
         })
      };
      updateUserMetadata();
      
   }
   
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-6">
            {

               <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                           {
                              isLoading ?
                                 <Skeleton className="h-10" />
                                 :
                                 <Input  {...field} />
                           }
                        </FormControl>
                        <FormDescription>
                           This is your public display name.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            }

            <FormField
               control={form.control}
               name="bio"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Bio</FormLabel>
                     <FormControl>
                        {
                           isLoading ?
                              <Skeleton className="h-[100px]" />
                              :
                              <Textarea
                                 placeholder="Tell us a little bit about yourself"
                                 {...field}
                              />
                        }
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
                              {
                                 isLoading ?
                                    <Skeleton className="h-10" />
                                    :
                                    <SelectValue placeholder="Don't specify" />
                              }
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="Don't specify">Don't specify</SelectItem>
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
                        {
                           isLoading ?
                              <Skeleton className="h-10" />
                              :
                              <Input {...field} />
                        }
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