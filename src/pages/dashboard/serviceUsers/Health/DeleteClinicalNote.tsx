import { Box, Button } from "@mui/material";
import { ModalAlt } from "../../../../components/Modals";
import { InfoIcon } from "../../../../assets/icons";
import { useDeleteClinicalNote } from "../../../../api/HealthServiceUser/clinicalNotes";

interface IProps {
  id: string;
  showModal: boolean;
  closeModal: () => void;
}

export const DeleteClinicalNote = ({ id, showModal, closeModal }: IProps) => {
  const { mutate } = useDeleteClinicalNote();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        closeModal();
      },
    });
  };

  return (
    <ModalAlt open={showModal} handleClose={closeModal}>
      <Box className="flex flex-col gap-12 justify-between items-center">
        <InfoIcon />
        <p className="text-base"> Are you sure to delete this Clinical note</p>
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
