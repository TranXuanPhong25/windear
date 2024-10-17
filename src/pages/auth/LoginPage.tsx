import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/services/auth/supabaseAuth'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export default function LoginPage() {
 
      const { loginWithRedirect ,logout} = useAuth0();
     
    
    
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
      return (
         <div className='w-[300px] mx-auto'>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
     <button onClick={() => loginWithRedirect()}>Log In</button>;
     <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
         </div>
         
      )
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