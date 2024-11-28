import {useEffect} from "react";
import {AddBookLineChart} from "@/components/admin/dashboard/analytic/AddBookLineChart.tsx";
import {BorrowingAnalyticsLineChart} from "@/components/admin/dashboard/analytic/BorrowingAnalyticsLineChart.tsx";
import {UserLoginAnalyticsAreaChart} from "@/components/admin/dashboard/analytic/UserLoginAnalyticsAreaChart.tsx";

function AnalyticDashboard() {
  useEffect(() => {
    document.title = "Analytic Dashboard | Admin";
  }, []);
  return <div>
    <div className="flex flex-wrap gap-6">
      <AddBookLineChart/>
      <BorrowingAnalyticsLineChart/>
    </div>
    <div className="mt-6">
      <UserLoginAnalyticsAreaChart/>
    </div>
  </div>;
}

export default AnalyticDashboard;