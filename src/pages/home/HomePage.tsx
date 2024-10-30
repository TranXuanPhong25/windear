import BookList from "@/components/home/BookList";
import NewsBanner from "@/components/home/NewsBanner";
import { useAuth0 } from "@auth0/auth0-react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { getProtectedResource, getPublicResource, getAdminResource } from "@/services/services/message.service";
const products = [
   {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
   },
   {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/cursor.png",
   },
   {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/rogue.png",
   },

   {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/editorially.png",
   },
   {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/editrix.png",
   },
   {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
   },

   {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
   },
   {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
   },
   {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
   },
   {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
   },
   {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
   },

   {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
   },
   {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
   },
   {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/invoker.png",
   },
   {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail:
         "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
   },
];
export default function HomePage() {
   const auth = useAuth0();
   return (
      <>
      <HeroParallax products={products} />;
      {/* <main className=" max-w-[1200px] mx-auto">
         
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
      </main> */}
      </>
   )
}