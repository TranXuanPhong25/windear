import {Card, CardContent} from "@/components/ui/card.tsx";
import {MapPin} from "lucide-react";
interface LocationCardProps {
    title: string
    address: string
}

export default function LocationCard({ title, address }: LocationCardProps) {
    return (
        <Card className="w-full max-w-md border-0 shadow-none">
            <CardContent className="flex items-start gap-3 p-3">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                    <MapPin className="h-8 w-8" style={{
                        color: '#EA4335',
                        filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))'
                    }} />
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="font-medium leading-none">{title}</h3>
                    <p className="text-sm text-muted-foreground">{address}</p>
                </div>
            </CardContent>
        </Card>
    )
}

