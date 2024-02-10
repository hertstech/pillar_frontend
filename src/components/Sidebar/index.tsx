import { Button } from "@mui/material";
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

// HOME, dashboard, Monitoring, Form, Files, Settings, Support

const navLinks = [
  {
    id: 0,
    name: "Home",
    to: "/dashboard/profile",
    icon: <FiHome size={24} />,
  },
  {
    id: 1,
    name: "Dashboard",
    to: "/",
    icon: <FiGrid size={24} />,
  },
  { id: 2, name: "Monitoring", to: "/", icon: <MdDisplaySettings size={24} /> },
  { id: 3, name: "Form", to: "/", icon: <FaWpforms size={24} /> },
  { id: 4, name: "Files", to: "/", icon: <FaRegFile size={24} /> },
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

  const logOut = () => {
    dispatch(dispatchLogout());
    dispatch(resetClientState("tab1"));
    return navigate("/");
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
            onClick={logOut}
            color="error"
            sx={{ mb: 2 }}
            startIcon={<IoLogOutOutline />}
          >
            Log out
          </Button>
        </div>
      </nav>
    </aside>
  );
}
