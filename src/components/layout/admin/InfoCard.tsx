import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

function InfoCard({
   title,
   value,
   icon: Icon,
   className,
}:{
   title: string,
   value: string,
   icon: LucideIcon,
   className: string
}) {
   return (
      <Card className={"rounded-2xl "+ className}>
         <CardHeader >
            <div className="flex justify-between items-center" >
               <CardTitle className="text-5xl" >
                  {value}
               </CardTitle>
               <Icon className="size-10"/>
            </div>
         </CardHeader>
         <CardContent>
            {title}
         </CardContent>

      </Card>
   )
}

export default InfoCard;