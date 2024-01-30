import { Box, Stack, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderTabs from "../../../components/HeaderTabs";
import Demogrphics from "./Demogrphics";
import Health from "./Health";
import Assessment from "./Medication";
import Allergies from "./Allergies";
import Referral from "./Referral";
import Notes from "./Notes";
import Overview from "./Overview";
import { resetClientState } from "../../../redux/clientSlice";

export default function Singleuser() {
  const client = useSelector((state: any) => state.client.clients.tab1[0]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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
          <Stack
            p={2}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <div
              style={{ display: "flex", gap: 8, cursor: "pointer" }}
              onClick={() => {
                navigate(-1);
                dispatch(resetClientState("tab1"));
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="18" height="18" fill="#1E1E1E" />
                <g id="Home" clip-path="url(#clip0_1481_37234)">
                  <rect
                    width="375"
                    height="812"
                    transform="translate(-25 -49)"
                    fill="#FCFCFD"
                  />
                  <g id="top">
                    <mask id="path-1-inside-1_1481_37234" fill="white">
                      <path d="M-25 -9H350V31H-25V-9Z" />
                    </mask>
                    <path
                      d="M350 30.5H-25V31.5H350V30.5Z"
                      fill="#E7E9FB"
                      mask="url(#path-1-inside-1_1481_37234)"
                    />
                    <g id="title">
                      <g id="Frame 1000007521">
                        <g id="Hicon / Linear / Left Circle 1">
                          <rect
                            width="20"
                            height="20"
                            transform="translate(-1 -1)"
                            fill="white"
                          />
                          <g id="Left Circle 1">
                            <path
                              id="Vector"
                              d="M12.3333 9.62484C12.6785 9.62484 12.9583 9.34502 12.9583 8.99984C12.9583 8.65466 12.6785 8.37484 12.3333 8.37484V9.62484ZM7.89333 12.7771C8.13849 13.0201 8.53422 13.0183 8.7772 12.7731C9.02019 12.528 9.01842 12.1322 8.77326 11.8893L7.89333 12.7771ZM7.15798 11.1683L7.59795 10.7244L7.59795 10.7244L7.15798 11.1683ZM7.15798 6.83138L6.71801 6.38747L6.71801 6.38747L7.15798 6.83138ZM8.77326 6.11041C9.01842 5.86743 9.02019 5.4717 8.7772 5.22654C8.53422 4.98137 8.13849 4.97961 7.89333 5.22259L8.77326 6.11041ZM5.67989 9.20873L5.0599 9.28775L5.0599 9.28775L5.67989 9.20873ZM5.67989 8.79095L5.0599 8.71192L5.0599 8.71192L5.67989 8.79095ZM16.7083 8.99984C16.7083 13.257 13.2572 16.7082 8.99996 16.7082V17.9582C13.9475 17.9582 17.9583 13.9474 17.9583 8.99984H16.7083ZM8.99996 16.7082C4.74276 16.7082 1.29163 13.257 1.29163 8.99984H0.041626C0.041626 13.9474 4.05241 17.9582 8.99996 17.9582V16.7082ZM1.29163 8.99984C1.29163 4.74264 4.74276 1.2915 8.99996 1.2915V0.0415039C4.05241 0.0415039 0.041626 4.05229 0.041626 8.99984H1.29163ZM8.99996 1.2915C13.2572 1.2915 16.7083 4.74264 16.7083 8.99984H17.9583C17.9583 4.05229 13.9475 0.0415039 8.99996 0.0415039V1.2915ZM12.3333 8.37484H6.33329V9.62484H12.3333V8.37484ZM8.77326 11.8893L7.59795 10.7244L6.71801 11.6122L7.89333 12.7771L8.77326 11.8893ZM7.59794 7.27529L8.77326 6.11041L7.89333 5.22259L6.71801 6.38747L7.59794 7.27529ZM7.59795 10.7244C7.11886 10.2496 6.79773 9.92995 6.58182 9.6611C6.37382 9.4021 6.31539 9.2515 6.29987 9.1297L5.0599 9.28775C5.11654 9.73208 5.32851 10.0968 5.6072 10.4438C5.87797 10.781 6.25981 11.1581 6.71801 11.6122L7.59795 10.7244ZM6.71801 6.38747C6.25981 6.8416 5.87797 7.21871 5.6072 7.55587C5.32851 7.90289 5.11654 8.2676 5.0599 8.71192L6.29987 8.86997C6.31539 8.74817 6.37382 8.59757 6.58182 8.33858C6.79773 8.06972 7.11886 7.75011 7.59795 7.27528L6.71801 6.38747ZM6.29987 9.1297C6.29437 9.08658 6.29163 9.04321 6.29163 8.99984L5.04163 8.99984C5.04163 9.096 5.04772 9.19216 5.0599 9.28775L6.29987 9.1297ZM6.29163 8.99984C6.29163 8.95647 6.29437 8.91309 6.29987 8.86997L5.0599 8.71192C5.04772 8.80751 5.04163 8.90367 5.04163 8.99984L6.29163 8.99984ZM6.33329 8.37484H5.66663V9.62484H6.33329V8.37484Z"
                              fill="#344054"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1481_37234">
                    <rect
                      width="375"
                      height="812"
                      fill="white"
                      transform="translate(-25 -49)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span>Go Back</span>
            </div>

            <div
              style={{
                color: "#101928",
                fontWeight: 700,
                fontSize: 18,
                fontFamily: "fontBold",
                textTransform: "capitalize",
              }}
            >
              {`${client?.firstName} ${client?.lastName}`}
            </div>
          </Stack>
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
