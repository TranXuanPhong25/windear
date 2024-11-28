import {useState} from 'react'
import {Notification} from '@/models/Notification'
import {Button} from "@/components/ui/button"
import {calculateLastLoginTime as calculatePassTime, cn} from "@/lib/utils"
import {Mail, MailOpen, Trash2} from "lucide-react";
import {useToggleReadStatusNotification} from "@/hooks/user/useToggleReadStatusNotification.ts";
import {useDeleteNotification} from "@/hooks/user/useDeleteNotification.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";

const THRESHOLD_FOR_PASSED_TIME = 1000 * 60 * 60 * 24 * 28; //28 days in milliseconds
export default function NotificationItem({notification}: { notification: Notification }) {
    const {user} = useAuth0();
    const {id, title, timestamp, read: initialIsRead} = notification
    const {mutate: toggleReadStatus} = useToggleReadStatusNotification();
    const {mutate: deleteNotification} = useDeleteNotification();
    const queryClient = useQueryClient();
    const [isRead, setIsRead] = useState(initialIsRead)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const sentTime = (new Date().getTime() - new Date(timestamp).getTime()) < THRESHOLD_FOR_PASSED_TIME ? calculatePassTime(timestamp) : new Date(timestamp).toLocaleString()
    const handleToggleReadStatus = async () => {
        toggleReadStatus({
            id,
            isRead: !isRead
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['unread-notifications', user?.sub],
                })
                queryClient.invalidateQueries({
                    queryKey: ['notifications', user?.sub]
                })

                setIsRead(!isRead)
                setIsAnimating(true)
                setTimeout(() => setIsAnimating(false), 1000)
            }
        })
    }

    const handleRemove = async () => {
        setIsDeleting(false);
        deleteNotification({
            id
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['unread-notifications', user?.sub],
                })
                queryClient.invalidateQueries({
                    queryKey: ['notifications', user?.sub]
                })

            }
        })
    }

    return (
        <div
            className="relative overflow-hidden shadow-md transition-all duration-200 ease-out hover:scale-105 rounded-md group">
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
                        "text-sm sm:text-lg transition-all duration-300",
                        isRead ? "font-normal" : "font-semibold"
                    )}>
                        {title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {sentTime}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    className={cn(
                        "transition-all duration-300 group-hover:-translate-x-9 -translate-x-7  my-auto py-6",
                        isRead ? "text-muted-foreground hover:text-foreground" : "text-blue-500 dark:text-white hover:text-blue-700 dark:hover:text-purple-400  ",
                        isAnimating && (isRead ? " scale-150" : " scale-90")
                    )}
                    onClick={handleToggleReadStatus}
                    aria-label={isRead ? "Mark as unread" : "Mark as read"}
                >
                    {isRead ? <MailOpen className="size-6 "/> : <Mail className="h-6 w-6"/>}
                </Button>
                <Button
                    className="absolute inset-y-0 right-0 px-3 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0 h-full !bg-red-500 !text-white z-20"
                    onClick={handleRemove}
                    aria-label="Delete notification"
                >
                    <Trash2 className="h-5 w-5"/>
                </Button>
                {
                    !isRead && <div
                        className="absolute inset-y-0 -right-10 px-6 dark:bg-purple-600 z-10 rotate-45 -bottom-10 bg-blue-200 "/>
                }
            </div>

        </div>
    )
}

