import InfoCard from "@/components/layout/admin/InfoCard";
import UsersTable from '@/components/admin/management/user/UsersTable';
import { useGetUsers } from "@/hooks/admin/useGetUsers";
import { replaceUnderscores } from "@/lib/utils";
import LoadingBlock from "@/components/layout/LoadingBlock";
import { User } from "@/models/User";
import { UsersIcon } from "lucide-react";
import { useGetActiveUsers } from "@/hooks/admin/useGetActiveUsers";

const preProcessData = (data: User[]) => {
    return data.map(replaceUnderscores);
}
function UsersManagement() {
    const { isLoading: isGettingActiveUser, data: activeUserResponse, error: errorGetActiveUser } = useGetActiveUsers();
    const { data: users, error: errorGetUsers, isPending: isGettingUsers } = useGetUsers();
    const activeUser = isGettingActiveUser || errorGetActiveUser ? "..." : activeUserResponse;
    const processedData = users ? preProcessData(users.users) as User[] : [];
    // const {total:totalCount} = users || {start:0,limit:0,length:0,totalCount:0};
    return (
        <div>
            <div className="flex flex-wrap gap-6 mb-6">
                <InfoCard title="Active users that logged in during the last 30 days." className="!bg-green-500  text-white  " value={activeUser} icon={UsersIcon} />

            </div>
            <div className="w-full p-6 dark:bg-slate-600 bg-white rounded-2xl shadow-md">
                <h1 className="text-3xl font-bold">
                    Users Information
                </h1>

                {
                    isGettingUsers && !users ? <LoadingBlock className="!bg-transparent h-[40vh]" /> : (
                        errorGetUsers ? <div>Error: {errorGetUsers.message}</div> : <UsersTable data={processedData} />
                    )
                }
            </div>
        </div>
    )
}

export default UsersManagement;