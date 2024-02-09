import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { dispatchLogout } from "../../redux/userSlice";
import { IoLogOutOutline } from "react-icons/io5";
import { FiGrid } from "react-icons/fi";
import { resetClientState } from "../../redux/clientSlice";

// HOME, dashboard, Monitoring, Form, Files, Settings, Support

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
    icon: (
      <svg
        width="20"
        height="15"
        viewBox="0 0 20 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 3">
          <g id="Vector">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.99998 0.333008C8.27409 0.333008 6.87498 1.73212 6.87498 3.45801C6.87498 5.1839 8.27409 6.58301 9.99998 6.58301C11.7259 6.58301 13.125 5.1839 13.125 3.45801C13.125 1.73212 11.7259 0.333008 9.99998 0.333008ZM8.12498 3.45801C8.12498 2.42247 8.96445 1.58301 9.99998 1.58301C11.0355 1.58301 11.875 2.42247 11.875 3.45801C11.875 4.49354 11.0355 5.33301 9.99998 5.33301C8.96445 5.33301 8.12498 4.49354 8.12498 3.45801Z"
              fill="#667185"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.49998 7.83301C5.77409 7.83301 4.37498 9.23212 4.37498 10.958C4.37498 12.6839 5.77409 14.083 7.49998 14.083H12.5C14.2259 14.083 15.625 12.6839 15.625 10.958C15.625 9.23212 14.2259 7.83301 12.5 7.83301H7.49998ZM5.62498 10.958C5.62498 9.92247 6.46445 9.08301 7.49998 9.08301H12.5C13.5355 9.08301 14.375 9.92247 14.375 10.958C14.375 11.9935 13.5355 12.833 12.5 12.833H7.49998C6.46445 12.833 5.62498 11.9935 5.62498 10.958Z"
              fill="#667185"
            />
            <path
              d="M6.4601 5.65689C6.32866 5.44574 6.08203 5.33301 5.83331 5.33301C4.79778 5.33301 3.95831 4.49354 3.95831 3.45801C3.95831 2.42247 4.79778 1.58301 5.83331 1.58301C6.08203 1.58301 6.32866 1.47028 6.4601 1.25913C6.46591 1.24979 6.47176 1.24048 6.47764 1.23119C6.69648 0.885764 6.5856 0.396675 6.17915 0.351927C6.06559 0.339425 5.9502 0.333008 5.83331 0.333008C4.10742 0.333008 2.70831 1.73212 2.70831 3.45801C2.70831 5.1839 4.10742 6.58301 5.83331 6.58301C5.9502 6.58301 6.06559 6.57659 6.17915 6.56409C6.5856 6.51934 6.69648 6.03025 6.47764 5.68483C6.47176 5.67554 6.46591 5.66622 6.4601 5.65689Z"
              fill="#667185"
            />
            <path
              d="M3.92355 12.2637C3.82895 12.1059 3.66197 11.9997 3.47797 11.9997H3.33331C2.29778 11.9997 1.45831 11.1602 1.45831 10.1247C1.45831 9.08914 2.29778 8.24967 3.33331 8.24967H3.47797C3.66197 8.24967 3.82895 8.14344 3.92355 7.98562C4.15447 7.60036 3.90388 6.99967 3.45472 6.99967H3.33331C1.60742 6.99967 0.208313 8.39878 0.208313 10.1247C0.208313 11.8506 1.60742 13.2497 3.33331 13.2497H3.45472C3.90388 13.2497 4.15447 12.649 3.92355 12.2637Z"
              fill="#667185"
            />
            <path
              d="M13.5223 5.68483C13.3035 6.03025 13.4144 6.51934 13.8208 6.56409C13.9344 6.57659 14.0498 6.58301 14.1666 6.58301C15.8925 6.58301 17.2916 5.1839 17.2916 3.45801C17.2916 1.73212 15.8925 0.333008 14.1666 0.333008C14.0498 0.333008 13.9344 0.339425 13.8208 0.351927C13.4144 0.396675 13.3035 0.885764 13.5223 1.23119C13.5282 1.24048 13.534 1.24979 13.5399 1.25913C13.6713 1.47028 13.9179 1.58301 14.1666 1.58301C15.2022 1.58301 16.0416 2.42247 16.0416 3.45801C16.0416 4.49354 15.2022 5.33301 14.1666 5.33301C13.9179 5.33301 13.6713 5.44574 13.5399 5.65689C13.534 5.66622 13.5282 5.67554 13.5223 5.68483Z"
              fill="#667185"
            />
            <path
              d="M16.0764 12.2637C15.8455 12.649 16.0961 13.2497 16.5452 13.2497H16.6666C18.3925 13.2497 19.7916 11.8506 19.7916 10.1247C19.7916 8.39878 18.3925 6.99967 16.6666 6.99967H16.5452C16.0961 6.99967 15.8455 7.60036 16.0764 7.98562C16.171 8.14344 16.338 8.24967 16.522 8.24967H16.6666C17.7022 8.24967 18.5416 9.08914 18.5416 10.1247C18.5416 11.1602 17.7022 11.9997 16.6666 11.9997H16.522C16.338 11.9997 16.171 12.1059 16.0764 12.2637Z"
              fill="#667185"
            />
          </g>
        </g>
      </svg>
    ),
  },
  {
    id: 2,
    name: "Settings",
    to: "/dashboard/setting",
    icon: (
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.99997 6.87542C7.27408 6.87542 5.87497 8.27453 5.87497 10.0004C5.87497 11.7263 7.27408 13.1254 8.99997 13.1254C10.7259 13.1254 12.125 11.7263 12.125 10.0004C12.125 8.27453 10.7259 6.87542 8.99997 6.87542ZM7.12497 10.0004C7.12497 8.96489 7.96444 8.12542 8.99997 8.12542C10.0355 8.12542 10.875 8.96489 10.875 10.0004C10.875 11.036 10.0355 11.8754 8.99997 11.8754C7.96444 11.8754 7.12497 11.036 7.12497 10.0004Z"
          fill="#667185"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8456 2.69399C11.0286 -0.16883 6.97139 -0.168829 6.15438 2.69399C5.90124 3.58099 4.98995 4.10712 4.09522 3.88285C1.20744 3.15899 -0.821147 6.6726 1.24962 8.81156C1.89122 9.47429 1.89122 10.5266 1.24962 11.1893C-0.821147 13.3282 1.20744 16.8419 4.09522 16.118C4.98995 15.8937 5.90124 16.4199 6.15438 17.3069C6.97139 20.1697 11.0286 20.1697 11.8456 17.3069C12.0987 16.4199 13.01 15.8937 13.9047 16.118C16.7925 16.8419 18.8211 13.3282 16.7503 11.1893C16.1087 10.5266 16.1087 9.47429 16.7503 8.81156C18.8211 6.6726 16.7925 3.15899 13.9047 3.88285C13.01 4.10712 12.0987 3.58099 11.8456 2.69399ZM7.35639 3.03703C7.82828 1.38349 10.1717 1.38349 10.6436 3.03703C11.0818 4.57272 12.6596 5.48363 14.2087 5.09534C15.8766 4.67724 17.0483 6.70667 15.8522 7.94211C14.7414 9.08951 14.7414 10.9113 15.8522 12.0587C17.0483 13.2942 15.8766 15.3236 14.2087 14.9055C12.6596 14.5172 11.0818 15.4281 10.6436 16.9638C10.1717 18.6174 7.82829 18.6174 7.35639 16.9638C6.91812 15.4281 5.34038 14.5172 3.79129 14.9055C2.12334 15.3236 0.951649 13.2942 2.1477 12.0587C3.25852 10.9113 3.25852 9.08951 2.1477 7.94211C0.95165 6.70667 2.12334 4.67724 3.79129 5.09534C5.34038 5.48363 6.91812 4.57272 7.35639 3.03703Z"
          fill="#667185"
        />
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
