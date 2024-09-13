import React from "react";
import { Box, Stack } from "@mui/material";
import moment from "moment";
import classNames from "classnames";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Tabs from "./Components/tab";
import { RecordDetails } from "./Components/recordDetails";

interface IProps {
  data: any;
  id: string | undefined;
  disableDrawer: boolean;
  refreshData?: () => void;
  handleCloseDrawer: () => void;
}

export const HealthRecordOverview: React.FC<IProps> = ({
  data: item,
  handleCloseDrawer,
}) => {
  console.log("health record here;", item);

  // useEffect(() => {
  //   const getStatusHistory = async () => {
  //     try {
  //       const res = await axiosInstance.get(
  //         `/serviceuser-record/status/history/${id}`
  //       );
  //       console.log("record history:", res.data);
  //     } catch (err) {
  //       console.error("Error getting record:", err);
  //     }
  //   };

  //   if (id !== null || undefined) {
  //     getStatusHistory();
  //   }
  // }, [id]);

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
        <Box className="flex flex-col gap-6">
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Box
              className="flex gap-4 cursor-pointer text-neu-600"
              onClick={handleCloseDrawer}
            >
              <IoArrowBackCircleOutline size={22} />
              <Box sx={{ fontSize: "14px", fontWeight: 400 }}>
                {"Health Information"}
              </Box>
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
                    item.treatmentStatus?.toLowerCase() === "pending"
                      ? "text-[#475367] "
                      : item.treatmentStatus?.toLowerCase() === "active"
                      ? "text-[#099137]"
                      : item.treatmentStatus?.toLowerCase() === "on_hold"
                      ? "text-[#DD900D] bg-warn-100"
                      : item.treatmentStatus?.toLowerCase() === "completed"
                      ? "text-[#1570EF]"
                      : item.treatmentStatus?.toLowerCase() === "cancelled"
                      ? "text-[#CB1A14]"
                      : ""
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
                content: <div>Clinical notes here</div>,
              },
              {
                label: "Activity",
                content: <div>Logs here</div>,
              },
            ]}
          />
        </Box>
      </Box>
    </>
  );
};