import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Report from "./Report";
import Activity from "./Activity";
import { axiosInstance } from "../../../Utils";
import { useSelector } from "react-redux";

export default function Monitor() {
  const user = useSelector((state: any) => state.user.user);

  const [currentTab, setCurrentTab] = useState("Report");

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const [chartId, setChartId] = useState([]);

  const [chartData, setChartData] = useState<any[]>([]);

  const handleChange = (_event: any, newValue: string) => {
    setCurrentTab(newValue);
  };

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

  const tabs = [
    { label: "Report", content: <Report chartData={chartData} /> },
    {
      label: "Activity Log",
      content: <Activity data={data} isLoading={isLoading} />,
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

  return (
    <Box sx={{ background: "white" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: "1px #E7E9FB solid",
          px: "20px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={600}
          fontSize={28}
          sx={{
            color: "#000",
            textTransform: "capitalize",
            pt: "20px",
          }}
        >
          Monitoring
        </Typography>
      </Box>

      <Tabs
        TabIndicatorProps={{ style: { display: "none" } }}
        variant="scrollable"
        scrollButtons={false}
        textColor="inherit"
        value={currentTab}
        onChange={handleChange}
      >
        {filteredTabs.map((tab) => (
          <Tab
            sx={{
              textTransform: "capitalize",
              color: currentTab === tab.label ? "#087443" : "#344054",
              borderBottom:
                currentTab === tab.label
                  ? "2px solid #087443"
                  : "0px solid #099250",
              fontWeight: currentTab === tab.label ? 600 : 400,
            }}
            key={tab.label}
            value={tab.content}
            label={tab.label}
            onClick={() => setCurrentTab(tab.label)}
          />
        ))}
      </Tabs>

      {/* Display the content of the selected tab */}
      <Box sx={{ p: "20px", pb: 12, background: "#F9F9FB" }}>
        {filteredTabs.find((tab) => tab.label === currentTab)?.content}
      </Box>
    </Box>
  );
}
