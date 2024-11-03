import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/layout/user/navbar/NavigationBar";
import Footer from "@/components/layout/user/footer/Footer";


export default function Layout() {
   return (
      <>
         <NavigationBar />
         <Outlet />
         <Footer />
      </>
   );
}

