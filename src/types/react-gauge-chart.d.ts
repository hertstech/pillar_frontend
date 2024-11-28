declare module "react-gauge-chart" {
  import { FC } from "react";

  interface GaugeChartProps {
    id?: string;
    arcsLength?: number[];
    colors?: string[];
    percent?: number;
    arcPadding?: number;
    arcWidth?: number;
    needleScale?: number;
    cornerRadius?: number;
    textColor?: string;
    textComponent?: JSX.Element;
  }

  const GaugeChart: FC<GaugeChartProps>;
  export default GaugeChart;
}
