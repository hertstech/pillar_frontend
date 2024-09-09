import Modal from "../../../../../components/Modal";
import { Box } from "@mui/material";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export const UpdateHistoryModal = ({ open, onClose }: IProps) => {
  return (
    <Modal open={open} handleClose={onClose}>
      <Box className="w-[535px] min-h-[550px] pb-0 p-[1.5rem]">
        <Box className="flex justify-between items-center">
          <h2 className="text-[.875rem] font-[500] leading-5">
            {"Sickness name here"}
          </h2>
          <p
            onClick={onClose}
            className="w-6 h-6 text-center cursor-pointer rounded-full bg-pri-50 text-pri-500"
          >
            x
          </p>
        </Box>
        <h1 className="text-[1.15rem] uppercase font-[900] leading-6 mt-1">
          History
        </h1>
        <Box className="w-full border-b-none border-[1px] border-[#E7E9FB] min-h-[640px] rounded-t-lg mt-6 px-4"></Box>
      </Box>
    </Modal>
  );
};
