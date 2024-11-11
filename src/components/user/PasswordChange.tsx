import axios from "axios";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleCheckBig, RefreshCcw } from "lucide-react";

function PasswordChange() {
   const { user, getAccessTokenSilently } = useAuth0();
   const [ticket, setTicket] = useState<string | null>(null);
   function generateResetPasswordLink() {
      if (!user?.sub) {
         return;
      }
      const getResetPasswordLink = async () => {
         try {
            const accessToken = await getAccessTokenSilently();
            const resetPasswordGeneratorUrl = `${import.meta.env.VITE_BASE_API_URL}/auth0/user/${user?.sub}/reset-password`;

            const response = await axios.request(
               {
                  method: 'GET',
                  url: resetPasswordGeneratorUrl,
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                  },
               }
            ).then(response => response.data);
            setTicket(response.ticket);

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
            description: "Successfully receive password reset link.",
            className: "mb-4  bg-green-400 dark:bg-green-600  ",
         })
      };
      getResetPasswordLink();
   }
   return (
      <section id="change-password" className="pt-20 -mt-20">
         <h1 className="text-3xl">Change password</h1>
         <Separator className="w-full  dark:bg-gray-500 mb-6 mt-2" />
         <h1 className="mb-2  dark:text-gray-100">
            Click the button below to request password change
         </h1>
         <Button onClick={generateResetPasswordLink} className="group">
            {ticket ? "Generate new password reset link" : "Generate password reset link"}
            <RefreshCcw className="ml-2 group-hover:animate-spin" />
         </Button>
         {
            ticket &&

            <div className="mt-4">
               <h2 className="flex items-center mb-1">
                  <CircleCheckBig className="text-green-400 mr-1 " />
                  <p>
                     Successfull generated. Your link will expire after <span className="text-red-500"> 5 minutes</span>.

                  </p>
               </h2>
               <p>
                  Click <Link to={ticket} className="text-blue-500 dark:text-blue-300 dark:hover:text-blue-400">here </Link>to reset your password
               </p>
            </div>

         }
      </section>
   );
}

export default PasswordChange;
