import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMonitoringData,
  IMonitoringState,
} from "../../services/apis/monitoring/charts";

const initialState: IMonitoringState = {
  data: [],
  chartId: [],
  isLoading: false,
  error: null,
};

const monitoringSlice = createSlice({
  name: "monitoring",
  initialState,
  reducers: {
    setMonitoringData(
      state,
      action: PayloadAction<{ data: any[]; chartId: string[] }>
    ) {
      state.data = action.payload.data;
      state.chartId = action.payload.chartId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonitoringData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMonitoringData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchMonitoringData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setMonitoringData } = monitoringSlice.actions;

export default monitoringSlice.reducer;
