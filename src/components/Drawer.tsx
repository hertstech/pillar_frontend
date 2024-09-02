// import * as React from "react";
// import Box from "@mui/material/Box";
// // import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";

// type ReusableDrawerProps = {
//   buttonText: string;
//   children: React.ReactNode;
//   drawerProps?: Partial<React.ComponentProps<typeof Drawer>>;
//   buttonProps?: Partial<React.ComponentProps<typeof Button>> | any;
// };

// const Drawer: React.FC<ReusableDrawerProps> = ({
//   buttonText,
//   children,
//   drawerProps = {},
//   buttonProps = {},
// }) => {
//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen: boolean) => () => {
//     setOpen(newOpen);
//   };

//   return (
//     <div>
//       <Button onClick={toggleDrawer(true)} {...buttonProps}>
//         {buttonText}
//       </Button>
//       <Drawer open={open} onClose={toggleDrawer(false)} {...drawerProps}>
//         <Box role="presentation">{children}</Box>
//       </Drawer>
//     </div>
//   );
// };

// export default Drawer;
