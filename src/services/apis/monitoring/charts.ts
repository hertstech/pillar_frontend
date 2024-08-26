import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../Utils";
import { AxiosResponse } from "axios";
import { setMonitoringData } from "../../../redux/dashboardSlices/monitoringSlice";

export interface IMonitoringState {
  data: any[];
  chartId: any[];
  isLoading: boolean;
  error: string | null;
}

export const fetchChartData = createAsyncThunk<any[], string[]>(
  "charts/fetchChartData",
  async (chartIds, { rejectWithValue }) => {
    try {
      const fetchDataPromise = chartIds.map(async (id) => {
        const res = await axiosInstance.get(`/hcp/monitoring/get/charts/${id}`);
        return res.data;
      });

      const allData = await Promise.all(fetchDataPromise);
      return allData;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMonitoringData = createAsyncThunk<IMonitoringState, void>(
  "monitoring/fetchMonitoringData",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const [res, resp]: [any, AxiosResponse<any, any>] = await Promise.all([
        axiosInstance.get("/hcp/tenet/activity"),
        axiosInstance.get("/hcp/monitoring/charts/"),
      ]);

      dispatch(setMonitoringData({ data: res.data, chartId: resp.data }));

      const chartIds = resp.data.map((item: { id: string }) => item.id);
      dispatch(fetchChartData(chartIds));

      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
