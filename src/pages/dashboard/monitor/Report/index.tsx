import {
  Alert,
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputField from "../../../../components/InputField";
import NoResultIllustration from "../../../../components/NoResult";
import { Link } from "react-router-dom";
import ChartComponent from "../ChartComponent";
import { TableHeadCustom } from "../../../../components/UserTable/TableHeadCustom";
import moment from "moment";
import { axiosInstance } from "../../../../Utils";

const TABLE_HEAD = [
  { id: "name", label: "Report Name", align: "left" },
  { id: "type", label: "Report Type", align: "left" },
  { id: "date", label: "Date Created", align: "center" },
  { id: "action", label: "Action", align: "center" },
];

export default function Report({ chartId, chartData, triggerRefresh }: any) {
  const [search, setSearch] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const [message, setMessage] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPage(0);
  }, [chartData]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dataFiltered = applySortFilter({ chartId, search });

  const [isGrid, setIsGrid] = useState(true);

  console.log("The Chart Data 1==>", chartData);

  const handlePin = async (id: string) => {
    const payLoad = { status: true };
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/chart/status/${id}`,
        payLoad
      );

      if (res.status === 200) {
        setShowAlert(true);
        setMessage("Item Pinned success");

        setTimeout(() => {
          setShowAlert(false);
          triggerRefresh();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnPin = async (id: string) => {
    const payLoad = { status: false };
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/chart/status/${id}`,
        payLoad
      );

      if (res.status === 200) {
        setShowAlert(true);
        setMessage("Item Unpinned success");

        setTimeout(() => {
          setShowAlert(false);
          triggerRefresh();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // background: "white",p:1
        }}
      >
        <div style={{ position: "relative", display: "flex", width: "20%" }}>
          <InputField
            label=""
            type="text"
            name="search"
            value={search}
            disabled={isGrid === false}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder={
              isGrid === false
                ? "You cannot use this feature"
                : "Search activity"
            }
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
          alignItems="center"
          gap={3}
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
              defaultValue={"Pinned"}
              sx={{
                minWidth: 120,
                color: "#2A2D32",
                fontWeight: 500,
                ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                  { px: 2, py: 1 },
              }}
            >
              <MenuItem
                value="All Reports"
                // onClick={() => setIsPinned(true)}
              >
                All Reports
              </MenuItem>
              <MenuItem
                value="Pinned"
                // onClick={() => setIsPinned(false)}
              >
                Pinned
              </MenuItem>
            </Select>
          </label>

          <label
            htmlFor="view"
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
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                background: isGrid ? "transparent" : "#EFF8FF",
                color: isGrid ? "#2A2D32" : "#2E90FA",
                textTransform: "none",
                fontWeight: 400,
                "&:hover": { backgroundColor: "#EFF8FF" },
              }}
              endIcon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2727_128166)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.2695 2.33268C13.2695 1.44673 12.5513 0.728516 11.6654 0.728516C10.7794 0.728516 10.0612 1.44673 10.0612 2.33268C10.0612 3.21864 10.7794 3.93685 11.6654 3.93685C12.5513 3.93685 13.2695 3.21864 13.2695 2.33268ZM11.6654 1.60352C12.0681 1.60352 12.3945 1.92998 12.3945 2.33268C12.3945 2.73539 12.0681 3.06185 11.6654 3.06185C11.2627 3.06185 10.9362 2.73539 10.9362 2.33268C10.9362 1.92998 11.2627 1.60352 11.6654 1.60352Z"
                      fill={isGrid ? "#2A2D32" : "#2E90FA"}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.2695 6.99935C13.2695 6.1134 12.5513 5.39519 11.6654 5.39519C10.7794 5.39519 10.0612 6.1134 10.0612 6.99935C10.0612 7.88531 10.7794 8.60352 11.6654 8.60352C12.5513 8.60352 13.2695 7.88531 13.2695 6.99935ZM11.6654 6.27019C12.0681 6.27019 12.3945 6.59664 12.3945 6.99935C12.3945 7.40206 12.0681 7.72852 11.6654 7.72852C11.2627 7.72852 10.9362 7.40206 10.9362 6.99935C10.9362 6.59664 11.2627 6.27019 11.6654 6.27019Z"
                      fill={isGrid ? "#2A2D32" : "#2E90FA"}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.2695 11.666C13.2695 10.7801 12.5513 10.0619 11.6654 10.0619C10.7794 10.0619 10.0612 10.7801 10.0612 11.666C10.0612 12.552 10.7794 13.2702 11.6654 13.2702C12.5513 13.2702 13.2695 12.552 13.2695 11.666ZM11.6654 10.9369C12.0681 10.9369 12.3945 11.2633 12.3945 11.666C12.3945 12.0687 12.0681 12.3952 11.6654 12.3952C11.2627 12.3952 10.9362 12.0687 10.9362 11.666C10.9362 11.2633 11.2627 10.9369 11.6654 10.9369Z"
                      fill={isGrid ? "#2A2D32" : "#2E90FA"}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.60287 2.33268C8.60287 1.44673 7.88465 0.728516 6.9987 0.728516C6.11274 0.728516 5.39453 1.44673 5.39453 2.33268C5.39453 3.21864 6.11274 3.93685 6.9987 3.93685C7.88466 3.93685 8.60287 3.21864 8.60287 2.33268ZM6.9987 1.60352C7.40141 1.60352 7.72787 1.92997 7.72787 2.33268C7.72787 2.73539 7.40141 3.06185 6.9987 3.06185C6.59599 3.06185 6.26953 2.73539 6.26953 2.33268C6.26953 1.92997 6.59599 1.60352 6.9987 1.60352Z"
                      fill={isGrid ? "#2A2D32" : "#2E90FA"}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.60287 6.99935C8.60287 6.1134 7.88466 5.39519 6.9987 5.39519C6.11274 5.39519 5.39453 6.1134 5.39453 6.99935C5.39453 7.88531 6.11274 8.60352 6.9987 8.60352C7.88466 8.60352 8.60287 7.88531 8.60287 6.99935ZM6.9987 6.27019C7.40141 6.27019 7.72786 6.59664 7.72786 6.99935C7.72786 7.40206 7.40141 7.72852 6.9987 7.72852C6.59599 7.72852 6.26953 7.40206 6.26953 6.99935C6.26953 6.59664 6.59599 6.27019 6.9987 6.27019Z"
                      fill={isGrid ? "#2A2D32" : "#2E90FA"}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.60286 11.666C8.60286 10.7801 7.88466 10.0619 6.9987 10.0619C6.11274 10.0619 5.39453 10.7801 5.39453 11.666C5.39453 12.552 6.11274 13.2702 6.9987 13.2702C7.88466 13.2702 8.60286 12.552 8.60286 11.666ZM6.9987 10.9369C7.40141 10.9369 7.72786 11.2633 7.72786 11.666C7.72786 12.0687 7.40141 12.3952 6.9987 12.3952C6.59599 12.3952 6.26953 12.0687 6.26953 11.666C6.26953 11.2633 6.59599 10.9369 6.9987 10.9369Z"
                      fill={isGrid ? "#2A2D32" : "#2E90FA"}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.9362 2.33268C3.9362 1.44673 3.21799 0.728516 2.33203 0.728516C1.44607 0.728516 0.727865 1.44673 0.727865 2.33268C0.727865 3.21864 1.44607 3.93685 2.33203 3.93685C3.21799 3.93685 3.9362 3.21864 3.9362 2.33268ZM2.33203 1.60352C2.73474 1.60352 3.0612 1.92997 3.0612 2.33268C3.0612 2.73539 2.73474 3.06185 2.33203 3.06185C1.92932 3.06185 1.60287 2.73539 1.60287 2.33268C1.60287 1.92997 1.92932 1.60352 2.33203 1.60352Z"
                      fill={isGrid ? "#2A2D32" : "#2E90FA"}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.9362 6.99935C3.9362 6.1134 3.21799 5.39519 2.33203 5.39519C1.44607 5.39519 0.727865 6.1134 0.727865 6.99935C0.727865 7.88531 1.44607 8.60352 2.33203 8.60352C3.21799 8.60352 3.9362 7.88531 3.9362 6.99935ZM2.33203 6.27019C2.73474 6.27019 3.0612 6.59665 3.0612 6.99935C3.0612 7.40206 2.73474 7.72852 2.33203 7.72852C1.92932 7.72852 1.60287 7.40206 1.60287 6.99935C1.60287 6.59664 1.92932 6.27019 2.33203 6.27019Z"
                      fill={isGrid ? "#2A2D32" : "#2E90FA"}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.9362 11.666C3.9362 10.7801 3.21799 10.0619 2.33203 10.0619C1.44607 10.0619 0.727865 10.7801 0.727865 11.666C0.727865 12.552 1.44607 13.2702 2.33203 13.2702C3.21799 13.2702 3.9362 12.552 3.9362 11.666ZM2.33203 10.9369C2.73474 10.9369 3.0612 11.2633 3.0612 11.666C3.0612 12.0687 2.73474 12.3952 2.33203 12.3952C1.92932 12.3952 1.60287 12.0687 1.60287 11.666C1.60287 11.2633 1.92932 10.9369 2.33203 10.9369Z"
                      fill={isGrid ? "#2A2D32" : "#2E90FA"}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2727_128166">
                      <rect
                        width="14"
                        height="14"
                        fill="white"
                        transform="translate(14) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              onClick={() => setIsGrid(false)}
            >
              Grid
            </Button>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                background: isGrid ? "#EFF8FF" : "transparent",
                color: isGrid ? "#2E90FA" : "#2A2D32",
                textTransform: "none",
                fontWeight: 400,
                "&:hover": { backgroundColor: "#EFF8FF" },
              }}
              endIcon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.08333 10.9382C3.84171 10.9382 3.64583 10.7423 3.64583 10.5007C3.64583 10.259 3.84171 10.0632 4.08333 10.0632L12.25 10.0632C12.4916 10.0632 12.6875 10.259 12.6875 10.5007C12.6875 10.7423 12.4916 10.9382 12.25 10.9382L4.08333 10.9382Z"
                    fill={isGrid ? "#2E90FA" : "#2A2D32"}
                  />
                  <path
                    d="M4.08333 7.43815C3.84171 7.43815 3.64583 7.24228 3.64583 7.00065C3.64583 6.75903 3.84171 6.56315 4.08333 6.56315L12.25 6.56315C12.4916 6.56315 12.6875 6.75903 12.6875 7.00065C12.6875 7.24228 12.4916 7.43815 12.25 7.43815L4.08333 7.43815Z"
                    fill={isGrid ? "#2E90FA" : "#2A2D32"}
                  />
                  <path
                    d="M4.08333 3.93815C3.84171 3.93815 3.64583 3.74228 3.64583 3.50065C3.64583 3.25903 3.84171 3.06315 4.08333 3.06315L12.25 3.06315C12.4916 3.06315 12.6875 3.25903 12.6875 3.50065C12.6875 3.74228 12.4916 3.93815 12.25 3.93815L4.08333 3.93815Z"
                    fill={isGrid ? "#2E90FA" : "#2A2D32"}
                  />
                  <path
                    d="M2.91667 7.00065C2.91667 6.67848 2.6555 6.41732 2.33333 6.41732C2.01117 6.41732 1.75 6.67848 1.75 7.00065C1.75 7.32282 2.01117 7.58398 2.33333 7.58398C2.6555 7.58398 2.91667 7.32282 2.91667 7.00065Z"
                    fill={isGrid ? "#2E90FA" : "#2A2D32"}
                  />
                  <path
                    d="M2.91667 10.5007C2.91667 10.1785 2.6555 9.91732 2.33333 9.91732C2.01117 9.91732 1.75 10.1785 1.75 10.5007C1.75 10.8228 2.01117 11.084 2.33333 11.084C2.6555 11.084 2.91667 10.8228 2.91667 10.5007Z"
                    fill={isGrid ? "#2E90FA" : "#2A2D32"}
                  />
                  <path
                    d="M2.91667 3.50065C2.91667 3.17849 2.6555 2.91732 2.33333 2.91732C2.01117 2.91732 1.75 3.17849 1.75 3.50065C1.75 3.82282 2.01117 4.08398 2.33333 4.08398C2.6555 4.08398 2.91667 3.82282 2.91667 3.50065Z"
                    fill={isGrid ? "#2E90FA" : "#2A2D32"}
                  />
                </svg>
              }
              onClick={() => setIsGrid(true)}
            >
              List
            </Button>
          </label>
        </Stack>

        <Link
          to={"create-report"}
          style={{
            fontWeight: 500,
            color: "#FFF",
            textDecoration: "none",
            borderRadius: 6,
            display: "flex",
            background: "#2E90FA",
            padding: 10,
            gap: 5,
            textTransform: "capitalize",
            alignItems: "flex-start",
            fontFamily: "fontbold",
          }}
        >
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
          New Report
        </Link>
      </Box>

      {isGrid ? (
        <Box mt={2}>
          {showAlert && (
            <Stack
              sx={{
                width: "40%",
                background: "#F6FEF9",
                p: 1,
                position: "absolute",
                zIndex: 10,
                borderRadius: 2,
                // border: "1px solid #6CE9A6",
              }}
            >
              <Alert
                sx={{
                  background: "#ECFDF3",
                  border: "0px",
                  fontWeight: 600,
                  gap: 3,
                  color: "#036B26",
                  py: 0,
                }}
                icon={false}
                variant="outlined"
                severity="success"
              >
                {message}
              </Alert>
            </Stack>
          )}

          <TableContainer
            sx={{ borderRadius: 2.5, background: "#FFF", position: "relative" }}
          >
            <Table size="medium">
              <TableHeadCustom headLabel={TABLE_HEAD} />

              <TableBody>
                {chartId?.length > 0 ? (
                  dataFiltered
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row: any) => (
                      <TableRow hover key={row.id}>
                        <TableCell>{row.chartData.title}</TableCell>
                        <TableCell>{row.chartData.reportType}</TableCell>
                        <TableCell>
                          {moment(row.date_created).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          {row.chartData.status === true ? (
                            <Button
                              onClick={() => handleUnPin(row.id)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "none",
                              }}
                            >
                              <svg
                                width="17"
                                height="19"
                                viewBox="0 0 17 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="Pin">
                                  <path
                                    id="Vector"
                                    d="M7.06735 2.86245C8.39053 0.570633 11.3211 -0.2146 13.6129 1.10858C15.9047 2.43176 16.6899 5.3623 15.3668 7.65412L15.2766 7.8102C16.3452 9.58526 16.5265 11.8238 15.627 13.8089C15.496 14.0982 15.3127 14.4156 14.9955 14.965L14.9629 15.0215C14.925 15.0872 14.8857 15.1554 14.8432 15.2147C14.438 15.7802 13.6897 15.9807 13.0559 15.6936C12.9895 15.6635 12.9214 15.6241 12.8558 15.5861L7.69641 12.6073L4.67558 17.8396C4.50299 18.1385 4.12074 18.2409 3.82181 18.0683C3.52288 17.8958 3.42045 17.5135 3.59304 17.2146L6.61388 11.9823L1.45448 9.00357C1.38881 8.96572 1.32064 8.92643 1.26136 8.88395C0.695836 8.4787 0.49533 7.7304 0.782464 7.09669C0.812562 7.03026 0.851956 6.96214 0.8899 6.89654L0.922512 6.84007C1.23969 6.29067 1.423 5.97315 1.60797 5.71503C2.87717 3.94385 4.90585 2.98161 6.97693 3.01907L7.06735 2.86245Z"
                                    fill="#2E90FA"
                                  />
                                </g>
                              </svg>
                              <span style={{ color: "#2E90FA", marginLeft: 5 }}>
                                Unpin
                              </span>
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handlePin(row.id)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "none",
                              }}
                            >
                              <svg
                                width="17"
                                height="19"
                                viewBox="0 0 17 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7.25817 3.26223C5.18709 3.22477 3.15842 4.18701 1.88922 5.95819C1.70425 6.21631 1.52094 6.53382 1.20376 7.08323L1.18119 7.12233C1.17786 7.1281 1.17451 7.13388 1.17116 7.13969C1.13321 7.2053 1.09381 7.27342 1.06371 7.33985C0.77658 7.97356 0.977086 8.72186 1.54261 9.12711C1.60189 9.16959 1.67007 9.20889 1.73574 9.24673C1.74155 9.25008 1.74734 9.25342 1.7531 9.25675L6.89513 12.2255L3.87429 17.4577C3.7017 17.7567 3.80413 18.1389 4.10306 18.3115C4.40199 18.4841 4.78424 18.3817 4.95683 18.0827L7.97766 12.8505L13.1197 15.8192C13.1255 15.8226 13.1312 15.8259 13.1371 15.8293C13.2027 15.8672 13.2708 15.9066 13.3372 15.9367C13.9709 16.2239 14.7192 16.0233 15.1245 15.4578C15.167 15.3985 15.2063 15.3303 15.2441 15.2647C15.2474 15.2589 15.2508 15.2531 15.2541 15.2473L15.2767 15.2082C15.5939 14.6588 15.7772 14.3413 15.9083 14.0521C16.8077 12.0669 16.6265 9.82841 15.5579 8.05336L15.648 7.89728C16.9712 5.60546 16.1859 2.67493 13.8941 1.35175C11.6023 0.0285644 8.67177 0.813798 7.34859 3.10562L7.25817 3.26223ZM8.6225 3.43383C9.02268 3.52846 9.41838 3.66253 9.80425 3.83736C10.0935 3.96842 10.411 4.15174 10.9604 4.46895L12.6624 5.45161C13.2118 5.76878 13.5293 5.95209 13.7874 6.13705C14.1314 6.38356 14.4451 6.65892 14.7269 6.95783C15.4686 5.31884 14.8599 3.35271 13.2691 2.43428C11.6783 1.51579 9.67101 1.9718 8.6225 3.43383ZM7.55856 4.52794C5.7774 4.38439 3.9943 5.16655 2.90527 6.68628C2.76074 6.88797 2.60973 7.14802 2.26372 7.74733C2.23848 7.79105 2.22347 7.81709 2.21247 7.83692C2.20547 7.84954 2.20194 7.85651 2.20194 7.85651C2.16156 7.94661 2.18999 8.05272 2.27002 8.11056C2.27002 8.11056 2.27655 8.11483 2.28892 8.12225C2.30837 8.13393 2.33438 8.14897 2.3781 8.17421L8.06139 11.4555L13.7447 14.7367C13.7884 14.762 13.8144 14.777 13.8343 14.788C13.8461 14.7945 13.8518 14.7974 13.8536 14.7983C13.9441 14.8394 14.0505 14.8105 14.1084 14.7297C14.1063 14.7326 14.1085 14.73 14.1196 14.7115C14.1313 14.6921 14.1463 14.6661 14.1716 14.6223C14.5176 14.023 14.6673 13.7622 14.7697 13.5362C15.5426 11.8303 15.3264 9.89136 14.3071 8.4197C13.9747 7.93989 13.5569 7.50962 13.0593 7.15311C12.8576 7.00858 12.5976 6.85757 11.9983 6.51156L10.3745 5.57406C9.77518 5.22804 9.51438 5.07834 9.28837 4.97594C8.72797 4.72203 8.14328 4.57507 7.55856 4.52794Z"
                                  fill="#2E90FA"
                                />
                              </svg>
                              <span style={{ color: "#2E90FA", marginLeft: 5 }}>
                                Pin
                              </span>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <NoResultIllustration text="No report generated yet" />
                )}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[10, 25, 75]}
              count={dataFiltered.length}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      ) : (
        <Box marginTop={2}>
          {chartData.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                columnGap: 1,
                rowGap: 1,
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  lg: "repeat(2, 1fr)",
                  xxl: "repeat(3, 1fr)",
                },
              }}
            >
              {chartData?.map((chart: any, index: any) => (
                <Box
                  sx={{
                    borderRadius: 2,
                    border: "1px #E4E7EC solid",
                    background: "white",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{ p: 3 }}
                      fontWeight={600}
                      fontSize={18}
                      color="#090816"
                    >
                      {chart.title}
                    </Typography>
                    {chart.status === true ? (
                      <Button
                        onClick={() => handleUnPin(chart.id)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textTransform: "none",
                        }}
                      >
                        <svg
                          width="17"
                          height="19"
                          viewBox="0 0 17 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Pin">
                            <path
                              id="Vector"
                              d="M7.06735 2.86245C8.39053 0.570633 11.3211 -0.2146 13.6129 1.10858C15.9047 2.43176 16.6899 5.3623 15.3668 7.65412L15.2766 7.8102C16.3452 9.58526 16.5265 11.8238 15.627 13.8089C15.496 14.0982 15.3127 14.4156 14.9955 14.965L14.9629 15.0215C14.925 15.0872 14.8857 15.1554 14.8432 15.2147C14.438 15.7802 13.6897 15.9807 13.0559 15.6936C12.9895 15.6635 12.9214 15.6241 12.8558 15.5861L7.69641 12.6073L4.67558 17.8396C4.50299 18.1385 4.12074 18.2409 3.82181 18.0683C3.52288 17.8958 3.42045 17.5135 3.59304 17.2146L6.61388 11.9823L1.45448 9.00357C1.38881 8.96572 1.32064 8.92643 1.26136 8.88395C0.695836 8.4787 0.49533 7.7304 0.782464 7.09669C0.812562 7.03026 0.851956 6.96214 0.8899 6.89654L0.922512 6.84007C1.23969 6.29067 1.423 5.97315 1.60797 5.71503C2.87717 3.94385 4.90585 2.98161 6.97693 3.01907L7.06735 2.86245Z"
                              fill="#090816"
                            />
                          </g>
                        </svg>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePin(chart.id)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textTransform: "none",
                        }}
                      >
                        <svg
                          width="17"
                          height="19"
                          viewBox="0 0 17 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.25817 3.26223C5.18709 3.22477 3.15842 4.18701 1.88922 5.95819C1.70425 6.21631 1.52094 6.53382 1.20376 7.08323L1.18119 7.12233C1.17786 7.1281 1.17451 7.13388 1.17116 7.13969C1.13321 7.2053 1.09381 7.27342 1.06371 7.33985C0.77658 7.97356 0.977086 8.72186 1.54261 9.12711C1.60189 9.16959 1.67007 9.20889 1.73574 9.24673C1.74155 9.25008 1.74734 9.25342 1.7531 9.25675L6.89513 12.2255L3.87429 17.4577C3.7017 17.7567 3.80413 18.1389 4.10306 18.3115C4.40199 18.4841 4.78424 18.3817 4.95683 18.0827L7.97766 12.8505L13.1197 15.8192C13.1255 15.8226 13.1312 15.8259 13.1371 15.8293C13.2027 15.8672 13.2708 15.9066 13.3372 15.9367C13.9709 16.2239 14.7192 16.0233 15.1245 15.4578C15.167 15.3985 15.2063 15.3303 15.2441 15.2647C15.2474 15.2589 15.2508 15.2531 15.2541 15.2473L15.2767 15.2082C15.5939 14.6588 15.7772 14.3413 15.9083 14.0521C16.8077 12.0669 16.6265 9.82841 15.5579 8.05336L15.648 7.89728C16.9712 5.60546 16.1859 2.67493 13.8941 1.35175C11.6023 0.0285644 8.67177 0.813798 7.34859 3.10562L7.25817 3.26223ZM8.6225 3.43383C9.02268 3.52846 9.41838 3.66253 9.80425 3.83736C10.0935 3.96842 10.411 4.15174 10.9604 4.46895L12.6624 5.45161C13.2118 5.76878 13.5293 5.95209 13.7874 6.13705C14.1314 6.38356 14.4451 6.65892 14.7269 6.95783C15.4686 5.31884 14.8599 3.35271 13.2691 2.43428C11.6783 1.51579 9.67101 1.9718 8.6225 3.43383ZM7.55856 4.52794C5.7774 4.38439 3.9943 5.16655 2.90527 6.68628C2.76074 6.88797 2.60973 7.14802 2.26372 7.74733C2.23848 7.79105 2.22347 7.81709 2.21247 7.83692C2.20547 7.84954 2.20194 7.85651 2.20194 7.85651C2.16156 7.94661 2.18999 8.05272 2.27002 8.11056C2.27002 8.11056 2.27655 8.11483 2.28892 8.12225C2.30837 8.13393 2.33438 8.14897 2.3781 8.17421L8.06139 11.4555L13.7447 14.7367C13.7884 14.762 13.8144 14.777 13.8343 14.788C13.8461 14.7945 13.8518 14.7974 13.8536 14.7983C13.9441 14.8394 14.0505 14.8105 14.1084 14.7297C14.1063 14.7326 14.1085 14.73 14.1196 14.7115C14.1313 14.6921 14.1463 14.6661 14.1716 14.6223C14.5176 14.023 14.6673 13.7622 14.7697 13.5362C15.5426 11.8303 15.3264 9.89136 14.3071 8.4197C13.9747 7.93989 13.5569 7.50962 13.0593 7.15311C12.8576 7.00858 12.5976 6.85757 11.9983 6.51156L10.3745 5.57406C9.77518 5.22804 9.51438 5.07834 9.28837 4.97594C8.72797 4.72203 8.14328 4.57507 7.55856 4.52794Z"
                            fill="#090816"
                          />
                        </svg>
                      </Button>
                    )}
                  </Box>

                  <Divider />
                  <ChartComponent
                    chart={chart}
                    chartResponse={chart.result}
                    index={index}
                    xs={"100%"}
                    lg={"100%"}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            <NoResultIllustration text="No report generated yet" />
          )}
        </Box>
      )}
    </Box>
  );
}

function applySortFilter({ chartId, search }: any) {
  if (search) {
    chartId = chartId.filter(
      (item: any) =>
        item.chartData.title.toLowerCase().indexOf(search.toLowerCase()) !==
          -1 ||
        item.chartData.reportType
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
    );
  }
  return chartId;
}
