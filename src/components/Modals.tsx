import * as React from "react";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  width?: string | number;
}

export const ModalMain: React.FC<AlertDialogSlideProps> = ({
  open,
  handleClose,
  children,
  width,
}) => {
  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      onClick={handleDialogClick}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(0px)",
        },
      }}
      PaperProps={{
        elevation: 0,
        style: {
          boxShadow: "none",
          width: width ? width : "500px",
        },
      }}
    >
      <DialogContent
        style={{
          overflowY: "auto",
          maxHeight: "90vh",
          scrollbarWidth: "none",
        }}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export const ModalAlt: React.FC<AlertDialogSlideProps> = ({
  open,
  handleClose,
  children,
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    borderRadius: "8px",
    outline: "none",
    padding: "32px",
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </>
  );
};
