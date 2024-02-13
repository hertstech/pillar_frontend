import {
  Box,
  // , Button, Stack
} from "@mui/material";
import React from "react";
import InputField from "../../components/InputField";
import { useSelector } from "react-redux";
import PhoneField from "../../components/PhoneInput";
// import { Calendar } from "../../components/CalendarField";
// import moment from "moment";

export default function Personal() {
  const user = useSelector((state: any) => state.user.user);

  const [formField, setFormField] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email || "None",
    phoneNumber: user.phoneNumber || "None",
    dateOfBirth: user.dateOfBirth || "None",
  });

  const handleChange = (name: string, value: any) => {
    setFormField({
      ...formField,
      [name || ""]: value,
    });
  };
  return (
    <Box
      sx={{
        background: "white",
        p: 3,
        borderRadius: 2,
      }}
    >
      <Box flexDirection={"column"} sx={{ display: "flex", gap: 2 }}>
        <InputField
          type="text"
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={(e: any) => handleChange("firstName", e.target.value)}
        />
        <InputField
          type="text"
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={(e: any) => handleChange("lastName", e.target.value)}
        />
        <InputField
          type="text"
          label="Email Address"
          name="email"
          value={user.email}
          onChange={(e: any) => handleChange("email", e.target.value)}
        />
        <PhoneField
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={(value: any) => handleChange("phoneNumber", value)}
        />
      </Box>

      {/* <Stack direction="row" justifyContent="flex-end" gap={5} p={3}>
        <Button
          variant="outlined"
          color="error"
          //   onClick={onClose}
          sx={{ px: 5 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ px: 5 }}
          color="success"
          //   onClick={handleSubmit}
          //   disabled={isLoading}
        >
          Update Profile
        </Button>
      </Stack> */}
    </Box>
  );
}
