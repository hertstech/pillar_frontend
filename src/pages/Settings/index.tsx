import { Box, Typography } from "@mui/material";
import HeaderTabs from "../../components/HeaderTabs";
// import Grid from "/assets/grid.svg";
import {
  HiOutlineBuildingOffice2,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";

export default function Settings() {
  return (
    <Box sx={{ pt: 2 }}>
      <HeaderTabs
        heading="Settings"
        links={[
          {
            label: "General",
            icon: <HiOutlineBuildingOffice2 />,
            content: (
              <Box>
                <Typography>Content for Tab 1</Typography>
                <Typography>
                  Any additional components or text can go here.
                </Typography>
              </Box>
            ),
          },
          {
            label: "Personal",
            icon: <HiOutlineUser />,
            content: (
              <Box>
                <Typography>Content for Tab 2</Typography>
                <Typography>More content can be added here.</Typography>
              </Box>
            ),
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
