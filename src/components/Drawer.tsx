import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

type ReusableDrawerProps = {
  sx?: any;
  isIcon?: any;
  buttonText: string;
  children: React.ReactNode;
  drawerProps?: Partial<React.ComponentProps<typeof DrawerComp>>;
  buttonProps?: Partial<React.ComponentProps<typeof Button>> | any;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const DrawerComp: React.FC<ReusableDrawerProps> = ({
  buttonText,
  children,
  drawerProps = {},
  buttonProps = {},
  sx,
  open,
  onClose,
  onOpen,
  ...rest
}) => {
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
        open={open}
        anchor={"right"}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: " 16px 0px 0px 16px",
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
