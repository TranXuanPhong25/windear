import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/layout/user/navbar/NavigationBar";
import Footer from "@/components/layout/user/footer/Footer";


export default function Layout() {
   return (
      <>
         <NavigationBar />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
            <Outlet />
         </div>
         <Footer />
      </>
   );
}

