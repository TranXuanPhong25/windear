import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/layout/user/navbar/NavigationBar";
import Footer from "@/components/layout/user/footer/Footer";


export default function CommonLayout() {
   return (
      <>
         <div className="h-6"/>
         <NavigationBar />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-4 mt-14 ">
            <Outlet />
         </div>
         <Footer />
      </>
   );
}

