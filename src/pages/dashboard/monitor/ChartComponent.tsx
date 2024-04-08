import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  LinearScale,
  ArcElement,
  BarElement,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip
);
interface Dataset {
  label: string;
  data: number[];
  barPercentage: number;
  barThickness: number;
  maxBarThickness: number;
  backgroundColor: string;
  borderRadius: number;
}

const colors = [
  "#F44336",
  "#546E7A",
  "#E91E63",
  "#9C27B0",
  "#6172F3",
  "#FF9C66",
  "#7E36AF",
  "#AAF0C4",
  "#D9534F",
];

export default function ChartComponent({ chart, chartResponse, index }: any) {
  const options = {
    indexAxis: chart.chartType === "INVERSED" ? "y" : "x",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          padding: 10,
        },
        position: "top" as const,
        align: "center" as const,
        pointStyle: "circle",
        title: {
          display: true,
          text: index && !!index ? chart?.title : "",
          padding: {
            top: 10,
          },
        },
      },
    },
    element: {
      bar: {
        borderRadius: 12,
      },
    },
    scales: {
      x: {
        stacked: chart.chartType === "STACKED" ? true : false,
        ticks: {
          stepSize: 1,
        },
        beginAtZero: true,
      },
      y: {
        stacked: chart.chartType === "STACKED" ? true : false,
        ticks: {
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
  };

  const states = Object.keys(chartResponse);

  const datasets: Dataset[] = [];

  const labels = Object.keys(chartResponse);
  const dataz = labels.map((state) =>
    Object.values(chartResponse[state]).reduce(
      (acc: any, val: any) => acc + val,
      0
    )
  );
  const backgroundColors = colors.slice(0, labels.length);

  Object.keys(chartResponse).forEach((state, index) => {
    let colorIndex = index % colors.length;
    Object.entries(chartResponse[state]).forEach(([label, value]: any) => {
      const existingDataset = datasets.find(
        (dataset) => dataset.label === label
      );
      if (existingDataset) {
        existingDataset.data.push(value);
      } else {
        datasets.push({
          label: label,
          data: [value],
          backgroundColor: colors[colorIndex],
          barPercentage: 1.5,
          barThickness: 30,
          maxBarThickness: 20,
          borderRadius: 5,
        });
      }
      colorIndex = (colorIndex + 1) % colors.length;
    });
  });

  const barData = {
    labels: states,
    datasets: datasets,
  };

  const pieData = {
    labels: labels,
    datasets: [
      {
        data: dataz,
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          height: 320,
          backgroundColor: "#FFF",
          width: "400px",
        }}
      >
        {chart.chartType === "BAR" ? (
          // @ts-ignore
          <Bar options={options} data={barData} />
        ) : chart.chartType === "PIE" ? (
          // @ts-ignore
          <Pie options={options} data={pieData} />
        ) : chart.chartType === "LINE" ? (
          // @ts-ignore
          <Line options={options} data={barData} />
        ) : chart.chartType === "INVERSED" ? (
          // @ts-ignore
          <Bar options={options} data={barData} />
        ) : chart.chartType === "STACKED" ? (
          // @ts-ignore
          <Bar options={options} data={barData} />
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
