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
import { FaRegUser } from "react-icons/fa6";
import { CiMedicalCross, CiSquarePlus } from "react-icons/ci";
import { RxExitFullScreen } from "react-icons/rx";
import { FiBook } from "react-icons/fi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBreadCrumb from "../../../components/HeaderBreadCrumb";
import Grids from "/assets/grid.svg";
import HeaderTabs from "../../../components/HeaderTabs";
import { axiosInstance } from "../../../Utils/axios";
import Demogrphics from "./Demogrphics";
import Health from "./Health";
import Assessment from "./Medication";
import Allergies from "./Allergies";
import Referral from "./Referral";
import Notes from "./Notes";
import Overview from "./Overview";

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

  const formattedValue = (value: string) => {
    return value.replace(/-/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state: any) => state.user.access_token);
  const client = useSelector((state: any) => state.client.clients.tab1[0]);

  const navigate = useNavigate();

  const tabs = [
    {
      label: "Overview",
      icon: <FaRegUser />,
      content: <Overview />,
    },
    {
      label: "Demographics",
      icon: <FaRegUser />,
      content: (
        <Demogrphics
          // userData={userData}
          client={client}
          isLoading={isLoading}
        />
      ),
    },
    {
      label: "Health Information",
      icon: <CiMedicalCross />,
      content: <Health />,
    },
    {
      label: "Medication",
      icon: <AiOutlineFundProjectionScreen />,
      content: <Assessment />,
    },
    {
      label: `Allergies`,
      icon: <RxExitFullScreen />,
      content: <Allergies />,
    },
    {
      label: "Referrals",
      icon: <FiBook />,
      content: <Referral />,
    },
    {
      label: "Additional Information",
      icon: <CiSquarePlus />,
      content: <Notes />,
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        await axiosInstance.get(`/search-serviceuser/${id}`);

        // setUserData(res?.data.result[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const NHRID = formattedValue(client?.id || "");

  if (!token) {
    navigate("/");
  }

  return (
    <Stack sx={{}}>
      <Box sx={{ width: { lg: "72%" } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <HeaderBreadCrumb
            heading={`${client?.firstName} ${client?.lastName}`}
            links={[
              { label: "Dashboard", href: "/dashboard", icon: Grids },
              { label: `${client?.firstName} ${client?.lastName}` },
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
            <span
              style={{
                fontWeight: 500,
                fontSize: 18,
                textTransform: "capitalize",
              }}
            >
              {client?.firstName + " " + client?.lastName}
            </span>
            <span style={{ fontWeight: 400, fontSize: 14, color: "#475467" }}>
              Created: {moment(client?.date_created).format("LL")}
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

          <TextLabel isLoading={isLoading} label="NHR ID" text={NHRID} />

          <TextLabel
            isLoading={isLoading}
            label="Email Address"
            text={client?.email || "None"}
          />
          <TextLabel
            isLoading={isLoading}
            label="Phone Number"
            text={client?.phoneNumber}
          ></TextLabel>
          <TextLabel
            isLoading={isLoading}
            label="Address"
            text={client?.address}
          />
          <TextLabel
            isLoading={isLoading}
            label="Age"
            text={moment(new Date()).diff(client?.dateOfBirth, "years")}
          />
          <TextLabel
            isLoading={isLoading}
            label="Date of Birth"
            text={moment(client?.dateOfBirth).format("DD/MM/YYYY")}
          />
          <TextLabel
            isLoading={isLoading}
            label="Height"
            text={client?.height + " " + "cm"}
          />
          <TextLabel
            isLoading={isLoading}
            label="Weight"
            text={client?.weight + " " + "kg"}
          />
          <TextLabel
            isLoading={isLoading}
            label="HMO Plan"
            text={client?.HMOPlan || "None"}
          />
        </Box>
        <Divider sx={{ position: "absolute", width: "100%", right: 0 }} />
        {/* <Box>
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
        </Box> */}
      </Box>
    </Stack>
  );
}
