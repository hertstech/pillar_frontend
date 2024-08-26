import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchChartData } from "../../services/apis/monitoring/charts";

interface ChartState {
  chartData: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  chartData: [],
  isLoading: false,
  error: null,
};

const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchChartData.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.chartData = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchChartData.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default chartSlice.reducer;
