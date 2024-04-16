// import { useState } from "react";
// import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
// import Style from "../../components/InputField/styles.module.css";
// import Styles from "./styles.module.css";
// import { MdOutlineCalendarToday } from "react-icons/md";

interface Props {
  value: string;
  onChange: any;
  label: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  minDate?: any;
}

// export function CalendarField({ value, selected, onSelect }: any) {
//   const [showCalendar, setShowcalendar] = useState(false);

//   return (
//     <>
//       <label style={{ marginTop: 10 }} htmlFor="dateOfBirth">
//         Date of Birth
//         <div className={Styles.wrapper}>
//           <input type="text" value={value} disabled className={Style.input} />
//           <div
//             className={Styles.icon}
//             onClick={() => setShowcalendar(!showCalendar)}
//           >
//             <MdOutlineCalendarToday color="#667185" />
//           </div>
//         </div>
//       </label>
//       {showCalendar && (
//         <div className={Styles.calendar}>
//           <DayPicker
//             mode="single"
//             captionLayout="dropdown"
//             fromYear={1800}
//             toYear={3000}
//             selected={selected}
//             onSelect={onSelect}
//           />
//         </div>
//       )}
//     </>
//   );
// }

export function Calendar({
  value,
  onChange,
  label,
  disableFuture,
  disablePast,
  minDate,
}: Props) {
  return (
    <label style={{ marginTop: 10 }} htmlFor="dateOfBirth">
      {label}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            orientation="portrait"
            views={["year", "month", "day"]}
            format="DD/MM/YYYY"
            minDate={minDate}
            sx={{ marginTop: "5px", width: "100%", fontFamily: "fontNormal" }}
            disableFuture={disableFuture}
            disablePast={disablePast}
            value={dayjs(value)}
            slotProps={{
              field: {
                readOnly: true,
              },
            }}
            onChange={onChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </label>
  );
}

export function NeedHelp() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        fontSize={16}
        sx={{ color: "#344054" }}
      >
        Need Help?
      </Typography>
      <span
        style={{
          color: "#98A2B3",
          width: "250px",
          display: "block",
          fontWeight: 400,
          fontSize: 14,
          margin: "10px 0px",
        }}
      >
        Experiencing any difficulty? Let us know below.
      </span>
      <Stack alignItems="flex-start" sx={{ mt: 2 }}>
        <Link
          to="#"
          style={{
            borderRadius: 8,
            padding: "8px 16px",
            border: "1px solid #2E90FA",
            color: "#1570EF",
            textDecoration: "none",
          }}
        >
          Contact Us
        </Link>
      </Stack>
    </Box>
  );
}
