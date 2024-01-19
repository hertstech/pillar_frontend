import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { Loader } from "../NoResult";

interface LinkItem {
  label: string;
  icon?: React.ReactElement;
  content?: ReactNode;
}

interface TabProps {
  heading?: string;
  links: LinkItem[];
  isLoaded?: boolean;
}

export default function HeaderTabs({ heading, links, isLoaded }: TabProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            // gutterBottom
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
                  color: value === index ? "#099250" : "#667185",
                  borderBottom:
                    value === index ? "2px solid #099250" : "0px solid #099250",
                  fontWeight: value === index ? 500 : 400,
                  minHeight: "44px",
                  fontFamily: "fontNormal",
                }}
                key={index}
                label={tab.label}
                icon={tab.icon}
                value={tab.content}
                iconPosition="start"
                onClick={() => setValue(index)}
              />
            ))}
          </Tabs>

          {/* Display the content of the selected tab */}
          <Box sx={{ marginTop: 2, px: "20px", mb: 12 }}>
            {isLoaded ? <Loader /> : links[value].content}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
