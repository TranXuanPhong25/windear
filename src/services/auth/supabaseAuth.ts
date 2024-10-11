import { createClient } from "@supabase/supabase-js";

/**
 * This represents some generic auth provider API, like Firebase.
*/
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export { supabase  };
