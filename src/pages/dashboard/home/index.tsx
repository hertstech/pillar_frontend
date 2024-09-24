import { Box } from "@mui/material";
import { useEffect } from "react";
import Page from "../../../components/PageWrapper";
import { useChartData, useMonitoringData } from "../../../hooks/monitoring";
import { useSelector } from "react-redux";
import Analytics from "./Analytics";
import { PinnedActivityLogs } from "./ActivityLogs";

export default function Home() {
  const user = useSelector((state: any) => state.user.user);

  const { chartId } = useMonitoringData();
  const chartData = useChartData(chartId);

  useEffect(() => {
    console.log(typeof chartData);
  }, [chartData]);

  return (
    <Page title={`Welcome back ${user.firstName}`}>
      <Box padding={2} className="grid grid-cols-5 gap-6">
        <Box className="col-span-4">
          <Analytics />
        </Box>
        <Box className="col-span-1">
          
          <PinnedActivityLogs />
        </Box>
      </Box>
    </Page>
  );
}
