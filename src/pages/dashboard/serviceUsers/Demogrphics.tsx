import { Box, Typography, Stack, Button } from "@mui/material";
import moment from "moment";
import {
  // InputField,
  TextLabel,
} from "../../../components/InputField";
import {  useParams } from "react-router-dom";
// import StatesData from "../../../../states.json";

interface UserData {
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
  isEdit: boolean;
  userData: UserData;
}

export default function Demogrphics({ userData }: PropType) {
  const { id } = useParams();

  return (
    <Box
      sx={{
        position: "relative",
        gap: 3,
        flexDirection: "column",
        display: "flex",
        mb: 7,
        background: "white",
        borderRadius: 2,
        px: 3,
        py: 2,
      }}
    >
      <div style={{ marginBottom: "0px" }}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          position={"absolute"}
          p={1.5}
          display={"flex"}
          right={0}
        >
          <Button
            href={`/dashboard/user/${id}/edit`}
            variant="contained"
            sx={{
              color: "#FFF",
              outline: "none",
              textTransform: "capitalize",
              fontWeight: 600,
              background: "#099250",
              "&:hover": { backgroundColor: "#099250" },
            }}
          >
            Update Record
          </Button>
        </Stack>
      </div>
      <div className="">
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Personal Information
        </Typography>
        <Stack
          sx={{
            display: "grid",
            columnGap: 1.5,
            rowGap: 1.5,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              lg: "repeat(3, 1fr)",
            },
          }}
        >
          <TextLabel
            label="Full Name"
            text={userData?.firstName + " " + userData?.lastName}
          />
          <TextLabel label="Gender" text={userData?.gender} />
          <TextLabel
            label="Date of Birth"
            text={moment(userData?.dateOfBirth).format("L")}
          />
          <TextLabel
            label="Age"
            text={moment(new Date()).diff(userData?.dateOfBirth, "years")}
          />

          <TextLabel label="Religion" text={userData?.religion} />
          <TextLabel label="Tribal Mark" text={userData?.tribalMarks} />
        </Stack>
      </div>

      <div className="">
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Contact details
        </Typography>
        <Stack
          sx={{
            display: "grid",
            columnGap: 1.5,
            rowGap: 1.5,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
            },
          }}
        >
          <TextLabel label="Phone Number" text={userData?.phoneNumber} />
          <TextLabel
            label="Address"
            text={userData?.address + " " + userData?.lga}
          />
          <TextLabel label="State" text={userData?.state || "Nill"} />
          <TextLabel label="Email Address" text={userData?.email || "None"} />
        </Stack>
      </div>

      <div className="">
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Emergency Contact
        </Typography>
        <Stack>
          <Typography fontWeight={500} fontSize={18}>
            Parent One
          </Typography>
          <Box
            sx={{
              display: "grid",
              columnGap: 1.5,
              rowGap: 1.5,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                lg: "repeat(4, 1fr)",
              },
            }}
          >
            <TextLabel
              label="Full Name"
              text={userData?.parentOne || "Not Available"}
            />
            <TextLabel
              label="Phone Number"
              text={userData?.parentOneNumber || "Not Available"}
            />
            <TextLabel
              label="NHR ID"
              text={userData?.parentOneNHR_ID || "Not Available"}
            />
            <TextLabel
              label="Relationship"
              text={userData?.parentOneRelationship || "Not Available"}
            />
          </Box>

          <Typography sx={{ mt: 2 }} fontWeight={500} fontSize={18}>
            Parent Two
          </Typography>
          <Box
            sx={{
              display: "grid",
              columnGap: 1.5,
              rowGap: 1.5,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                lg: "repeat(4, 1fr)",
              },
            }}
          >
            <TextLabel
              label="Parent Two"
              text={userData?.parentTwo || "Not Available"}
            />
            <TextLabel
              label="Phone Number"
              text={userData?.parentTwoNumber || "Not Available"}
            />
            <TextLabel
              label="NHR ID"
              text={userData?.parentTwoNHR_ID || "Not Available"}
            />
            <TextLabel
              label="Relationship"
              text={userData?.parentTwoRelationship || "Not Available"}
            />
          </Box>

          <Typography sx={{ mt: 2 }} fontWeight={500} fontSize={18}>
            Next of Kin
          </Typography>
          <Box
            sx={{
              display: "grid",
              columnGap: 1.5,
              rowGap: 1.5,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                lg: "repeat(4, 1fr)",
              },
            }}
          >
            <TextLabel
              label="Next of Kin"
              text={userData?.nokFullName || "Not Available"}
            />
            <TextLabel
              label="Phone Number"
              text={userData?.nokPhoneNumber || "Not Available"}
            />
            <TextLabel
              label="NHR ID"
              text={userData?.nokNHR_ID || "Not Available"}
            />
            <TextLabel
              label="Relationship"
              text={userData?.nokRelationship || "Not Available"}
            />
          </Box>
        </Stack>
      </div>

      <div className="">
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Health Plan
        </Typography>
        <Stack
          sx={{
            display: "flex",
          }}
        >
          <TextLabel label="HMO Plan" text={userData?.HMOPlan} />
          <TextLabel
            label="Nominated Pharmacy"
            text={userData?.nominatedPharmarcy || "None"}
          />
          <TextLabel
            label="Registered Doctor"
            text={userData?.registeredDoctor || "None"}
          />
        </Stack>
      </div>

      {/* <div className="">
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Contact Details
        </Typography>
        <Box
          sx={{
            display: "grid",
            columnGap: 1.5,
            rowGap: 1.5,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
            },
          }}
        >
          <InputField
            type="text"
            label="Email Address"
            name="email"
            value={userData?.email || "None"}
            onChange={() => {}}
            disabled={!isEdit}
          />

          <InputField
            type="text"
            label="Phone Number"
            name="phoneNumber"
            value={userData?.phoneNumber}
            onChange={() => {}}
            disabled={!isEdit}
          />

          <InputField
            type="text"
            label="Address"
            name="address"
            value={userData?.address + " " + userData?.lga}
            onChange={() => {}}
            disabled={!isEdit}
          />

          <InputField
            type="text"
            label="Age"
            name="age"
            value={moment(new Date()).diff(userData?.dateOfBirth, "years")}
            onChange={() => {}}
            disabled={!isEdit}
          />
          <InputField
            type="text"
            label="Date of Birth"
            name="dateofBirth"
            value={moment(userData?.dateOfBirth).format("L")}
            onChange={() => {}}
            disabled={!isEdit}
          />
          <label htmlFor="state" style={{ marginTop: 8 }}>
            State
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name="state"
              defaultValue={userData?.state}
              onChange={() => {}}
              disabled={!isEdit}
            >
              {StatesData.map((state, index) => (
                <MenuItem key={index} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor="LGA" style={{ marginTop: 8 }}>
            L.G.A
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name="lga"
              value={userData?.lga}
              onChange={() => {}}
              disabled={!isEdit}
            >
              {StatesData?.find(
                (state) => state.name === userData?.state || state
              )?.lgas.map((lga, index) => (
                <MenuItem key={index} value={lga}>
                  {lga ? lga : ""}
                </MenuItem>
              ))}
            </TextField>
          </label>
        </Box>
      </div> */}

      {/* <div className="">
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Height and Weight Details
        </Typography>
        <Box
          sx={{
            display: "grid",
            columnGap: 1.5,
            rowGap: 1.5,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
            },
          }}
        >
          <label htmlFor="height">
            Height
            <OutlinedInput
              sx={{ marginTop: "5px" }}
              fullWidth
              name="height"
              value={userData?.height}
              disabled={!isEdit}
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              inputProps={{
                max: 999,
                type: "number",
                min: 0,
              }}
              onChange={() => {}}
            />
          </label>

          <label>
            Weight
            <OutlinedInput
              sx={{ marginTop: "5px" }}
              fullWidth
              name="weight"
              value={userData?.weight}
              disabled={!isEdit}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              inputProps={{
                max: 999,
                type: "number",
                min: 0,
              }}
              onChange={() => {}}
            />
          </label>

          <InputField
            type="text"
            label="HMO Name"
            name="hmoPlan"
            value={userData?.HMOPlan || "None"}
            disabled={!isEdit}
            onChange={() => {}}
          />
        </Box>
      </div> */}
    </Box>
  );
}
