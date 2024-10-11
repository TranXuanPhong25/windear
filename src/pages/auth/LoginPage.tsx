import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/services/auth/supabaseAuth'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
   const [session, setSession] = useState<Session | null>(null)
   const navigate = useNavigate();
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
            <button onClick={() => {
               supabase.auth.signOut();
               navigate('/')
            }}>
               Sign out
            </button>
         </div>)
   }
}