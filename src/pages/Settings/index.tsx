import { Box, Typography } from "@mui/material";
import HeaderTabs from "../../components/HeaderTabs";
// import Grid from "/assets/grid.svg";
import {
  HiOutlineBuildingOffice2,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";
import General from "./General";
import Personal from "./Personal";

export default function Settings() {
  return (
    <Box sx={{ pt: 2 }}>
      <HeaderTabs
        heading="Settings"
        links={[
          {
            label: "General",
            icon: <HiOutlineBuildingOffice2 />,
            content: <General />,
          },
          {
            label: "Personal",
            icon: <HiOutlineUser />,
            content: <Personal />,
          },
          {
            label: "User Permission",
            icon: <HiOutlineUsers />,
            content: (
              <Box>
                <Typography>Content for Tab 3</Typography>
                <Typography>Additional content specific to Tab 3.</Typography>
              </Box>
            ),
          },
        ]}
      />
    </Box>
  );
}
