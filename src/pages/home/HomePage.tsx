import BookList from "@/components/home/BookList";
import NewsBanner from "@/components/home/NewsBanner";
import { useAuth0 } from "@auth0/auth0-react";
import { getProtectedResource, getPublicResource, getAdminResource } from "@/services/services/message.service";

export default function HomePage() {
   const auth = useAuth0();
   return (
      <main className=" max-w-[1200px] mx-auto">
         <h1 className="text-5xl text-white my-10  ">Welcome to Windear library</h1>
         <NewsBanner />
         {
            auth.user &&
            <BookList title="Recommendations" brief />
         }
         <BookList title="Popular" brief />
         <BookList title="New books" brief />
         <div className="text-white space-x-3">
            <button onClick={async () => console.log((await auth.getIdTokenClaims()))}>getAuth0user</button>
            <button onClick={async () => console.log(await getProtectedResource(await auth.getAccessTokenSilently()))}>getProtectedResource</button>
            <button onClick={async () => console.log((await getAdminResource(await auth.getAccessTokenSilently())).data)}>getAdminResource</button>
            <button onClick={async () => console.log(await getPublicResource())}>getPublicResource</button>
         </div>
      </main>
   )
}