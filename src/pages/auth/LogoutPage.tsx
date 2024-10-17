import { supabase } from "@/services/auth/supabaseAuth";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
export default function LogoutPage(){
   const navigate = useNavigate();
   const { logout } = useAuth0();
   setTimeout(async () => {
      await supabase.auth.signOut();
      await logout();
      navigate('/');
   }, 1000);
   return (
      <div className="text-white">
         logging out
      </div>
      // <Navigate to="/" replace={true} />
   );
}