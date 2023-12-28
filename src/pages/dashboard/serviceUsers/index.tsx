import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
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
  isLoading?: boolean;
}

const TextLabel = ({ text, label, isLoading }: TextLabelProps) => (
  <label
    style={{
      fontWeight: 400,
      color: "#475467",
      fontSize: 12,
      margin: "20px 0px",
    }}
  >
    {label}
    {isLoading ? (
      <Skeleton
        variant="text"
        animation="wave"
        width={300}
        sx={{ fontSize: "18px" }}
      />
    ) : (
      <Typography fontWeight={600} fontSize={16} color={"#101928"}>
        {text}
      </Typography>
    )}
  </label>
);

export default function Singleuser() {
  const { id } = useParams();

  const { pathname } = useLocation();

  const isEdit = pathname.includes("edit");

  const [userData, setUserData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state: any) => state.user.access_token);

  const navigate = useNavigate();

  const tabs = [
    {
      label: "Demographics",
      icon: <CiMedicalCross />,
      content: (
        <Demogrphics
          isEdit={isEdit}
          userData={userData}
          isLoading={isLoading}
        />
      ),
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
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/search-serviceuser/${id}`);

        setUserData(res?.data.result[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (!token) {
    navigate("/auth/login");
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
          <Stack alignItems="start">
            <Button
              style={{
                fontWeight: 500,
                color: "#FFF",
                textDecoration: "none",
                borderRadius: 10,
                display: "flex",
                background: "#099250",
                padding: 12,
                gap: 5,
              }}
              // to={`/dashboard/user/${id}/edit`}
            >
              Send Message
            </Button>
          </Stack>
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

          <TextLabel isLoading={isLoading} label="NHR ID" text={userData?.id} />
          <TextLabel
            isLoading={isLoading}
            label="Email Address"
            text={userData?.email || "None"}
          />
          <TextLabel
            isLoading={isLoading}
            label="Phone Number"
            text={userData?.phoneNumber}
          ></TextLabel>
          <TextLabel
            isLoading={isLoading}
            label="Address"
            text={userData?.address}
          />
          <TextLabel
            isLoading={isLoading}
            label="Age"
            text={moment(new Date()).diff(userData?.dateOfBirth, "years")}
          />
          <TextLabel
            isLoading={isLoading}
            label="Date of Birth"
            text={moment(userData?.dateOfBirth).format("L")}
          />
          <TextLabel
            isLoading={isLoading}
            label="Height"
            text={userData?.height + " " + "cm"}
          />
          <TextLabel
            isLoading={isLoading}
            label="Weight"
            text={userData?.weight + " " + "kg"}
          />
          <TextLabel
            isLoading={isLoading}
            label="HMO Plan"
            text={userData?.HMOPlan || "None"}
          />
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
