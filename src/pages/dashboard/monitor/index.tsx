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

  const handleChange = (_event: any, newValue: string) => {
    setCurrentTab(newValue);
  };

  const tabs = [
    { label: "Report", content: <Report /> },
    {
      label: "Activity Log",
      content: <Activity data={data} isLoading={isLoading} />,
    },
  ];

  // Filter tabs based on user's role
  const filteredTabs = tabs.filter((tab) => {
    if (user.role === "superadmin") {
      return true;
    } else {
      return tab.label !== "Activity Log";
    }
  });

  const getActivity = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/hcp/tenet/activity");

      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getActivity();

    // setInterval(() => {
    //   // getActivity();
    // }, 60000);
  }, []);

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
