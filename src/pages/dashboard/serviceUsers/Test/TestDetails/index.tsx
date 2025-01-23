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
import {
  useGetSingleTest,
  useUpdateTestStatus,
} from "../../../../../api/HealthServiceUser/test";
import { useNavigate } from "react-router-dom";
import { DeleteAllTestsOrder } from "../AddTest/DeleteAllTest";
import { useAlert } from "../../../../../Utils/useAlert";
import classNames from "classnames";

interface IProps {
  id: string | undefined;
  disableDrawer: boolean;
  refreshData?: () => void;
  handleCloseDrawer: () => void;
}

export const TestDetails: React.FC<IProps> = ({ id, handleCloseDrawer }) => {
  const navigate = useNavigate();

  const [openPastTest, setOpenPastTest] = useState(false);
  const [openDeleteTest, setOpenDeleteTest] = useState<boolean>(false);

  const { data, isLoading } = useGetSingleTest(id as string);
  const { mutate } = useUpdateTestStatus();

  const status = data?.data?.status;

  const handleDuplicate = (Id: string | null) => {
    if (!Id) {
      console.error("Invalid ID for duplication.");
      return;
    }
    navigate("duplicate-test", { state: { id: Id } });
  };

  const handleUpdate = (Id: string | null) => {
    if (!Id) {
      console.error("Invalid ID for update.");
      return;
    }
    navigate("update-test", { state: { id: Id } });
  };

  const handleOpenDelete = (itemId: string | undefined) => {
    if (!itemId) {
      console.error("Invalid ID for deletion.");
      return;
    }
    setOpenDeleteTest(true);
  };

  const handleStatusChange = (testId: string, status?: string) => {
    const statusData = {
      status,
    };

    mutate(
      { testData: statusData, ID: testId },
      {
        onSuccess: () => {
          useAlert({
            isToast: true,
            icon: "success",
            title: `Test ${
              status === "active" ? "archived" : "unarchived"
            } successfully`,
            timer: 4000,
            position: "top-start",
          });
        },
        onError: () => {
          useAlert({
            icon: "error",
            isToast: true,
            title: `Test not ${
              status === "active" ? "archived" : "unarchived"
            }`,
            position: "top-start",
          });
        },
      }
    );
  };

  const handlePopperClick = (orderId: string, action: any) => {
    if (!orderId) {
      console.error("Action skipped due to invalid ID.");
      return;
    }

    switch (action.label) {
      case "Delete":
        handleOpenDelete(orderId);
        break;
      case "Archive test":
        handleStatusChange(orderId, status === "active" ? "archive" : "active");
        break;
      case "Duplicate test":
        handleDuplicate(orderId);
        break;
      case "Update test":
        handleUpdate(orderId);
        break;
      default:
        action.onClick();
    }
  };

  const actions = [
    ...(status === "draft"
      ? [
          {
            label: "Update test",
            onClick: () => handleUpdate(id as string),
          },
          {
            label: "Delete",
            onClick: () => handleOpenDelete(id as string),
            isDanger: true,
          },
        ]
      : []),
    {
      label: "Duplicate test",
      onClick: () => handleDuplicate(id as string),
    },
    ...(status !== "draft"
      ? [
          {
            label: "Archive test",
            onClick: () =>
              handleStatusChange(
                id as string,
                status === "active" ? "archive" : "active"
              ),
          },
        ]
      : []),
    {
      label: "View past result",
      onClick: () => setOpenPastTest(true),
    },
  ];


  return (
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
              <button
                className={classNames(
                  "flex mt-1 gap-2 text-sm font-[600] text-pri-650",
                  data?.data?.document_id ? "!text-pri-650" : "!text-neu-400"
                )}
              >
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
                        onClick={(e: any) => {
                          e.stopPropagation();
                          handlePopperClick(id as string, action);
                        }}
                        className={`p-3 w-full text font-medium text-sm text-left ${
                          action.isDanger ? "text-err" : ""
                        } ${index < actions.length - 1 ? "border-b" : ""}`}
                      >
                        {action.label === "Archive test" && status === "active"
                          ? "Unarchive test"
                          : action.label}
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
              content: (
                <Results data={data?.data?.tests_results} loading={isLoading} />
              ),
            },
            {
              label: "Details",
              content: <Summary data={data?.data} />,
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
      <DeleteAllTestsOrder
        id={id as string}
        showModal={openDeleteTest}
        closeModal={() => setOpenDeleteTest(false)}
      />
    </Box>
  );
};
