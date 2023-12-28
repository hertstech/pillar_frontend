import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  TextField,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import moment from "moment";
import InputField, { TextLabel } from "../../../components/InputField";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import StatesData from "../../../../states.json";
import { MdEdit } from "react-icons/md";
import PhoneField from "../../../components/PhoneInput";
import Style from "./styles.module.css";

const relations = [
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daughter" },
  { value: "grand mother", label: "Grand Mother" },
  { value: "grand father", label: "Grand Father" },
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
  { value: "aunty", label: "Aunty" },
  { value: "uncle", label: "Uncle" },
  { value: "guardian", label: "Guardian" },
  { value: "other", label: "Other" },
];

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
  isLoading: boolean;
}

export default function Demogrphics({ userData, isLoading }: PropType) {
  // const { id } = useParams();

  const [showEdit, setShowEdit] = useState(false);

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
            // href={`/dashboard/user/${id}/edit`}
            variant="contained"
            sx={{
              color: "#FFF",
              outline: "none",
              textTransform: "capitalize",
              fontWeight: 600,
              background: "#099250",
              "&:hover": { backgroundColor: "#099250" },
              gap: 1,
            }}
            onClick={() => setShowEdit(true)}
          >
            <MdEdit style={{ fontSize: 20 }} />
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
            isLoading={isLoading}
          />
          <TextLabel
            label="Gender"
            text={userData?.gender}
            isLoading={isLoading}
          />

          <TextLabel
            label="Religion"
            text={userData?.religion}
            isLoading={isLoading}
          />
          <TextLabel
            label="Tribal Mark"
            text={userData?.tribalMarks}
            isLoading={isLoading}
          />
        </Stack>
      </div>

      <div className="">
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Contact details
        </Typography>
        <TextLabel
          label="Address"
          text={userData?.address}
          isLoading={isLoading}
        />
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
          <TextLabel
            label="State"
            text={userData?.state || "Nill"}
            isLoading={isLoading}
          />
          <TextLabel
            label="LGA"
            text={userData?.lga || "Nill"}
            isLoading={isLoading}
          />
          <TextLabel
            label="Date of Birth"
            text={moment(userData?.dateOfBirth).format("L")}
            isLoading={isLoading}
          />
          <TextLabel
            label="Age"
            text={moment(new Date()).diff(userData?.dateOfBirth, "years")}
            isLoading={isLoading}
          />
          <TextLabel
            label="Email Address"
            text={userData?.email || "None"}
            isLoading={isLoading}
          />
          <TextLabel
            label="Phone Number"
            text={userData?.phoneNumber}
            isLoading={isLoading}
          />
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
              isLoading={isLoading}
            />
            <TextLabel
              label="Phone Number"
              text={userData?.parentOneNumber || "Not Available"}
              isLoading={isLoading}
            />
            <TextLabel
              label="NHR ID"
              text={userData?.parentOneNHR_ID || "Not Available"}
              isLoading={isLoading}
            />
            <TextLabel
              label="Relationship"
              text={userData?.parentOneRelationship || "Not Available"}
              isLoading={isLoading}
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
              isLoading={isLoading}
            />
            <TextLabel
              label="Phone Number"
              text={userData?.parentTwoNumber || "Not Available"}
              isLoading={isLoading}
            />
            <TextLabel
              label="NHR ID"
              text={userData?.parentTwoNHR_ID || "Not Available"}
              isLoading={isLoading}
            />
            <TextLabel
              label="Relationship"
              text={userData?.parentTwoRelationship || "Not Available"}
              isLoading={isLoading}
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
              isLoading={isLoading}
            />
            <TextLabel
              label="Phone Number"
              text={userData?.nokPhoneNumber || "Not Available"}
              isLoading={isLoading}
            />
            <TextLabel
              label="NHR ID"
              text={userData?.nokNHR_ID || "Not Available"}
              isLoading={isLoading}
            />
            <TextLabel
              label="Relationship"
              text={userData?.nokRelationship || "Not Available"}
              isLoading={isLoading}
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
          <TextLabel
            label="HMO Plan"
            text={userData?.HMOPlan}
            isLoading={isLoading}
          />
          <TextLabel
            label="Nominated Pharmacy"
            text={userData?.nominatedPharmarcy || "None"}
            isLoading={isLoading}
          />
          <TextLabel
            label="Registered Doctor"
            text={userData?.registeredDoctor || "None"}
            isLoading={isLoading}
          />
        </Stack>
      </div>

      {showEdit && (
        <>
          <Dialog
            // sx={{ maxWidth: "500px", mx: "auto" }}
            maxWidth={"xl"}
            open={showEdit}
            onClose={() => setShowEdit(false)}
          >
            <DialogTitle textAlign={"center"} p={2}>
              Edit Service User Details
            </DialogTitle>
            <DialogContent>
              <div className="">
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
                  <div style={{ marginTop: 8 }}>
                    <PhoneField
                      name="phoneNumber"
                      value={userData?.phoneNumber}
                    />
                  </div>

                  <InputField
                    type="text"
                    label="Address"
                    name="address"
                    value={userData?.address}
                    onChange={() => {}}
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
                <Box
                  sx={{
                    display: "grid",
                    columnGap: 1.5,
                    rowGap: 1.5,
                    marginTop: "8px",
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
                      endAdornment={
                        <InputAdornment position="end">cm</InputAdornment>
                      }
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
                      endAdornment={
                        <InputAdornment position="end">kg</InputAdornment>
                      }
                      inputProps={{
                        max: 999,
                        type: "number",
                        min: 0,
                      }}
                      onChange={() => {}}
                    />
                  </label>

                  <div className={Style.display}>
                    <InputField
                      type="text"
                      label="Parent One"
                      name="parentOne"
                      value={userData?.parentOne || "None"}
                      onChange={() => {}}
                    />

                    <div style={{ marginTop: 8 }}>
                      <PhoneField
                        name="parentOneNumber"
                        value={userData?.phoneNumber}
                      />
                    </div>

                    <InputField
                      type="text"
                      label="NHR ID"
                      name="parentOneNHR_ID"
                      value={userData?.parentOneNHR_ID || "None"}
                      onChange={() => {}}
                    />

                    <label htmlFor="parentOneRelationship">
                      Relationship
                      <TextField
                        select
                        sx={{ marginTop: "5px" }}
                        fullWidth
                        name="parentOneRelationship"
                        value={userData.parentOneRelationship}
                        // onChange={handleChange}
                      >
                        {relations.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </label>
                  </div>

                  <div className={Style.display}>
                    <InputField
                      type="text"
                      label="Parent Two"
                      name="parentTwo"
                      value={userData?.parentTwo || "None"}
                      onChange={() => {}}
                    />
                    <div style={{ marginTop: 8 }}>
                      <PhoneField
                        name="parentTwoNumber"
                        value={userData?.parentTwoNumber}
                      />
                    </div>

                    <InputField
                      type="text"
                      label="NHR ID"
                      name="parentTwoNHR_ID"
                      value={userData?.parentTwoNHR_ID || "None"}
                      onChange={() => {}}
                    />
                  </div>

                  <InputField
                    type="text"
                    label="HMO Name"
                    name="hmoPlan"
                    value={userData?.HMOPlan || "None"}
                    onChange={() => {}}
                  />

                  <InputField
                    type="text"
                    label="HMO Name"
                    name="nominatedPharmarcy"
                    value={userData?.nominatedPharmarcy || "None"}
                    onChange={() => {}}
                  />

                  <InputField
                    type="text"
                    label="HMO Name"
                    name="registeredDoctor"
                    value={userData?.registeredDoctor || "None"}
                    onChange={() => {}}
                  />
                </Box>
              </div>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined">Save changes</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}
