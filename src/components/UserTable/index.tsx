import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Chip,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import NoResultIllustration from "../NoResult";
import { useDispatch } from "react-redux";
import { dispatchClient } from "../../redux/clientSlice";
import { TableHeadCustom } from "./TableHeadCustom";

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "NHR ID", label: "NHR ID", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "gender", label: "Gender", align: "left" },
  { id: "age", label: "Age", align: "center" },
  { id: "dateOfBirth", label: "Date of Birth", align: "center" },
  { id: "address", label: "Address", align: "center" },
];
export default function UserTable({ results }: any) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPage(0);
  }, [results]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formattedValue = (value: string) => {
    return value.replace(/-/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(dispatchClient({ tabId: "tab1", client: results }));
  };
  return (
    <Box sx={{ px: 2 }}>
      <TableContainer sx={{ borderRadius: 2.5, background: "#FFF" }}>
        <Table size="medium">
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody sx={{ fontWeight: 500, fontSize: 14, color: "#101828" }}>
            {results?.length > 0 ? (
              results
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{
                      "&:nth-of-type(odd)": {
                        background: "white",
                      },
                      "&:nth-of-type(even)": {
                        background: "#FCFCFD",
                      },
                      clear: "both",
                    }}
                  >
                    <TableCell>
                      <Link
                        to={`/dashboard/user/${row.id}`}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "inherit",
                          fontSize: "inherit",
                          gap: 3,
                          color: "inherit",
                        }}
                        className="tabLink"
                        onClick={handleClick}
                      >
                        <Avatar sx={{ mr: 2 }} />
                        <Typography variant="subtitle2" noWrap>
                          {row.firstName + " " + row.lastName}
                        </Typography>
                      </Link>
                    </TableCell>

                    <TableCell>{formattedValue(row?.id || "")}</TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          background:
                            row.status === "active" ? "#FBEAE9" : "#E7F6EC",
                          color:
                            row.status === "active" ? "#9E0A05" : "#036B26",
                          textTransform: "capitalize",
                        }}
                        label={"active"}
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          background: "#F7F9FC",
                          textTransform: "capitalize",
                          color: "#344054",
                        }}
                        label={row.gender}
                      />
                    </TableCell>

                    <TableCell>
                      {moment(new Date()).diff(row.dateOfBirth, "years")}
                    </TableCell>

                    <TableCell>
                      {moment(row?.dateOfBirth).format("DD/MM/YYYY")}
                    </TableCell>

                    <TableCell>{row.address}</TableCell>
                  </TableRow>
                ))
            ) : (
              <>
                <TableRow>
                  <TableCell sx={{ p: 0 }} colSpan={12}>
                    <NoResultIllustration text={"No User found"} />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[10, 15, 100]}
          count={Array.isArray(results) ? results.length : 1}
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}
