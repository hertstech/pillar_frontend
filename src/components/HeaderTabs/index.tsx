import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SpinLoader } from "../NoResult";
interface LinkItem {
  label: string;
  icon?: React.ReactElement;
  content?: ReactNode;
}

interface TabProps {
  heading?: string;
  links: LinkItem[];
  isLoaded?: boolean;
  activeTab?: number;
  setActiveTab?: (index: number) => void;
}

export default function HeaderTabs({
  heading,
  links,
  isLoaded,
  activeTab,
  setActiveTab,
}: TabProps) {
  const [value, setValue] = React.useState(0);
  const { search } = useLocation();
  const tabID = new URLSearchParams(search).get("tabID");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setActiveTab?.(newValue);
  };

  useEffect(() => {
    setValue(tabID ? parseInt(tabID, 10) : 0);
  }, [tabID]);

  return (
    <Box sx={{ mb: 3 }}>
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            fontWeight={600}
            fontSize={28}
            sx={{ color: "#000" }}
          >
            {heading}
          </Typography>

          <Tabs
            TabIndicatorProps={{ style: { display: "none" } }}
            value={activeTab !== undefined ? activeTab : value}
            variant="scrollable"
            scrollButtons={false}
            onChange={handleChange}
            textColor="inherit"
          >
            {links.map((tab, index) => (
              <Tab
                sx={{
                  textTransform: "capitalize",
                  color: value === index ? "#087443" : "#344054",
                  borderBottom:
                    value === index ? "2px solid #087443" : "0px solid #099250",
                  fontWeight: value === index ? 600 : 400,
                  fontFamily: "fontBold",
                }}
                key={index}
                label={tab.label}
                icon={tab.icon}
                value={tab.content}
                iconPosition="start"
                onClick={() => {
                  setActiveTab?.(index);
                  setValue(index);
                }}
              />
            ))}
          </Tabs>

          <Box
            sx={{
              p: "20px",
              pb: 12,
              background: "#F9F9FB",
              height: "calc(100vh - 100px)",
            }}
          >
            {isLoaded ? <SpinLoader /> : links[activeTab ?? value].content}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
