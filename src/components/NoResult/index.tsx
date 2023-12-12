import { Stack, Typography, Link } from "@mui/material";
import Styles from "./styles.module.css";

export default function NoResultIllustration() {
  return (
    <div className={Styles.background}>
      <Typography fontWeight={400} fontSize={24} sx={{ color: "#101928" }}>
        No record found for this NHR ID
      </Typography>
      <Stack alignItems="start" sx={{ mt: 2 }}>
        <Link
          href="/dashboard/new"
          fontWeight={500}
          color="#FFF"
          underline="none"
          variant="body2"
          borderRadius={2}
          gap={1}
          sx={{ display: "flex", background: "#099250", p: 2 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="button-icon">
              <g id="icon">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7ZM12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.55543 21.9174C8.22982 22.6502 10.4595 23 12 23C13.5405 23 15.7702 22.6502 17.4446 21.9174C18.2666 21.5576 19.1025 21.0427 19.5882 20.2974C19.8437 19.9054 20.0052 19.4437 19.9999 18.9282C19.9946 18.4174 19.8266 17.9281 19.5441 17.4728C18.1747 15.2656 15.3732 13 12 13C8.62679 13 5.82532 15.2656 4.45591 17.4728C4.17344 17.9281 4.00537 18.4174 4.00013 18.9282C3.99483 19.4437 4.15632 19.9054 4.41175 20.2974C4.89745 21.0427 5.73343 21.5576 6.55543 21.9174ZM6.00002 18.9487C6.00077 18.8757 6.02372 18.7394 6.15539 18.5272C7.27754 16.7185 9.51566 15 12 15C14.4843 15 16.7225 16.7185 17.8446 18.5272C17.9763 18.7394 17.9992 18.8757 18 18.9487C18.0007 19.017 17.9831 19.0973 17.9126 19.2055C17.7465 19.4605 17.3429 19.7787 16.6427 20.0852C15.2726 20.6848 13.3268 21 12 21C10.6732 21 8.72744 20.6848 7.35732 20.0852C6.65707 19.7787 6.25354 19.4605 6.08736 19.2055C6.01686 19.0973 5.99932 19.017 6.00002 18.9487Z"
                  fill="white"
                />
                <path
                  d="M21 3C21 2.44772 20.5523 2 20 2C19.4477 2 19 2.44772 19 3V4H18C17.4477 4 17 4.44772 17 5C17 5.55228 17.4477 6 18 6H19V7C19 7.55228 19.4477 8 20 8C20.5523 8 21 7.55228 21 7V6H22C22.5523 6 23 5.55228 23 5C23 4.44772 22.5523 4 22 4H21V3Z"
                  fill="white"
                />
              </g>
            </g>
          </svg>
          <span>Add New Record</span>
        </Link>
      </Stack>
    </div>
  );
}
