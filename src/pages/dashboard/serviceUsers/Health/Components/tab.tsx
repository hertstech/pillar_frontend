import { Box } from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <Box>
      <Box className="flex bg-neu-75 p-1 rounded-lg w-fit h-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={classNames(
              `h-6 py-1 px-4 bg-transparent text-[.875rem] text-neu-500 font-[500] capitalize 
              flex items-center outline-none`,
              activeTab === index &&
                "bg-white text-neu-900 font-[600] rounded-[4px]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </Box>

      <Box>{tabs[activeTab].content}</Box>
    </Box>
  );
};

export default Tabs;
