import { Separator } from "../ui/separator";
import ChangePasswordForm from '../layout/user/settings/ChangePasswordForm';

function PasswordChange() {
   return (
      <section id="user-profile ">
         <h1 className="text-3xl">Change password</h1>
         <Separator className="w-full  dark:bg-gray-500 mb-6 mt-2" />
         <ChangePasswordForm/>
      </section>
   );
}

export default PasswordChange;
