import { Separator } from "../ui/separator";
import ChangePasswordForm from './settings/ChangePasswordForm';

function PasswordChange() {
   return (
      <section id="change-password" className="pt-20 -mt-20">
         <h1 className="text-3xl">Change password</h1>
         <Separator className="w-full  dark:bg-gray-500 mb-6 mt-2" />
         <ChangePasswordForm/>
      </section>
   );
}

export default PasswordChange;
