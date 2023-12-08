import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Styles from "./style.module.css";

export default function Dashboard() {
  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        flex: 1,
        p: 0,
        flexDirection: "column",
        position: "fixed",
        left: 0,
        right: 0,
        width: "100%",
      }}
      component="main"
      maxWidth="xl"
      disableGutters
    >
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          width: "calc(100% - 272px)",
          flex: 1,
          flexDirection: "column",
          left: 272,
          position: "absolute",
        }}
      >
        <Header />
        <div className={Styles.container}>
          <Outlet />
        </div>
      </Box>
    </Container>
  );
}
