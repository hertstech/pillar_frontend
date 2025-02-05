import { Box } from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
  w?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, w }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <Box>
      <Box
        className={classNames(
          "flex bg-neu-75 p-1 rounded-lg w-fit h-8 mb-6",
          w ? w : "w-fit"
        )}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={classNames(
              `bg-transparent -tracking-[.28px] text-[.875rem] text-neu-500 font-[400] capitalize 
              flex justify-center items-center outline-none h-6 py-1 px-4`,
              w ? w : "",
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
