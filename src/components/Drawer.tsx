import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { drawerState } from "../atoms/drawerState";

type ReusableDrawerProps = {
  sx?: any;
  isIcon?: any;
  buttonText: string;
  children: React.ReactNode;
  drawerProps?: Partial<React.ComponentProps<typeof Drawer>>;
  buttonProps?: Partial<React.ComponentProps<typeof Button>> | any;
  onOpen: (e: React.MouseEvent) => void;
};

const DrawerComp: React.FC<ReusableDrawerProps> = ({
  sx,
  children,
  buttonText,
  drawerProps = {},
  buttonProps = {},
  onOpen,
  ...rest
}) => {
  const [openDrawer, setOpenDrawer] = useRecoilState(drawerState);

  const toggleDrawer =
    (action: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(action);
    };

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Button
        className="flex h-full w-full items-center justify-center gap-2"
        sx={sx}
        onClick={onOpen}
        {...buttonProps}
      >
        <>{buttonText}</>
        {rest.isIcon && <> {rest.isIcon}</>}
      </Button>
      <Drawer
        open={openDrawer}
        anchor={"right"}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "16px 0px 0px 16px",
            boxShadow: "none",
          },
        }}
        ModalProps={{
          BackdropProps: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(0px)",
            },
          },
        }}
        {...drawerProps}
      >
        <Box
          sx={{
            "& .MuiDrawer-paper": {
              borderRadius: "16px",
            },
          }}
          role="presentation"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </Box>
      </Drawer>
    </Box>
  );
};

export default DrawerComp;
