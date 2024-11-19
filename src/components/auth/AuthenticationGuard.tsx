import AuthenticationRedirecting from "@/pages/auth/AuthenticationRedirecting";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

export default function AuthenticationGuard({ component }: { component: ComponentType }) {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <AuthenticationRedirecting />;
  }

  if (user && !user.email_verified) {
    return <Navigate to="/verify-email" />;
  }
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
        <AuthenticationRedirecting />
    ),
  });

  return <Component />;
};