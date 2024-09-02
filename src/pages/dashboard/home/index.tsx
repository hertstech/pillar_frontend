import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Page from "../../../components/PageWrapper";
import { useChartData, useMonitoringData } from "../../../hooks/monitoring";
import Report from "../monitor/Report";
import Activity from "../monitor/Activity";
import HeaderTabs from "../../../components/HeaderTabs";
import { useSelector } from "react-redux";
import Analytics from "./Analytics";

export default function Home() {
  const user = useSelector((state: any) => state.user.user);

  const { isLoading, data, chartId, getMonitoring } = useMonitoringData();
  const chartData = useChartData(chartId);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Pinned reports",
      content: <Analytics />,
    },
    {
      label: "Report",
      content: (
        <Report
          chartId={chartId}
          triggerRefresh={getMonitoring}
          chartData={chartData}
          setActiveTab={setActiveTab}
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

  useEffect(() => {
    console.log(typeof chartData);
  }, [chartData]);

  return (
    <Page title={`Welcome back ${user.firstName}`}>
      <Box padding={2}>
        <HeaderTabs
          links={filteredTabs}
          isLoaded={isLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Box>
    </Page>
  );
}
