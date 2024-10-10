import { createClient } from "@supabase/supabase-js";

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
	isAuthenticated: false,
	role: "user",
	user:"",
	signin(callback: VoidFunction) {
		fakeAuthProvider.isAuthenticated = true;
		setTimeout(callback, 100); // fake async
	},
	signout(callback: VoidFunction) {
		fakeAuthProvider.isAuthenticated = false;
		setTimeout(callback, 100);
	},
};
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export { fakeAuthProvider,supabase };
