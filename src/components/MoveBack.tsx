import { Box, Stack } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface IProps {
  onMovingBack: () => void;
  title: string;
  subTitle: string;
}

export const MoveBackComp = ({ onMovingBack, title, subTitle }: IProps) => {
  return (
    <Stack sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        style={{ display: "flex", gap: 8, cursor: "pointer" }}
        onClick={onMovingBack}
      >
        <IoArrowBackCircleOutline size={22} />
        <Box sx={{ fontSize: "14px", fontWeight: 400 }}>{subTitle}</Box>
      </Box>

      <div
        style={{
          color: "#101928",
          fontWeight: 700,
          fontSize: 18,
          fontFamily: "fontBold",
          textTransform: "capitalize",
        }}
      >
        {title}
      </div>
    </Stack>
  );
};
