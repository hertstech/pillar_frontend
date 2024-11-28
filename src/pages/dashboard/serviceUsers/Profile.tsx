import { Box, Typography, Stack, Button, Divider } from "@mui/material";
import moment from "moment";
import { TextLabel } from "../../../components/InputField";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileSummary } from "../../../components/ServiceUser/ProfileSummary";
import { EditIcon } from "../../../assets/Icons";
import { ConsentStatus } from "../../../components/ServiceUser/ConsentStatus";

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

  const newId = id ? parseInt(id, 10) : null;

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
      <Box className="flex flex-col gap-6 w-[70%]">
        <Box className="flex flex-col p-6 w-full bg-white rounded-lg gap-2 border relative">
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
          <Button
            variant="contained"
            className="!rounded-full !font-semibold !bg-[#fff] px-2 !gap-2
             !capitalize !outline !text-[#099250] !text-sm !absolute !top-4 !right-4"
            onClick={navToUpdateProfile}
          >
            Edit
            <EditIcon />
          </Button>

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

        <Stack>
          <Box
            sx={{
              borderRadius: 2,
              border: "1px #E4E7EC solid",
              background: "white",
              width: "100%",
              px: 3,
              py: 2,
              position: "relative",
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
        <ConsentStatus NHRID={newId} goTo={navToUpdateProfile} />
      </Box>
      <ProfileSummary client={client} NHRID={NHRID} isLoading={isLoading} />
    </Box>
  );
}
