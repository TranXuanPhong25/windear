import { Outlet } from "react-router-dom";
import { AuthStatus } from "@/components/auth/AuthStatus";
import NavigationBar from "./NavigationBar";


export default function Layout() {
   return (
      <>
         <NavigationBar />
         <Outlet />
         <AuthStatus />
      </>
   );
}

