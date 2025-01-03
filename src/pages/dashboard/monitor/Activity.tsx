import {
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
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
import InputField from "../../../components/InputField";
import { TableLoader } from "../../../components/NoResult";
import { SearchIcon } from "../../../../public/assets/Icons";
import { IoSettings } from "react-icons/io5";
import ActivityPinModal from "./Components/activityPinModal";

const TABLE_HEAD = [
  { id: "user", label: "User", align: "left" },
  { id: "activity", label: "Activity info", align: "left" },
  { id: "status", label: "Status", align: "center" },
  { id: "ip-address", label: "IP Address", align: "left" },
  { id: "startDate", label: "Start Date", align: "left" },
  { id: "endDate", label: "End Date", align: "left" },
  { id: "location", label: "Location", align: "left" },
];

export default function Activity({ data, isLoading }: any) {
  const [search, setSearch] = useState("");
  const [openActivityModal, setOpenActivityModal] = useState(false);
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

  useEffect(() => setPage(0), []);

  const renderSelect = (
    label: string,
    defaultValue: string,
    options: string[]
  ) => (
    <label
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
      {label}
      <Select
        defaultValue={defaultValue}
        sx={{
          minWidth: 110,
          color: "#2A2D32",
          fontWeight: 500,
          ".MuiOutlinedInput-input": { px: 2, py: 1 },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </label>
  );

  return (
    <Box>
      <Box className="flex items-center justify-between">
        <Box sx={{ position: "relative", display: "flex" }}>
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
              right: 0,
              top: "13px",
              p: 2,
            }}
          >
            <SearchIcon />
          </Button>
        </Box>

        <Box className="flex items-center gap-4 mt-3">
          {renderSelect("View as", "Recent", [
            "Recent",
            "Older",
            "From z-A",
            "From A-Z",
            "Successful",
            "Unsuccessful",
          ])}
          {renderSelect("Filter By", "All Activities", [
            "All Activities",
            "My Activities",
          ])}
          <Box className="rounded-full bg-neu-200 p-2">
            <IoSettings
              className="text-neu-500 cursor-pointer"
              size={28}
              onClick={() => setOpenActivityModal(true)}
            />
          </Box>
          <ActivityPinModal
            open={openActivityModal}
            setOpen={setOpenActivityModal}
            data={data}
          />
        </Box>
      </Box>

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
                      hover
                      sx={{
                        "&:nth-of-type(odd)": { background: "white" },
                        "&:nth-of-type(even)": { background: "#FCFCFD" },
                        position: "relative",
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{ textTransform: "capitalize" }}
                        >
                          {item.tenet_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <span>{item.activity_info}</span>
                      </TableCell>
                      <TableCell>
                        <Chip
                          sx={{
                            background:
                              item.status === "Successful"
                                ? "#E7F6EC"
                                : "#FBEAE9",
                            color:
                              item.status === "Successful"
                                ? "#099137"
                                : "#D42620",
                            fontWeight: "fontBold",
                            textTransform: "capitalize",
                          }}
                          label={item.status}
                        />
                      </TableCell>
                      <TableCell>
                        {" "}
                        <span>{item.ip_address}</span>
                      </TableCell>
                      <TableCell>
                        <span>
                          {moment(item.start_date).format("DD-MM-YY LT")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span>
                          {moment(item.end_date).format("DD-MM-YY LT")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span>{item.location}</span>
                      </TableCell>
                    </TableRow>
                  ))
              )}
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
