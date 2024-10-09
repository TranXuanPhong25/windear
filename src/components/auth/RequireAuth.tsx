import { useAuth } from "../../hooks/auth/useAuth";
import { Navigate, useLocation } from "react-router-dom";
export function RequireAuth({ needAdmin, children }: { needAdmin:boolean, children: JSX.Element }) {
   const auth = useAuth();
   const location = useLocation();

   if (!auth.isAuthenticated) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" replace={true} state={{ from: location }} />;
   }else if(needAdmin&&auth.role!=="admin"){
      return <Navigate to="/" replace={true} state={{ from: location }} />;
   }

   return children;
}