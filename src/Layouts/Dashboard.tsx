import { Box, Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogout } from "../redux/userSlice";

export default function Dashboard() {
  // const token = useSelector((state: any) => state.user.access_token);
  const refreshToken = useSelector(
    (state: any) => state.user.user.refresh_token
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (refreshToken === null) {
    dispatch(dispatchLogout());
    navigate("/");
  } else {
    return (
      <Container
        sx={{
          height: "100vh",
          flex: 1,
          p: 0,
          position: "fixed",
          left: 0,
          right: 0,
          width: "100%",
        }}
        component="main"
        maxWidth={false}
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
}
