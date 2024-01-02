import { Typography } from "@mui/material";
import Styles from "./styles.module.css";

export default function NoResultIllustration() {
  return (
    <div className={Styles.background}>
      <Typography fontWeight={400} fontSize={24} sx={{ color: "#101928" }}>
        No record added yet
      </Typography>
    </div>
  );
}

export const Loader = () => {
  return (
    <div style={{ minHeight: "610px" }} className="">
      <div className="wrapp">
        <div className="pulseLoad" />
      </div>
    </div>
  );
};
