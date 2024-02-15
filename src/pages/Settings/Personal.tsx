import { Box, MenuItem, TextField, Stack } from "@mui/material";
import React from "react";
import InputField from "../../components/InputField";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { axiosInstance } from "../../Utils";
import Swal from "sweetalert2";
// import PhoneField from "../../components/PhoneInput";
// import { Calendar } from "../../components/CalendarField";
// import moment from "moment";

const title = [
  "Mr.",
  "Mrs.",
  "Miss",
  "Ms.",
  "Dr.",
  "Prof.",
  "Rev.",
  "Hon.",
  "Capt.",
  "Sir.",
  "Dame",
];

export default function Personal() {
  const user = useSelector((state: any) => state.user.user);

  console.log(user);

  const [isLoading, setIsLoading] = React.useState(false);

  const [formField, setFormField] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email || "None",
    phoneNumber: user.phoneNumber || "None",
    title: user.title || "",
    role: user.role || "",
    position: user.position || "",
  });

  const handleChange = (name: string, value: any) => {
    setFormField({
      ...formField,
      [name || ""]: value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/hcp/tenet-update/${user.id}`);

      Swal.fire({
        icon: "success",
        title: `Success`,
        text: `You’ve updated your record`,
        confirmButtonColor: "#099250",
      });
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `error`,
        text: `Please try again`,
        confirmButtonColor: "#099250",
      });
      setIsLoading(false);
    }
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
        <label htmlFor="title">
          Title
          <TextField
            select
            sx={{ marginTop: "5px" }}
            fullWidth
            name="title"
            value={formField.title}
            onChange={(e) => handleChange("title", e.target.value)}
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
          label="Position"
          name="Position"
          value={formField.position || "IT Support"}
          onChange={(e: any) => handleChange("position", e.target.value)}
        />
        <label htmlFor="role" style={{ marginTop: "8px" }}>
          <span>Role</span>
          <TextField
            select
            fullWidth
            sx={{ mt: "5px" }}
            name="role"
            value={formField.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            {user.role === "superadmin" && (
              <MenuItem value="superadmin">Tenant Admin</MenuItem>
            )}
            <MenuItem value="admin">HCP</MenuItem>
            <MenuItem value="staff">Coordinator</MenuItem>
          </TextField>
        </label>
      </Box>

      <Stack justifyContent="flex-end" sx={{ width: "30%", mt: 3 }}>
        <Button
          title="Update Profile"
          loading={isLoading}
          onClick={handleSubmit}
        />
      </Stack>
    </Box>
  );
}
