import { Box, Typography, Stack, Button, Divider } from "@mui/material";
import moment from "moment";
import { TextLabel } from "../../../components/InputField";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileSummary } from "../../../components/ServiceUser/ProfileSummary";

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
  middleName: string;
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
  isLoading: boolean;
}

export default function Profile({ client, isLoading }: PropType) {
  const { id } = useParams();

  const navigate = useNavigate();

  console.log("clients dets;", client);

  const navToUpdateProfile = () => {
    navigate(`/dashboard/user/${id}/update`);
  };

  const formattedValue = (value: string) => {
    return value.replace(/-/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const NHRID = formattedValue(client?.id || "");

  return (
    <Box className="flex items-start gap-6">
      <Box className="relative w-[70%]">
        <Stack
          direction="row"
          justifyContent="flex-end"
          position={"absolute"}
          p={1.5}
          display={"flex"}
          top={8}
          right={8}
          mb={0}
        >
          <Button
            variant="contained"
            sx={{
              color: "#099250",
              outline: "none",
              textTransform: "capitalize",
              fontWeight: 600,
              background: "#FFF",
              "&:hover": { backgroundColor: "#FFF" },
              gap: 1,
            }}
            onClick={navToUpdateProfile}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Edit 2">
                <path
                  id="Vector"
                  d="M4.3542 10.6793L4.17225 10.2135L4.3542 10.6793ZM1.64994 11.1985L1.39994 11.6316H1.39994L1.64994 11.1985ZM0.747525 8.59694L0.253225 8.67222L0.747525 8.59694ZM1.07439 6.86209L1.5074 7.11209L1.07439 6.86209ZM0.684957 7.68693L0.193602 7.59436L0.193602 7.59436L0.684957 7.68693ZM5.69319 9.52876L6.1262 9.77876L5.69319 9.52876ZM5.17357 10.2784L5.49942 10.6577H5.49943L5.17357 10.2784ZM3.60668 2.47603L3.17367 2.22603L3.60668 2.47603ZM10.94 12C11.2162 12 11.44 11.7761 11.44 11.5C11.44 11.2238 11.2162 11 10.94 11V12ZM6.94001 11C6.66387 11 6.44001 11.2238 6.44001 11.5C6.44001 11.7761 6.66387 12 6.94001 12V11ZM7.79247 4.8927L5.26018 9.27876L6.1262 9.77876L8.6585 5.3927L7.79247 4.8927ZM1.5074 7.11209L4.03969 2.72603L3.17367 2.22603L0.641377 6.61209L1.5074 7.11209ZM4.17225 10.2135C3.44127 10.4991 2.94343 10.6923 2.55911 10.7821C2.18786 10.8688 2.0194 10.8345 1.89994 10.7655L1.39994 11.6316C1.83545 11.883 2.30269 11.8689 2.78662 11.7559C3.25748 11.6459 3.83428 11.4192 4.53616 11.145L4.17225 10.2135ZM0.253225 8.67222C0.366684 9.41718 0.45878 10.03 0.598938 10.4928C0.742986 10.9684 0.964423 11.3801 1.39994 11.6316L1.89994 10.7655C1.78047 10.6966 1.66652 10.5678 1.55601 10.203C1.44161 9.82523 1.35999 9.2975 1.24182 8.52166L0.253225 8.67222ZM0.641377 6.61209C0.426829 6.9837 0.255053 7.26821 0.193602 7.59436L1.17631 7.77951C1.19895 7.65937 1.25876 7.54275 1.5074 7.11209L0.641377 6.61209ZM1.24182 8.52166C1.16695 8.03005 1.15368 7.89965 1.17631 7.77951L0.193602 7.59436C0.132151 7.92051 0.188617 8.24802 0.253225 8.67222L1.24182 8.52166ZM5.26018 9.27876C5.01154 9.70942 4.94045 9.81953 4.84772 9.8992L5.49943 10.6577C5.75116 10.4414 5.91166 10.1504 6.1262 9.77876L5.26018 9.27876ZM4.53616 11.145C4.93583 10.9888 5.24769 10.874 5.49942 10.6577L4.84772 9.8992C4.755 9.97887 4.63543 10.0326 4.17225 10.2135L4.53616 11.145ZM6.99942 1.93298C7.55599 2.25432 7.92933 2.47109 8.18656 2.6696C8.4323 2.85924 8.51059 2.98697 8.54239 3.10565L9.50831 2.84683C9.39717 2.43204 9.13182 2.13591 8.7975 1.87792C8.47466 1.62879 8.03151 1.37416 7.49942 1.06695L6.99942 1.93298ZM8.6585 5.3927C8.9657 4.86061 9.22217 4.41851 9.37719 4.04135C9.53772 3.65075 9.61946 3.26162 9.50831 2.84683L8.54239 3.10565C8.57419 3.22433 8.57026 3.37409 8.45226 3.6612C8.32874 3.96173 8.11381 4.33613 7.79247 4.8927L8.6585 5.3927ZM7.49942 1.06695C6.96733 0.759752 6.52523 0.503281 6.14806 0.348264C5.75747 0.187731 5.36834 0.105994 4.95355 0.217137L5.21237 1.18306C5.33104 1.15126 5.48081 1.15519 5.76792 1.27319C6.06844 1.39671 6.44284 1.61164 6.99942 1.93298L7.49942 1.06695ZM4.03969 2.72603C4.36103 2.16946 4.5778 1.79612 4.77631 1.53889C4.96595 1.29315 5.09369 1.21486 5.21237 1.18306L4.95355 0.217137C4.53876 0.328279 4.24263 0.593631 3.98463 0.927953C3.7355 1.25079 3.48087 1.69394 3.17367 2.22603L4.03969 2.72603ZM8.47548 4.70969L3.85668 2.04302L3.35668 2.90905L7.97548 5.57571L8.47548 4.70969ZM10.94 11H6.94001V12H10.94V11Z"
                  fill="#099250"
                />
              </g>
            </svg>
            Edit
          </Button>
        </Stack>

        <Box
          sx={{
            gap: 3,
            flexDirection: "column",
            display: "flex",
            mb: 12,
          }}
        >
          <Box className="flex flex-col p-6 w-full bg-white rounded-lg gap-2 border">
            <Typography
              sx={{
                color: "#090816",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
              fontWeight={600}
              fontSize={16}
              mb={3}
            >
              Personal Details
            </Typography>

            <div className="grid grid-cols-3">
              <TextLabel label="First Name" text={client?.firstName} />

              <TextLabel label="Middle Name" text={client?.middleName} />

              <TextLabel label="Last Name" text={client?.lastName} />
            </div>

            <TextLabel label="Gender" text={client?.gender} />
            <TextLabel
              label="Date of Birth"
              text={moment(client?.dateOfBirth).format("DD/MM/YYYY")}
            />

            <TextLabel label="Religion" text={client?.religion} />
            <TextLabel label="Tribal Mark" text={client?.tribalMarks} />
          </Box>

          {/* <Stack>
            <Box
              sx={{
                borderRadius: 2,
                border: "1px #E4E7EC solid",
                background: "white",
                width: "100%",
                px: 3,
                py: 2,
              }}
            >
              <Typography
                sx={{ color: "#090816" }}
                fontWeight={600}
                fontSize={18}
              >
                Emergency Contact
              </Typography>

              <div style={{ marginTop: "1rem" }}>
                <TextLabel label="Address" text={client?.address} />
                <TextLabel
                  label="Email Address"
                  text={client?.email || "None"}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                <TextLabel label="State" text={client?.state || "Nill"} />
                <TextLabel label="LGA" text={client?.lga || "Nill"} />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                <TextLabel
                  label="Age"
                  text={moment(new Date()).diff(client?.dateOfBirth, "years")}
                />

                <TextLabel label="Phone Number" text={client?.phoneNumber} />
              </div>
            </Box>
          </Stack> */}

          {!client?.parentOne || client?.parentOne === "" ? null : (
            <Stack>
              <Box
                sx={{
                  borderRadius: 2,
                  border: "1px #E4E7EC solid",
                  background: "white",
                  width: "100%",
                  px: 3,
                  py: 2,
                }}
              >
                <Typography
                  sx={{ color: "#090816" }}
                  fontWeight={600}
                  fontSize={18}
                >
                  Emergency Contact
                </Typography>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    marginTop: "1rem",
                  }}
                >
                  <TextLabel
                    label="Person 1"
                    text={client?.parentOne || "Not Available"}
                  />
                  <TextLabel
                    label="Phone Number"
                    text={client?.parentOneNumber || "Not Available"}
                  />
                </div>
                <Divider />
              </Box>
            </Stack>
          )}

          {!client?.parentTwo || client?.parentTwo === "" ? null : (
            <Stack>
              <Box
                sx={{
                  borderRadius: 2,
                  border: "1px #E4E7EC solid",
                  background: "white",
                  width: "100%",
                  px: 3,
                  py: 2,
                }}
              >
                <Typography
                  sx={{ color: "#090816" }}
                  fontWeight={600}
                  fontSize={18}
                >
                  Emergency Contact 2
                </Typography>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    marginTop: "1rem",
                  }}
                >
                  <TextLabel
                    label="Person 2"
                    text={client?.parentTwo || "Not Available"}
                  />
                  <TextLabel
                    label="Phone Number"
                    text={client?.parentTwoNumber || "Not Available"}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  <TextLabel
                    label="Relationship"
                    text={client?.parentTwoRelationship || "Not Available"}
                  />
                </div>
              </Box>
            </Stack>
          )}

          {/* {!client?.nokFullName || client?.nokFullName === "" ? null : (
            <Stack>
              <Box
                sx={{
                  borderRadius: 2,
                  border: "1px #E4E7EC solid",
                  background: "white",
                  width: "100%",
                  px: 3,
                  py: 2,
                }}
              >
                <Typography
                  sx={{ color: "#090816" }}
                  fontWeight={600}
                  fontSize={18}
                >
                  Next Of Kin
                </Typography>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    marginTop: "1rem",
                  }}
                >
                  <TextLabel
                    label="Next of Kin"
                    text={client?.nokFullName || "Not Available"}
                  />
                  <TextLabel
                    label="Phone Number"
                    text={client?.nokPhoneNumber || "Not Available"}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  <TextLabel
                    label="NHR ID"
                    text={client?.nokNHR_ID || "Not Available"}
                  />
                  <TextLabel
                    label="Relationship"
                    text={client?.nokRelationship || "Not Available"}
                  />
                </div>
              </Box>
            </Stack>
          )} */}

          {/* <Stack>
            <Box
              sx={{
                borderRadius: 2,
                border: "1px #E4E7EC solid",
                background: "white",
                width: "100%",
                px: 3,
                py: 2,
              }}
            >
              <Typography
                sx={{ color: "#090816" }}
                fontWeight={600}
                fontSize={18}
              >
                Health Plan
              </Typography>

              <div
                style={{
                  marginTop: "1rem",
                }}
              >
                <TextLabel label="HMO Plan" text={client?.HMOPlan} />
              </div>

              <div>
                <TextLabel
                  label="Nominated Pharmacy"
                  text={client?.nominatedPharmarcy || "None"}
                />
                <TextLabel
                  label="Registered Doctor"
                  text={client?.registeredDoctor || "None"}
                />
              </div>
            </Box>
          </Stack> */}
        </Box>
      </Box>
      <ProfileSummary client={client} NHRID={NHRID} isLoading={isLoading} />
    </Box>
  );
}
