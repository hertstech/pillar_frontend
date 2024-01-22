import { Box, Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderBreadCrumb from "../../../components/HeaderBreadCrumb";
import Grids from "/assets/grid.svg";
import HeaderTabs from "../../../components/HeaderTabs";
import Demogrphics from "./Demogrphics";
import Health from "./Health";
import Assessment from "./Medication";
import Allergies from "./Allergies";
import Referral from "./Referral";
import Notes from "./Notes";
import Overview from "./Overview";

export default function Singleuser() {
  const token = useSelector((state: any) => state.user.access_token);
  const client = useSelector((state: any) => state.client.clients.tab1[0]);

  const navigate = useNavigate();

  const tabs = [
    {
      label: "Overview",
      content: <Overview client={client} />,
    },
    {
      label: "Demographics",
      content: <Demogrphics client={client} />,
    },
    {
      label: "Health Information",
      content: <Health client={client} />,
    },
    {
      label: "Medication",
      content: <Assessment client={client} />,
    },
    {
      label: `Allergies`,
      content: <Allergies client={client} />,
    },
    {
      label: "Referrals",
      content: <Referral client={client} />,
    },
    {
      label: "Additional Information",
      content: <Notes client={client} />,
    },
  ];

  if (!token) {
    navigate("/");
  }

  return (
    <Stack sx={{}}>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            background: "white",
          }}
        >
          <HeaderBreadCrumb
            heading={`${client?.firstName} ${client?.lastName}`}
            links={[
              { label: "Dashboard", href: "/dashboard", icon: Grids },
              { label: `${client?.firstName} ${client?.lastName}` },
            ]}
          />
          <Stack alignItems="start" sx={{ mr: 2.5 }}>
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
            >
              Send Message
            </Button>
          </Stack>
        </Box>

        <HeaderTabs links={tabs} />
      </Box>
    </Stack>
  );
}

{
  /* <Box>
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
        </Box> */
}
