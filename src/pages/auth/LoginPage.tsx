import { useState, useEffect } from 'react'
import {  Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/services/auth/supabaseAuth'
export default function LoginPage() {
   const [session, setSession] = useState<Session | null>(null)

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