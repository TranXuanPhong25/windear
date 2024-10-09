import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

export function AuthStatus() {
   const auth = useAuth();
   const navigate = useNavigate();

   if (!auth.isAuthenticated) {
      return <p>You are not logged in.</p>;
   }

   return (
      <p>
         Welcome {auth.isAuthenticated}!{" "}
         <button
            onClick={() => {
               auth.signout(() => navigate("/"));
            }}
         >
            Sign out
         </button>
      </p>
   );
}