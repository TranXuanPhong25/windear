
import { Outlet } from "react-router-dom";

function UserLayout() {
   return (
      
         <main>
         <div>
            left side bar
         </div>
         <div>
            <Outlet />
         </div>
         </main>
      
   );
}

export default UserLayout;
