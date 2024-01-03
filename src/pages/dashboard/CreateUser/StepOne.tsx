import dayjs from "dayjs";
import { useState } from "react";
import {
  Box,
  Typography,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputField from "../../../components/InputField";
import StatesData from "../../../../states.json";
import PhoneField from "../../../components/PhoneInput";
// import { countries } from "../../../components/_mock/_countries";

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

const title = ["Mr", "Mrs", "Miss", "Ms", "Chief", "Dr", "Prof"];

export default function StepOne({
  formData,
  handleChange: superHandleChange,
}: any) {
  const [show, setShow] = useState(false);
  const [ageValue, setAgeValue] = useState(false);

  const calculateAge = () => {
    if (formData.dateOfBirth) {
      const currentDate = new Date();
      const birthDate = new Date(formData.dateOfBirth);

      let age = currentDate.getFullYear() - birthDate.getFullYear();

      // Check if the birthday has occurred this year
      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    }

    return 0; // Return null if no date is selected
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: any; value: any }>
  ) => {
    const { name, value } = event.target;
    superHandleChange({ ...formData, [name || ""]: value });
  };

  const handleDateChange = (newValue: any, name: string) => {
    superHandleChange({ ...formData, [name]: newValue.format() });

    // Check if the age is less than 18
    setAgeValue(calculateAge() !== null && calculateAge() < 18);
  };

  const handlePhoneChange = (value: any, identifier: any) => {
    switch (identifier) {
      case "phoneNumber":
        superHandleChange({ ...formData, phoneNumber: value });
        break;
      case "parentOneNumber":
        superHandleChange({ ...formData, parentOneNumber: value });
        break;
      case "parentTwoNumber":
        superHandleChange({ ...formData, parentTwoNumber: value });
        break;
      case "nokPhoneNumber":
        superHandleChange({ ...formData, nokPhoneNumber: value });
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* PERSONAL INFORMATION */}
      <Box
        sx={{
          display: "grid",
          columnGap: 1.5,
          rowGap: 1.5,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
          },
          marginBottom: 2,
        }}
      >
        <label htmlFor="title" style={{ marginTop: 9 }}>
          Title
          <TextField
            select
            sx={{ marginTop: "5px" }}
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
          >
            {title.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </label>
        <InputField
          type="text"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <InputField
          type="text"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <InputField
          type="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="gender" style={{ marginTop: 8 }}>
          Gender
          <TextField
            select
            sx={{ marginTop: "5px" }}
            fullWidth
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </label>

        <label htmlFor="dateOfBirth">
          Date of Birth
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                orientation="portrait"
                views={["year", "month", "day"]}
                format="DD/MM/YYYY"
                sx={{ marginTop: "5px", width: "100%" }}
                disableFuture={true}
                slotProps={{
                  field: {
                    readOnly: true,
                  },
                }}
                value={dayjs(formData.dateOfBirth)}
                onChange={(newValue) =>
                  handleDateChange(newValue, "dateOfBirth")
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </label>

        <label htmlFor="religion">
          Religion
          <TextField
            select
            sx={{ marginTop: "5px" }}
            fullWidth
            name="religion"
            value={formData.religion}
            onChange={handleChange}
          >
            <MenuItem value="Christian">Christian</MenuItem>
            <MenuItem value="Muslim">Muslim</MenuItem>
            <MenuItem value="Traditional">Traditional</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>
        </label>

        <PhoneField
          name="PhoneNumber"
          value={formData.phoneNumber}
          onChange={(value: any) => handlePhoneChange(value, "phoneNumber")}
        />

        <label htmlFor="height">
          Height
          <OutlinedInput
            sx={{ marginTop: "5px" }}
            fullWidth
            name="height"
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            inputProps={{
              max: 999,

              type: "number",
              min: 0,
            }}
            onChange={handleChange}
          />
        </label>

        <label>
          Weight
          <OutlinedInput
            sx={{ marginTop: "5px" }}
            fullWidth
            name="weight"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            inputProps={{
              max: 999,
              type: "number",
              min: 0,
            }}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="tribalMarks">
          Tribal Mark
          <TextField
            select
            sx={{ marginTop: "5px" }}
            fullWidth
            name="tribalMarks"
            value={formData.tribalMarks}
            onChange={handleChange}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </label>
      </Box>

      {/* RESIDENTIAL DETAILS */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Residential Information</Typography>
        <InputField
          type="text"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <Box
          sx={{
            display: "grid",
            columnGap: 1.5,
            rowGap: 1.5,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
            },
            marginTop: 2,
          }}
        >
          <label htmlFor="state">
            State
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              {StatesData.map((state, index) => (
                <MenuItem key={index} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor="LGA">
            L.G.A
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name="lga"
              value={formData.lga}
              onChange={handleChange}
            >
              {StatesData?.find(
                (state) => state.name === formData.state
              )?.lgas.map((lga, index) => (
                <MenuItem key={index} value={lga}>
                  {lga ? lga : ""}
                </MenuItem>
              ))}
            </TextField>
          </label>

          {/* <label htmlFor="state">
            Country
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              {countries.map((option: any) => (
                <MenuItem key={option.code} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </label> */}
        </Box>
      </Box>

      {ageValue ? (
        // {/* PARENT INFORMATION */}
        <Box sx={{ marginBottom: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Legal Guardian</Typography>
            <button
              title="Add new parent"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => setShow(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 32 32"
              >
                <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 15 L 10 15 L 10 17 L 15 17 L 15 22 L 17 22 L 17 17 L 22 17 L 22 15 L 17 15 L 17 10 Z"></path>
              </svg>
            </button>
          </Stack>
          <InputField
            type="text"
            label="Legal Guardian 1"
            name="parentOne"
            value={formData.parentOne}
            onChange={handleChange}
            placeholder="Please enter full name"
          />
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              marginBottom: 2,
            }}
          >
            <InputField
              type="number"
              required={ageValue}
              label="NHR ID"
              name="parentOneNHR_ID"
              value={formData.parentOneNHR_ID}
              onChange={handleChange}
              placeholder="Enter NHR ID number"
            />

            <div style={{ marginTop: 8 }}>
              <PhoneField
                name="parentOneNumber"
                value={formData.parentOneNumber}
                onChange={(value: any) =>
                  handlePhoneChange(value, "parentOneNumber")
                }
              />
            </div>

            <div style={{ marginTop: 8 }}>
              <label htmlFor="parentOneRelationship">
                Relationship
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="parentOneRelationship"
                  value={formData.parentOneRelationship}
                  onChange={handleChange}
                >
                  {relations.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>
            </div>
          </Box>
          {show && (
            <>
              <Box>
                {" "}
                <InputField
                  type="text"
                  label="Legal Guardian 2"
                  name="parentTwo"
                  value={formData.parentTwo}
                  onChange={handleChange}
                  placeholder="Please enter full name"
                />
                <Box
                  sx={{
                    display: "grid",
                    columnGap: 2,
                    rowGap: 2,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      lg: "repeat(3, 1fr)",
                    },
                    marginBottom: 2,
                  }}
                >
                  <InputField
                    type="text"
                    label="NHR ID"
                    name="parentTwoNHR_ID"
                    value={formData.parentTwoNHR_ID}
                    onChange={handleChange}
                  />

                  <div style={{ marginTop: 8 }}>
                    <PhoneField
                      name="parentTwoNumber"
                      value={formData.parentTwoNumber}
                      onChange={(value: any) =>
                        handlePhoneChange(value, "parentTwoNumber")
                      }
                    />
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <label htmlFor="parentTwoRelationship">
                      Relationship
                      <TextField
                        select
                        sx={{ marginTop: "5px" }}
                        fullWidth
                        name="parentTwoRelationship"
                        value={formData.parentTwoRelationship}
                        onChange={handleChange}
                      >
                        {relations.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </label>
                  </div>
                </Box>
              </Box>
            </>
          )}
        </Box>
      ) : (
        //  {/* FAMILY/RELATIVE INFORMATION */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Next of Kin</Typography>
          <InputField
            type="text"
            label="Full Name"
            name="nokFullName"
            value={formData.nokFullName}
            onChange={handleChange}
            placeholder="Please enter full name"
          />

          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              marginBottom: 2,
            }}
          >
            <InputField
              type="number"
              // required={ageValue}
              label="NHR ID"
              name="nokNHR_ID"
              value={formData.nokNHR_ID}
              onChange={handleChange}
              placeholder="Enter NHR ID number"
            />

            <div style={{ marginTop: 8 }}>
              <PhoneField
                name="nokPhoneNumber"
                value={formData.nokPhoneNumber}
                onChange={(value: any) =>
                  handlePhoneChange(value, "nokPhoneNumber")
                }
              />
            </div>

            <div style={{ marginTop: 8 }}>
              <label htmlFor="nokRelationship">
                Relationship
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="nokRelationship"
                  value={formData.nokRelationship}
                  onChange={handleChange}
                >
                  {relations.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>
            </div>
          </Box>
        </Box>
      )}

      {/* MEDICAL INFORMATION */}
      <Box>
        <Typography variant="h6">Medical Information</Typography>

        <InputField
          type="text"
          label="Nominated Pharmacy"
          name="nominatedPharmarcy"
          value={formData.nominatedPharmarcy}
          onChange={handleChange}
        />
        <InputField
          type="text"
          label="Registered Doctor"
          name="registeredDoctor"
          value={formData.registeredDoctor}
          onChange={handleChange}
        />
        <InputField
          type="text"
          label="Registered Hospital"
          name="registeredHospital"
          value={formData.registeredHospital}
          onChange={handleChange}
        />

        <InputField
          type="text"
          label="HMO Plan"
          name="HMOPlan"
          value={formData.HMOPlan}
          onChange={handleChange}
        />
      </Box>
    </>
  );
}
