import { useSendVerificationEmail } from "@/hooks/user/useSendVerificationEmail";

export default function  SendEmailButton({userId,children}:{userId:string,children:React.ReactNode}) {
   const { mutate: sendVerificationEmail } = useSendVerificationEmail();
    return (
        <div onClick={()=>userId&&sendVerificationEmail()}>
            {children} 
        </div>
    )

}