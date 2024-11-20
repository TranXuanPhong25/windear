import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleCheckBig, RefreshCcw } from "lucide-react";
import clsx from "clsx";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useGeneratePasswordReset } from "@/hooks/user/useGeneratePasswordReset";

function PasswordChange() {
  const [ticket, setTicket] = useState<string | null>(null);

  const generate = useGeneratePasswordReset(setTicket);

  const generateResetPasswordLink = () => {
   generate.mutate();
  };
  return (
    <section id="change-password" className="pt-20 -mt-20">
      <h1 className="text-3xl">Change password</h1>
      <Separator className="w-full dark:bg-gray-500 mb-6 mt-2" />
      <h1 className="mb-2 dark:text-gray-100">
        Click the button below to request password change
      </h1>
      <Button onClick={generateResetPasswordLink} className="group">
        {ticket ? "Generate new password reset link" : "Generate password reset link"}
        <RefreshCcw className={clsx("ml-2", generate.status==="pending" && "animate-spin")} />
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