import { useSendVerificationEmail } from "@/hooks/useSendVerificationEmail";

export default function  SendEmailButton({userId,children}:{userId:string,children:React.ReactNode}) {
   const { mutate: sendVerificationEmail } = useSendVerificationEmail(userId);
    return (
        <div onClick={()=>userId&&sendVerificationEmail()}>
            {children} 
        </div>
    )

}