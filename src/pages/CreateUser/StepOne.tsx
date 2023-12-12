import dayjs from "dayjs";
import {
  Box,
  Typography,
  OutlinedInput,
  InputAdornment,
  // Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import InputField from "../../components/InputField";

const trueDate = new Date();
const maxDate = trueDate.setFullYear(trueDate.getFullYear() - 18);

export default function StepOne({
  formData,
  handleChange: superHandleChange,
}: any) {
  // const handleChange = (value: { value: any }, { name }: any) => {
  //   superHandleChange({ ...formData, [name]: value });
  // };

  // const handleChange = (
  //   event: React.ChangeEvent<{ name?: string; value: unknown }>
  // ) => {
  //   const { name, value } = event.target;
  //   superHandleChange({ ...formData, [name || ""]: value });
  // };

  // const handleChange = (
  //   event: React.ChangeEvent<{ name?: string; value: unknown }> | string
  // ) => {
  //   if (typeof event === "string") {
  //     // Handle the case when the event is a string (coming from PhoneInput)
  //     superHandleChange({ ...formData, phoneNumber: event });
  //   } else {
  //     // Handle the case when the event is a regular event
  //     const { name, value } = event.target;
  //     superHandleChange({ ...formData, [name || ""]: value });
  //   }
  // };

  const handleChange = (
    event: React.ChangeEvent<{ name?: any; value: any }>
  ) => {
    const { name, value } = event.target;
    superHandleChange({ ...formData, [name || ""]: value });
  };

  const handleDateChange = (newValue: any, name: string) => {
    superHandleChange({ ...formData, [name]: newValue.toISOString() });
  };

  const handlePhoneChange = (value: any, identifier: any) => {
    switch (identifier) {
      case "phoneNumber":
        // setParentOnePhone(value);
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
                // name="dateOfBirth"
                sx={{ marginTop: "5px", width: "100%" }}
                disableFuture={true}
                maxDate={dayjs(maxDate)}
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
            <MenuItem value="catholic">Catholic</MenuItem>
            <MenuItem value="jehovah witness">Jehovah Witness</MenuItem>
            <MenuItem value="traditional">Traditional</MenuItem>
          </TextField>
        </label>

        <label htmlFor="phoneNumber">
          Phone Number
          <PhoneInput
            inputProps={{
              name: "phoneNumber",
              required: true,
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
            endAdornment={<InputAdornment position="end">ft</InputAdornment>}
            aria-describedby="outlined-height-helper-text"
            inputProps={{
              "aria-label": "height",
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
              <MenuItem value="abuja">Abuja</MenuItem>
              <MenuItem value="anambra">Anambra</MenuItem>
              <MenuItem value="kano">Kano</MenuItem>
              <MenuItem value="lagos">Lagos</MenuItem>
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
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </label>
        </Box>
      </Box>

      {/* PARENT INFORMATION */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Parent Information</Typography>

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
                  required: true,
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
            label="NHRID"
            name="parentOneNHRID"
            value={formData.parentOneNHRID}
            onChange={handleChange}
            placeholder=""
          />

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
