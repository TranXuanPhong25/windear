type LogType = {
   [key: string]: string;
}
const logTypes  : LogType= {
   s: 'Sign in Successful',
   ss: 'Sign up Successful',
   slo: 'Sign out Successful',
   
   sdu: 'Success User Deletion',
   sce: 'Change email Successful',
   scu: 'Change username Successful',
   scp: 'Change password Successful',
   scpr: 'Change request password Successful',

   fce: 'Failed change email',
   fcu: 'Failed change username',
   fcp: 'Failed change password',
   fcpr: 'Failed request change password',
}

export const extractLogType = (code: string) => {
   if(code == undefined) return "";
   if (logTypes[code]) {
      return logTypes[code]
   }
   return "";
}