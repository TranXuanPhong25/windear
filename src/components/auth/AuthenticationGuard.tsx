import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

export default function AuthenticationGuard({ component }: { component: ComponentType }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        redirecr?
      </div>
    ),
  });

  return <Component />;
};