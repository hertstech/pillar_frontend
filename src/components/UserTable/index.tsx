import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Chip,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "NHR ID", label: "NHR ID", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "gender", label: "Gender", align: "left" },
  { id: "age", label: "Age", align: "center" },
  { id: "address", label: "Address", align: "center" },
];
export default function UserTable({ results }: { results: any }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPage(0); // Reset page when results change
  }, [results]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box sx={{ marginBottom: 10 }}>
      <TableContainer sx={{ borderRadius: 2.5, background: "#FFF" }}>
        <Table size="medium">
          <TableHead sx={{ background: "#F9FAFB", fontSize: 12 }}>
            <TableRow>
              {TABLE_HEAD.map((item) => (
                <TableCell sx={{ color: "#344054" }} key={item.id}>
                  {item.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody sx={{ fontWeight: 500, fontSize: 14, color: "#101828" }}>
            {Array.isArray(results) ? (
              // Case: results is an array
              results
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <Link
                    key={row.id}
                    to={`/dashboard/user/${row.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <TableRow>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ mr: 2 }} />
                        <Typography variant="subtitle2" noWrap>
                          {row.firstName + " " + row.lastName}
                        </Typography>
                      </TableCell>

                      <TableCell>{row.id}</TableCell>

                      <TableCell>
                        <Chip
                          sx={{
                            background:
                              row.status !== "active" ? "#FBEAE9" : "#E7F6EC",
                            color:
                              row.status !== "active" ? "#9E0A05" : "#036B26",
                            textTransform: "capitalize",
                          }}
                          label={"inactive"}
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
                        {moment(new Date()).diff(row.dateOfBirth, "years")}{" "}
                        Years
                      </TableCell>

                      <TableCell>{row.address + " " + row.lga}</TableCell>
                    </TableRow>
                  </Link>
                ))
            ) : (
              <TableRow key={results.id}>
                <Link
                  to={`/dashboard/user/${results.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2 }} />
                    <Typography variant="subtitle2" noWrap>
                      {results.firstName + " " + results.lastName}
                    </Typography>
                  </TableCell>{" "}
                </Link>

                <TableCell>{results.id}</TableCell>

                <TableCell>
                  <Chip
                    sx={{
                      background:
                        results.status !== "active" ? "#FBEAE9" : "#E7F6EC",
                      color:
                        results.status !== "active" ? "#9E0A05" : "#036B26",
                      textTransform: "capitalize",
                    }}
                    label={"inactive"}
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    sx={{
                      background: "#F7F9FC",
                      textTransform: "capitalize",
                      color: "#344054",
                    }}
                    label={results.gender}
                  />
                </TableCell>

                <TableCell>
                  {moment(new Date()).diff(results.dateOfBirth, "years")} Years
                </TableCell>

                <TableCell>{results.address + " " + results.lga}</TableCell>
              </TableRow>
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
