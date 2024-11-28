import { Loader } from "lucide-react";
import {useEffect} from "react";

function AuthenticationRedirecting() {
    useEffect(() => {
        document.title = "Authenticating";
    }, []);
   return (
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
         <div className="flex flex-col items-center">
            <Loader className="text-base font-semibold text-indigo-600 animate-spin size-20"></Loader>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Authenticating</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Hang on while we detect who you are</p>
         </div>
      </main>
   )
}

export default AuthenticationRedirecting;