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
  "#6172F3",
  "#8098F9",
  "#A4BCFD",
  "#C7D7FE",
  "#E0EAFF",
  "#EEF4FF",
];

export default function ChartComponent({
  chart,
  chartResponse,
  index,
  xs,
  lg,
  xl,
  md,
}: any) {
  const options = {
    indexAxis: chart?.chartType === "INVERSED" ? "y" : "x",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          padding: 10,
          align: "left" as const,
        },
        position: "top" as const,
        align: "start" as const,
        pointStyle: "circle",
        title: {
          // display: true,
          text: index === index ? chart?.title : "",
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
        stacked: chart?.chartType === "STACKED",
        ticks: {
          stepSize: 1,
        },
        grid: {
          display: false,
        },
        beginAtZero: true,
        grace: 1,
      },
      y: {
        stacked: chart?.chartType === "STACKED",
        ticks: {
          stepSize: 1,
          crossAlign: "start",
        },
        grid: {
          display: false,
        },
        beginAtZero: true,
        grace: 1,
      },
    },
  };

  const states = Object?.keys(chartResponse);

  const datasets: Dataset[] = [];

  const labels = Object?.keys(chartResponse);

  const dataz = labels?.map((state) =>
    Object?.values(chartResponse[state]).reduce(
      (acc: any, val: any) => acc + val,
      0
    )
  );
  const backgroundColors = colors.slice(0, labels.length);

  const uniqueLabels = new Set();
  Object.keys(chartResponse).forEach((state, index) => {
    let colorIndex = index % colors.length;

    Object.entries(chartResponse[state]).forEach(([label, value]: any) => {
      const capitalizedLabel =
        label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();

      if (!uniqueLabels.has(capitalizedLabel)) {
        uniqueLabels.add(capitalizedLabel);

        datasets.push({
          label: capitalizedLabel,
          data: [value],
          backgroundColor: colors[colorIndex],
          barPercentage: 1.5,
          barThickness: 30,
          maxBarThickness: 40,
          borderRadius: 3,
        });
      } else {
        const existingDataset = datasets.find(
          (dataset) => dataset.label === capitalizedLabel
        );
        if (existingDataset) {
          existingDataset.data.push(value);
        }
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
          width: { xs: xs, lg: lg, xl: xl, md: md },
          padding: 2,
        }}
      >
        {chart?.chartType === "BAR" ? (
          // @ts-ignore
          <Bar options={options} data={barData} />
        ) : chart?.chartType === "PIE" ? (
          // @ts-ignore
          <Pie options={options} data={pieData} />
        ) : chart?.chartType === "LINE" ? (
          // @ts-ignore
          <Line options={options} data={barData} />
        ) : chart?.chartType === "INVERSED" ? (
          // @ts-ignore
          <Bar options={options} data={barData} />
        ) : chart?.chartType === "STACKED" ? (
          // @ts-ignore
          <Bar options={options} data={barData} />
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
