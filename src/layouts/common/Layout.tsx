import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";


export default function Layout() {
   return (
      <>
         <NavigationBar />
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
         </div>
      </>
   );
}

