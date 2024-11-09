import ProfileInput from "../layout/user/settings/ProfileInput";
import { Separator } from "../ui/separator";

function ProfileSettings() {
   return (
      <section id="user-profile ">
         <h1 className="text-3xl">Profile Settings</h1>
         <Separator className="w-full  dark:bg-gray-500 mb-6 mt-2" />
         <div className="flex">

            <div className="w-full mr-12 ">
               <ProfileInput />
            </div>
            <div className="w-48 mr-24 ">
               <h1>Profile picture</h1>
               <div className="overflow-hidden rounded-full size-48 mt-2">
                  <img src="https://via.placeholder.com/150" alt="profile"
                     className="w-full" />
               </div>
            </div>
         </div>
      </section>
   );
}

export default ProfileSettings;