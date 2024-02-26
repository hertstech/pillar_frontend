import {
  Box,
  Button,
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
import { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import NoResultIllustration from "../../../components/NoResult";

const TABLE_HEAD = [
  { id: "name", label: "Full Name", align: "left" },
  { id: "type", label: "File Type", align: "left" },
  { id: "added by", label: "Added By", align: "left" },
  { id: "date", label: "Date Added", align: "left" },
  { id: "" },
];

export default function File() {
  const [search, setSearch] = useState("");

  const [isGrid, setIsGrid] = useState(true);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, []);
  return (
    <Box sx={{ background: "white" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: "1px #E7E9FB solid",
          px: "20px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={600}
          fontSize={28}
          sx={{
            color: "#000",
            // textTransform: "capitalize",
            pt: "20px",
          }}
        >
          View all files here
        </Typography>
      </Box>

      <Box
        sx={{
          p: "20px",
          background: "#F9F9FB",
        }}
      >
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={3}
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
            spacing={3}
          >
            <label
              htmlFor=""
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#232426",
                fontWeight: 500,
                fontSize: 18,
                fontFamily: "fontBold",
              }}
            >
              View
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
                fontSize: 18,
                fontFamily: "fontBold",
              }}
            >
              View as
              <Select
                defaultValue={"List"}
                sx={{
                  minWidth: 120,
                  color: "#2A2D32",
                  fontWeight: 500,
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                    { px: 2, py: 1 },
                }}
              >
                <MenuItem value="List" onClick={() => setIsGrid(true)}>
                  List
                </MenuItem>
                <MenuItem value="Grid" onClick={() => setIsGrid(false)}>
                  Grid
                </MenuItem>
              </Select>
            </label>

            <Button
              component="label"
              variant="contained"
              startIcon={
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Add">
                    <path
                      id="Vector"
                      d="M10.25 1.5C10.25 1.08579 9.91421 0.75 9.5 0.75C9.08579 0.75 8.75 1.08579 8.75 1.5L8.75 8.75H1.5C1.08579 8.75 0.75 9.08579 0.75 9.5C0.75 9.91421 1.08579 10.25 1.5 10.25H8.75V17.5C8.75 17.9142 9.08579 18.25 9.5 18.25C9.91421 18.25 10.25 17.9142 10.25 17.5V10.25H17.5C17.9142 10.25 18.25 9.91421 18.25 9.5C18.25 9.08579 17.9142 8.75 17.5 8.75H10.25L10.25 1.5Z"
                      fill="#FAFEF5"
                    />
                  </g>
                </svg>
              }
              sx={{
                background: "#099250",
                "&:hover": { backgroundColor: "#099250" },
                px: 2,
                py: 1,
              }}
            >
              Add File
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/*, capture=camera "
                id="fusk"
              />
            </Button>
          </Stack>
        </Stack>
        {isGrid && <></>}

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

              <TableBody
                sx={{ fontWeight: 500, fontSize: 14, color: "#101828" }}
              >
                <TableCell
                  colSpan={12}
                  rowSpan={12}
                  style={{ height: "200px" }}
                  sx={{ height: 200 }}
                >
                  <NoResultIllustration text="No files has been uploaded yet" />
                </TableCell>
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[10, 25, 75]}
              count={length}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
