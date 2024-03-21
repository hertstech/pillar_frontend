import { Box, Button, Typography } from "@mui/material";
import { Calendar } from "../../../../components/CalendarField";
import InputField from "../../../../components/InputField";
import { IoPieChart, IoBarChartOutline, IoStatsChart } from "react-icons/io5";
import { FaChartBar, FaChartLine } from "react-icons/fa6";
import { MdOutlineStackedBarChart } from "react-icons/md";
// import { useEffect, useState } from "react";
// import moment from "moment";
const chartType = [
  {
    icon: <IoBarChartOutline size={32} color={"#667185"} />,
    title: "Bar Chart",
  },
  {
    icon: <FaChartBar size={32} color={"#667185"} />,
    title: "Inversed Bar Chart",
  },
  {
    icon: <IoStatsChart size={32} color={"#667185"} />,
    title: "Statistic Chart",
  },
  {
    icon: <MdOutlineStackedBarChart size={32} color={"#667185"} />,
    title: "Stacked Chart",
  },
  {
    icon: <IoPieChart size={32} color={"#667185"} />,
    title: "Pie Chart",
  },
  {
    icon: <FaChartLine size={32} color={"#667185"} />,
    title: "Line Chart",
  },
];
export default function StepTwo({ formData, handleChange }: any) {
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
          Chart Details
        </Typography>
        <span
          style={{
            color: "#101928",
            fontWeight: 400,
          }}
        >
          Select the chart details for your report
        </span>
      </div>

      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <Typography fontWeight={600} color={"#090816"} fontSize={18}>
          Time Period
        </Typography>

        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ width: "50%" }}>
            <Calendar
              label="From"
              value={formData.from}
              disableFuture={false}
              onChange={(newValue: any) =>
                handleChange("from", newValue.format())
              }
            />
          </div>

          <div style={{ width: "50%" }}>
            <Calendar
              label="TO free"
              value={formData.to}
              disableFuture={false}
              onChange={(newValue: any) =>
                handleChange("to", newValue.format())
              }
            />
          </div>
        </div>

        <div className="">
          <Typography>Chart Type</Typography>

          <Box
            sx={{
              display: "grid",
              columnGap: 1.5,
              rowGap: 1.5,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {chartType.map((chart) => (
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  Padding: 3,
                  height: "150px",
                  width: "190px",
                  flexDirection: "column",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#F6FEF9" },
                  border: "1px #E7E9FB solid",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {chart.icon}
                </div>
                <span style={{ color: "#099250", fontFamily: "fontBold" }}>
                  {chart.title}
                </span>
              </Button>
            ))}
          </Box>
        </div>

        <div className="">
          <Typography fontWeight={600} color={"#090816"} fontSize={18}>
            Selected Axis
          </Typography>

          {Object.entries(formData.yAxis).map(([key, value]) => (
            <div key={key}>
              {value !== null &&
                (Array.isArray(value) ? value.length > 0 : true) && (
                  <InputField
                    type="text"
                    label="Y-Axis"
                    name=""
                    // @ts-ignore
                    value={
                      value !== undefined
                        ? Array.isArray(value)
                          ? value.join(", ")
                          : value
                        : ""
                    }
                    onChange={() => {}}
                    disabled
                  />
                )}
            </div>
          ))}

          {Object.entries(formData.xAxis).map(([key, value]) => (
            <div key={key}>
              {value !== null &&
                (Array.isArray(value) ? value.length > 0 : true) && (
                  <InputField
                    type="text"
                    label="X-Axis"
                    name=""
                    // @ts-ignore
                    value={
                      value !== undefined
                        ? Array.isArray(value)
                          ? value.join(", ")
                          : value
                        : ""
                    }
                    onChange={() => {}}
                    disabled
                  />
                )}
            </div>
          ))}

          {/* <InputField
            type="text"
            label="X-Axis"
            name=""
            value={formData.xAxis}
            onChange={() => {}}
            disabled
          /> */}
        </div>
      </div>
    </Box>
  );
}
