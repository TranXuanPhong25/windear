import {useEffect} from "react";

function AnalyticDashboard() {
  useEffect(() => {
    document.title = "Analytic Dashboard | Admin";
  }, []);
  return <div>AnalysticDashboard</div>;
}

export default AnalyticDashboard;