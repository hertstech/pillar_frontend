import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { dispatchLogout } from "../../redux/userSlice";
import { IoLogOutOutline } from "react-icons/io5";
import { FiGrid } from "react-icons/fi";
import { resetClientState } from "../../redux/clientSlice";
import { FiHome } from "react-icons/fi";
import { MdDisplaySettings } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaWpforms } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { useState } from "react";
import { axiosInstance } from "../../Utils";

// HOME, dashboard, Monitoring, Form, Files, Settings, Support

const navLinks = [
  {
    id: 0,
    name: "Home",
    to: "/dashboard/app",
    icon: <FiHome size={24} />,
  },
  {
    id: 1,
    name: "Dashboard",
    to: "/",
    icon: <FiGrid size={24} />,
  },
  {
    id: 2,
    name: "Monitoring",
    to: "/dashboard/monitoring",
    icon: <MdDisplaySettings size={24} />,
  },
  { id: 3, name: "Form", to: "/", icon: <FaWpforms size={24} /> },
  {
    id: 4,
    name: "Files",
    to: "/dashboard/files",
    icon: <FaRegFile size={24} />,
  },
  {
    id: 5,
    name: "Settings",
    to: "/dashboard/setting",
    icon: <MdOutlineSettings size={24} />,
  },
  { id: 6, name: "Support", to: "/", icon: <BiSupport size={24} /> },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const logOut = async () => {
    await axiosInstance.delete("/auth/logout").then(() => {
      dispatch(dispatchLogout());
      dispatch(resetClientState("tab1"));
      return navigate("/");
    });
  };
  return (
    <aside className={Styles.container}>
      <nav>
        <div className={Styles.logoWrapper}>
          <div className=""></div>
          <img src="/assets/logo.svg" alt="" style={{ width: 40 }} />
          <h6 className={Styles.logoText}>Pillar</h6>
        </div>

        <ul>
          {navLinks.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${Styles.activeLink}` : `${Styles.notActiveLink}`
              }
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                }}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </ul>

        <div className={Styles.bottom}>
          <Button
            variant="contained"
            onClick={() => setShow(true)}
            color="error"
            sx={{ mb: 2 }}
            startIcon={<IoLogOutOutline />}
          >
            Log out
          </Button>
        </div>
      </nav>

      <>
        <Dialog
          maxWidth="xs"
          fullWidth
          open={show}
          aria-labelledby="alert-suspend-user"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ marginBottom: 2 }}>
            <Button
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                padding: "16px 8px",
              }}
              onClick={() => setShow(false)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Teeny icon / x-small">
                  <path
                    id="Vector"
                    d="M4.19922 4.2002L9.79922 9.8002M4.19922 9.8002L9.79922 4.2002"
                    stroke="#099250"
                  />
                </g>
              </svg>
            </Button>
          </DialogTitle>

          <div style={{ display: "grid", placeContent: "center" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="24" fill="#FBEAE9" />
              <path
                d="M24.0006 22.5C24.1663 22.5 24.3006 22.6343 24.3006 22.8V30C24.3006 30.1657 24.1663 30.3 24.0006 30.3C23.8349 30.3 23.7006 30.1657 23.7006 30V22.8C23.7006 22.6343 23.8349 22.5 24.0006 22.5ZM11.7006 24C11.7006 17.2069 17.2075 11.7 24.0006 11.7C30.7937 11.7 36.3006 17.2069 36.3006 24C36.3006 30.7931 30.7937 36.3 24.0006 36.3C17.2075 36.3 11.7006 30.7931 11.7006 24ZM24.0006 12.3C17.5389 12.3 12.3006 17.5383 12.3006 24C12.3006 30.4617 17.5389 35.7 24.0006 35.7C30.4623 35.7 35.7006 30.4617 35.7006 24C35.7006 17.5383 30.4623 12.3 24.0006 12.3ZM24.6006 19.2C24.6006 19.5314 24.332 19.8 24.0006 19.8C23.6692 19.8 23.4006 19.5314 23.4006 19.2C23.4006 18.8686 23.6692 18.6 24.0006 18.6C24.332 18.6 24.6006 18.8686 24.6006 19.2Z"
                fill="#2D264B"
                stroke="#CB1A14"
                stroke-width="1.2"
              />
            </svg>
          </div>

          <Typography sx={{ textAlign: "center", my: 3 }}>
            Do you want to log out now?
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            gap={5}
            p={2}
          >
            <Button
              sx={{
                textTransform: "none",
                background: "#EDFCF2",
                py: 1.5,
                px: 2,
                alignItems: "center",
                color: "#099250",
                "&:hover": { backgroundColor: "#EDFCF2" },
                width: "50%",
                borderRadius: "6px",
              }}
              onClick={() => setShow(false)}
            >
              Cancel
            </Button>
            <Button
              sx={{
                textTransform: "none",
                background: "#D42620",
                py: 1.5,
                px: 2,
                alignItems: "center",
                color: "#FFF",
                "&:hover": { backgroundColor: "#D42620" },
                width: "50%",
                borderRadius: "6px",
              }}
              onClick={logOut}
            >
              Log Out
            </Button>
          </Stack>
        </Dialog>
      </>
    </aside>
  );
}
