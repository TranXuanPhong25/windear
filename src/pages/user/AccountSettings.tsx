import DangerZone from "@/components/user/settings/DangerZone.tsx";
import PasswordChange from "@/components/user/settings/PasswordChange.tsx";
import ProfileSettings from "@/components/user/ProfileSettings";
import { KeyRound, User } from "lucide-react";
import { useEffect } from "react";
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
   useEffect(() => {
      document.title = "Account Settings - Windear"
   }, [])
   return (
      <main className="flex mx-6 relative mb-16">
         <div className="w-72 mr-14 !sticky top-24 h-fit">
            <h1 className="mb-2">
               Settings
            </h1>
            <ul className="space-y-2 font-medium">
               {
                  userSettings.map((setting, index) => (
                     <li key={index}>
                        <a href={setting.to} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <setting.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                           <span className="ms-3">{setting.name}</span>
                        </a>
                     </li>
                  ))
               }
            </ul>
         </div>
         <div className="w-full space-y-14">
            
            <ProfileSettings />
            <PasswordChange/>
            <DangerZone/>
         </div>
      </main>
   );
}

export default AccountSettings;