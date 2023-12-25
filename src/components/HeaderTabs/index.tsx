import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface LinkItem {
  label: string;
  icon?: React.ReactElement;
  content?: ReactNode; // New property for tab content
}

interface TabProps {
  heading?: string;
  links: LinkItem[];
}

export default function HeaderTabs({ heading, links }: TabProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight={600}
            fontSize={28}
            sx={{ color: "#000" }}
          >
            {heading}
          </Typography>

          <Tabs
            TabIndicatorProps={{ style: { display: "none" } }}
            value={value}
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
                  border:
                    value === index ? "1px solid #AAF0C4" : "1px solid #D0D5DD",
                  borderRadius: "6px",
                  minHeight: "44px",
                  background: value === index ? "#EDFCF2" : "#F0F2F5",
                }}
                key={index}
                label={tab.label}
                icon={tab.icon}
                value={tab.content}
                iconPosition="start"
                onClick={() => setValue(index)} // Set the value when the tab is clicked
              />
            ))}
          </Tabs>

          {/* Display the content of the selected tab */}
          <Box sx={{ marginTop: 2 }}>{links[value].content}</Box>
        </Box>
      </Box>
    </Box>
  );
}
