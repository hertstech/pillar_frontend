import { useState, useEffect } from "react";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { CiMedicalCross, CiSquarePlus } from "react-icons/ci";
import { RxExitFullScreen } from "react-icons/rx";
import { FiBook } from "react-icons/fi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import HeaderBreadCrumb from "../../../components/HeaderBreadCrumb";
import Grids from "/assets/grid.svg";
import HeaderTabs from "../../../components/HeaderTabs";
import Health from "./Health";
import Assessment from "./Medication";
import Allergies from "./Allergies";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../Utils/axios";
import moment from "moment";
import Notes from "./Notes";
import Referral from "./Referral";
import Demogrphics from "./Demogrphics";
import { useSelector } from "react-redux";

const activity = [
  { time: "9:40am", purpose: "Diagnosed by #3948934" },
  { time: "9:40am", purpose: "Visited Cottage Medics" },
  { time: "9:40am", purpose: "Vitals recorded" },
  { time: "9:40am", purpose: "Treatment plan completed" },
  { time: "9:40am", purpose: "Visited Cottage Medics" },
  { time: "9:40am", purpose: "Visited Cottage Medics" },
];

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

  const { pathname } = useLocation();

  const isEdit = pathname.includes("edit");

  const [userData, setUserData] = useState<any>(null);

  const token = useSelector((state: any) => state.user.access_token);

  const navigate = useNavigate();

  const tabs = [
    {
      label: "Demographics",
      icon: <CiMedicalCross />,
      content: <Demogrphics isEdit={isEdit} userData={userData} />,
    },
    {
      label: "Health Summary",
      icon: <CiMedicalCross />,
      content: (
        <Health
        // isEdit={isEdit}
        // userData={userData}
        />
      ),
    },
    {
      label: "Medication",
      icon: <AiOutlineFundProjectionScreen />,
      content: (
        <Assessment
        // isEdit={isEdit}
        // userData={userData}
        />
      ),
    },
    {
      label: `Allergies`,
      icon: <RxExitFullScreen />,
      content: (
        <Allergies
        // isEdit={isEdit}
        // userData={userData}
        />
      ),
    },
    {
      label: "Referrals",
      icon: <FiBook />,
      content: (
        <Referral
        // isEdit={isEdit}
        // userData={userData}
        />
      ),
    },
    {
      label: "Additional Information",
      icon: <CiSquarePlus />,
      content: (
        <Notes
        // isEdit={isEdit}
        // userData={userData}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Example API call
        const res = await axiosInstance.get(`/search-service-user/${id}`);

        setUserData(res?.data.result[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!token) {
    return navigate("/auth/login");
  }

  return (
    <Stack sx={{}}>
      <Box sx={{ width: { lg: "70%" } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <HeaderBreadCrumb
            heading={`${userData?.firstName} ${userData?.lastName}`}
            links={[
              { label: "Dashboard", href: "/dashboard", icon: Grids },
              { label: `${userData?.firstName} ${userData?.lastName}` },
            ]}
          />
        </Box>

        <HeaderTabs links={tabs} />
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
          overflowY: "scroll",
          mb: 5,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
              Created: {moment(userData?.dateOfBirth).format("LL")}
            </span>
          </Typography>
        </Box>

        <Divider sx={{ position: "absolute", width: "100%", right: 0 }} />

        {/* // sx={{ borderBottom: "0.38px #E4E7EC solid" }} */}
        <Box>
          <Typography
            fontWeight={600}
            fontSize={18}
            color={"#101928"}
            sx={{ py: 2 }}
          >
            Demographics
          </Typography>
          <Divider sx={{ position: "absolute", width: "100%", right: 0 }} />

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
          <TextLabel label="Height" text={userData?.height + " " + "cm"} />
          <TextLabel label="Weight" text={userData?.weight + " " + "kg"} />
          <TextLabel label="HMO Plan" text={userData?.HMOPlan || "None"} />
        </Box>
        <Divider sx={{ position: "absolute", width: "100%", right: 0 }} />
        <Box>
          <Typography
            fontWeight={600}
            fontSize={18}
            color={"#101928"}
            sx={{ py: 2 }}
          >
            Activity
          </Typography>

          {activity.map((item, index) => (
            <Typography
              key={index}
              sx={{ display: "flex", flexDirection: "row", gap: 1, py: 1 }}
            >
              <span style={{ fontSize: 14, fontWeight: 400, color: "#667185" }}>
                {item.time}
              </span>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#667185" }}>
                .
              </span>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#101928" }}>
                {item.purpose}
              </span>
            </Typography>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}
