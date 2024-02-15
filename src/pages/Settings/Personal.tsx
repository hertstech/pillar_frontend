import { Box } from "@mui/material";
import InputField from "../../components/InputField";
import { useSelector } from "react-redux";
// import PhoneField from "../../components/PhoneInput";
// import { Calendar } from "../../components/CalendarField";
// import moment from "moment";

export default function Personal() {
  const user = useSelector((state: any) => state.user.user);

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
          label="Title"
          name="firstName"
          value={user.title}
          disabled
          onChange={() => {}}
        />
        <InputField
          type="text"
          label="First Name"
          name="firstName"
          value={user.firstName}
          disabled
          onChange={() => {}}
        />
        <InputField
          type="text"
          label="Last Name"
          name="lastName"
          value={user.lastName}
          disabled
          onChange={() => {}}
        />
        <InputField
          type="text"
          label="Email Address"
          name="email"
          value={user.email}
          disabled
          onChange={() => {}}
        />

        <InputField
          type="text"
          label="Position"
          name="Position"
          value={user.position || "IT Support"}
          disabled
          onChange={() => {}}
        />
        <InputField
          type="text"
          label="Role"
          name="Position"
          value={user.role}
          disabled
          onChange={() => {}}
        />
      </Box>
    </Box>
  );
}
