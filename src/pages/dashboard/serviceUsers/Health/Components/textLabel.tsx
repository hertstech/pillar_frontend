import { Skeleton, Typography } from "@mui/material";
import classNames from "classnames";
import { getStatusColor } from "../../../../../Utils/getStatusColor";

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
          getStatusColor((text === "On Hold" && "on_hold") || text)
        )}
      >
        {text}
      </Typography>
    )}
  </label>
);
