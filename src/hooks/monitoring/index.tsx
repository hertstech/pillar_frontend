import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  dataState,
  chartIdState,
  chartDataState,
} from "../../atoms/monitoring/charts";
import { axiosInstance } from "../../Utils";

export const useMonitoringData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useRecoilState(dataState);
  const [chartId, setChartId] = useRecoilState(chartIdState);

  const getMonitoring = async () => {
    setIsLoading(true);
    try {
      const [res, resp] = await Promise.all([
        axiosInstance.get("/hcp/tenet/activity"),
        axiosInstance.get(`/hcp/monitoring/charts/`),
      ]);
      setData(res.data);
      setChartId(resp.data);
    } catch (error) {
      console.error("Error fetching monitoring data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMonitoring();
  }, []);

  return { isLoading, data, chartId, getMonitoring };
};

export const useChartData = (chartId: any) => {
  const [chartData, setChartData] = useRecoilState(chartDataState);

  const getAllChart = async () => {
    try {
      const fetchDataPromise = chartId.map(async (item: any) => {
        try {
          const res = await axiosInstance.get(
            `/hcp/monitoring/get/charts/${item.id}`
          );
          return res.data;
        } catch (error) {
          console.error(`Error fetching chart with ID ${item.id}:`, error);
          return null;
        }
      });

      const allData = await Promise.all(fetchDataPromise);
      setChartData(allData);
    } catch (error) {
      console.error("Error fetching charts:", error);
    }
  };

  useEffect(() => {
    if (chartId.length > 0) {
      getAllChart();
    }
  }, [chartId]);

  return chartData;
};
