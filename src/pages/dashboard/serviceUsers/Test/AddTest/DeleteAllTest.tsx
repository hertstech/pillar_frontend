import { Box, Button } from "@mui/material";
import { useDeleteAllTestOrder } from "../../../../../api/HealthServiceUser/test";
import { useAlert } from "../../../../../Utils/useAlert";
import { ModalAlt } from "../../../../../components/Modals";
import { InfoIcon } from "../../../../../assets/Icons";

interface IProps {
  id: string;
  showModal: boolean;
  closeModal: () => void;
}

export const DeleteAllTestsOrder = ({ id, showModal, closeModal }: IProps) => {
  const { mutate } = useDeleteAllTestOrder();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        useAlert({
          isToast: true,
          icon: "success",
          position: "top-start",
          title: "Test order deleted successfully",
          timer: 2000,
        });
        closeModal();
      },
      onError: () => {
        useAlert({
          isToast: true,
          icon: "error",
          position: "top-start",
          title: "Unable to test order, please try again later!",
          showButton: true,
        });
        closeModal();
      },
    });
  };

  return (
    <ModalAlt open={showModal} handleClose={closeModal}>
      <Box className="flex flex-col gap-12 justify-between items-center">
        <InfoIcon />
        <p className="text-base"> Are you sure to delete this Test Order</p>
        <Box className="flex items-center gap-4 w-full">
          <Button
            sx={{
              textTransform: "none",
              background: "#EDFCF2",
              py: 1.5,
              px: 2,
              alignItems: "center",
              color: "#099250",
              "&:hover": { backgroundColor: "#EDFCF2" },
              width: "50%",
              borderRadius: "6px",
            }}
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "none",
              background: "#D42620",
              py: 1.5,
              px: 2,
              alignItems: "center",
              color: "#FFF",
              "&:hover": { backgroundColor: "#D42620" },
              width: "50%",
              borderRadius: "6px",
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </ModalAlt>
  );
};
