import {
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
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
import { axiosInstance } from "../../../Utils";
import { useParams } from "react-router-dom";
import { ItemLabel } from "../../../components/InputField";
// import Avatars from "../../../components/Avatar";

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

interface allergyResponse {
  reaction: string;
  reactionType: string;
  substance: string;
  date_created: string;
}

interface activeProblemsResponse {
  primaryDiagnosis: string;
  severity: string;
  date_created: string;
  title: string;
  reading: string;
  treatmentStatus: string;
}

interface prescriptionResponse {
  medicationName: string;
  dosage: string;
  startDate: string;
  endDate: string;
  prescriber: string;
  frequencyType: string;
  frequencyNumber: string;
  dosagemeasurement: string;
  medicationRoute: string;
}

interface incidentResponse {
  message: string;
  date_created: string;
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

  const [activeProblems, setActiveProblems] = React.useState<
    activeProblemsResponse[]
  >([]);

  const [recentIncident, setRecentIncident] = React.useState<
    incidentResponse[]
  >([]);

  const [repeatedPrescription, setRepeatedPrescription] = React.useState<
    prescriptionResponse[]
  >([]);

  const [allergies, setAllergies] = React.useState<allergyResponse[]>([]);

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
        const [res1, res2, res3, res4, res5, res6, res7, res8, res9, res0] =
          await Promise.all([
            axiosInstance.get(`serviceuser-bodytemperature/${id}`),
            axiosInstance.get(`serviceuser-glucoselevel/${id}`),
            axiosInstance.get(`serviceuser-bloodgroup/${id}`),
            axiosInstance.get(`serviceuser-genotype/${id}`),
            axiosInstance.get(`serviceuser-pulserate/${id}`),
            axiosInstance.get(`serviceuser-bloodpressure/${id}`),
            axiosInstance.get(`serviceuser-active-problems/${id}`),
            axiosInstance.get(`serviceuser-recent-incidents/${id}`),
            axiosInstance.get(`get-serviceuser-repeated-prescription/${id}`),
            axiosInstance.get(`get-serviceuser-allergies/${id}`),
          ]);

        setTemp(res1?.data);
        setGlucose(res2?.data);
        setBloodGroup(res3?.data);
        setGenotype(res4?.data);
        setPulse(res5?.data);
        setPressure(res6?.data);
        setActiveProblems(res7?.data);
        setRecentIncident(res8?.data);
        setRepeatedPrescription(res9?.data.repeatedprescription);
        setAllergies(res0?.data);

        setIsLoading(false);
      } catch (errors) {
        // Handle errors individually if needed
        console.error(errors);
      }
    };

    getOverview();
  }, [id]);

  const pressureData = {
    labels: pressure
      ? pressure
          ?.reverse()
          .map((x: any) => moment(x.date_created).format("MMM-YYYY"))
      : [],
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
        label: "Pulse",
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
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: { xs: "24px" },
            }}
          >
            <Stack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  background: "white",
                  borderRadius: 2,
                  border: "1px #E4E7EC solid",
                  // justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    padding: 12,
                    borderRight: "1px #F2F4F7 solid",
                    width: "40%",
                  }}
                >
                  <Avatar sx={{ height: "100px", width: "100px" }} />

                  <Typography
                    sx={{
                      // display: "grid",
                      // placeContent: "center",
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
                    width: "60%",
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
                      // justifyContent: "space-between",
                    }}
                  >
                    <ItemLabel
                      isLoading={isLoading}
                      label="Date of Birth"
                      text={moment(client?.dateOfBirth).format("DD/MM/YYYY")}
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
                gap: 2,
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
                  borderRadius: 2,
                }}
              >
                <div className="">
                  <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                    Blood group
                  </Typography>
                  <Typography color={"#344054"} sx={{ my: 1.5 }}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}>
                      {bloodGroup.bloodType || "N/A"}
                    </span>
                  </Typography>
                  <Typography
                    fontWeight={400}
                    fontStyle={"italic"}
                    fontSize={12}
                    color={"#101928"}
                  >
                    last: {moment(bloodGroup.date_created).format("DD/MM/YYYY")}{" "}
                    {moment(bloodGroup.date_created).format("LT")}
                  </Typography>
                </div>
                <div className="flex justify-center items-center">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.552 3.36039C12.128 2.75439 12.5 2.40039 12.5 2.40039C12.63 2.83639 12.78 3.25039 12.945 3.64639C13.919 5.98139 15.433 7.66639 16.781 9.16639C18.353 10.9164 19.7 12.4144 19.7 14.4004C19.7 16.3099 18.9415 18.1413 17.5912 19.4916C16.241 20.8418 14.4096 21.6004 12.5 21.6004C10.5905 21.6004 8.75914 20.8418 7.40888 19.4916C6.05862 18.1413 5.30005 16.3099 5.30005 14.4004C5.30005 10.4024 9.59605 5.42039 11.552 3.36039ZM12.047 4.58639C11.2767 5.42005 10.5446 6.28828 9.85305 7.18839C8.98005 8.32839 8.12905 9.59839 7.50005 10.8724C6.86505 12.1604 6.50005 13.3664 6.50005 14.4004C6.50005 14.4004 9.50005 16.2004 12.5 15.0004C15.5 13.8004 18.5 14.4004 18.5 14.4004C18.5 12.9604 17.545 11.8124 15.883 9.96039L15.847 9.92239C14.6 8.53239 13.1 6.86639 12.047 4.58639Z"
                      fill="#98A2B3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.36298 11.7316C9.34698 9.76159 10.423 8.42759 10.875 7.97559L11.725 8.82559C11.377 9.17259 10.371 10.3976 9.43598 12.2686L8.36298 11.7316Z"
                      fill="#98A2B3"
                    />
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
                  borderRadius: 2,
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
                    last: {moment(genotype.date_created).format("DD/MM/YYYY")}{" "}
                    {moment(genotype.date_created).format("LT")}
                  </Typography>
                </div>
                <div className="flex justify-center items-center">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5 2.40039C12.5 2.40039 12.128 2.75439 11.552 3.36039C9.596 5.42039 5.3 10.4024 5.3 14.4004C5.3 16.3099 6.05857 18.1413 7.40883 19.4916C8.7591 20.8418 10.5904 21.6004 12.5 21.6004C14.4096 21.6004 16.2409 20.8418 17.5912 19.4916C18.9414 18.1413 19.7 16.3099 19.7 14.4004C19.7 12.4159 18.3551 10.9187 16.7846 9.17042L16.781 9.16639C15.433 7.66639 13.919 5.98139 12.945 3.64639C12.78 3.25039 12.63 2.83639 12.5 2.40039ZM11.5 8.81316H13.2052V10.8132H15.2901V12.5184H13.2052V14.8132H11.5V12.5184H9.49995V10.8132H11.5V8.81316ZM9.49995 15.8132H15.2901V17.4791H9.49995V15.8132Z"
                      fill="#98A2B3"
                    />
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
                  borderRadius: 2,
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
                    last: {moment(glucose.date_created).format("DD/MM/YYYY")}{" "}
                    {moment(glucose.date_created).format("LT")}
                  </Typography>
                </div>
                <div className="flex justify-center items-center">
                  {/* <GiHeartDrop color={"#21E0D8"} size={28} /> */}
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9 2.40039C17.7409 2.40039 17.5883 2.4636 17.4757 2.57613C17.3632 2.68865 17.3 2.84126 17.3 3.00039C17.3 3.15952 17.3632 3.31213 17.4757 3.42465C17.5883 3.53718 17.7409 3.60039 17.9 3.60039H19.7V6.90039H19.1C18.9409 6.90039 18.7883 6.9636 18.6757 7.07613C18.5632 7.18865 18.5 7.34126 18.5 7.50039C18.5 7.65952 18.5632 7.81213 18.6757 7.92465C18.7883 8.03718 18.9409 8.10039 19.1 8.10039H19.7V11.4004H17.9C17.8212 11.4004 17.7432 11.4159 17.6704 11.4461C17.5976 11.4762 17.5315 11.5204 17.4757 11.5761C17.42 11.6318 17.3758 11.698 17.3457 11.7708C17.3155 11.8436 17.3 11.9216 17.3 12.0004C17.3 12.0792 17.3155 12.1572 17.3457 12.23C17.3758 12.3028 17.42 12.3689 17.4757 12.4247C17.5315 12.4804 17.5976 12.5246 17.6704 12.5547C17.7432 12.5849 17.8212 12.6004 17.9 12.6004H19.7V15.9004H19.1C19.0212 15.9004 18.9432 15.9159 18.8704 15.9461C18.7976 15.9762 18.7315 16.0204 18.6757 16.0761C18.62 16.1318 18.5758 16.198 18.5457 16.2708C18.5155 16.3436 18.5 16.4216 18.5 16.5004C18.5 16.5792 18.5155 16.6572 18.5457 16.73C18.5758 16.8028 18.62 16.8689 18.6757 16.9247C18.7315 16.9804 18.7976 17.0246 18.8704 17.0547C18.9432 17.0849 19.0212 17.1004 19.1 17.1004H19.7V20.4004H17.9C17.7409 20.4004 17.5883 20.4636 17.4757 20.5761C17.3632 20.6886 17.3 20.8413 17.3 21.0004C17.3 21.1595 17.3632 21.3121 17.4757 21.4247C17.5883 21.5372 17.7409 21.6004 17.9 21.6004H20.3C20.3788 21.6004 20.4568 21.5849 20.5296 21.5547C20.6024 21.5246 20.6686 21.4804 20.7243 21.4247C20.78 21.3689 20.8242 21.3028 20.8543 21.23C20.8845 21.1572 20.9 21.0792 20.9 21.0004V3.00039C20.9 2.84126 20.8368 2.68865 20.7243 2.57613C20.6117 2.4636 20.4591 2.40039 20.3 2.40039H17.9ZM10.536 3.78939C10.4799 3.72992 10.4123 3.68253 10.3372 3.65015C10.2621 3.61776 10.1813 3.60106 10.0995 3.60106C10.0178 3.60106 9.93687 3.61776 9.86181 3.65015C9.78675 3.68253 9.7191 3.72992 9.66301 3.78939L9.66001 3.79139L9.65301 3.80039L9.62701 3.82739L9.53101 3.93339C9.00085 4.52255 8.49089 5.12956 8.00201 5.75339C7.07901 6.93339 5.94501 8.54339 5.14001 10.2264C4.54101 11.4774 4.10001 12.8194 4.10001 14.0804C4.10001 17.5374 6.75401 20.4004 10.1 20.4004C13.445 20.4004 16.1 17.5374 16.1 14.0804C16.1 12.8204 15.658 11.4774 15.06 10.2264C14.254 8.54339 13.12 6.93339 12.197 5.75339C11.6793 5.09159 11.1372 4.44915 10.572 3.82739L10.546 3.80039L10.539 3.79139L10.536 3.78939ZM10.08 5.12039L10.1 5.09739L10.119 5.12039C10.407 5.44839 10.805 5.92039 11.252 6.49239C11.985 7.43039 12.836 8.62439 13.532 9.88539H6.66901C7.36501 8.62439 8.21701 7.43039 8.94901 6.49239C9.39601 5.92039 9.79601 5.44839 10.083 5.12039H10.08ZM5.30001 14.0804C5.30001 13.1744 5.59201 12.1464 6.06501 11.0854H14.134C14.608 12.1454 14.9 13.1744 14.9 14.0804C14.9 16.9404 12.718 19.2004 10.1 19.2004C7.48101 19.2004 5.30001 16.9404 5.30001 14.0804Z"
                      fill="#98A2B3"
                    />
                    <path
                      d="M5.30001 14.0804C5.30001 13.1744 5.59201 12.1464 6.06501 11.0854H14.134C14.608 12.1454 14.9 13.1744 14.9 14.0804C14.9 16.9404 12.718 19.2004 10.1 19.2004C7.48101 19.2004 5.30001 16.9404 5.30001 14.0804Z"
                      fill="#98A2B3"
                    />
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
                  borderRadius: 2,
                }}
              >
                <div className="">
                  <Typography fontWeight={400} fontSize={14} color={"#475367"}>
                    Body temperature
                  </Typography>
                  <Typography color={"#344054"} sx={{ my: 1.5 }}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}>
                      {temp.reading || "N/"}
                      {temp.degreeRating || "A"}
                    </span>
                  </Typography>
                  <Typography
                    fontWeight={400}
                    fontStyle={"italic"}
                    fontSize={12}
                    color={"#101928"}
                  >
                    last: {moment(temp.date_created).format("DD/MM/YYYY")}{" "}
                    {moment(temp.date_created).format("LT")}
                  </Typography>
                </div>
                <div className="flex justify-center items-center">
                  {/* <FaTemperatureQuarter color={"#4A5BC3"} size={28} /> */}

                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.99197 14.8683L9.99097 13.9783L9.98797 10.8733L9.98297 4.66926C9.98197 3.18926 11.1 1.98926 12.481 1.98926C13.861 1.98726 14.982 3.18526 14.983 4.66526L14.988 10.8683L14.991 13.9753V14.8643C15.6383 15.3817 16.109 16.0874 16.3379 16.8839C16.5668 17.6804 16.5426 18.5283 16.2688 19.3105C15.9949 20.0927 15.4849 20.7705 14.8092 21.2503C14.1335 21.73 13.3254 21.9881 12.4967 21.9888C11.6679 21.9894 10.8595 21.7327 10.183 21.254C9.50648 20.7753 8.99537 20.0983 8.72028 19.3165C8.44518 18.5348 8.41969 17.6869 8.64732 16.8901C8.87495 16.0932 9.34546 15.3867 9.99197 14.8683ZM11.979 10.6993C12.577 10.8543 13.259 11.0303 13.989 11.0183L13.988 9.97526H12.988C12.8554 9.97539 12.7281 9.92284 12.6343 9.82917C12.5404 9.73549 12.4876 9.60837 12.4875 9.47576C12.4873 9.34315 12.5399 9.21592 12.6336 9.12206C12.7272 9.0282 12.8544 8.97539 12.987 8.97526H13.987L13.986 7.97526H12.986C12.8534 7.97526 12.7262 7.92258 12.6324 7.82881C12.5387 7.73505 12.486 7.60787 12.486 7.47526C12.486 7.34265 12.5387 7.21548 12.6324 7.12171C12.7262 7.02794 12.8534 6.97526 12.986 6.97526H13.986L13.984 5.97526H12.984C12.8514 5.97526 12.7242 5.92258 12.6304 5.82881C12.5367 5.73505 12.484 5.60787 12.484 5.47526C12.484 5.34265 12.5367 5.21548 12.6304 5.12171C12.7242 5.02794 12.8514 4.97526 12.984 4.97526H13.984V4.66526C13.982 3.77826 13.31 3.05926 12.482 3.06026C11.653 3.06026 10.982 3.78026 10.983 4.66826L10.988 10.4883C11.281 10.5183 11.614 10.6053 11.979 10.6993Z"
                      fill="#98A2B3"
                    />
                  </svg>
                </div>
              </Box>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
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

              <div style={{ height: 400, backgroundColor: "#FFF" }}>
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

              <div style={{ height: 400, backgroundColor: "#FFF" }}>
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

            <Box height={223}>
              {activeProblems.length > 0 ? (
                activeProblems
                  ?.filter(
                    (activeProblems) =>
                      activeProblems.treatmentStatus === "Pending" || "Active"
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: 14,
                        borderRadius: 3,
                        background: index % 2 === 0 ? "white" : "#FCFCFD",
                        padding: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            "&::first-letter": {
                              textTransform: "uppercase",
                            },
                          }}
                          fontWeight={500}
                          fontSize={14}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          {item.primaryDiagnosis}
                        </Typography>

                        <Chip
                          sx={{
                            background:
                              item.treatmentStatus === "Active"
                                ? "#36A1500A"
                                : "#FEF6E7",
                            color:
                              item.treatmentStatus === "Active"
                                ? "#36A150"
                                : "#AD6F07",
                            textTransform: "capitalize",
                            fontWeight: 600,
                          }}
                          label={item.treatmentStatus}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <span>{item.severity}</span>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>
                            By: {item.title}
                            {item?.reading}
                          </span>

                          <span
                            style={{
                              height: 5,
                              width: 5,
                              borderRadius: "50%",
                              background: "#065474",
                              margin: "0px 5px",
                            }}
                          ></span>

                          <span>
                            {moment(item.date_created).format("DD/MM/YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <>
                  <p style={{ fontWeight: 400, fontSize: 18, padding: 10 }}>
                    No Active problems Recorded.
                  </p>
                </>
              )}
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

            <Box height={223}>
              {recentIncident.length > 0 ? (
                recentIncident.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    style={{
                      color: "#344054",
                      fontSize: 14,
                      fontWeight: 400,
                      background: index % 2 === 0 ? "white" : "#FCFCFD",
                      padding: 10,
                    }}
                  >
                    <Typography
                      className="incident"
                      sx={{
                        "&::first-letter": {
                          textTransform: "uppercase",
                        },
                        textTransform: "capitalize",
                      }}
                      marginTop={0.5}
                      fontWeight={500}
                      fontSize={14}
                      color={"#667185"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      {item.message}
                      {/* <span>By {item.specialist}</span> */}
                    </Typography>
                    <span style={{ fontWeight: 500 }}>
                      {moment(item.date_created).format("DD/MM/YYYY")}
                    </span>
                  </div>
                ))
              ) : (
                <>
                  <p style={{ fontWeight: 400, fontSize: 18, padding: 10 }}>
                    No Record created yet.
                  </p>
                </>
              )}
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

            <Box height={223}>
              {repeatedPrescription?.length > 0 ? (
                repeatedPrescription?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      color: "#344054",
                      fontSize: 14,
                      borderRadius: 3,
                      background: index % 2 === 0 ? "white" : "#FCFCFD",
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
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
                      >
                        {item.medicationName}{" "}
                        {`${item.dosage} ${item.dosagemeasurement}`}
                      </Typography>
                      <span>
                        {moment(item.startDate).format("DD/MM/YYYY")} -
                        {moment(item.endDate).format("DD/MM/YYYY")}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>
                        {`${item.dosage}${item.dosagemeasurement}, (${item.frequencyNumber} ${item.frequencyType}) - ${item.medicationRoute}`}
                      </span>
                      <span>By: {item.prescriber}</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p style={{ fontWeight: 400, fontSize: 18, padding: 10 }}>
                    No Recurring Prescription currently.
                  </p>
                </>
              )}
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

            <Box height={223}>
              {allergies.length > 0 ? (
                allergies.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      color: "#344054",
                      fontSize: 14,
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      background: index % 2 === 0 ? "white" : "#FCFCFD",
                      padding: 10,
                    }}
                  >
                    <ItemLabel label="Substance" text={item.substance} />
                    <ItemLabel label="Reaction" text={item.reaction} />
                    <ItemLabel label="Reaction Type" text={item.reactionType} />
                  </div>
                ))
              ) : (
                <>
                  <p style={{ fontWeight: 400, fontSize: 18, padding: 10 }}>
                    No Allergy Record created yet.
                  </p>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
