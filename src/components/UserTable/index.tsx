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
import NoResultIllustration from "../NoResult";

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "NHR ID", label: "NHR ID", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "gender", label: "Gender", align: "left" },
  { id: "age", label: "Age", align: "center" },
  { id: "address", label: "Address", align: "center" },
];
export default function UserTable({ results }: any) {
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
            {results.length > 0 ? (
              results
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow key={row.id}>
                    <Link
                      to={`/dashboard/user/${row.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ mr: 2 }} />
                        <Typography variant="subtitle2" noWrap>
                          {row.firstName + " " + row.lastName}
                        </Typography>
                      </TableCell>
                    </Link>

                    <TableCell>{row.id}</TableCell>

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
                      {moment(new Date()).diff(row.dateOfBirth, "years")} Years
                    </TableCell>

                    <TableCell>{row.address + " " + row.lga}</TableCell>
                  </TableRow>
                ))
            ) : (
              <NoResultIllustration />
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