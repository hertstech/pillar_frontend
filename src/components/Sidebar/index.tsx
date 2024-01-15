import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { dispatchLogout } from "../../redux/userSlice";
import { IoLogOutOutline } from "react-icons/io5";
import { FiGrid } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { resetClientState } from "../../redux/clientSlice";

const navLinks = [
  {
    id: 0,
    name: "EHR Dashboard",
    to: "/dashboard/profile",
    icon: <FiGrid size={24} />,
  },
  {
    id: 1,
    name: "HCPs (DO NOT TAP!)",
    to: "/dashboard/practitioners",
    icon: <FaUsers size={24} />,
  },
  {
    id: 2,
    name: "Settings",
    to: "/dashboard/setting",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="icon / settings">
          <g id="icon">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.66667 2.49999V4.27167C8.10436 4.64171 9.16667 5.94679 9.16667 7.49999C9.16667 9.05319 8.10436 10.3583 6.66667 10.7283V17.5C6.66667 17.9602 6.29357 18.3333 5.83333 18.3333C5.3731 18.3333 5 17.9602 5 17.5L5 10.7283C3.56231 10.3583 2.5 9.05319 2.5 7.49999C2.5 5.94679 3.56231 4.64171 5 4.27167L5 2.49999C5 2.03975 5.3731 1.66666 5.83333 1.66666C6.29357 1.66666 6.66667 2.03975 6.66667 2.49999ZM4.16667 7.49999C4.16667 6.57952 4.91286 5.83332 5.83333 5.83332C6.75381 5.83332 7.5 6.57952 7.5 7.49999C7.5 8.42046 6.75381 9.16666 5.83333 9.16666C4.91286 9.16666 4.16667 8.42046 4.16667 7.49999Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.3333 15.7283V17.5C13.3333 17.9602 13.7064 18.3333 14.1667 18.3333C14.6269 18.3333 15 17.9602 15 17.5V15.7283C16.4377 15.3583 17.5 14.0532 17.5 12.5C17.5 10.9468 16.4377 9.64171 15 9.27167V2.49999C15 2.03975 14.6269 1.66666 14.1667 1.66666C13.7064 1.66666 13.3333 2.03975 13.3333 2.49999V9.27167C11.8956 9.64171 10.8333 10.9468 10.8333 12.5C10.8333 14.0532 11.8956 15.3583 13.3333 15.7283ZM15.8333 12.5C15.8333 11.5795 15.0871 10.8333 14.1667 10.8333C13.2462 10.8333 12.5 11.5795 12.5 12.5C12.5 13.4205 13.2462 14.1667 14.1667 14.1667C15.0871 14.1667 15.8333 13.4205 15.8333 12.5Z"
              fill="black"
            />
          </g>
        </g>
      </svg>
    ),
  },
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
