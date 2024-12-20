import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {toast} from "@/hooks/use-toast";
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Link} from "react-router-dom"
import {useAuth0} from '@auth0/auth0-react';
import axios from "axios"
import {useQuery} from "@tanstack/react-query"
import {Skeleton} from "@/components/ui/skeleton"
import {useEffect} from "react";

const FormSchema = z.object({
    email: z.string().email().optional(),
    username: z.string()
        .min(4, {
            message: "Username must be at least 4 characters.",
        })
        .max(15, {
            message: "Username must not be longer than 15 characters"
        })
        .regex(/^[a-zA-Z0-9_\-.!#$^`~@]*$/, {"message": "Username must only contain letters, numbers,+ , -, ., !, #, $, ', ^, `, ~ and @"})
    ,
    location: z.string().optional(),
    bio: z
        .string()
        .max(160, {
            message: "Bio must not be longer than 160 characters.",
        })
        .optional()
    ,
    pronouns: z.string().optional(),
})


function ProfileInput() {
    const {user, getAccessTokenSilently} = useAuth0();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            username: "",
            location: "",
            bio: "",
            pronouns: "Don't specify",
        },
    })

    const {isLoading, data, error} = useQuery({
        queryKey: ['user', user?.sub],
        queryFn: async () => {
            const domain = `${import.meta.env.VITE_AUTH0_DOMAIN}`;

            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:users read:current_user_metadata read:current_user read:current_idp_tokens ",
                    prompt: "none",
                },
            });
            // console.log(accessToken)
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
            return await axios(userDetailsByIdUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(response => response.data)
                .catch((error) => {
                    console.error(error);
                });
        },
        enabled: !!user?.sub,
    });
    useEffect(() => {
        if (data) {
            form.reset({
                email: data?.email || "empty@gmail.com",
                username: data?.username || data?.identities[0].provider,
                location: data?.user_metadata?.location || "",
                bio: data?.user_metadata?.bio || "",
                pronouns: data?.user_metadata?.pronouns || "Don't specify",
            });
        }
    }, [data, form]);
    if (error) return <div>Something went wrong</div>

    // console.log(data.identities[0].provider);
    function onSubmit(submitData: z.infer<typeof FormSchema>) {
        const updateUserMetadata = async () => {

            try {
                const accessToken = await getAccessTokenSilently();
                const userDetailsByIdUrl = `${import.meta.env.VITE_BASE_API_URL}/auth0/user/profile/${user?.sub}`;
                const userMetadata = {
                    "location": submitData.location,
                    "bio": submitData.bio,
                    "pronouns": submitData.pronouns,
                }
                let requestBody;
                if (data?.identities[0]?.provider === 'auth0') {
                    requestBody = {
                        "email": submitData.email,
                        "username": submitData.username,
                        "user_metadata": userMetadata
                    }
                } else {
                    requestBody = {
                        "user_metadata": userMetadata
                    }
                }
                await axios.request(
                    {
                        method: 'PUT',
                        url: userDetailsByIdUrl,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        data: {
                            isSocial: String(data?.identities[0]?.provider !== 'auth0'),
                            payload: JSON.stringify(requestBody)
                        }
                    }
                ).then(response => response.data);


            } catch (e: unknown) {

                console.error(e);
                const error = e as { status?: number };
                toast(
                    {
                        title: "Error",
                        description: error.status === 429 ? "Too many requests. Please try again later." : "An error occurred. Please try again later.",
                        className: "!bg-red-500 mb-4",
                    }
                )
                return;
            }
            toast({
                title: "Success",
                description: "Your profile has been updated.",
                className: "mb-4  bg-green-400 dark:bg-green-600  ",
            })
        };
        updateUserMetadata().then(r => r);

    }

    // console.log(data?.identities[0]);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-6">


                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                {
                                    isLoading ?
                                        <Skeleton className="h-10"/>
                                        :
                                        <Input   {...field}
                                                 disabled={!(data && data?.identities[0]?.provider == 'auth0')}/>
                                }
                            </FormControl>
                            <FormDescription>
                                {data && data?.identities[0]?.provider == "auth0" ? "This is used for login via username" : "User login via social media, username is not available  "}
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                {
                                    isLoading ?
                                        <Skeleton className="h-10"/>
                                        :
                                        <Input type="email"
                                               disabled={!(data && data?.identities[0]?.provider == 'auth0')}  {...field} />
                                }
                            </FormControl>
                            <FormDescription>

                                {data && data?.identities[0]?.provider === 'auth0' ? "This is used for login via email" : "You login via social media, email can not be changed"}
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                {
                                    isLoading ?
                                        <Skeleton className="h-[90px]"/>
                                        :
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            {...field}
                                        />
                                }
                            </FormControl>
                            {/* <FormDescription>
                        You can <span>@mention</span> other users and organizations.
                     </FormDescription> */}
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pronouns"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Pronouns</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        {
                                            isLoading ?
                                                <Skeleton className="h-10"/>
                                                :
                                                <SelectValue>
                                                    {field.value}
                                                </SelectValue>
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
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                {
                                    isLoading ?
                                        <Skeleton className="h-10"/>
                                        :
                                        <Input {...field} />
                                }
                            </FormControl>
                            <FormMessage/>
                        </FormItem>

                    )}
                />
                <FormDescription>
                    All of the fields on this page are optional and can be deleted at any time, and by filling them out,
                    you're giving us consent to share this data wherever your user profile appears. Please see our
                    <Link to="/privacy" className="text-blue-500"> Privacy Policy </Link>
                    to learn more about how we use this information.
                </FormDescription>
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}

export default ProfileInput