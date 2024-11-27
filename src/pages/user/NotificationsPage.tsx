import NotificationCard from '@/components/user/NotificationCard'
import { Notification } from '@/models/Notification.ts'
import {useGetNotifications} from "@/hooks/user/useGetNotifications.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";

function NotificationsPage(){
    const {data:notifications,isLoading} = useGetNotifications();
    return (
        <div className="container mx-auto px-4 py-8 min-h-[70vh]">
            <header className="flex justify-between items-center mb-6 max-w-3xl mx-auto" >
                <h1 className="text-2xl font-bold">Notifications</h1>
                <div className="flex items-center space-x-4">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        2 unread
                    </div>
                </div>
            </header>
            {
                isLoading ? <LoadingBlock className="!bg-transparent h-[40vh]"/> :
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {notifications.map((notification:Notification) => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                                onRemove={() => {
                                }}
                            />
                        ))}
                    </div>

            }
        </div>
    )
}

export default NotificationsPage;