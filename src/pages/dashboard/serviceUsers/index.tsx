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

interface TextLabelProps {
  text: string;
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
              content: <Health />,
            },
            {
              label: "Specialist Assessment",
              icon: <AiOutlineFundProjectionScreen />,
              content: <Assessment />,
            },
            {
              label: "Allergies",
              icon: <RxExitFullScreen />,
              content: <Allergies />,
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
              Ciroma Afolabi
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
          <TextLabel label="NHR ID" text="485 777 3456" />
          <TextLabel label="Email Address" text="olufalala110@gmail.com" />
          <TextLabel
            label="Phone Number"
            text="(+234) 809 205 4532"
          ></TextLabel>
          <TextLabel
            label="Address"
            text="124, Oyediran Estate, Lagos, Nigeria, 5432"
          />
          <TextLabel label="Age" text="27" />
          <TextLabel label="Date of Birth" text="15-05-1994" />
          <TextLabel label="Height" text="6'7 In" />
          <TextLabel label="Weight" text="80kg" />
          <TextLabel label="HMO Plan" text="Hygeia" />
        </Box>
      </Box>
    </Stack>
  );
}
