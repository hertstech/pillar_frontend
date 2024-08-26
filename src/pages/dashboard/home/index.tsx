import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import ChartComponent from "../monitor/ChartComponent";
import NoResultIllustration from "../../../components/NoResult";
import { axiosInstance } from "../../../Utils";
import Page from "../../../components/PageWrapper";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export default function Home({ triggerRefresh, chartData }: any) {
  // const chartData = useSelector((state: RootState) => state.charts.chartData);

  console.log("chart data from index:", chartData);

  const [show, setShow] = useState(false);

  const handleUnPin = async (id: string) => {
    const payLoad = { status: false };
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/chart/status/${id}`,
        payLoad
      );

      if (res.status === 200) {
        // setShowAlert(true);
        // setMessage("Item Unpinned success");
        triggerRefresh();
        // setTimeout(() => {
        //   // setShowAlert(false);
        // }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteChart = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/hcp/monitoring/chart/${id}`);

      if (res.status === 200) {
        // setShowAlert(true);
        // setMessage("Item Deleted successfully");

        setTimeout(() => {
          // setShowAlert(false);
          triggerRefresh();
        }, 2000);
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
        {chartData?.filter(
          (result: { status: boolean }) => result?.status === true
        ).length > 0 ? (
          <Box
            sx={{
              display: "grid",
              columnGap: 1,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {chartData
              ?.filter((result: { status: boolean }) => result?.status === true)
              .map((chart: any, index: any) => (
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
                      onClick={() => handleToggle(`${chart.id}`)}
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
                    index={index}
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
