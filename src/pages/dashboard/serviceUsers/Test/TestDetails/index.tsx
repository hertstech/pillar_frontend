import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Tabs from "../../Health/Components/tab";
import { FaDownload } from "react-icons/fa6";
import PopperOver from "../../../../../components/Popover";
import { Results } from "./Results";
import { Summary } from "./Summary";
import { LogEntry } from "../../Health/ActivityLog";
import { PastTests } from "../Components/PastTestModal";

interface IProps {
  data: any;
  id: string | undefined;
  disableDrawer: boolean;
  refreshData?: () => void;
  handleCloseDrawer: () => void;
}

export const TestDetails: React.FC<IProps> = ({
  id,
  data: item,
  handleCloseDrawer,
}) => {
  const [openPastTest, setOpenPastTest] = useState(false);
  console.log(item);
  const actions = [
    { label: "Edit test", onClick: () => null },
    { label: "Archive test", onClick: () => null },
    { label: "Duplicate test", onClick: () => null },
    { label: "View past result", onClick: () => setOpenPastTest(true) },
    { label: "Delete", onClick: () => null, isDanger: true },
  ];

  return (
    <>
      <Box
        sx={{
          width: "630px",
          paddingX: "24px",
          paddingTop: "75px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Box className="flex flex-col gap-6 ">
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Box className="flex items-center justify-between">
              <Box
                className="flex gap-2 cursor-pointer text-neu-600"
                onClick={handleCloseDrawer}
              >
                <IoArrowBackCircleOutline size={22} />
                <Box sx={{ fontSize: "14px", fontWeight: 400 }}>Test</Box>
              </Box>
            </Box>

            <Box className="flex justify-between items-center w-full">
              <Box className="flex items-center gap-2">
                <p className="text-neu-700 font-[600] text-[1.125rem] capitalize">
                  Test #{id}
                </p>
              </Box>
              <Box className="flex gap-5">
                <button className="flex mt-1 gap-2 text-sm font-[600] text-pri-650">
                  <FaDownload /> <span className="">Download</span>
                </button>
                <PopperOver
                  clipping={true}
                  position="bottom-end"
                  popperContent={
                    <Box className="bg-white max-w-[170px] min-h-[112px] rounded-lg border-t !z-10">
                      {actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={action.onClick}
                          className={`p-3 w-full text font-medium text-sm text-left ${
                            action.isDanger ? "text-err" : ""
                          } ${index < actions.length - 1 ? "border-b" : ""}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Stack>
          <Tabs
            tabs={[
              {
                label: "Results",
                content: <Results />,
              },
              {
                label: "Details",
                content: <Summary />,
              },
              {
                label: "Activity",
                content: (
                  <LogEntry
                    date="5th Nov., 2023 • 5:30 AM"
                    title="Edited test result"
                    author="Aminat Rukaiya Okeke"
                  />
                ),
              },
            ]}
          />
        </Box>
        <PastTests setOpen={setOpenPastTest} open={openPastTest} testId={id} />
      </Box>
    </>
  );
};
