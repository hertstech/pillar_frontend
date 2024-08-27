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
import { LuLayoutGrid } from "react-icons/lu";
import { FaListUl, FaPlus, FaTrash } from "react-icons/fa";
import { PinIcon, SearchIcon } from "../../../../assets/icons";
import { FaEllipsis } from "react-icons/fa6";
import { useChartApi } from "../../../../hooks/monitoring/chartsAction";

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
  const [page, setPage] = useState(0);
  const [isGrid, setIsGrid] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    showAlert,
    message,
    handlePin,
    handleUnPin,
    deleteChart,
    setShowAlert,
  } = useChartApi();

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

  const onPinHandler = async (id: string) => {
    const success = await handlePin(id);
    if (success) {
      setTimeout(() => {
        setShowAlert(false);
        triggerRefresh();
        navigate("/dashboard/home");
      }, 3000);
    }
  };

  const onUnPinHandler = async (id: string) => {
    const success = await handleUnPin(id);
    if (success) {
      setTimeout(() => {
        setShowAlert(false);
        triggerRefresh();
      }, 3000);
    }
  };

  const onDeleteHandler = async (id: string) => {
    const success = await deleteChart(id);
    if (success) {
      setTimeout(() => {
        setShowAlert(false);
        triggerRefresh();
      }, 3000);
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
            <SearchIcon />
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
              <MenuItem value="All Reports">All Reports</MenuItem>
              <MenuItem value="Pinned">Pinned</MenuItem>
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
                        <TableCell align="left">
                          <Button
                            sx={{
                              borderRadius: "50%",
                              height: "36px",
                              minWidth: "36px",
                            }}
                            onClick={() => handleToggle(`${row.id}`)}
                          >
                            <FaEllipsis />
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
                                    onClick={() => onUnPinHandler(row.id)}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      textTransform: "none",
                                      color: "#2E90FA",
                                    }}
                                    startIcon={<PinIcon />}
                                  >
                                    Unpin
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => onPinHandler(row.id)}
                                    sx={{
                                      display: "flex",

                                      textTransform: "none",
                                      color: "#2E90FA",
                                      width: "100%",
                                      justifyContent: "flex-start",
                                    }}
                                    startIcon={<PinIcon />}
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
                                  startIcon={<FaTrash />}
                                  onClick={() => onDeleteHandler(row.id)}
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
                      <FaEllipsis />

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
                                onClick={() => onUnPinHandler(chart.id)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  textTransform: "none",
                                }}
                                startIcon={<PinIcon />}
                              >
                                Unpin
                              </Button>
                            ) : (
                              <Button
                                onClick={() => onPinHandler(chart.id)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  textTransform: "none",
                                }}
                                startIcon={<PinIcon />}
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
                              startIcon={<FaTrash />}
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
