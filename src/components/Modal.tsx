import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<AlertDialogSlideProps> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(0px)",
        },
      }}
      PaperProps={{
        elevation: 0,
        style: {
          boxShadow: "none",
        },
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
