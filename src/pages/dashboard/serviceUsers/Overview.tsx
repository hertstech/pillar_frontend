import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
// import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { BsDropletHalf } from "react-icons/bs";

const activity = [
  {
    title: "Lisinopril 10 MG Oral Tablet - 10MG",
    prescription: "1 Tablet (10 mg) by mouth daily",
    specialist: "Dr. Smith",
  },
  {
    title: "Lisinopril 10 MG Oral Tablet - 10MG",
    prescription: "1 Tablet (10 mg) by mouth daily",
    specialist: "Dr. Smith",
  },
  {
    title: "Lisinopril 10 MG Oral Tablet - 10MG",
    prescription: "1 Tablet (10 mg) by mouth daily",
    specialist: "Dr. Smith",
  },
];

const Data = {
  labels: ["MON", "TUE", "WED", "THURS", "FRI", "SAT", "SUN"],
  datasets: [
    {
      label: "SYS",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "#EF6820",
      pointBorderColor: "#EF6820",
      backgroundColor: "#EF6820",
      tension: 0.1,
    },
    {
      label: "DIA",
      data: [30, 45, 28, 40, 55, 67, 72],
      fill: false,
      borderColor: "#444CE7",
      pointBorderColor: "#444CE7",
      backgroundColor: "#444CE7",
      tension: 0.1,
    },
  ],
};

ChartJS.register(
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip
);

export default function Overview() {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true },
        position: "top" as const,
        align: "end" as const,
        pointStyle: "circle",
      },
    },
  };
  return (
    <Box sx={{ mb: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                lg: "repeat(2, 1fr)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                borderRadius: 1,
                border: "1px #E4E7EC solid",
                p: 2,
                gap: 2,
                background: "white",
              }}
            >
              <div className="">
                <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                  Blood Group
                </Typography>
                <Typography color={"#344054"} sx={{ my: 1.5 }}>
                  <span style={{ fontWeight: 600, fontSize: 20 }}>O</span>
                  <span style={{ fontWeight: 400, fontSize: 14 }}>-ve</span>
                </Typography>
                <Typography
                  fontWeight={400}
                  fontStyle={"italic"}
                  fontSize={12}
                  color={"#101928"}
                >
                  last: 12/03/2019 • 5:30pm
                </Typography>
              </div>
              <div style={{}}>
                <BsDropletHalf />
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                borderRadius: 1,
                border: "1px #E4E7EC solid",
                p: 2,
                gap: 2,
                background: "white",
              }}
            >
              <div className="">
                <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                  Cholestrol levels
                </Typography>
                <Typography color={"#344054"} sx={{ my: 1.5 }}>
                  <span style={{ fontWeight: 600, fontSize: 20 }}>164</span>
                  <span style={{ fontWeight: 400, fontSize: 14 }}>mg/dl</span>
                </Typography>
                <Typography
                  fontWeight={400}
                  fontStyle={"italic"}
                  fontSize={12}
                  color={"#101928"}
                >
                  last: 12/03/2019 • 5:30pm
                </Typography>
              </div>
              <div style={{}}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="#E4E7EC"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.0003 11.6667C19.6033 11.6667 19.2111 11.7543 18.8518 11.9234L13.581 14.4038C12.4127 14.9536 11.667 16.1286 11.667 17.4199V23.3333C11.667 24.1648 12.1472 24.9215 12.8995 25.2755L18.8518 28.0766C19.2111 28.2457 19.6033 28.3333 20.0003 28.3333C20.3974 28.3333 20.7896 28.2457 21.1488 28.0766L27.1011 25.2755C27.8535 24.9215 28.3337 24.1648 28.3337 23.3333V17.4199C28.3337 16.1286 27.588 14.9536 26.4196 14.4038L21.1488 11.9234C20.7896 11.7543 20.3974 11.6667 20.0003 11.6667ZM26.667 21.985L20.8337 19.0683V13.6171L25.71 15.9118C26.2941 16.1867 26.667 16.7742 26.667 17.4199V21.985ZM20.0003 20.515L26.4456 23.7377C26.4283 23.7487 26.4103 23.7586 26.3915 23.7675L20.4392 26.5686C20.3019 26.6332 20.152 26.6667 20.0003 26.6667C19.8486 26.6667 19.6988 26.6332 19.5615 26.5686L13.6092 23.7675C13.5904 23.7586 13.5723 23.7487 13.5551 23.7377L20.0003 20.515ZM19.167 19.0683L13.3337 21.985V17.4199C13.3337 16.7742 13.7065 16.1867 14.2907 15.9118L19.167 13.6171V19.0683Z"
                    fill="black"
                  />
                </svg>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                borderRadius: 1,
                border: "1px #E4E7EC solid",
                p: 2,
                gap: 2,
                background: "white",
              }}
            >
              <div className="">
                <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                  Glucose levels
                </Typography>
                <Typography color={"#344054"} sx={{ my: 1.5 }}>
                  <span style={{ fontWeight: 600, fontSize: 20 }}> 5.5</span>
                  <span style={{ fontWeight: 400, fontSize: 14 }}>mmol/L</span>
                </Typography>
                <Typography
                  fontWeight={400}
                  fontStyle={"italic"}
                  fontSize={12}
                  color={"#101928"}
                >
                  last: 12/03/2019 • 5:30pm
                </Typography>
              </div>
              <div style={{}}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="#E4E7EC"
                  />
                  <path
                    d="M20.8338 11.6667C20.8338 11.2064 20.4607 10.8333 20.0005 10.8333C19.5402 10.8333 19.1671 11.2064 19.1671 11.6667V12.9167C19.1671 13.3769 19.5402 13.75 20.0005 13.75C20.4607 13.75 20.8338 13.3769 20.8338 12.9167V11.6667Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.1671 20C14.1671 16.7783 16.7788 14.1667 20.0005 14.1667C23.2221 14.1667 25.8338 16.7783 25.8338 20C25.8338 23.2217 23.2221 25.8333 20.0005 25.8333C16.7788 25.8333 14.1671 23.2217 14.1671 20ZM20.0005 15.8333C17.6993 15.8333 15.8338 17.6988 15.8338 20C15.8338 22.3012 17.6993 24.1667 20.0005 24.1667C22.3017 24.1667 24.1671 22.3012 24.1671 20C24.1671 17.6988 22.3017 15.8333 20.0005 15.8333Z"
                    fill="black"
                  />
                  <path
                    d="M20.0005 25.8333C20.4607 25.8333 20.8338 26.2064 20.8338 26.6667V27.9167C20.8338 28.3769 20.4607 28.75 20.0005 28.75C19.5402 28.75 19.1671 28.3769 19.1671 27.9167V26.6667C19.1671 26.2064 19.5402 25.8333 20.0005 25.8333Z"
                    fill="black"
                  />
                  <path
                    d="M25.412 22.9167C25.6421 22.5181 26.1518 22.3815 26.5504 22.6116L27.6329 23.2366C28.0315 23.4668 28.168 23.9764 27.9379 24.375C27.7078 24.7736 27.1981 24.9101 26.7996 24.68L25.717 24.055C25.3184 23.8249 25.1819 23.3152 25.412 22.9167Z"
                    fill="black"
                  />
                  <path
                    d="M25.717 15.945C25.3184 16.1751 25.1819 16.6848 25.412 17.0833C25.6421 17.4819 26.1518 17.6185 26.5504 17.3883L27.6329 16.7633C28.0315 16.5332 28.168 16.0236 27.9379 15.625C27.7078 15.2264 27.1981 15.0899 26.7996 15.32L25.717 15.945Z"
                    fill="black"
                  />
                  <path
                    d="M13.2003 15.1116C12.8018 14.8815 12.2921 15.0181 12.062 15.4167C11.8319 15.8152 11.9684 16.3249 12.367 16.555L13.4495 17.18C13.8481 17.4101 14.3578 17.2736 14.5879 16.875C14.818 16.4764 14.6814 15.9668 14.2829 15.7366L13.2003 15.1116Z"
                    fill="black"
                  />
                  <path
                    d="M12.062 24.5833C11.8319 24.1848 11.9684 23.6751 12.367 23.445L13.4495 22.82C13.8481 22.5899 14.3578 22.7264 14.5879 23.125C14.818 23.5236 14.6814 24.0332 14.2829 24.2633L13.2003 24.8883C12.8018 25.1185 12.2921 24.9819 12.062 24.5833Z"
                    fill="black"
                  />
                </svg>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                borderRadius: 1,
                border: "1px #E4E7EC solid",
                p: 2,
                gap: 2,
                background: "white",
              }}
            >
              <div className="">
                <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                  Glucose levels
                </Typography>
                <Typography color={"#344054"} sx={{ my: 1.5 }}>
                  <span style={{ fontWeight: 600, fontSize: 20 }}> 5.5</span>
                  <span style={{ fontWeight: 400, fontSize: 14 }}>mmol/L</span>
                </Typography>
                <Typography
                  fontWeight={400}
                  fontStyle={"italic"}
                  fontSize={12}
                  color={"#101928"}
                >
                  last: 12/03/2019 • 5:30pm
                </Typography>
              </div>
              <div style={{}}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="#E4E7EC"
                  />
                  <path
                    d="M20.8338 11.6667C20.8338 11.2064 20.4607 10.8333 20.0005 10.8333C19.5402 10.8333 19.1671 11.2064 19.1671 11.6667V12.9167C19.1671 13.3769 19.5402 13.75 20.0005 13.75C20.4607 13.75 20.8338 13.3769 20.8338 12.9167V11.6667Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.1671 20C14.1671 16.7783 16.7788 14.1667 20.0005 14.1667C23.2221 14.1667 25.8338 16.7783 25.8338 20C25.8338 23.2217 23.2221 25.8333 20.0005 25.8333C16.7788 25.8333 14.1671 23.2217 14.1671 20ZM20.0005 15.8333C17.6993 15.8333 15.8338 17.6988 15.8338 20C15.8338 22.3012 17.6993 24.1667 20.0005 24.1667C22.3017 24.1667 24.1671 22.3012 24.1671 20C24.1671 17.6988 22.3017 15.8333 20.0005 15.8333Z"
                    fill="black"
                  />
                  <path
                    d="M20.0005 25.8333C20.4607 25.8333 20.8338 26.2064 20.8338 26.6667V27.9167C20.8338 28.3769 20.4607 28.75 20.0005 28.75C19.5402 28.75 19.1671 28.3769 19.1671 27.9167V26.6667C19.1671 26.2064 19.5402 25.8333 20.0005 25.8333Z"
                    fill="black"
                  />
                  <path
                    d="M25.412 22.9167C25.6421 22.5181 26.1518 22.3815 26.5504 22.6116L27.6329 23.2366C28.0315 23.4668 28.168 23.9764 27.9379 24.375C27.7078 24.7736 27.1981 24.9101 26.7996 24.68L25.717 24.055C25.3184 23.8249 25.1819 23.3152 25.412 22.9167Z"
                    fill="black"
                  />
                  <path
                    d="M25.717 15.945C25.3184 16.1751 25.1819 16.6848 25.412 17.0833C25.6421 17.4819 26.1518 17.6185 26.5504 17.3883L27.6329 16.7633C28.0315 16.5332 28.168 16.0236 27.9379 15.625C27.7078 15.2264 27.1981 15.0899 26.7996 15.32L25.717 15.945Z"
                    fill="black"
                  />
                  <path
                    d="M13.2003 15.1116C12.8018 14.8815 12.2921 15.0181 12.062 15.4167C11.8319 15.8152 11.9684 16.3249 12.367 16.555L13.4495 17.18C13.8481 17.4101 14.3578 17.2736 14.5879 16.875C14.818 16.4764 14.6814 15.9668 14.2829 15.7366L13.2003 15.1116Z"
                    fill="black"
                  />
                  <path
                    d="M12.062 24.5833C11.8319 24.1848 11.9684 23.6751 12.367 23.445L13.4495 22.82C13.8481 22.5899 14.3578 22.7264 14.5879 23.125C14.818 23.5236 14.6814 24.0332 14.2829 24.2633L13.2003 24.8883C12.8018 25.1185 12.2921 24.9819 12.062 24.5833Z"
                    fill="black"
                  />
                </svg>
              </div>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              // borderRadius: 2,
              // border: "1px #E4E7EC solid",
              // background: "white",
              display: "flex",
              flexDirection: "row",
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                borderRadius: 2,
                border: "1px #E4E7EC solid",
                background: "white",
                width: "50%",
              }}
            >
              <Typography
                sx={{ py: 2, px: 3 }}
                fontWeight={600}
                fontSize={18}
                color="#090816"
              >
                Pulse Rate
              </Typography>

              <Divider />

              <div style={{ height: 254, backgroundColor: "#FFF" }}>
                <Line options={options} data={Data} />
              </div>
            </Box>

            <Box
              sx={{
                borderRadius: 2,
                border: "1px #E4E7EC solid",
                background: "white",
                width: "50%",
              }}
            >
              <Typography
                sx={{ py: 2, px: 3 }}
                fontWeight={600}
                fontSize={18}
                color="#090816"
              >
                Blood Pressure
              </Typography>

              <Divider />

              <div style={{ height: 254, backgroundColor: "#FFF" }}>
                <Line options={options} data={Data} />
              </div>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              border: "1px #E4E7EC solid",
              background: "white",
            }}
          >
            <Typography
              sx={{ py: 2, px: 3 }}
              fontWeight={600}
              fontSize={18}
              color="#090816"
            >
              Active Problems
            </Typography>

            <Divider />

            <Box p={3}>
              {activity.map((item, index) => (
                <label
                  key={index}
                  htmlFor="activity"
                  style={{
                    color: "#344054",
                    fontSize: 14,
                    fontWeight: 400,
                    margin: "10px 0px",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{item.title}</span>
                  <Typography
                    sx={{
                      "&::first-letter": {
                        textTransform: "uppercase",
                      },
                    }}
                    marginTop={0.5}
                    fontWeight={400}
                    fontSize={14}
                    color={"#667185"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <span>{item.prescription}</span>{" "}
                    <span>By {item.specialist}</span>
                  </Typography>
                </label>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              border: "1px #E4E7EC solid",
              background: "white",
            }}
          >
            <Typography
              sx={{ py: 2, px: 3 }}
              fontWeight={600}
              fontSize={18}
              color="#090816"
            >
              Recent Incidents
            </Typography>

            <Divider />

            <Box p={3}>
              {activity.map((item, index) => (
                <label
                  key={index}
                  htmlFor="activity"
                  style={{
                    color: "#344054",
                    fontSize: 14,
                    fontWeight: 400,
                    margin: "10px 0px",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{item.title}</span>
                  <Typography
                    sx={{
                      "&::first-letter": {
                        textTransform: "uppercase",
                      },
                    }}
                    marginTop={0.5}
                    fontWeight={400}
                    fontSize={14}
                    color={"#667185"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <span>{item.prescription}</span>{" "}
                    <span>By {item.specialist}</span>
                  </Typography>
                </label>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              border: "1px #E4E7EC solid",
              background: "white",
            }}
          >
            <Typography
              sx={{ py: 2, px: 3 }}
              fontWeight={600}
              fontSize={18}
              color="#090816"
            >
              Repeat Prescriptions
            </Typography>

            <Divider />

            <Box p={3}>
              {activity.map((item, index) => (
                <label
                  key={index}
                  htmlFor="activity"
                  style={{
                    color: "#344054",
                    fontSize: 14,
                    fontWeight: 400,
                    margin: "10px 0px",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{item.title}</span>
                  <Typography
                    sx={{
                      "&::first-letter": {
                        textTransform: "uppercase",
                      },
                    }}
                    marginTop={0.5}
                    fontWeight={400}
                    fontSize={14}
                    color={"#667185"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <span>{item.prescription}</span>{" "}
                    <span>By {item.specialist}</span>
                  </Typography>
                </label>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              border: "1px #E4E7EC solid",
              background: "white",
            }}
          >
            <Typography
              sx={{ py: 2, px: 3 }}
              fontWeight={600}
              fontSize={18}
              color="#090816"
            >
              Allergies
            </Typography>

            <Divider />

            <Box p={3}>
              {activity.map((item, index) => (
                <label
                  key={index}
                  htmlFor="activity"
                  style={{
                    color: "#344054",
                    fontSize: 14,
                    fontWeight: 400,
                    margin: "10px 0px",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{item.title}</span>
                  <Typography
                    sx={{
                      "&::first-letter": {
                        textTransform: "uppercase",
                      },
                    }}
                    marginTop={0.5}
                    fontWeight={400}
                    fontSize={14}
                    color={"#667185"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <span>{item.prescription}</span>{" "}
                    <span>By {item.specialist}</span>
                  </Typography>
                </label>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}