import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default function LoginPage() {
   const [session, setSession] = useState(null)

   useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session)
      })

      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
         setSession(session)
      })

      return () => subscription.unsubscribe()
   }, [])

   if (!session) {
      return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
   }
   else {
      return (
      <div>
         Logged in!
         <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>)
   }
}