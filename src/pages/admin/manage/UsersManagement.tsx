import InfoCard from "@/components/layout/admin/InfoCard";
import UsersTable from '../../../components/admin/Management/UserTables';
import { useGetUsers } from "@/hooks/useGetUsers";
import { replaceUnderscores } from "@/lib/utils";
import LoadingBlock from "@/components/layout/LoadingBlock";
import { User } from "@/types/User";
import { UsersIcon } from "lucide-react";

const preProcessData = (data: User[]) => {
    return data.map(replaceUnderscores);
}
function UsersManagement() {
    const { isLoading, data, error } = useGetUsers();
    const processedData = data ? preProcessData(data.users) as User[] : [];
    const {total:totalCount} = data || {start:0,limit:0,length:0,totalCount:0};
    return (
        <div>
            <div className="flex flex-wrap gap-6 mb-6">
                <InfoCard title="Active users that logged in during the last 30 days." className="!bg-green-500  text-white  " value={totalCount} icon={UsersIcon}/>
    
            </div>
            <div className="w-full p-6 dark:bg-slate-600 bg-white rounded-2xl shadow-md">
                <h1 className="text-3xl font-bold">
                    Users Information
                </h1>

                {
                    isLoading && !data ? <LoadingBlock className="!bg-transparent h-[40vh]" /> : (
                        error ? <div>Error: {error.message}</div> : <UsersTable data={processedData} />
                    )
                }
            </div>
        </div>
    )
}

export default UsersManagement;