import { useSelector } from "react-redux";
import Report from "./Report";
import Activity from "./Activity";
import HeaderTabs from "../../../components/HeaderTabs";
import Page from "../../../components/PageWrapper";
import { useChartData, useMonitoringData } from "../../../hooks/monitoring";

export default function Monitor() {
  const user = useSelector((state: any) => state.user.user);

  const { isLoading, data, chartId, getMonitoring } = useMonitoringData();
  const chartData = useChartData(chartId);

  const tabs = [
    {
      label: "Report",
      content: (
        <Report
          chartId={chartId}
          triggerRefresh={getMonitoring}
          chartData={chartData}
        />
      ),
    },
    {
      label: "Activity Log",
      content: <Activity data={data} triggerRefresh={getMonitoring} />,
    },
  ];

  const filteredTabs = tabs.filter((tab) => {
    if (user.role === "superadmin") {
      return true;
    } else {
      return tab.label !== "Activity Log";
    }
  });

  return (
    <Page title="Monitoring">
      <HeaderTabs links={filteredTabs} isLoaded={isLoading} />
    </Page>
  );
}
