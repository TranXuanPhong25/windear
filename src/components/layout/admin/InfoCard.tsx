import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

function InfoCard() {
   return (
      <Card className="w-72 dark:bg-green-500 rounded-2xl">
         <CardHeader >
            <div className="flex justify-between items-center" >
               <CardTitle className="text-5xl" >
                  10
               </CardTitle>

               <Users className="size-10"/>
            </div>


         </CardHeader>
         <CardContent>
            Total active users
         </CardContent>

      </Card>
   )
}

export default InfoCard;