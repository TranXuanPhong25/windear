import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
   password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
   })
   ,
   confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters.",
   })
}).superRefine(({ password, confirmPassword }, context) => {
   if (confirmPassword !== password) {
      context.addIssue({
         code: z.ZodIssueCode.custom,
         message: "Passwords do not match.",
      });
   }
})

function ChangePasswordForm (){
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         password: "",
         confirmPassword: "",
      },
   })
   function onSubmit(submitData: z.infer<typeof FormSchema>) { 
      toast({
         title: "Password changed",
         description: "Your password has been changed successfully."+ submitData.password,
         className: "!bg-green-500 mb-4",
      })
   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-fit space-y-6">

            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>New password</FormLabel>
                     <FormControl>
                              <Input type="password" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="confirmPassword"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Comfirm password</FormLabel>
                     <FormControl>

                        <Input type="password" {...field} />

                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">Change password</Button>
         </form>
      </Form>
   )
}
export default ChangePasswordForm;