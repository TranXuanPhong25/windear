import LogsTable from "@/components/admin/dashboard/log/LogsTable";
import LoadingBlock from "@/components/layout/LoadingBlock";
import { useGetLogs } from "@/hooks/admin/useGetLogs";
import { replaceUnderscores } from "@/lib/utils";
import { Auth0Log } from "@/types/Auth0Log";

const preProcessData = (data: Auth0Log[]) => {
  return data.map(replaceUnderscores);
}
function LogsDashboard() {
  const { data: logs, isLoading, error } = useGetLogs();
  if (isLoading) return <LoadingBlock className="h-[70vh]" />;
  if (error) return <div>Error: {error.message}</div>;

  const processedData = logs ? preProcessData(logs) as Auth0Log[] : [];
  return (
    <div className="w-full p-6 dark:bg-slate-600 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold">User activity</h1>
      <LogsTable data={processedData} />
    </div>
  )
}

export default LogsDashboard;