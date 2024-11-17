import { PropsWithChildren } from "react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

export function AppProviders({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENTID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`
        }}
        onRedirectCallback={onRedirectCallback}

      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Auth0Provider>
  );
}