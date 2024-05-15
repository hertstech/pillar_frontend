import { Box, Typography } from "@mui/material";
// import InputField from "../../../../components/InputField";
// import Styles from "../../serviceUsers/styles.module.css";
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
  "#560BAD",
  "#F72585",
  "#32DDFF",
  "#17ACB5",
  "#3F37C9",
  "#0003EB",
];

export default function StepThree({ result }: any) {
  const options = {
    indexAxis: result.chartType === "INVERSED" ? "y" : "x",
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
        ticks: {
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
  };

  const data = result.result;

  const states = Object.keys(data);

  const datasets: Dataset[] = [];

  const labels = Object.keys(data);
  const dataz = labels.map((state) =>
    Object.values(data[state]).reduce((acc: any, val: any) => acc + val, 0)
  );
  const backgroundColors = colors.slice(0, labels.length);

  Object.keys(data).forEach((state, index) => {
    let colorIndex = index % colors.length;
    Object.entries(data[state]).forEach(([label, value]: any) => {
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

  const resData = {
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

        <div
          style={{
            height: 400,
            backgroundColor: "#FFF",
            margin: "auto",
            width: "600px",
          }}
        >
          {result.chartType === "BAR" ? (
            // @ts-ignore
            <Bar options={options} data={resData} />
          ) : result.chartType === "PIE" ? (
            // @ts-ignore
            <Pie data={pieData} />
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

        {/* <InputField
          type="text"
          label="Title"
          name="title"
          value={formData.title}
          onChange={(e: any) => handleChange("title", e.target.value)}
        />

        <label htmlFor="additional notes">
          Description
          <textarea
            className={Styles.area}
            name={`description`}
            rows={5}
            cols={50}
            value={formData.description}
            onChange={(e: any) => handleChange("description", e.target.value)}
          ></textarea>
        </label> */}
      </div>
    </Box>
  );
}
