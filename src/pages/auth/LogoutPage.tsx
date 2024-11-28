import { useAuth0 } from "@auth0/auth0-react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function LogoutPage() {
   const { logout } = useAuth0();
    useEffect(() => {
        document.title = "Logging out";
    }, []);
   useEffect(() => {
      logout();
   }, [logout]);

   return <div className="w-full h-screen flex flex-col justify-center items-center">
      
         <Loader2 size="64" className="animate-spin"/>
         <div className="text-2xl font-semibold">Logging out...</div>
     
   </div>;
}
