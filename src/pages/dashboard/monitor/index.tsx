import { useEffect, useState } from "react";
import Report from "./Report";
import Activity from "./Activity";
import { axiosInstance } from "../../../Utils";
import { useSelector } from "react-redux";
import Analytics from "./Analytics";
import HeaderTabs from "../../../components/HeaderTabs";
import Page from "../../../components/PageWrapper";

export default function Monitor() {
  const user = useSelector((state: any) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const [chartId, setChartId] = useState([]);

  const [chartData, setChartData] = useState<any[]>([]);

  const getMonitoring = async () => {
    setIsLoading(true);
    try {
      const [res, resp] = await Promise.all([
        axiosInstance.get("/hcp/tenet/activity"),
        axiosInstance.get(`/hcp/monitoring/charts/`),
      ]);

      setData(res.data);

      setChartId(resp.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMonitoring();
  }, []);

  useEffect(() => {
    const getAllChart = async () => {
      try {
        const fetchDataPromise = chartId.map(async (item: { id: string }) => {
          try {
            const res = await axiosInstance.get(
              `/hcp/monitoring/get/charts/${item.id}`
            );
            return res.data;
          } catch (error) {
            console.error(`Error fetching chart with ID ${item.id}:`, error);
            return null;
          }
        });

        const allData = await Promise.all(fetchDataPromise);
        setChartData(allData);
      } catch (error) {
        console.error("Error fetching charts:", error);
      }
    };

    getAllChart();
  }, [chartId]);

  const tabs = [
    {
      label: "Analytics",
      content: <Analytics chartId={chartId} chartData={chartData} />,
    },
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
