import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { dispatchLogout } from "../../redux/userSlice";
import { IoLogOutOutline } from "react-icons/io5";
import { FiGrid } from "react-icons/fi";
import { resetClientState } from "../../redux/clientSlice";
import { LuSearch } from "react-icons/lu";
import { MdDisplaySettings } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaWpforms } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { useState } from "react";
import { axiosInstance } from "../../Utils";
import { AppLogo, InfoIcon } from "../../assets/Icons";

// HOME, dashboard, Monitoring, Form, Files, Settings, Support

const navLinks = [
  // {
  //   id: 0,
  //   name: "Home",
  //   to: "/dashboard/app",
  //   icon: <FiHome size={24} />,
  // },
  {
    id: 1,
    name: "Dashboard",
    to: "/dashboard/home",
    icon: <FiGrid size={24} />,
  },
  {
    id: 5,
    name: "Search Record",
    to: "/dashboard/search",
    icon: <LuSearch size={24} />,
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
    id: 6,
    name: "Settings",
    to: "/dashboard/setting",
    icon: <MdOutlineSettings size={24} />,
  },
  { id: 7, name: "Support", to: "/", icon: <BiSupport size={24} /> },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  const logOut = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete("/auth/logout").then(() => {
        dispatch(dispatchLogout());
        dispatch(resetClientState("tab1"));
        return navigate("/");
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <aside className={Styles.container}>
      <nav>
        <div className={Styles.logoWrapper}>
          <div className=""></div>
          <AppLogo />
          <h6 className={Styles.logoText}>Herts</h6>
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
            <InfoIcon />
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
              disabled={isLoading}
            >
              Log Out
            </Button>
          </Stack>
        </Dialog>
      </>
    </aside>
  );
}
