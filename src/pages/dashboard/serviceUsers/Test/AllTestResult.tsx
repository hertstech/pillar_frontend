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
import React, { useState, useEffect } from "react";
import moment from "moment";
import { TableLoader } from "../../../../components/NoResult";
import PopperOver from "../../../../components/Popover";

const TABLE_HEAD = [
  { id: "oder-id", label: "Order ID", align: "left" },
  { id: "activity", label: "Order by", align: "left" },
  { id: "status", label: "No of test", align: "center" },
  { id: "ip-address", label: "Collection site", align: "left" },
  { id: "startDate", label: "Date of test", align: "left" },
  { id: "", label: "", align: "" },
  { id: "", label: "", align: "" },
];

export default function AllTestResult({ data, isLoading }: any) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const actions = [
    { label: "Edit test", onClick: () => null },
    { label: "Archive test", onClick: () => null },
    { label: "Duplicate test", onClick: () => null },
    { label: "View past result", onClick: () => null },
    { label: "Delete", onClick: () => null, isDanger: true },
  ];

  useEffect(() => setPage(0), []);

  return (
    <Box>
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
                      onClick={() => alert(`open row of: ${item.order_id}`)}
                      hover
                      sx={{
                        height: "72px",
                        "&:nth-of-type(odd)": { background: "white" },
                        "&:nth-of-type(even)": { background: "#F9F9FB" },
                        position: "relative",
                        borderBottom: "none",
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
                        {" "}
                        <span>{item.order_by}</span>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        {" "}
                        <span>{item.test_number} tests</span>
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
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Download
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "none" }}
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
                                  onClick={action.onClick}
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
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
}
