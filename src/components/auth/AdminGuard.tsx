import { withAuthenticationRequired, useAuth0, User } from "@auth0/auth0-react";
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
const WithClaimCheck = (Component: ComponentType, myClaimCheckFunction: (user?: User) => boolean, returnTo: string) => {
   const { user } = useAuth0();
   if (myClaimCheckFunction(user)) {
      return <Component />
   }
   return <Navigate to={returnTo} />;
}

const checkClaims = (claim?: User) => claim?.['https://windear.vercel.app/roles']?.includes('admin');

// Usage
const AdminGuard = ({ component }: { component: ComponentType }) => {
   const Component = withAuthenticationRequired(
      () => WithClaimCheck(component, checkClaims, ".."),
      {
         onRedirecting: () => (
            <div className="page-layout">
               redirect?
            </div>
         ),
      }
   );
   return <Component />;
}
export default AdminGuard;
