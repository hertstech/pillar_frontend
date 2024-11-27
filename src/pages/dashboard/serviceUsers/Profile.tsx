import { Box, Typography, Stack, Button, Divider } from "@mui/material";
import moment from "moment";
import { TextLabel } from "../../../components/InputField";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileSummary } from "../../../components/ServiceUser/ProfileSummary";
import { EditIcon } from "../../../assets/Icons";

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
        <Button
          variant="contained"
          className="!rounded-full !font-semibold !bg-[#fff] px-2 !gap-2
             !capitalize !outline !text-[#099250] !text-sm !absolute !top-4 !right-4"
          onClick={navToUpdateProfile}
        >
          Edit
          <EditIcon />
        </Button>

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

          <Stack>
            <Box
              sx={{
                borderRadius: 2,
                border: "1px #E4E7EC solid",
                background: "white",
                width: "100%",
                px: 3,
                py: 2,
                position: "absolute",
              }}
            >
              <Typography
                sx={{ color: "#090816" }}
                fontWeight={600}
                fontSize={18}
              >
                Emergency Contact
              </Typography>
              <Button
                variant="contained"
                className="!rounded-full !font-semibold !bg-[#fff] px-2 !gap-2
             !capitalize !outline !text-[#099250] !text-sm !absolute !top-4 !right-4"
                onClick={navToUpdateProfile}
              >
                Edit
                <EditIcon />
              </Button>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  margin: "1rem 0rem",
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
              </div>

              <Divider />

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
