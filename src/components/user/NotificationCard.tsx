import { useState } from 'react'
import { Notification } from '@/models/Notification'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {Mail,  MailOpen, Trash2} from "lucide-react";

interface NotificationItemProps {
    notification: Notification
    onRemove: (id: string) => void
}

export default function NotificationItem({ notification, onRemove }: NotificationItemProps) {
    const { id, title, timestamp, isRead: initialIsRead } = notification
    const [isRead, setIsRead] = useState(initialIsRead)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleToggleReadStatus = async () => {
        //
        setIsRead(!isRead)
        setIsAnimating(true)

        setTimeout(() => setIsAnimating(false), 1000)
    }

    const handleRemove = async () => {
        setIsDeleting(true)

        //

        onRemove(id)
    }

    return (
        <div className="relative overflow-hidden shadow-md transition-all duration-200 ease-out hover:scale-105 rounded-md group">
            <div
                className={cn(
                    "flex items-start justify-between p-4 bg-blue-50/30",
                    isRead ? "dark:bg-gray-700" : "bg-blue-100 dark:bg-purple-500",
                    // isAnimating && (isRead ? "scale-95" : "scale-105"),
                    isDeleting && "opacity-50"
                )}
            >
                <div className="flex-grow pr-6">
                    <h2 className={cn(
                        "text-lg transition-all duration-300",
                        isRead ? "font-normal" : "font-semibold"
                    )}>
                        {title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {timestamp.toLocaleString()}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "transition-all duration-300 group-hover:-translate-x-10 -translate-x-6 translate-y-[6px]",
                        isRead ? "text-muted-foreground hover:text-foreground" : "text-blue-500 dark:text-white hover:text-blue-700 dark:hover:text-purple-400  ",
                        isAnimating && (isRead ? " scale-150" : " scale-90")
                    )}
                    onClick={handleToggleReadStatus}
                    aria-label={isRead ? "Mark as unread" : "Mark as read"}
                >
                    {isRead ? <MailOpen className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                </Button>
                <Button
                    size="icon"
                    className="absolute inset-y-0 right-0 px-3 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0 h-full !bg-red-500 !text-white z-20"
                    onClick={handleRemove}
                    aria-label="Delete notification"
                >
                    <Trash2 className="h-5 w-5" />
                </Button>
                {
                    !isRead &&<div className="absolute inset-y-0 -right-10 px-6 dark:bg-purple-600 z-10 rotate-45 -bottom-10 bg-blue-200 "/>
                }
            </div>

        </div>
    )
}

