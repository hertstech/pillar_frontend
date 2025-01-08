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
import { useNavigate } from "react-router-dom";
import { PastTests } from "./Components/PastTestModal";

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
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPastTest, setOpenPastTest] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openDeleteTest, setOpenDeleteTest] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const actions = [
    { label: "Update test", onClick: () => handleUpdate(selectedId) },
    { label: "Archive test", onClick: () => null },
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
    if (action.label === "Delete") {
      handleOpenDelete(orderId);
    } else if (action.label === "Duplicate test") {
      handleDuplicate(orderId);
    } else if (action.label === "Update test") {
      handleUpdate(orderId);
    } else {
      action.onClick();
    }
  };

  useEffect(() => setPage(0), []);

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
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item: any) => (
                    <TableRow
                      key={item.id}
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
                        sx={{ borderBottom: "none", cursor: "pointer" }}
                        className="!text-pri-650"
                        onClick={(e) => {
                          e.stopPropagation();
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
