import {
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import InputField from "../../../components/InputField";
// import { Calendar } from "../../../components/CalendarField";

const TABLE_HEAD = [
  { id: "user", label: "User", align: "left" },
  { id: "activity", label: "Activity info", align: "left" },
  { id: "status", label: "Status", align: "center" },
  { id: "ip-address", label: "IP Address", align: "left" },
  { id: "startDate", label: "Start Date", align: "left" },
  { id: "endDate", label: "End Date", align: "left" },
  { id: "location", label: "Location", align: "left" },
];

export default function Activity() {
  const [search, setSearch] = React.useState("");

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = React.useState<any[]>([]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    setData([...Array(50)]);
  }, []);

  React.useEffect(() => {
    setPage(0);
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ position: "relative", display: "flex" }}>
          <InputField
            label=""
            type="text"
            name="search"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder="Search activity"
          />
          <Button
            sx={{
              position: "absolute",
              right: "0rem",
              top: "13px",
              p: 2,
            }}
          >
            <svg
              width="24"
              height="23"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Search 1">
                <path
                  id="Vector"
                  d="M19.0304 17.4698C18.7375 17.1769 18.2626 17.1769 17.9697 17.4698C17.6768 17.7626 17.6768 18.2375 17.9697 18.5304L19.0304 17.4698ZM21.9696 22.5304C22.2625 22.8233 22.7374 22.8233 23.0303 22.5304C23.3232 22.2375 23.3232 21.7626 23.0303 21.4697L21.9696 22.5304ZM8.83512 4.80232C9.24423 4.73752 9.52336 4.35334 9.45856 3.94423C9.39376 3.53511 9.00958 3.25599 8.60047 3.32079L8.83512 4.80232ZM3.82076 8.1005C3.75596 8.50961 4.03508 8.89379 4.4442 8.95859C4.85331 9.02339 5.23749 8.74426 5.30229 8.33515L3.82076 8.1005ZM17.9697 18.5304L21.9696 22.5304L23.0303 21.4697L19.0304 17.4698L17.9697 18.5304ZM10.5 18.25C5.94365 18.25 2.25 14.5563 2.25 10H0.75C0.75 15.3848 5.11522 19.75 10.5 19.75V18.25ZM18.75 10C18.75 14.5563 15.0563 18.25 10.5 18.25V19.75C15.8848 19.75 20.25 15.3848 20.25 10H18.75ZM10.5 1.75C15.0563 1.75 18.75 5.44365 18.75 10H20.25C20.25 4.61522 15.8848 0.25 10.5 0.25V1.75ZM10.5 0.25C5.11522 0.25 0.75 4.61522 0.75 10H2.25C2.25 5.44365 5.94365 1.75 10.5 1.75V0.25ZM8.60047 3.32079C6.14008 3.71047 4.21044 5.64012 3.82076 8.1005L5.30229 8.33515C5.59032 6.51661 7.01658 5.09035 8.83512 4.80232L8.60047 3.32079Z"
                  fill="#667185"
                />
              </g>
            </svg>
          </Button>
        </div>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          width={"60%"}
        >
          <label
            htmlFor=""
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#232426",
              fontWeight: 500,
              fontSize: 14,
              fontFamily: "fontBold",
            }}
          >
            View as
            <Select
              defaultValue={"Recent"}
              sx={{
                minWidth: 110,
                color: "#2A2D32",
                fontWeight: 500,
                ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                  { px: 2, py: 1 },
              }}
            >
              <MenuItem value="Recent">Recent</MenuItem>
              <MenuItem value="Older">Older</MenuItem>
              <MenuItem value="From z-A">From z-A</MenuItem>
              <MenuItem value="From A-Z">From A-Z</MenuItem>
              <MenuItem value="Successful">Successful</MenuItem>
              <MenuItem value="Unsuccessful">Unsuccessful</MenuItem>
            </Select>
          </label>

          <label
            htmlFor=""
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#232426",
              fontWeight: 500,
              fontSize: 14,
              fontFamily: "fontBold",
            }}
          >
            Filter By
            <Select
              defaultValue={"All Activities"}
              sx={{
                minWidth: 110,
                color: "#2A2D32",
                fontWeight: 500,
                ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                  { px: 2, py: 1 },
              }}
            >
              <MenuItem value="All Activities">All Activities</MenuItem>
              <MenuItem value="My Activities">My Activities</MenuItem>
            </Select>
          </label>
        </Stack>
      </Box>

      <Box marginTop={2}>
        <TableContainer
          sx={{ borderRadius: 2.5, background: "#FFF", position: "relative" }}
        >
          <Table size="medium">
            <TableHead sx={{ background: "#FCFCFD", fontSize: 12 }}>
              <TableRow>
                {TABLE_HEAD.map((item) => (
                  <TableCell sx={{ color: "#344054" }} key={item.id}>
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((_, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": {
                        background: "white",
                      },
                      "&:nth-of-type(even)": {
                        background: "#FCFCFD",
                      },
                      position: "relative",
                    }}
                  >
                    <TableCell>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          textTransform: "capitalize",
                        }}
                        variant="subtitle2"
                        noWrap
                      >
                        Ciroma Adekunle
                        <span>Super Admin</span>
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <span>Signed in via DNS</span>
                    </TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          background: "#E7F6EC",
                          textTransform: "capitalize",
                          fontWeight: "fontBold",
                          color: "#099137",
                        }}
                        label="successful"
                      />
                    </TableCell>

                    <TableCell>
                      <span>190.2831.3839</span>
                    </TableCell>

                    <TableCell>
                      <span>11-04-23 • 5:30PM</span>
                    </TableCell>

                    <TableCell>
                      <span>11-04-23 • 5:30PM</span>
                    </TableCell>

                    <TableCell>
                      <span>Ikeja, Lagos</span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 25, 75]}
            count={data.length}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
