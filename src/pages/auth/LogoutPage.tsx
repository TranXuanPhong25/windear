import { supabase } from "@/services/auth/supabaseAuth";
import { useNavigate } from "react-router-dom";
export default function LogoutPage(){
   const navigate = useNavigate();
   setTimeout(async () => {
      await supabase.auth.signOut();
      navigate('/');
   }, 1000);
   return (
      <div className="text-white">
         logging out
      </div>
      // <Navigate to="/" replace={true} />
   );
}