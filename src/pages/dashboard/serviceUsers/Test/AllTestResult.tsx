import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { TableLoader } from "../../../../components/NoResult";
import PopperOver from "../../../../components/Popover";
import DrawerComp from "../../../../components/Drawer";
import { TestDetails } from "./TestDetails";
import { DeleteAllTestsOrder } from "./AddTest/DeleteAllTest";
import { useNavigate, useParams } from "react-router-dom";
import { PastTests } from "./Components/PastTestModal";
import { useUpdateTestStatus } from "../../../../api/HealthServiceUser/test";
import { useAlert } from "../../../../Utils/useAlert";
import useDownloader from "react-use-downloader";
import classNames from "classnames";

const TABLE_HEAD = [
  { id: "oder-id", label: "Order ID", align: "left" },
  { id: "activity", label: "Order by", align: "left" },
  { id: "status", label: "No of test", align: "center" },
  { id: "ip-address", label: "Collection site", align: "left" },
  { id: "startDate", label: "Date of test", align: "left" },
  { id: "", label: "", align: "" },
  { id: "", label: "", align: "" },
];

export default function AllTestResult({ data = [], isLoading }: any) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPastTest, setOpenPastTest] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openDeleteTest, setOpenDeleteTest] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);

  const { mutate } = useUpdateTestStatus();

  const { download, error, isInProgress, percentage } = useDownloader();

  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleToggle = (itemId: string) => {
    const sanitizedId = itemId.replace(/\s+/g, "");
    setSelectedId(sanitizedId);
    setOpenDrawer(!openDrawer);
  };

  const handleDuplicate = (Id: string | null) => {
    navigate("duplicate-test", {
      state: { id: Id },
    });
  };
  const handleUpdate = (Id: string | null) => {
    navigate("update-test", {
      state: { id: Id },
    });
  };

  const handleOpenDelete = (itemId: string | null) => {
    if (!itemId) {
      console.error("Invalid itemId for deletion.");
      return;
    }
    const sanitizedId = itemId.replace(/\s+/g, "");
    setSelectedId(sanitizedId);
    setOpenDeleteTest(true);
  };

  const handleDownload = (documentId: string) => {
    if (!documentId) {
      console.error("Document ID is missing.");
      return;
    }
    setDocId(documentId);
  };

  const handleStatusChange = (orderId: string | null) => {
    if (!orderId) {
      console.error("Missing orderId. Unable to update status.");
      return;
    }

    const currentStatus = data.find(
      (item: any) => item.order_id === orderId
    )?.status;

    if (!currentStatus) {
      console.error(`Order ID ${orderId} not found in data.`);
      return;
    }

    const newStatus = currentStatus === "active" ? "archive" : "active";
    const testData = { status: newStatus };

    mutate(
      { testData, ID: orderId },
      {
        onSuccess: () => {
          useAlert({
            isToast: true,
            icon: "success",
            title: `Test ${
              newStatus === "archive" ? "archived" : "activated"
            } successfully`,
            position: "top-start",
          });
        },
        onError: () => {
          useAlert({
            isToast: true,
            icon: "error",
            title: `Failed to ${
              newStatus === "archive" ? "archive" : "activate"
            } test`,
            position: "top-start",
          });
        },
      }
    );
  };

  const actions = [
    { label: "Update test", onClick: () => handleUpdate(selectedId) },
    {
      label:
        data.find((item: any) => item.order_id === selectedId)?.status !==
        "active"
          ? "Archive test"
          : "Unarchive test",
      onClick: () => handleStatusChange(selectedId as string),
    },
    {
      label: "Duplicate test",
      onClick: () => handleDuplicate(selectedId),
    },
    { label: "View past result", onClick: () => setOpenPastTest(true) },
    {
      label: "Delete",
      onClick: () => handleOpenDelete(selectedId),
      isDanger: true,
    },
  ];

  const handlePopperClick = (orderId: string, action: any) => {
    if (!orderId) {
      console.error("Invalid orderId passed to handlePopperClick.");
      return;
    }

    if (action.label === "Delete") {
      handleOpenDelete(orderId);
    } else if (action.label === "Archive test") {
      handleStatusChange(orderId);
    } else if (action.label === "Duplicate test") {
      handleDuplicate(orderId);
    } else if (action.label === "Update test") {
      handleUpdate(orderId);
    } else {
      action.onClick();
    }
  };

  useEffect(() => setPage(0), []);

  console.log("is error:", error);
  console.log("how far:", percentage);
  console.log("is in progress", isInProgress);

  useEffect(() => {
    if (docId) {
      const filename = "download";

      if (docId !== null) {
        download(
          `https://www.pillartechnologybackend.com.ng/api/v1/order/${id}/report/${docId}`,
          filename
        );
      } else {
        console.error("Invalid file URL received from API.");
      }
    } else {
      console.error("Error downloading file:");
    }
  }, [setDocId]);

  return (
    <Box>
      <DrawerComp
        variant="plain"
        openDrawer={openDrawer}
        onCloseDrawer={() => setOpenDrawer(false)}
      >
        <TestDetails
          id={selectedId as string}
          disableDrawer={false}
          handleCloseDrawer={() => setOpenDrawer(false)}
        />
      </DrawerComp>
      <Box marginTop={2}>
        <TableContainer
          sx={{ borderRadius: 2.5, background: "#FFF", position: "relative" }}
        >
          <Table size="medium">
            <TableHead sx={{ background: "#FCFCFD", fontSize: 12 }}>
              <TableRow>
                {TABLE_HEAD.map((item) => (
                  <TableCell key={item.id} sx={{ color: "#344054" }}>
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableLoader />
              ) : data.filter((item: any) => item.status === "active")
                  .length === 0 ? (
                <TableRow>
                  <TableCell colSpan={TABLE_HEAD.length} align="center">
                    <Box py={2}>
                      <Typography variant="subtitle1" color="textSecondary">
                        No active result[s] available.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                data
                  .filter((item: any) => item.status === "active" || null)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item: any, idx: number) => (
                    <TableRow
                      key={item.id || idx}
                      onClick={() => handleToggle(item.order_id)}
                      hover
                      sx={{
                        height: "72px",
                        "&:nth-of-type(odd)": { background: "white" },
                        "&:nth-of-type(even)": { background: "#F9F9FB" },
                        position: "relative",
                        borderBottom: "none",
                        ":hover": { cursor: "pointer" },
                      }}
                    >
                      <TableCell
                        sx={{
                          borderBottom: "none",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{ textTransform: "capitalize" }}
                        >
                          Test #{item.order_id}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <span>{item.ordered_by}</span>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <span>{item.number_of_tests} tests</span>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <span>{item.collection_site}</span>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <span>
                          {moment(item.testDate).format("DD-MM-YY LT")}
                        </span>
                      </TableCell>
                      <TableCell
                        className={classNames(
                          "!border-b-0",
                          item.document_id ? "!text-pri-650" : "!text-neu-400",
                          item.document_id
                            ? "!cursor-pointer"
                            : "!cursor-not-allowed"
                        )}
                        onClick={(e) => {
                          if (item.document_id) {
                            e.stopPropagation();
                            handleDownload(item.document_id);
                          }
                        }}
                      >
                        Download
                      </TableCell>

                      <TableCell
                        sx={{ borderBottom: "none", cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <PopperOver
                          position="bottom-end"
                          popperContent={
                            <Box className="bg-white max-w-[170px] min-h-[112px] rounded-lg border-t">
                              {actions.map((action, index) => (
                                <button
                                  key={index}
                                  onClick={(e: any) => {
                                    e.stopPropagation();
                                    handlePopperClick(item.order_id, action);
                                  }}
                                  className={`p-3 w-full text font-medium text-sm text-left ${
                                    action.isDanger ? "text-err" : ""
                                  } ${
                                    index < actions.length - 1 ? "border-b" : ""
                                  }`}
                                >
                                  {action.label}
                                </button>
                              ))}
                            </Box>
                          }
                        />

                        <PastTests
                          setOpen={setOpenPastTest}
                          open={openPastTest}
                          testId={item.id}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
          <Box className="flex justify-start mt-4">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 75]}
              count={data.length}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <DeleteAllTestsOrder
              id={selectedId as string}
              showModal={openDeleteTest}
              closeModal={() => setOpenDeleteTest(false)}
            />
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
}
