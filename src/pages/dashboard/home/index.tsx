import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { axiosInstance } from "../../../Utils";
import Page from "../../../components/PageWrapper";
import {
  chartDataState,
  pinnedChartsState,
} from "../../../atoms/monitoring/charts";
import NoResultIllustration from "../../../components/NoResult";
import ChartComponent from "../monitor/ChartComponent";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

export default function Home() {
  const pinnedCharts = useRecoilValue(pinnedChartsState);
  const setChartData = useSetRecoilState(chartDataState);

  console.log("chart data from index:", pinnedCharts);

  const [show, setShow] = useState(false);

  const handleUnPin = async (id: string) => {
    const payLoad = { status: false };
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/chart/status/${id}`,
        payLoad
      );

      if (res.status === 200) {
        setChartData((oldData) =>
          oldData.map((chart) =>
            chart.id === id ? { ...chart, status: false } : chart
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteChart = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/hcp/monitoring/chart/${id}`);

      if (res.status === 200) {
        setChartData((oldData) => oldData.filter((chart) => chart.id !== id));
        // setTimeout(() => {

        //   triggerRefresh();
        // }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = (id: any) => {
    setShow((prevIndex) => (prevIndex === id ? null : id));
  };

  return (
    <Page title="Pinned Reports">
      <Box marginTop={2}>
        {pinnedCharts.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              columnGap: 1,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {pinnedCharts.map((chart: any) => (
              <Box
                key={chart.id}
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
                    p: 2,
                  }}
                >
                  <Typography fontWeight={600} fontSize={18} color="#090816">
                    {chart.title}
                  </Typography>

                  <Button
                    sx={{
                      borderRadius: "50%",
                      height: "36px",
                      minWidth: "36px",
                    }}
                    onClick={() => handleToggle(chart.id)}
                  >
                    <IoEllipsisVertical />
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
                          {chart.status === true && (
                            <Button
                              onClick={() => handleUnPin(chart.id)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "none",
                                color: "#2A2D32",
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
                            onClick={() => deleteChart(chart.id)}
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
                  index={chart.id}
                  xs={"100%"}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <NoResultIllustration text="No report generated yet" />
        )}
      </Box>
    </Page>
  );
}
