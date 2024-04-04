import { Box, Button, Typography } from "@mui/material";
import InputField from "../../../../components/InputField";
import { IoPieChart, IoBarChartOutline, IoStatsChart } from "react-icons/io5";
import { FaChartBar, FaChartLine } from "react-icons/fa6";
import { MdOutlineStackedBarChart } from "react-icons/md";
import moment from "moment";

const chartType = [
  {
    icon: <IoBarChartOutline size={32} color={"#667185"} />,
    title: "Bar Chart",
    type: "BAR",
  },
  {
    icon: <FaChartBar size={32} color={"#667185"} />,
    title: "Inversed Bar Chart",
    type: "INVERSED",
  },
  {
    icon: <IoStatsChart size={32} color={"#667185"} />,
    title: "Statistic Chart",
    type: "STATISTIC",
  },
  {
    icon: <MdOutlineStackedBarChart size={32} color={"#667185"} />,
    title: "Stacked Chart",
    type: "STACKED",
  },
  {
    icon: <IoPieChart size={32} color={"#667185"} />,
    title: "Pie Chart",
    type: "PIE",
  },
  {
    icon: <FaChartLine size={32} color={"#667185"} />,
    title: "Line Chart",
    type: "LINE",
  },
];

export default function StepTwo({ formData, handleChange }: any) {
  const timeFrame = [
    "a day ago",
    "7 days ago",
    "3 months ago",
    "6 months ago",
    "a year ago",
  ];

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
        <div style={{ display: "flex", gap: 10 }}>
          <InputField
            label="From"
            name="startTime"
            type="text"
            disabled
            value={
              formData.duration === "a day ago"
                ? moment().subtract(1, "days").format("DD/MM/YYYY")
                : formData.duration === "7 days ago"
                ? moment().subtract(7, "days").format("DD/MM/YYYY")
                : formData.duration === "3 months ago"
                ? moment().subtract(3, "months").format("DD/MM/YYYY")
                : formData.duration === "6 months ago"
                ? moment().subtract(6, "months").format("DD/MM/YYYY")
                : formData.duration === "a year ago"
                ? moment().subtract(1, "years").format("DD/MM/YYYY")
                : moment(formData.from).format("DD/MM/YYYY")
            }
            onChange={() => {}}
          />

          <InputField
            label="To"
            name="endTime"
            type="text"
            disabled
            value={
              timeFrame.includes(formData.duration)
                ? moment(new Date()).format("DD/MM/YYYY")
                : moment(formData.to).format("DD/MM/YYYY")
            }
            onChange={() => {}}
          />
        </div>

        <div>
          <Typography mb={2}>Chart Type</Typography>

          <Box
            sx={{
              display: "grid",
              columnGap: 1.5,
              rowGap: 1.5,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {chartType.map((chart) => (
              <>
                <Button
                  key={chart.type}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    Padding: 3,
                    height: "150px",
                    width: "150px",
                    flexDirection: "column",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#F6FEF9" },
                    border: "1px #E7E9FB solid",
                    backgroundColor:
                      formData.chartType === chart.type ? "#F6FEF9" : "inherit",
                    margin: "auto",
                    "&.Mui-disabled": {
                      backgroundColor: "#FBEAE9",
                      cursor: "not-allowed",
                      pointerEvents: "auto",
                    },
                  }}
                  disabled={
                    (formData.yAxis.age.length > 1 ||
                      formData.yAxis.gender.length > 1 ||
                      formData.diagnosis.treatmentStatus.length > 1) &&
                    chart.type === "PIE"
                  }
                  onClick={() =>
                    handleChange("chartType", chart.type, "yAxis", chart.type)
                  }
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
                  {/* {disabled && (
                    <Typography fontSize={10} color={"error"}>
                      Cannot render with multiple Variables
                    </Typography>
                  )} */}
                </Button>
              </>
            ))}
          </Box>
        </div>

        <div>
          <Typography fontWeight={600} color={"#090816"} fontSize={18}>
            Selected Axis
          </Typography>

          <InputField
            type="text"
            label="Field 1"
            name=""
            value={formData.state}
            onChange={() => {}}
            disabled
          />

          {Object.entries(formData.yAxis).map(([key, value]) => (
            <div key={key}>
              {value !== null &&
                (Array.isArray(value) ? value.length > 0 : true) && (
                  <InputField
                    type="text"
                    label="Field 2"
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
        </div>
      </div>
    </Box>
  );
}
