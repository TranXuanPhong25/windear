import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/layout/user/navbar/NavigationBar";
import Footer from "@/components/layout/user/footer/Footer";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher.tsx";


export default function CommonLayout() {
   return (
      <>
         <div className="h-6"/>
         <NavigationBar />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-4 mt-14">
            <Outlet />
         </div>
          <div className="bottom-5 right-5 !fixed dark:bg-gray-700 rounded-full bg-slate-100 shadow-lg md:hidden">
             <div className="relative pl-2 py-2">
                 <ThemeSwitcher/>
             </div>
          </div>
         <Footer />
      </>
   );
}

