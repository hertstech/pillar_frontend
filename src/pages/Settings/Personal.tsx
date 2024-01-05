import { Box, Button, Stack } from "@mui/material";
import React from "react";
import InputField from "../../components/InputField";
import { useSelector } from "react-redux";
import PhoneField from "../../components/PhoneInput";
import { Calendar } from "../../components/CalendarField";

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
      <Box
        sx={{
          display: "grid",
          columnGap: 1.5,
          rowGap: 1.5,
          //   textTransform: "capitalize",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
          },
        }}
      >
        <InputField
          type="text"
          label="First Name"
          name="firstName"
          value={formField.firstName}
          onChange={(e: any) => handleChange("firstName", e.target.value)}
        />
        <InputField
          type="text"
          label="Last Name"
          name="lastName"
          value={formField.lastName}
          onChange={(e: any) => handleChange("lastName", e.target.value)}
        />
        <InputField
          type="text"
          label="Email Address"
          name="email"
          value={formField.email}
          onChange={(e: any) => handleChange("email", e.target.value)}
        />
        <PhoneField
          name="phoneNumber"
          value={formField.phoneNumber}
          onChange={(value: any) => handleChange("phoneNumber", value)}
        />
        <Calendar
          label="Date Prescribed"
          value={formField.dateOfBirth}
          disableFuture={false}
          onChange={(newValue: any) =>
            handleChange("dateOfBirth", newValue.format())
          }
        />
      </Box>

      <Stack direction="row" justifyContent="flex-end" gap={5} p={3}>
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
        {/* <Buttons loading={isLoading} title="Submit" /> */}
      </Stack>
    </Box>
  );
}
