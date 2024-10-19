import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Auth0Provider
				domain={import.meta.env.VITE_AUTH0_DOMAIN}
				clientId={import.meta.env.VITE_AUTH0_CLIENTID}
				authorizationParams={{
					redirect_uri: window.location.origin,
					audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
				}}
			>
				<App />
			</Auth0Provider>,
		</BrowserRouter>
		<SpeedInsights />
	</StrictMode>
);
