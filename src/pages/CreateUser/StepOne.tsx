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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import InputField from "../../components/InputField";
import StatesData from "../../../states.json";

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
  // const ageValue = ;

  const handleChange = (
    event: React.ChangeEvent<{ name?: any; value: any }>
  ) => {
    const { name, value } = event.target;
    superHandleChange({ ...formData, [name || ""]: value });
  };

  const handleDateChange = (newValue: any, name: string) => {
    superHandleChange({ ...formData, [name]: newValue.toISOString() });

    // Check if the age is less than 18
    setAgeValue(calculateAge() !== null && calculateAge() < 18);
  };

  const handlePhoneChange = (value: any, identifier: any) => {
    switch (identifier) {
      case "phoneNumber":
        superHandleChange({ ...formData, phoneNumber: value });
        break;
      case "parentOneNumber":
        // setParentTwoPhone(value);
        superHandleChange({ ...formData, parentOneNumber: value });
        break;
      case "parentTwoNumber":
        // setEmergencyContactPhone(value);
        superHandleChange({ ...formData, parentTwoNumber: value });
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     // Perform verification after the delay
  //     verify();
  //   }, 10000); // 10 seconds delay

  //   return () => clearTimeout(timeoutId);
  // }, [formData.NIN]);

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
        <InputField
          type="text"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder=""
        />

        <InputField
          type="text"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder=""
        />

        <label htmlFor="gender">
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
                format="DD/MM/YYYY"
                sx={{ marginTop: "5px", width: "100%" }}
                disableFuture={true}
                // maxDate={dayjs(maxDate)}
                value={dayjs(formData.dateOfBirth)}
                onChange={(newValue) =>
                  handleDateChange(newValue, "dateOfBirth")
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </label>

        <label htmlFor="Religion">
          Religion
          <TextField
            select
            sx={{ marginTop: "5px" }}
            fullWidth
            name="religion"
            value={formData.religion}
            onChange={handleChange}
          >
            <MenuItem value="christian">Christian</MenuItem>
            <MenuItem value="muslim">Muslim</MenuItem>
            <MenuItem value="traditional">Traditional</MenuItem>
            <MenuItem value="jehovah witness">Others</MenuItem>
          </TextField>
        </label>

        <label htmlFor="phoneNumber">
          Phone Number
          <PhoneInput
            inputProps={{
              name: "phoneNumber",
              required: true,
              autoFocus: true,
              maxLength: 15,
            }}
            country={"ng"}
            containerStyle={{
              border: "1px solid #d0d5dd",
              padding: "16px auto",
              width: "100%",
              height: "56px",
              borderRadius: 6,
              marginTop: 5,
            }}
            inputStyle={{
              border: "none",
              width: "100%",
              height: "100%",
            }}
            dropdownStyle={{
              padding: "12px 12px",
            }}
            buttonStyle={{
              backgroundColor: "none",
            }}
            enableLongNumbers={13}
            value={formData.phoneNumber}
            onChange={(value) => handlePhoneChange(value, "phoneNumber")}
          />
        </label>

        <label htmlFor="height">
          Height
          <OutlinedInput
            sx={{ marginTop: "5px" }}
            fullWidth
            name="height"
            endAdornment={<InputAdornment position="end">meters</InputAdornment>}
            aria-describedby="outlined-height-helper-text"
            inputProps={{
              "aria-label": "height",
              maxLength: 3,
              step: 0.1,
              type: "number",
              minLength: 1,
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
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
              maxLength: 3,
              type: "number",
            }}
            onChange={handleChange}
          />
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
          placeholder=""
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
            // marginBottom: 2,
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
        </Box>
      </Box>

      {/* PARENT INFORMATION */}
      <Box sx={{ marginBottom: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Legal Guardian</Typography>{" "}
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

        {ageValue && (
          <p style={{ color: "red", fontSize: 12, marginTop: 5 }}>
            This User is below 18 kindly enter a Legal guardian details
          </p>
        )}

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
            // border: ageValue ? "2px solid red" : "",
          }}
        >
          <InputField
            // required={ageValue !== null ? ageValue : undefined}
            type="text"
            label="Parent (Father)"
            name="parentOne"
            value={formData.parentOne}
            onChange={handleChange}
            placeholder=""
          />
          <div style={{ marginTop: 8 }}>
            <label htmlFor="parentOneNumber">
              Phone Number
              <PhoneInput
                inputProps={{
                  name: "parentOneNumber",
                  required: ageValue,
                  maxLength: 15,
                  autoFocus: true,
                }}
                country={"ng"}
                containerStyle={{
                  border: "1px solid #d0d5dd",
                  padding: "16px auto",
                  width: "100%",
                  height: "56px",
                  borderRadius: 6,
                  marginTop: 5,
                }}
                inputStyle={{
                  border: "none",
                  width: "100%",
                  height: "100%",
                }}
                dropdownStyle={{
                  padding: "12px 12px",
                }}
                buttonStyle={{
                  backgroundColor: "none",
                }}
                value={formData.parentOneNumber}
                onChange={(value) =>
                  handlePhoneChange(value, "parentOneNumber")
                }
              />
            </label>
          </div>

          <InputField
            type="text"
            required={ageValue}
            label="NHRID"
            name="parentOneNHRID"
            value={formData.parentOneNHRID}
            onChange={handleChange}
            placeholder=""
          />
          {show && (
            <>
              <InputField
                type="text"
                label="Parent (Mother)"
                name="parentTwo"
                value={formData.parentTwo}
                onChange={handleChange}
                placeholder=""
              />

              <div style={{ marginTop: 8 }}>
                <label htmlFor="parentTwoNumber">
                  Phone Number
                  <PhoneInput
                    inputProps={{
                      name: "parentTwoNumber",
                      required: true,
                      maxLength: 15,
                      autoFocus: true,
                    }}
                    country={"ng"}
                    containerStyle={{
                      border: "1px solid #d0d5dd",
                      padding: "16px auto",
                      width: "100%",
                      height: "56px",
                      borderRadius: 6,
                      marginTop: 5,
                    }}
                    inputStyle={{
                      border: "none",
                      width: "100%",
                      height: "100%",
                    }}
                    dropdownStyle={{
                      padding: "12px 12px",
                    }}
                    buttonStyle={{
                      backgroundColor: "none",
                    }}
                    value={formData.parentTwoNumber}
                    onChange={(value) =>
                      handlePhoneChange(value, "parentTwoNumber")
                    }
                  />
                </label>
              </div>

              <InputField
                type="text"
                label="NHRID"
                name="parentTwoNHRID"
                value={formData.parentTwoNHRID}
                onChange={handleChange}
                placeholder=""
              />
            </>
          )}
        </Box>
      </Box>

      {/* MEDICAL INFORMATION */}
      <Box>
        <Typography variant="h6">Medical Information</Typography>

        <InputField
          type="text"
          label="Nominated Pharmacy"
          name="nominatedPharmacy"
          value={formData.nominatedPharmacy}
          onChange={handleChange}
          placeholder=""
        />
        <InputField
          type="text"
          label="Registered Doctor"
          name="registeredDoctor"
          value={formData.registeredDoctor}
          onChange={handleChange}
          placeholder=""
        />
        <InputField
          type="text"
          label="Registered Hospital"
          name="registeredHospital"
          value={formData.registeredHospital}
          onChange={handleChange}
          placeholder=""
        />

        <InputField
          type="text"
          label="HMO Plan"
          name="HMOPlan"
          value={formData.HMOPlan}
          onChange={handleChange}
          placeholder=""
        />
      </Box>
    </>
  );
}
