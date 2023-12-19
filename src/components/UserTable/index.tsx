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

  function calculateAge(birthDateString: any) {
    // Create a Date object from the birth date string
    const birthDate = new Date(birthDateString);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age based on the birth date and current date
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  }

  const ageString = results.dateOfBirth;
  const age = calculateAge(ageString);

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
                  <TableRow key={row.id}>
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

                    <TableCell>{age}</TableCell>

                    <TableCell>{row.address + " " + row.lga}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow key={results.id}>
                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ mr: 2 }} />
                  <Typography variant="subtitle2" noWrap>
                    {results.firstName + " " + results.lastName}
                  </Typography>
                </TableCell>

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

                <TableCell>{age}</TableCell>

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
