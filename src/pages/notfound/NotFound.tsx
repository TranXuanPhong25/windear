import GoBackButton from "@/components/notfound/GoBackButton";
import { ArrowLeft } from "lucide-react";
import "@/assets/NotFoundPage.css";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-800">
      <div className="text-center">
        <p className="text-9xl font-semibold text-purple-600 dark:text-purple-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-100/90">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="flex items-center justify-center ">
          <GoBackButton buttonText="Go back" buttonOnClick={() => window.history.back()} icon={ArrowLeft}/>
        </div>
        
      </div>
    </main>
  )
}
