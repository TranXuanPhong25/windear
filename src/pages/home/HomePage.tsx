import BookList from "@/components/home/BookList";
import NewsBanner from "@/components/home/NewsBanner";
import { supabase } from "@/services/auth/supabaseAuth";
export default function HomePage() {
   return (
      <main className=" max-w-[1200px] mx-auto">
         <NewsBanner />
         <BookList title="Recommendations" brief/>
         <BookList title="Popular" brief/>
         <BookList title="New books" brief/>
         <button onClick={async ()=> console.log((await supabase.auth.getUser()).data)}>get</button>
      </main>
   )
}