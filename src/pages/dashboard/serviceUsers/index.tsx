import { useState, useEffect } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { CiMedicalCross } from "react-icons/ci";
import { RxExitFullScreen } from "react-icons/rx";
import { FiBook } from "react-icons/fi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import HeaderBreadCrumb from "../../../components/HeaderBreadCrumb";
import Grids from "/assets/grid.svg";
import HeaderTabs from "../../../components/HeaderTabs";
import Health from "./Health";
import Assessment from "./Assessment";
import Allergies from "./Allergies";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../Utils/axios";
import moment from "moment";

interface TextLabelProps {
  text: any;
  label: string;
}

const TextLabel = ({ text, label }: TextLabelProps) => (
  <label
    style={{
      fontWeight: 400,
      color: "#475467",
      fontSize: 12,
      margin: "20px 0px",
    }}
  >
    {label}
    <Typography fontWeight={600} fontSize={16} color={"#101928"}>
      {text}
    </Typography>
  </label>
);

export default function Singleuser() {
  const { id } = useParams();

  const [userData, setUserData] = useState<any>(null); // State to store user data

  useEffect(() => {
    // Fetch user data based on the id
    // Replace the following with your actual data fetching logic
    const fetchUserData = async () => {
      try {
        // Example API call
        const res = await axiosInstance.get(`/search-service-user/${id}`);

        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  // console.log(userData);

  return (
    <Stack sx={{}}>
      <Box sx={{ width: { lg: "70%" } }}>
        <HeaderBreadCrumb
          heading="Search Name"
          links={[
            { label: "Dashboard", href: "/dashboard", icon: Grids },
            { label: "Search Name" },
          ]}
        />

        <HeaderTabs
          links={[
            {
              label: "Primary Health",
              icon: <CiMedicalCross />,
              content: (
                <Health
                // userDate={userData}
                />
              ),
            },
            {
              label: "Specialist Assessment",
              icon: <AiOutlineFundProjectionScreen />,
              content: (
                <Assessment
                // userDate={userData}
                />
              ),
            },
            {
              label: "Allergies",
              icon: <RxExitFullScreen />,
              content: (
                <Allergies
                // userDate={userData}
                />
              ),
            },
            {
              label: "Notes",
              icon: <FiBook />,
              content: (
                <Box>
                  <Typography>Content for Tab 4</Typography>
                  <Typography>Additional content specific to Tab 4.</Typography>
                </Box>
              ),
            },
          ]}
        />
      </Box>

      <Box
        sx={{
          borderLeft: "1px #E4E7EC solid",
          background: "white",
          p: 3,
          position: "absolute",
          height: "calc(100vh - 80px)",
          right: 0,
          top: "80px",
          width: { lg: "28%" },
          overflow: "scroll",
          mb: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "0.38px #E4E7EC solid",
            pb: 4,
          }}
        >
          <Avatar />
          <Typography
            sx={{ display: "flex", flexDirection: "column", marginLeft: 2 }}
          >
            <span style={{ fontWeight: 500, fontSize: 18 }}>
              {userData?.firstName + " " + userData?.lastName}
            </span>
            <span style={{ fontWeight: 400, fontSize: 14, color: "#475467" }}>
              Last updated on 1st Oct, 2023
            </span>
          </Typography>
        </Box>
        <Box>
          <Typography
            fontWeight={600}
            fontSize={18}
            color={"#101928"}
            sx={{ py: 2, borderBottom: "0.38px #E4E7EC solid" }}
          >
            Demographics
          </Typography>
          <TextLabel label="NHR ID" text={userData?.id} />
          <TextLabel label="Email Address" text={userData?.email || "None"} />
          <TextLabel
            label="Phone Number"
            text={userData?.phoneNumber}
          ></TextLabel>
          <TextLabel
            label="Address"
            text={userData?.address + " " + userData?.lga}
          />
          <TextLabel
            label="Age"
            text={moment(new Date()).diff(userData?.dateOfBirth, "years")}
          />
          <TextLabel
            label="Date of Birth"
            text={moment(userData?.dateOfBirth).format("L")}
          />
          <TextLabel label="Height" text={userData?.height + "" + "cm"} />
          <TextLabel label="Weight" text={userData?.weight + "" + "kg"} />
          <TextLabel label="HMO Plan" text={userData?.HMOPlan} />
        </Box>
      </Box>
    </Stack>
  );
}
