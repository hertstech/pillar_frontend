import { Skeleton, Typography } from "@mui/material";
import classNames from "classnames";

interface TextLabelProps {
  text: any;
  label: string;
  isLoading?: boolean;
}

export const TextLabel = ({ text, label, isLoading }: TextLabelProps) => (
  <label
    style={{
      fontWeight: 400,
      color: "#475467",
      fontSize: 12,
      margin: "20px 0px",
    }}
  >
    {label}
    {isLoading ? (
      <Skeleton
        variant="text"
        animation="wave"
        width={300}
        sx={{ fontSize: "18px" }}
      />
    ) : (
      <Typography
        sx={{
          "&::first-letter": {
            textTransform: "uppercase",
          },
          mt: "4px",
          fontWeight: "fontBold ",
        }}
        fontSize={16}
        // color={}
        className={classNames(
          "font-[600]",
          text === "pending"
            ? "text-[#475367]"
            : text === "active"
            ? "text-[#099137]"
            : text === "on_hold"
            ? "text-[#DD900D]"
            : text === "completed"
            ? "text-[#1570EF]"
            : text === "cancelled"
            ? "text-[#CB1A14]"
            : "#101928"
        )}
      >
        {text}
      </Typography>
    )}
  </label>
);
