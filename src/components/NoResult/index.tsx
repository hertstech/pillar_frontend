import { TableCell, Typography } from "@mui/material";
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

export const SpinLoader = () => {
  return (
    <div
      style={{
        minHeight: "75vh",
        display: "grid",
        placeItems: "center",
        width: "inherit",
      }}
    >
      <span className="loader"></span>
      <span
        style={{ color: "#475367", position: "absolute", marginTop: "100px" }}
      >
        Collating data...
      </span>
    </div>
  );
};

export const TableLoader = () => (
  <TableCell
    colSpan={12}
    rowSpan={12}
    style={{ height: "200px" }}
    sx={{ height: 200 }}
  >
    <div
      style={{
        minHeight: "75vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <span className="loader"></span>

      <span
        style={{ color: "#475367", position: "absolute", marginTop: "100px" }}
      >
        Collating data...
      </span>
    </div>
  </TableCell>
);
