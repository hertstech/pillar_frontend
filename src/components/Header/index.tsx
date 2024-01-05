import { Avatar } from "@mui/material";
import Styles from "./styles.module.css";
import { useSelector } from "react-redux";

export default function Notification() {
  const user = useSelector((state: any) => state.user.user);
  return (
    <header className={Styles.header}>
      <div className={Styles.item}>
        <div className={Styles.head}>
          <Avatar />
          <span className={Styles.nameId}>
            <span className={Styles.userName}>
              {user.firstName + " " + user.lastName}
            </span>
            <span className={Styles.userID}>HRT-132422</span>
          </span>
        </div>
        {/* <button className={Styles.button}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.834 2.49999C10.834 2.03975 10.4609 1.66666 10.0006 1.66666C9.54038 1.66666 9.16728 2.03975 9.16728 2.49999V2.97571C6.34052 3.37993 4.16729 5.81018 4.16729 8.74908L4.16728 12.0827C4.16728 12.0827 4.16729 12.0826 4.16728 12.0827C4.1672 12.0843 4.16664 12.0955 4.16302 12.1174C4.15869 12.1436 4.15098 12.1793 4.13827 12.2252C4.1125 12.3183 4.07148 12.4342 4.01418 12.5712C3.89929 12.8459 3.73732 13.1622 3.55819 13.4813C3.2214 14.0813 3.05164 14.7962 3.17909 15.476C3.31349 16.193 3.77499 16.8182 4.56317 17.1183C5.26726 17.3864 6.20448 17.6316 7.44217 17.7775C7.47162 17.803 7.50644 17.8323 7.54645 17.8643C7.67169 17.9644 7.85062 18.0943 8.07675 18.2235C8.52556 18.48 9.18914 18.75 10.0006 18.75C10.8121 18.75 11.4757 18.48 11.9245 18.2235C12.1506 18.0943 12.3295 17.9644 12.4548 17.8643C12.4948 17.8323 12.5296 17.803 12.5591 17.7775C13.7968 17.6316 14.734 17.3864 15.4381 17.1183C16.2262 16.8182 16.6877 16.193 16.8221 15.476C16.9496 14.7962 16.7798 14.0813 16.443 13.4813C16.2639 13.1622 16.1019 12.8459 15.9871 12.5712C15.9298 12.4342 15.8887 12.3183 15.863 12.2252C15.8503 12.1793 15.8426 12.1436 15.8382 12.1174C15.8346 12.0955 15.834 12.0845 15.834 12.083C15.834 12.0828 15.834 12.083 15.834 12.083L15.834 12.0759V8.74948C15.834 5.81066 13.6608 3.38 10.834 2.97572V2.49999ZM5.83395 8.74908C5.83395 6.44809 7.69923 4.58332 10.0006 4.58332C12.3019 4.58332 14.1673 6.4484 14.1673 8.74948V12.0833C14.1673 12.4691 14.3118 12.8852 14.4494 13.2143C14.5989 13.5717 14.7948 13.95 14.9897 14.2971C15.1792 14.6347 15.2244 14.9537 15.184 15.1689C15.1506 15.3471 15.0615 15.4783 14.845 15.5608C13.9493 15.9018 12.4372 16.25 10.0006 16.25C7.56401 16.25 6.05196 15.9018 5.15624 15.5608C4.93969 15.4783 4.85063 15.3471 4.81722 15.1689C4.77686 14.9537 4.82205 14.6347 5.01153 14.2971C5.2064 13.95 5.40231 13.5717 5.5518 13.2143C5.68941 12.8852 5.83395 12.4691 5.83395 12.0833V8.74908Z"
              strokeWidth="3"
              fill="#344054"
            />
          </svg>
        </button> */}
      </div>
    </header>
  );
}
