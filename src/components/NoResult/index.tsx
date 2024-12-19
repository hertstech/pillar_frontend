import { TableCell, Typography } from "@mui/material";
import Styles from "./styles.module.css";
import classNames from "classnames";
import { Link } from "react-router-dom";
interface IProps {
  text: string;
  description?: string;
  linkTo?: string;
  linkDesc?: string;
}

export default function NoResultIllustration({
  text: title,
  description,
  linkTo = "#",
  linkDesc,
}: IProps) {
  return (
    <div className={classNames(Styles.background, "gap-6")}>
      <Typography fontWeight={700} fontSize={32} sx={{ color: "#101928" }}>
        {title}
      </Typography>
      {description && (
        <p className="text-sm font-normal text-neu-400">{description}</p>
      )}
      {linkDesc && (
        <Link
          to={linkTo}
          className="font-semibold text-white w-fit bg-pri-650 px-5 py-2 h-[40px] rounded-[10px]"
        >
          {linkDesc}
        </Link>
      )}
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
