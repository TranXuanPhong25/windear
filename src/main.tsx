import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { AppProviders } from "./provider/AppProvider";

import Toaster from "./components/ui/toaster";


const root = document.getElementById("root")
root?.classList.add(localStorage.getItem("theme") || "light")
createRoot(root!).render(
	<StrictMode>
		<BrowserRouter>

			<AppProviders>
				<App />
				<Toaster />
			</AppProviders>
			<SpeedInsights />
		</BrowserRouter>

	</StrictMode>
);
