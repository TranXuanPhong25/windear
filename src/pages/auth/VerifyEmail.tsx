// src/pages/auth/VerifyEmail.tsx
import { Button } from "@/components/ui/button";
import { useSendVerificationEmail } from "@/hooks/useSendVerificationEmail";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import GoBackButton from "@/components/notfound/GoBackButton";
const VerifyEmail = () => {
   const { user } = useAuth0();
   const { mutate: sendVerificationEmail ,isPending} = useSendVerificationEmail(user?.id);
   return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 dark:text-white">
         <h1 className="text-5xl font-bold mb-4">Email Verification Required</h1>
         <p className="mb-4">Please verify your email address to access this page.</p>
         <p className="mb-4">A verification email has been sent to: {user?.email}</p>
         <p>If you did not receive the email, please check your spam folder or <Button className="!text-blue-500 px-0 !bg-transparent hover:underline" onClick={()=>sendVerificationEmail()}>{!isPending?"click here":<Loader className="animate-spin"/>}</Button> to resend.</p>
         <GoBackButton buttonText="Go back" buttonOnClick={() => window.history.back()} icon={ArrowLeft}/>

      </div>
   );
};

export default VerifyEmail;