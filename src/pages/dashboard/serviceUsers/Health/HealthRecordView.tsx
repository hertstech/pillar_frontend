import React from "react";
import { Box, Stack } from "@mui/material";
import moment from "moment";
import classNames from "classnames";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Tabs from "./Components/tab";
import { RecordDetails } from "./RecordDetails";
import { ClinicalNoteComp } from "./ClinicalNotes";
import { RecordActivityLog } from "./ActivityLog";
import { UpdateHealthRec } from "./UpdateHealthRec";
import { useRecoilState } from "recoil";
import { drawerState } from "../../../../atoms/drawerState";
import { getStatusColor } from "../../../../Utils/getStatusColor";

interface IProps {
  data: any;
  id: string | undefined;
  disableDrawer: boolean;
  refreshData?: () => void;
  handleCloseDrawer: () => void;
}

export const HealthRecordOverview: React.FC<IProps> = ({
  id,
  data: item,
  handleCloseDrawer,
}) => {
  const [_, setOpen] = useRecoilState(drawerState);
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
                <Box sx={{ fontSize: "14px", fontWeight: 400 }}>
                  {"Health Information"}
                </Box>
              </Box>

              <UpdateHealthRec
                id={item.id as string}
                disableDrawer={item.treatmentStatus === "completed"}
                getData={() => setOpen(true)}
                sickness={
                  item?.secondaryDiagnosis
                    ? item?.secondaryDiagnosis
                    : item?.primaryDiagnosis
                }
                notes={item?.notes}
                severity={item?.severity}
                treatmentType={item?.treatmentType}
                followUpPlans={item?.followUpPlans}
                treatmentStatus={item?.treatmentStatus}
              />
            </Box>

            <Box className="flex justify-between items-center w-full">
              <Box className="flex items-center gap-2">
                <p className="text-neu-700 font-[600] text-[1.125rem] capitalize">
                  {item?.primaryDiagnosis ||
                    item?.secondaryDiagnosis ||
                    item.genotype ||
                    "Sickness clicked here"}
                </p>{" "}
                <p
                  className={classNames(
                    "font-[600] text-[.75rem] py-1 px-3 rounded-[600px] capitalize",
                    getStatusColor(item, true)
                  )}
                >
                  {(item.treatmentStatus === "on_hold" && "On Hold") ||
                    item?.treatmentStatus}
                </p>
              </Box>
              <p className="text-[.875rem] font-[700]">
                {moment(item.date_created).format("Do MMM, YYYY") || ""}
              </p>
            </Box>
            
          </Stack>
          <Tabs
            tabs={[
              {
                label: "Details",
                content: <RecordDetails item={item} />,
              },
              {
                label: "Clinical Notes",
                content: <ClinicalNoteComp item={item} />,
              },
              {
                label: "Activity",
                content: <RecordActivityLog id={id as string} />,
              },
            ]}
          />
        </Box>
      </Box>
    </>
  );
};
