export default function EmailVerified({ isVerified }: { isVerified: boolean | undefined }) {
   if (isVerified === undefined) return null;
   return isVerified ?
      <div className="w-fit px-4 py-[2px]px-2 py-1  border-2 border-green-500 rounded-full text-center">
         Yes
      </div>
      :
      <div className="w-fit px-4 py-[2px] border-2 border-red-500 rounded-full text-center">
         No
      </div>


}