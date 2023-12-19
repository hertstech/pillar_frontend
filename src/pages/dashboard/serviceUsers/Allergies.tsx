import { Box, Divider, Stack, Typography } from "@mui/material";
import Styles from "./styles.module.css";
// import { MdOutlineCalendarToday } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";

export default function Allergies() {
  return (
    <Box sx={{ gap: 4, flexDirection: "column", display: "flex", mb: 10 }}>
      <Stack>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px #E4E7EC solid",
            gap: 2,
            background: "white",
            width: "100%",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
            Dr Ojo’s Assessment - 7th October 2021
          </Typography>

          <Divider />

          <ul className={Styles.lists}>
            <li>
              {/* <MdOutlineCalendarToday color="#667185" /> */}
              Anxiety disorder, unspecified
            </li>
            <li>
              {/* <IoTimeOutline color="#667185" /> */}
              Adjustement disorder and anxiety
            </li>
            <li>
              {/* <IoLocationOutline color="#667185" /> */}
              Major depressive disorder
            </li>
          </ul>
          <div
            style={{
              padding: "16px",
              color: "#101928",
            }}
          >
            <Typography fontWeight={400} fontSize={12}>
              Administered by
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={14}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <IoTimeOutline style={{ height: 15, width: 15 }} /> ID: #37493873
            </Typography>
          </div>
        </Box>
      </Stack>

      <Stack>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px #E4E7EC solid",
            gap: 2,
            background: "white",
            width: "100%",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
            Dr Ojo’s Assessment - 6th October 2021
          </Typography>

          <Divider />

          <ul className={Styles.lists}>
            <li>
              {/* <MdOutlineCalendarToday color="#667185" /> */}
              Anxiety disorder, unspecified
            </li>
            <li>
              {/* <IoTimeOutline color="#667185" /> */}
              Adjustement disorder and anxiety
            </li>
            <li>
              {/* <IoLocationOutline color="#667185" /> */}
              Major depressive disorder
            </li>
          </ul>
          <div
            style={{
              padding: "16px",
              color: "#101928",
            }}
          >
            <Typography fontWeight={400} fontSize={12}>
              Administered by
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={14}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <IoTimeOutline style={{ height: 15, width: 15 }} /> ID: #37493873
            </Typography>
          </div>
        </Box>
      </Stack>

      <Stack>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px #E4E7EC solid",
            gap: 2,
            background: "white",
            width: "100%",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
            Dr Ojo’s Assessment - 5th October 2021
          </Typography>

          <Divider />
          <ul className={Styles.lists}>
            <li>
              {/* <MdOutlineCalendarToday color="#667185" /> */}
              Anxiety disorder, unspecified
            </li>
            <li>
              {/* <IoTimeOutline color="#667185" /> */}
              Adjustement disorder and anxiety
            </li>
            <li>
              {/* <IoLocationOutline color="#667185" /> */}
              Major depressive disorder
            </li>
          </ul>
          <div
            style={{
              padding: "16px",
              color: "#101928",
            }}
          >
            <Typography fontWeight={400} fontSize={12}>
              Administered by
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={14}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <IoTimeOutline style={{ height: 15, width: 15 }} /> ID: #37493873
            </Typography>
          </div>
        </Box>
      </Stack>
    </Box>
  );
}
