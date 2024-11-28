import {useEffect} from "react";
import {AddBookLineChart} from "@/components/admin/dashboard/analytic/AddBookLineChart.tsx";
import {BorrowingAnalyticsLineChart} from "@/components/admin/dashboard/analytic/BorrowingAnalyticsLineChart.tsx";

function AnalyticDashboard() {
  useEffect(() => {
    document.title = "Analytic Dashboard | Admin";
  }, []);
  return <div className="flex gap-6">
    <AddBookLineChart/>
    <BorrowingAnalyticsLineChart/>
  </div>;
}

export default AnalyticDashboard;