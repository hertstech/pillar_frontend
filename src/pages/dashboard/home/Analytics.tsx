import { Box, Button, Divider, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { axiosInstance } from "../../../Utils";
import {
  chartDataState,
  pinnedChartsState,
} from "../../../atoms/monitoring/charts";
import NoResultIllustration, { SpinLoader } from "../../../components/NoResult";
import ChartComponent from "../monitor/ChartComponent";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { PinIcon } from "../../../../public/assets/Icons";
import { useChartData, useMonitoringData } from "../../../hooks/monitoring";

export default function Analytics() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentChartId, setCurrentChartId] = useState<number | null>(null);

  const pinnedCharts = useRecoilValue(pinnedChartsState);
  const setChartData = useSetRecoilState(chartDataState);

  const { isLoading, chartId } = useMonitoringData();
  const chartData = useChartData(chartId);

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
        setTimeout(() => {
          setChartData((oldData) => oldData.filter((chart) => chart.id !== id));
          // triggerRefresh();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    chartId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentChartId(chartId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    console.log(typeof chartData);
  }, [chartData]);

  return (
    <>
      {isLoading ? (
        <SpinLoader />
      ) : (
        <Box padding={2}>
          {pinnedCharts.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 2,
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
                  <Box className="flex justify-between p-4">
                    <Typography fontWeight={600} fontSize={18} color="#090816">
                      {chart.title}
                    </Typography>

                    <Button
                      sx={{
                        borderRadius: "50%",
                      }}
                      onClick={(event) => handleClick(event, chart.id)}
                    >
                      <IoEllipsisVertical />
                    </Button>
                    <Popover
                      id={id}
                      open={open && currentChartId === chart.id}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <Box
                        sx={{
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
                            startIcon={<PinIcon />}
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
                    </Popover>
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
            <NoResultIllustration text="No report pinned yet" />
          )}
        </Box>
      )}
    </>
  );
}
