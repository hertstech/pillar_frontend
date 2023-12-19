import { Avatar, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogout } from "../../redux/userSlice";
import { IoLogOutOutline } from "react-icons/io5";

const navLinks = [
  {
    id: 0,
    name: "EHR Dashboard",
    to: "/dashboard",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="icon / grid">
          <g id="icon">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.33333 9.58333C2.18274 9.58333 1.25 8.65059 1.25 7.5V3.33333C1.25 2.18274 2.18274 1.25 3.33333 1.25H7.5C8.65059 1.25 9.58333 2.18274 9.58333 3.33333V7.5C9.58333 8.65059 8.65059 9.58333 7.5 9.58333H3.33333ZM2.91667 7.5C2.91667 7.73012 3.10321 7.91667 3.33333 7.91667L7.5 7.91667C7.73012 7.91667 7.91667 7.73012 7.91667 7.5V3.33333C7.91667 3.10322 7.73012 2.91667 7.5 2.91667L3.33333 2.91667C3.10321 2.91667 2.91667 3.10322 2.91667 3.33333L2.91667 7.5Z"
              fill="#344054"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.25 16.6667C1.25 17.8173 2.18274 18.75 3.33333 18.75H7.5C8.65059 18.75 9.58333 17.8173 9.58333 16.6667V12.5C9.58333 11.3494 8.65059 10.4167 7.5 10.4167H3.33333C2.18274 10.4167 1.25 11.3494 1.25 12.5V16.6667ZM3.33333 17.0833C3.10321 17.0833 2.91667 16.8968 2.91667 16.6667L2.91667 12.5C2.91667 12.2699 3.10321 12.0833 3.33333 12.0833H7.5C7.73012 12.0833 7.91667 12.2699 7.91667 12.5V16.6667C7.91667 16.8968 7.73012 17.0833 7.5 17.0833H3.33333Z"
              fill="#344054"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4167 16.6667C10.4167 17.8173 11.3494 18.75 12.5 18.75H16.6667C17.8173 18.75 18.75 17.8173 18.75 16.6667V12.5C18.75 11.3494 17.8173 10.4167 16.6667 10.4167H12.5C11.3494 10.4167 10.4167 11.3494 10.4167 12.5V16.6667ZM12.5 17.0833C12.2699 17.0833 12.0833 16.8968 12.0833 16.6667V12.5C12.0833 12.2699 12.2699 12.0833 12.5 12.0833H16.6667C16.8968 12.0833 17.0833 12.2699 17.0833 12.5V16.6667C17.0833 16.8968 16.8968 17.0833 16.6667 17.0833H12.5Z"
              fill="#344054"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4167 7.5C10.4167 8.65059 11.3494 9.58333 12.5 9.58333H16.6667C17.8173 9.58333 18.75 8.65059 18.75 7.5V3.33333C18.75 2.18274 17.8173 1.25 16.6667 1.25H12.5C11.3494 1.25 10.4167 2.18274 10.4167 3.33333V7.5ZM12.5 7.91667C12.2699 7.91667 12.0833 7.73012 12.0833 7.5V3.33333C12.0833 3.10322 12.2699 2.91667 12.5 2.91667L16.6667 2.91667C16.8968 2.91667 17.0833 3.10322 17.0833 3.33333V7.5C17.0833 7.73012 16.8968 7.91667 16.6667 7.91667L12.5 7.91667Z"
              fill="#344054"
            />
          </g>
        </g>
      </svg>
    ),
  },
  {
    id: 1,
    name: "Settings",
    to: "/dashboard/setting",
    icon: (
      <svg
        width="20"
        height="20"
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
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(dispatchLogout());
    return navigate("/");
  };
  return (
    <aside className={Styles.container}>
      <nav>
        <div className={Styles.header}>
          <Avatar />
          <span className={Styles.nameId}>
            <span className={Styles.userName}>
              {user.firstName + " " + user.lastName}
            </span>
            <span className={Styles.userID}>userID12382</span>
          </span>
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

          <div className={Styles.logoWrapper}>
            <div className=""></div>
            <img src="/assets/logo.svg" alt="" style={{ width: 24 }} />
            <h6 className={Styles.logoText}>Pillar</h6>
          </div>
        </div>
      </nav>
    </aside>
  );
}
