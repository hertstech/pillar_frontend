import { Box } from "@mui/material";

interface IProps {
  title?: string;
}

export const Spinner = ({ title }: IProps) => {
  return (
    <Box className="flex item-center justify-center ">
      <Box className="flex flex-col gap-3 item-center justify-center relative">
        <span className="loader -right-10" />

        <span className="text-neu-600">{title}</span>
      </Box>
    </Box>
  );
};
