import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { BsDropletHalf } from "react-icons/bs";
// import { FaHeartbeat } from "react-icons/fa";
import { GiHeartDrop } from "react-icons/gi";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { ItemLabel } from "../../../components/InputField";
import { axiosInstance } from "../../../Utils/axios";
import { useParams } from "react-router-dom";

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

ChartJS.register(
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip
);

interface client {
  id: string;
  email: string;
  phoneNumber: string;
  address: string;
  lga: string;
  dateOfBirth: Date;
  height: number;
  weight: number;
  HMOPlan: string;
  firstName: string;
  lastName: string;
  state: string;
  gender: string;
  religion: string;
  tribalMarks: string;
  parentOne: string;
  parentOneNumber: string;
  parentOneNHR_ID: string;
  parentOneRelationship: string;
  parentTwo: string;
  parentTwoNumber: string;
  parentTwoNHR_ID: string;
  parentTwoRelationship: string;
  nominatedPharmarcy: string;
  registeredDoctor: string;
  nokFullName: string;
  nokNHR_ID: string;
  nokPhoneNumber: string;
  nokRelationship: string;
}

interface PropType {
  client: client;
}

export default function Overview({ client }: PropType) {
  const { id } = useParams();

  const [temp, setTemp] = React.useState<any>({});

  const [glucose, setGlucose] = React.useState<any>({});

  const [bloodGroup, setBloodGroup] = React.useState<any>({});

  const [genotype, setGenotype] = React.useState<any>({});

  const [pressure, setPressure] = React.useState([]);

  const [pulse, setPulse] = React.useState([]);

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

  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const getOverview = async () => {
      setIsLoading(true);

      try {
        const res1 = await axiosInstance.get(
          `serviceuser-bodytemperature/${id}`
        );
        const res2 = await axiosInstance.get(`serviceuser-glucoselevel/${id}`);
        const res3 = await axiosInstance.get(`serviceuser-bloodgroup/${id}`);
        const res4 = await axiosInstance.get(`serviceuser-genotype/${id}`);
        const res5 = await axiosInstance.get(`serviceuser-pulserate/${id}`);
        const res6 = await axiosInstance.get(`serviceuser-bloodpressure/${id}`);

        setTemp(res1?.data);
        setGlucose(res2?.data);
        setBloodGroup(res3?.data);
        setGenotype(res4?.data);
        setPulse(res5?.data?.result);
        setPressure(res6?.data?.result);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getOverview();
  }, [id]);

  const pressureData = {
    labels: pressure
      ?.reverse()
      .map((x: any) => moment(x.date_created).format("MMM-YYYY")),
    datasets: [
      {
        label: "SYS",
        data: pressure?.map((x: any) => x.systolic),
        fill: false,
        borderColor: "#EF6820",
        pointBorderColor: "#EF6820",
        backgroundColor: "#EF6820",
        tension: 0.1,
      },
      {
        label: "DIA",
        data: pressure?.map((x: any) => x.diasttolic),
        fill: false,
        borderColor: "#444CE7",
        pointBorderColor: "#444CE7",
        backgroundColor: "#444CE7",
        tension: 0.1,
      },
    ],
  };

  const pulseData = {
    labels: pulse
      ?.reverse()
      .map((x: any) => moment(x.date_created).format("MMM-YYYY")),
    datasets: [
      {
        label: "SYS",
        data: pulse?.map((x: any) => x.bpm),
        fill: false,
        borderColor: "#E31B54",
        pointBorderColor: "#E31B54",
        backgroundColor: "#E31B54",
        tension: 0.1,
      },
    ],
  };

  const formattedValue = (value: string) => {
    return value.replace(/-/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const NHRID = formattedValue(client?.id || "");
  return (
    <Box sx={{ mb: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: { xs: "24px" },
            }}
            // gap={3}
          >
            <Stack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  background: "white",
                  borderRadius: 2,
                  border: "1px #E4E7EC solid",
                }}
              >
                <div style={{ padding: 12, borderRight: "1px #F2F4F7 solid" }}>
                  <Avatar />
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        color: "#101928",
                        fontWeight: "600",
                        fontSize: 18,
                      }}
                    >
                      {client?.firstName} {client?.lastName}
                    </span>
                    <span
                      style={{
                        color: "#475367",
                        fontWeight: "400",
                        fontSize: 14,
                        // marginTop: 5,
                      }}
                    >
                      NHR ID: {NHRID}
                    </span>
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 30,
                      justifyContent: "space-between",
                    }}
                  >
                    <ItemLabel
                      isLoading={isLoading}
                      label="Age"
                      text={moment(new Date()).diff(
                        client?.dateOfBirth,
                        "years"
                      )}
                      suffix="Yrs"
                    />
                    <ItemLabel
                      isLoading={isLoading}
                      label="Height"
                      text={client?.height || "N/A"}
                      suffix="cm"
                    />
                    <ItemLabel
                      isLoading={isLoading}
                      label="Weight"
                      text={client?.weight || "N/A"}
                      suffix="kg"
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 30,
                      justifyContent: "space-between",
                    }}
                  >
                    <ItemLabel
                      isLoading={isLoading}
                      label="Date of Birth"
                      text={"15/01/2024"}
                    />

                    <ItemLabel
                      isLoading={isLoading}
                      label="Phone Number"
                      text={client?.phoneNumber}
                    />
                  </div>
                </div>
              </Box>
            </Stack>

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
                  justifyContent: "space-between",
                  border: "1px #F2F4F7 solid",
                  p: 2,
                  gap: 2,
                  background: "white",
                  borderTopLeftRadius: 6,
                }}
              >
                <div className="">
                  <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                    Blood group
                  </Typography>
                  <Typography color={"#344054"} sx={{ my: 1.5 }}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}>
                      {bloodGroup.bloodgroup || "N/A"}
                    </span>
                  </Typography>
                  <Typography
                    fontWeight={400}
                    fontStyle={"italic"}
                    fontSize={12}
                    color={"#101928"}
                  >
                    last: {moment(bloodGroup.date_created).format("l")}{" "}
                    {moment(bloodGroup.date_created).format("LT")}
                  </Typography>
                </div>
                <div className="flex justify-center items-center">
                  <BsDropletHalf color={"#F18264"} size={28} />
                </div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "1px #F2F4F7 solid",
                  p: 2,
                  gap: 2,
                  background: "white",
                  borderTopRightRadius: 6,
                }}
              >
                <div className="">
                  <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                    Genotype
                  </Typography>
                  <Typography color={"#344054"} sx={{ my: 1.5 }}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}>
                      {genotype.genotype || "N/A"}
                    </span>
                  </Typography>
                  <Typography
                    fontWeight={400}
                    fontStyle={"italic"}
                    fontSize={12}
                    color={"#101928"}
                  >
                    last: {moment(genotype.date_created).format("l")}{" "}
                    {moment(genotype.date_created).format("LT")}
                  </Typography>
                </div>
                <div className="flex justify-center items-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="DNA icon 1" clip-path="url(#clip0_1857_5408)">
                      <path
                        id="Vector"
                        d="M9.8743 10.127L10.0398 10.184C12.7556 11.119 16.0264 10.2249 18.3346 7.91666M9.8743 10.127L9.4098 9.96716C6.87503 9.0945 3.82234 9.92891 1.66797 12.0833M9.8743 10.127L9.8173 9.9615C8.8823 7.24567 9.77638 3.97492 12.0846 1.66666M9.8743 10.127L10.0341 10.5915C10.9068 13.1262 10.0724 16.1789 7.91797 18.3333"
                        stroke="#00C3FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        id="Vector_2"
                        d="M8.33284 12.5L9.86876 14.1014M5.63672 9.86942L6.66618 10.8988"
                        stroke="#00C3FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        id="Vector_3"
                        d="M9.87109 5.63721L11.6679 7.5M13.3346 9.16666L14.1031 9.86925"
                        stroke="#00C3FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        id="Vector_4"
                        d="M3.33203 10.8333L6.2487 13.75"
                        stroke="#00C3FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        id="Vector_5"
                        d="M16.4831 9.0755L13.5664 6.15885"
                        stroke="#00C3FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        id="Vector_6"
                        d="M7.75391 15.1595L9.07641 16.482"
                        stroke="#00C3FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        id="Vector_7"
                        d="M12.1545 4.65576L10.832 3.33324"
                        stroke="#00C3FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1857_5408">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "1px #F2F4F7 solid",
                  p: 2,
                  gap: 2,
                  background: "white",
                  borderBottomLeftRadius: 6,
                }}
              >
                <div className="">
                  <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                    Glucose levels
                  </Typography>
                  <Typography color={"#344054"} sx={{ my: 1.5 }}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}>
                      {glucose.mgDl || "N/A"}
                    </span>
                    <span style={{ fontWeight: 400, fontSize: 14 }}>mg/dl</span>
                  </Typography>
                  <Typography
                    fontWeight={400}
                    fontStyle={"italic"}
                    fontSize={12}
                    color={"#101928"}
                  >
                    last: {moment(glucose.date_created).format("l")}{" "}
                    {moment(glucose.date_created).format("LT")}
                  </Typography>
                </div>
                <div className="flex justify-center items-center">
                  <GiHeartDrop color={"#21E0D8"} size={28} />
                </div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "1px #F2F4F7 solid",
                  p: 2,
                  gap: 2,
                  background: "white",
                  borderBottomRightRadius: 6,
                }}
              >
                <div className="">
                  <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                    Body temperature
                  </Typography>
                  <Typography color={"#344054"} sx={{ my: 1.5 }}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}>
                      {temp.reading || "N/A"} {temp.degreeRating || <>&deg;</>}
                    </span>
                  </Typography>
                  <Typography
                    fontWeight={400}
                    fontStyle={"italic"}
                    fontSize={12}
                    color={"#101928"}
                  >
                    last: {moment(temp.date_created).format("l")}{" "}
                    {moment(temp.date_created).format("LT")}
                  </Typography>
                </div>
                <div className="flex justify-center items-center">
                  <FaTemperatureQuarter color={"#4A5BC3"} size={28} />
                </div>
              </Box>
            </Stack>
          </Box>
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

              <div style={{ height: 361, backgroundColor: "#FFF" }}>
                <Line options={options} data={pulseData} />
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

              <div style={{ height: 361, backgroundColor: "#FFF" }}>
                <Line options={options} data={pressureData} />
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
