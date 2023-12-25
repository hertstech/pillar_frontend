import {
  Box,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import moment from "moment";
import InputField from "../../../components/InputField";
import StatesData from "../../../../states.json";

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
}

interface PropType {
  isEdit: boolean;
  userData: UserData;
}

export default function Demogrphics({ isEdit, userData }: PropType) {
  return (
    <Box
      sx={{
        gap: 4,
        flexDirection: "column",
        display: "flex",
        mb: 10,
        background: "white",
        borderRadius: 2,
        px: 3,
        py: 2,
      }}
    >
      <div className="">
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Name
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
            // marginTop: 1,
          }}
        >
          <InputField
            type="text"
            label="First Name"
            name="firstName"
            value={userData?.firstName}
            onChange={() => {}}
            disabled={!isEdit}
          />

          <InputField
            type="text"
            label="Last Name"
            name="firstName"
            value={userData?.lastName}
            onChange={() => {}}
            disabled={!isEdit}
          />
        </Box>
      </div>

      <div className="">
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
      </div>

      <div className="">
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
      </div>
    </Box>
  );
}
