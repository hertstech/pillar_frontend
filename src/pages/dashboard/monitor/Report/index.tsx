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
import { Link, useNavigate } from "react-router-dom";
import ChartComponent from "../ChartComponent";
import { TableHeadCustom } from "../../../../components/UserTable/TableHeadCustom";
import moment from "moment";
import { axiosInstance } from "../../../../Utils";
import { LuLayoutGrid } from "react-icons/lu";
import { FaListUl, FaPlus } from "react-icons/fa";

const TABLE_HEAD = [
  { id: "name", label: "Report Name", align: "left" },
  { id: "type", label: "Report Type", align: "left" },
  { id: "date", label: "Date Created", align: "center" },
  { id: "action", label: "Action", align: "center" },
];

export default function Report({ chartId, chartData, triggerRefresh }: any) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [message, setMessage] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log("chart ids report;", chartId);

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
          navigate("/dashboard/home");
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

  const deleteChart = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/hcp/monitoring/chart/${id}`);

      if (res.status === 200) {
        setShowAlert(true);
        setMessage("Item Deleted successfully");

        setTimeout(() => {
          setShowAlert(false);
          triggerRefresh();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = (id: any) => {
    setShow((prevIndex) => (prevIndex === id ? null : id));
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
              fontSize: 22,
              fontFamily: "fontBold",
            }}
          >
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
              endIcon={<LuLayoutGrid />}
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
              endIcon={<FaListUl />}
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
          <FaPlus className="px-2" />
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
                        <TableCell align="right">
                          <Button
                            sx={{
                              borderRadius: "50%",
                              height: "36px",
                              minWidth: "36px",
                            }}
                            onClick={() => handleToggle(`${row.id}`)}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Teeny icon / more-vertical">
                                <g id="Vector">
                                  <path
                                    d="M9.99969 4.00029C9.63149 4.00029 9.33301 3.7018 9.33301 3.33361C9.33301 2.96541 9.63149 2.66693 9.99969 2.66693C10.3679 2.66693 10.6664 2.96541 10.6664 3.33361C10.6664 3.7018 10.3679 4.00029 9.99969 4.00029Z"
                                    stroke="#545C68"
                                    stroke-width="1.33336"
                                  />
                                  <path
                                    d="M9.99969 10.6671C9.63149 10.6671 9.33301 10.3686 9.33301 10.0004C9.33301 9.63221 9.63149 9.33373 9.99969 9.33373C10.3679 9.33373 10.6664 9.63221 10.6664 10.0004C10.6664 10.3686 10.3679 10.6671 9.99969 10.6671Z"
                                    stroke="#545C68"
                                    stroke-width="1.33336"
                                  />
                                  <path
                                    d="M9.99969 17.3339C9.63149 17.3339 9.33301 17.0354 9.33301 16.6672C9.33301 16.299 9.63149 16.0005 9.99969 16.0005C10.3679 16.0005 10.6664 16.299 10.6664 16.6672C10.6664 17.0354 10.3679 17.3339 9.99969 17.3339Z"
                                    stroke="#545C68"
                                    stroke-width="1.33336"
                                  />
                                </g>
                              </g>
                            </svg>
                          </Button>

                          <>
                            {show === row.id && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  zIndex: 1,
                                  background: "white",
                                  border: "1px #F2F4F7 solid",
                                  borderRadius: 2,
                                  marginTop: "-34px",
                                  right: "50px",
                                  // width: "160px",
                                  p: 1,
                                }}
                              >
                                {row.chartData.status === true ? (
                                  <Button
                                    onClick={() => handleUnPin(row.id)}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      textTransform: "none",
                                      color: "#2E90FA",
                                    }}
                                    startIcon={
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
                                    }
                                  >
                                    Unpin
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handlePin(row.id)}
                                    sx={{
                                      display: "flex",
                                      // alignItems: "center",
                                      textTransform: "none",
                                      color: "#2E90FA",
                                      width: "100%",
                                      justifyContent: "flex-start",
                                    }}
                                    startIcon={
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
                                    }
                                  >
                                    Pin
                                  </Button>
                                )}

                                <Button
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    textTransform: "none",
                                    color: "#CB1A14",
                                    justifyContent: "flex-start",
                                  }}
                                  startIcon={
                                    <svg
                                      width="15"
                                      height="18"
                                      viewBox="0 0 15 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g id="Delete 2">
                                        <g id="Vector">
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M7.50065 0.0410156C5.31452 0.0410156 3.54232 1.81322 3.54232 3.99935V4.20768H0.833984C0.488806 4.20768 0.208984 4.4875 0.208984 4.83268C0.208984 5.17786 0.488806 5.45768 0.833984 5.45768H14.1673C14.5125 5.45768 14.7923 5.17786 14.7923 4.83268C14.7923 4.4875 14.5125 4.20768 14.1673 4.20768H11.459V3.99935C11.459 1.81322 9.68678 0.0410156 7.50065 0.0410156ZM7.50065 1.29102C8.99642 1.29102 10.209 2.50358 10.209 3.99935V4.20768H4.79232V3.99935C4.79232 2.50358 6.00488 1.29102 7.50065 1.29102Z"
                                            fill="#CB1A14"
                                          />
                                          <path
                                            d="M2.28952 6.44023C2.25687 6.0966 1.95183 5.8445 1.6082 5.87715C1.26457 5.9098 1.01247 6.21484 1.04512 6.55847C1.12384 7.38703 1.26592 8.40794 1.44855 9.72023L1.68317 11.4061C1.90748 13.0184 2.03469 13.9328 2.3099 14.6818C2.82207 16.0759 3.73569 17.1934 4.9107 17.6892C5.54876 17.9585 6.27859 17.9582 7.36509 17.9577H7.63621C8.72271 17.9582 9.45254 17.9585 10.0906 17.6892C11.2656 17.1934 12.1792 16.0759 12.6914 14.6818C12.9666 13.9328 13.0938 13.0184 13.3181 11.4061L13.5527 9.72025C13.7354 8.40795 13.8775 7.38703 13.9562 6.55847C13.9888 6.21484 13.7367 5.9098 13.3931 5.87715C13.0495 5.8445 12.7444 6.0966 12.7118 6.44023C12.6359 7.23853 12.4977 8.23271 12.3126 9.56278L12.094 11.1336C11.8519 12.8733 11.741 13.644 11.5181 14.2507C11.0882 15.4209 10.3733 16.2132 9.60462 16.5375C9.22945 16.6959 8.77496 16.7077 7.50065 16.7077C6.22635 16.7077 5.77185 16.6959 5.39668 16.5375C4.62798 16.2132 3.91312 15.4209 3.48321 14.2507C3.26028 13.644 3.14941 12.8733 2.9073 11.1336L2.68869 9.56278C2.50358 8.23271 2.36537 7.23854 2.28952 6.44023Z"
                                            fill="#CB1A14"
                                          />
                                          <path
                                            d="M6.45898 7.33268C6.45898 6.9875 6.17916 6.70768 5.83398 6.70768C5.48881 6.70768 5.20898 6.9875 5.20898 7.33268V13.9993C5.20898 14.3445 5.48881 14.6243 5.83398 14.6243C6.17916 14.6243 6.45898 14.3445 6.45898 13.9993V7.33268Z"
                                            fill="#CB1A14"
                                          />
                                          <path
                                            d="M9.79232 7.33268C9.79232 6.9875 9.5125 6.70768 9.16732 6.70768C8.82214 6.70768 8.54232 6.9875 8.54232 7.33268V13.9993C8.54232 14.3445 8.82214 14.6243 9.16732 14.6243C9.5125 14.6243 9.79232 14.3445 9.79232 13.9993V7.33268Z"
                                            fill="#CB1A14"
                                          />
                                        </g>
                                      </g>
                                    </svg>
                                  }
                                  onClick={() => deleteChart(row.id)}
                                >
                                  Delete
                                </Button>
                              </Box>
                            )}
                          </>
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
                      alignItems: "center",
                      p: 2,
                    }}
                  >
                    <Typography fontWeight={600} fontSize={18} color="#090816">
                      {chart?.title}
                    </Typography>

                    <Button
                      sx={{
                        borderRadius: "50%",
                        height: "36px",
                        minWidth: "36px",
                      }}
                      onClick={() => handleToggle(index)}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Teeny icon / more-vertical">
                          <g id="Vector">
                            <path
                              d="M9.99969 4.00029C9.63149 4.00029 9.33301 3.7018 9.33301 3.33361C9.33301 2.96541 9.63149 2.66693 9.99969 2.66693C10.3679 2.66693 10.6664 2.96541 10.6664 3.33361C10.6664 3.7018 10.3679 4.00029 9.99969 4.00029Z"
                              stroke="#545C68"
                              stroke-width="1.33336"
                            />
                            <path
                              d="M9.99969 10.6671C9.63149 10.6671 9.33301 10.3686 9.33301 10.0004C9.33301 9.63221 9.63149 9.33373 9.99969 9.33373C10.3679 9.33373 10.6664 9.63221 10.6664 10.0004C10.6664 10.3686 10.3679 10.6671 9.99969 10.6671Z"
                              stroke="#545C68"
                              stroke-width="1.33336"
                            />
                            <path
                              d="M9.99969 17.3339C9.63149 17.3339 9.33301 17.0354 9.33301 16.6672C9.33301 16.299 9.63149 16.0005 9.99969 16.0005C10.3679 16.0005 10.6664 16.299 10.6664 16.6672C10.6664 17.0354 10.3679 17.3339 9.99969 17.3339Z"
                              stroke="#545C68"
                              stroke-width="1.33336"
                            />
                          </g>
                        </g>
                      </svg>

                      <>
                        {show === chart.id && (
                          <Box
                            sx={{
                              position: "absolute",
                              zIndex: 1,
                              background: "white",
                              border: "1px #F2F4F7 solid",
                              borderRadius: 2,
                              width: "120px",
                              top: "53px",
                              right: "-16px",
                              p: 1,
                            }}
                          >
                            {chart.status === true ? (
                              <Button
                                onClick={() => handleUnPin(chart.id)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  textTransform: "none",
                                }}
                                startIcon={
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
                                }
                              >
                                Unpin
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handlePin(chart.id)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  textTransform: "none",
                                }}
                                startIcon={
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
                                }
                              >
                                Pin
                              </Button>
                            )}
                            <Button
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "none",
                                color: "#CB1A14",
                                justifyContent: "flex-start",
                              }}
                              startIcon={
                                <svg
                                  width="15"
                                  height="18"
                                  viewBox="0 0 15 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="Delete 2">
                                    <g id="Vector">
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M7.50065 0.0410156C5.31452 0.0410156 3.54232 1.81322 3.54232 3.99935V4.20768H0.833984C0.488806 4.20768 0.208984 4.4875 0.208984 4.83268C0.208984 5.17786 0.488806 5.45768 0.833984 5.45768H14.1673C14.5125 5.45768 14.7923 5.17786 14.7923 4.83268C14.7923 4.4875 14.5125 4.20768 14.1673 4.20768H11.459V3.99935C11.459 1.81322 9.68678 0.0410156 7.50065 0.0410156ZM7.50065 1.29102C8.99642 1.29102 10.209 2.50358 10.209 3.99935V4.20768H4.79232V3.99935C4.79232 2.50358 6.00488 1.29102 7.50065 1.29102Z"
                                        fill="#CB1A14"
                                      />
                                      <path
                                        d="M2.28952 6.44023C2.25687 6.0966 1.95183 5.8445 1.6082 5.87715C1.26457 5.9098 1.01247 6.21484 1.04512 6.55847C1.12384 7.38703 1.26592 8.40794 1.44855 9.72023L1.68317 11.4061C1.90748 13.0184 2.03469 13.9328 2.3099 14.6818C2.82207 16.0759 3.73569 17.1934 4.9107 17.6892C5.54876 17.9585 6.27859 17.9582 7.36509 17.9577H7.63621C8.72271 17.9582 9.45254 17.9585 10.0906 17.6892C11.2656 17.1934 12.1792 16.0759 12.6914 14.6818C12.9666 13.9328 13.0938 13.0184 13.3181 11.4061L13.5527 9.72025C13.7354 8.40795 13.8775 7.38703 13.9562 6.55847C13.9888 6.21484 13.7367 5.9098 13.3931 5.87715C13.0495 5.8445 12.7444 6.0966 12.7118 6.44023C12.6359 7.23853 12.4977 8.23271 12.3126 9.56278L12.094 11.1336C11.8519 12.8733 11.741 13.644 11.5181 14.2507C11.0882 15.4209 10.3733 16.2132 9.60462 16.5375C9.22945 16.6959 8.77496 16.7077 7.50065 16.7077C6.22635 16.7077 5.77185 16.6959 5.39668 16.5375C4.62798 16.2132 3.91312 15.4209 3.48321 14.2507C3.26028 13.644 3.14941 12.8733 2.9073 11.1336L2.68869 9.56278C2.50358 8.23271 2.36537 7.23854 2.28952 6.44023Z"
                                        fill="#CB1A14"
                                      />
                                      <path
                                        d="M6.45898 7.33268C6.45898 6.9875 6.17916 6.70768 5.83398 6.70768C5.48881 6.70768 5.20898 6.9875 5.20898 7.33268V13.9993C5.20898 14.3445 5.48881 14.6243 5.83398 14.6243C6.17916 14.6243 6.45898 14.3445 6.45898 13.9993V7.33268Z"
                                        fill="#CB1A14"
                                      />
                                      <path
                                        d="M9.79232 7.33268C9.79232 6.9875 9.5125 6.70768 9.16732 6.70768C8.82214 6.70768 8.54232 6.9875 8.54232 7.33268V13.9993C8.54232 14.3445 8.82214 14.6243 9.16732 14.6243C9.5125 14.6243 9.79232 14.3445 9.79232 13.9993V7.33268Z"
                                        fill="#CB1A14"
                                      />
                                    </g>
                                  </g>
                                </svg>
                              }
                            >
                              Delete
                            </Button>
                          </Box>
                        )}
                      </>
                    </Button>
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
