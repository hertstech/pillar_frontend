import { Box, Typography } from "@mui/material";
import InputField from "../../../../components/InputField";
import Styles from "../../serviceUsers/styles.module.css";
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

const ageRange = [
  { value: [0, 12], label: "0-12" },
  { value: [13, 18], label: "13-18" },
  { value: [19, 29], label: "19-29" },
  { value: [30, 60], label: "30-60" },
  { value: [60, 110], label: "60 and Above" },
];

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

export default function StepThree({ formData, result, handleChange }: any) {
  const options = {
    indexAxis: result.chartType === "INVERSED" ? "y" : "x",
    maintainAspectRatio: false,
    responsive: true,
    // layout: { padding: 10 },
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
          text: "Custom Chart Title",
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
        stacked: result.chartType === "STACKED" ? true : false,
      },
      y: {
        stacked: result.chartType === "STACKED" ? true : false,
      },
    },
  };

  const data = result.result;

  const states = Object.keys(data);

  const datasets: Dataset[] = [];

  states.forEach((state, index) => {
    let colorIndex = index % colors.length;
    Object.keys(data[state]).forEach((key) => {
      const label = ageRange.find((range) => range.label === key)
        ? key
        : data[state][key]
        ? key
        : null;
      if (label) {
        const existingDataset = datasets.find(
          (dataset) => dataset.label === label
        );
        if (existingDataset) {
          existingDataset.data.push(data[state][key]);
        } else {
          datasets.push({
            label: label,
            data: [data[state][key]],
            backgroundColor: colors[colorIndex],
            barPercentage: 1.5,
            barThickness: 30,
            maxBarThickness: 20,
            borderRadius: 5,
          });
        }
      }
      colorIndex = (colorIndex + 1) % colors.length;
    });
  });

  const resData = {
    labels: states,
    datasets: datasets,
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "column",
        marginBottom: 2,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Save Report
        </Typography>
        <span
          style={{
            color: "#101928",
            fontWeight: 400,
          }}
        >
          Select the data fields for your report
        </span>
      </div>

      <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
        {/* <div className="">
          <Typography>Report CSV file</Typography>
          <Box
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "4px",
              display: "flex",
              background: "#F7F9FC",
              borderRadius: 1.5,
              padding: 3,
              borderWidth: "1px",
              mt: 1,
            }}
          >
            <div>
              <span>allergies.CSV</span>
            </div>
            <span style={{ display: "flex", color: "#099250" }}>Open file</span>
          </Box>
        </div> */}

        <div style={{ height: 400, backgroundColor: "#FFF" }}>
          {result.chartType === "BAR" ? (
            // @ts-ignore
            <Bar options={options} data={resData} />
          ) : result.chartType === "PIE" ? (
            // @ts-ignore
            <Pie options={options} data={resData} />
          ) : result.chartType === "LINE" ? (
            // @ts-ignore
            <Line options={options} data={resData} />
          ) : result.chartType === "INVERSED" ? (
            // @ts-ignore
            <Bar options={options} data={resData} />
          ) : result.chartType === "STACKED" ? (
            // @ts-ignore
            <Bar options={options} data={resData} />
          ) : (
            ""
          )}
        </div>

        <InputField
          type="text"
          label="Title"
          name="chartTitle"
          value={formData.chartTitle}
          onChange={(e: any) => handleChange("chartTitle", e.target.value)}
        />

        <label htmlFor="additional notes">
          Description
          <textarea
            className={Styles.area}
            name={`description`}
            rows={5}
            cols={50}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          ></textarea>
        </label>
      </div>
    </Box>
  );
}
