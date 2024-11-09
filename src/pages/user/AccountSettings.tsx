import ProfileSettings from "@/components/user/UserSettings";
import { KeyRound, Trash2, User } from "lucide-react";
import { Link } from "react-router-dom";
const userSettings = [
   {
      name:"Profile",
      to:"#user-profile",
      icon: User
   },
   {
      name:"Change password",
      to:"#change-password",
      icon: KeyRound
   }
]
function AccountSettings() {
   return (
      <main className="flex mx-6 relative">
         <div className="w-72 mr-14 !sticky top-24 h-fit">
            <h1 className="mb-2">
               Settings
            </h1>
            <ul className="space-y-2 font-medium">
               {
                  userSettings.map((setting, index) => (
                     <li key={index}>
                        <Link to={setting.to} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <setting.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                           <span className="ms-3">{setting.name}</span>
                        </Link>
                     </li>
                  ))
               }
               <li>
                  <Link to="#delete-account" className="flex items-center p-2 text-red-500 rounded-lg dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 dark:hover:text-white group">
                     <Trash2 className="w-5 h-5 text-red-500 transition- duration-75 dark:text-red-400 group-hover:text-red-500 dark:group-hover:text-white" />
                     <span className="ms-3">Delete account</span>
                  </Link>
               </li>
            </ul>
         </div>
         <div className="w-full space-y-14">
            
            <ProfileSettings />

         </div>
      </main>
   );
}

export default AccountSettings;