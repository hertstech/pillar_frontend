import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import Report from "./Report";
import Activity from "./Activity";

export default function Monitor() {
  const [currentTab, setCurrentTab] = React.useState("Report");

  const handleChange = (_event: any, newValue: string) => {
    setCurrentTab(newValue);
  };

  const tabs = [
    { label: "Report", content: <Report /> },
    { label: "Activity Log", content: <Activity /> },
  ];
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
        {tabs.map((tab) => (
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
        {tabs.find((tab) => tab.label === currentTab)?.content}
      </Box>
    </Box>
  );
}
