import AuthenticationRedirecting from "@/pages/auth/AuthenticationRedirecting";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

export default function AuthenticationGuard({ component }: { component: ComponentType }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
        <AuthenticationRedirecting />
    ),
  });

  return <Component />;
};