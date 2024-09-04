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
};

const DrawerComp: React.FC<ReusableDrawerProps> = ({
  buttonText,
  children,
  drawerProps = {},
  buttonProps = {},
  sx,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      <Button
        className="flex h-full w-full items-center justify-center gap-2 !bg-black"
        sx={sx}
        onClick={toggleDrawer(true)}
        {...buttonProps}
      >
        <>{buttonText}</>
        {rest.isIcon && <> {rest.isIcon}</>}
      </Button>
      <Drawer
        open={open}
        anchor={"right"}
        onClose={toggleDrawer(false)}
        sx={{ borderRadius: "16px" }}
        {...drawerProps}
      >
        <Box role="presentation">{children}</Box>
      </Drawer>
    </Box>
  );
};

export default DrawerComp;
