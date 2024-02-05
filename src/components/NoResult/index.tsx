import { Typography } from "@mui/material";
import Styles from "./styles.module.css";

export default function NoResultIllustration({ text }: any) {
  return (
    <div className={Styles.background}>
      <Typography fontWeight={400} fontSize={24} sx={{ color: "#101928" }}>
        {text}
      </Typography>
    </div>
  );
}

export const Loader = () => {
  return (
    <div style={{ minHeight: "inherit" }} className="wrapped">
      <div className="wrapp">
        <div className="pulseLoad" />
      </div>
    </div>
  );
};

export const SpinLoader = () => {
  return (
    <div style={{ minHeight: "75vh", display: "grid", placeItems: "center" }}>
      <span className="spinLoader"></span>
    </div>
  );
};
