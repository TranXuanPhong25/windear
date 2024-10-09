import { Outlet } from "react-router-dom";
import { AuthStatus } from "@/components/auth/AuthStatus";
import Header from "./Header";

export default function Layout() {
   return (
      <div>
         <Header />
         <AuthStatus />
         <Outlet />
      </div>
   );
}

