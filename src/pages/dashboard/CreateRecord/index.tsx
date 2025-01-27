import React from "react";
import { Box, Card, Grid, Stack, Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "./Profile";
import HealthRecord from "./HealthRecord";
import MedicationRecord from "./MedicationRecord";
import AllergyRecord from "./AllergyRecord";
import AdditionalInformationRecord from "./AdditionalInformationRecord";
import ReferralRecord from "./ReferralRecord";
import { NeedHelp } from "../../../components/CalendarField";
import { UpdateConsent } from "./Profile/updateConsent";

// interface LinkItem {
//   label: string;
//   icon?: React.ReactElement;
//   content?: ReactNode;
// }

// interface TabProps {
//   links: LinkItem[];
//   isLoaded?: boolean;
// }

export default function UpdateRecord() {
  const { id } = useParams();

  const { tabId } = useParams();

  const newId = parseInt(id as string);

  const navigate = useNavigate();

  const client = useSelector((state: any) => state.client.clients.tab1[0]);

  const user = useSelector((state: any) => state.user.user);

  const initialTab = tabId ? parseInt(tabId, 10) : 0;
  const [value, setValue] = React.useState(initialTab);

  React.useEffect(() => {
    if (tabId && parseInt(tabId, 10) !== value) {
      setValue(parseInt(tabId, 10));
    }
  }, [tabId, value]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(`/dashboard/user/${id}/${newValue}`);
  };

  const tabs = [
    {
      label: "Profile",
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="41"
            height="41"
            rx="20.5"
            stroke="#E7E9FB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 13.5C12 13.1022 12.158 12.7206 12.4393 12.4393C12.7206 12.158 13.1022 12 13.5 12H28.5C28.8978 12 29.2794 12.158 29.5607 12.4393C29.842 12.7206 30 13.1022 30 13.5V28.5C30 28.8978 29.842 29.2794 29.5607 29.5607C29.2794 29.842 28.8978 30 28.5 30H13.5C13.1022 30 12.7206 29.842 12.4393 29.5607C12.158 29.2794 12 28.8978 12 28.5V13.5ZM18.5 15H17C16.7348 15 16.4804 15.1054 16.2929 15.2929C16.1054 15.4804 16 15.7348 16 16V27C16 27.2652 16.1054 27.5196 16.2929 27.7071C16.4804 27.8946 16.7348 28 17 28H25C25.2652 28 25.5196 27.8946 25.7071 27.7071C25.8946 27.5196 26 27.2652 26 27V16C26 15.7348 25.8946 15.4804 25.7071 15.2929C25.5196 15.1054 25.2652 15 25 15H23.5C23.5 14.7348 23.3946 14.4804 23.2071 14.2929C23.0196 14.1054 22.7652 14 22.5 14H19.5C19.2348 14 18.9804 14.1054 18.7929 14.2929C18.6054 14.4804 18.5 14.7348 18.5 15ZM20.032 26.325L21.279 23H19.5C19.3674 23 19.2402 22.9473 19.1464 22.8536C19.0527 22.7598 19 22.6326 19 22.5C19 22.3674 19.0527 22.2402 19.1464 22.1464C19.2402 22.0527 19.3674 22 19.5 22H24.65C24.7826 22 24.9098 22.0527 25.0036 22.1464C25.0973 22.2402 25.15 22.3674 25.15 22.5C25.15 22.6326 25.0973 22.7598 25.0036 22.8536C24.9098 22.9473 24.7826 23 24.65 23H23.222L24.468 26.325C24.5087 26.4478 24.5003 26.5816 24.4445 26.6983C24.3886 26.815 24.2897 26.9055 24.1686 26.9508C24.0474 26.9961 23.9134 26.9927 23.7947 26.9412C23.676 26.8898 23.5818 26.7944 23.532 26.675L22.902 24.998H21.597L20.968 26.676C20.919 26.7968 20.8248 26.8936 20.7055 26.946C20.5862 26.9983 20.4511 27.002 20.3291 26.9563C20.2071 26.9105 20.1077 26.8189 20.0523 26.701C19.9968 26.5831 19.9895 26.4482 20.032 26.325ZM17.5 18.62H24.5V17.62H17.5V18.62ZM20 20.7H17.5V19.7H20V20.7ZM22.25 21.5C22.5152 21.5 22.7696 21.3946 22.9571 21.2071C23.1446 21.0196 23.25 20.7652 23.25 20.5C23.25 20.2348 23.1446 19.9804 22.9571 19.7929C22.7696 19.6054 22.5152 19.5 22.25 19.5C21.9848 19.5 21.7304 19.6054 21.5429 19.7929C21.3554 19.9804 21.25 20.2348 21.25 20.5C21.25 20.7652 21.3554 21.0196 21.5429 21.2071C21.7304 21.3946 21.9848 21.5 22.25 21.5ZM19.5 15H22.5V16H19.5V15Z"
            fill="#667185"
          />
        </svg>
      ),
      content: <Profile />,
    },
    {
      label: "Consent Information",
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="41"
            height="41"
            rx="20.5"
            stroke="#E7E9FB"
          />
          <path
            d="M23.25 30H18.75C18.3523 29.9995 17.9711 29.8413 17.6899 29.5601C17.4087 29.2789 17.2505 28.8977 17.25 28.5V24.75H13.5C13.1023 24.7495 12.7211 24.5913 12.4399 24.3101C12.1587 24.0289 12.0005 23.6477 12 23.25V18.75C12.0005 18.3523 12.1587 17.9711 12.4399 17.6899C12.7211 17.4087 13.1023 17.2505 13.5 17.25H17.25V13.5C17.2505 13.1023 17.4087 12.7211 17.6899 12.4399C17.9711 12.1587 18.3523 12.0005 18.75 12H23.25C23.6477 12.0005 24.0289 12.1587 24.3101 12.4399C24.5913 12.7211 24.7495 13.1023 24.75 13.5V17.25H28.5C28.8977 17.2505 29.2789 17.4087 29.5601 17.6899C29.8413 17.9711 29.9995 18.3523 30 18.75V23.25C29.9995 23.6477 29.8413 24.0289 29.5601 24.3101C29.2789 24.5913 28.8977 24.7495 28.5 24.75H24.75V28.5C24.7495 28.8977 24.5913 29.2789 24.3101 29.5601C24.0289 29.8413 23.6477 29.9995 23.25 30ZM13.5 18.75V23.25H18.75V28.5H23.25V23.25H28.5V18.75H23.25V13.5H18.75V18.75H13.5Z"
            fill="#475367"
          />
          <path
            d="M13.5 18.75V23.25H18.75V28.5H23.25V23.25H28.5V18.75H23.25V13.5H18.75V18.75H13.5Z"
            fill="#475367"
          />
        </svg>
      ),
      content: <UpdateConsent NHRID={newId} />,
    },
    {
      label: "Health Information",
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="41"
            height="41"
            rx="20.5"
            stroke="#E7E9FB"
          />
          <path
            d="M23.25 30H18.75C18.3523 29.9995 17.9711 29.8413 17.6899 29.5601C17.4087 29.2789 17.2505 28.8977 17.25 28.5V24.75H13.5C13.1023 24.7495 12.7211 24.5913 12.4399 24.3101C12.1587 24.0289 12.0005 23.6477 12 23.25V18.75C12.0005 18.3523 12.1587 17.9711 12.4399 17.6899C12.7211 17.4087 13.1023 17.2505 13.5 17.25H17.25V13.5C17.2505 13.1023 17.4087 12.7211 17.6899 12.4399C17.9711 12.1587 18.3523 12.0005 18.75 12H23.25C23.6477 12.0005 24.0289 12.1587 24.3101 12.4399C24.5913 12.7211 24.7495 13.1023 24.75 13.5V17.25H28.5C28.8977 17.2505 29.2789 17.4087 29.5601 17.6899C29.8413 17.9711 29.9995 18.3523 30 18.75V23.25C29.9995 23.6477 29.8413 24.0289 29.5601 24.3101C29.2789 24.5913 28.8977 24.7495 28.5 24.75H24.75V28.5C24.7495 28.8977 24.5913 29.2789 24.3101 29.5601C24.0289 29.8413 23.6477 29.9995 23.25 30ZM13.5 18.75V23.25H18.75V28.5H23.25V23.25H28.5V18.75H23.25V13.5H18.75V18.75H13.5Z"
            fill="#475367"
          />
          <path
            d="M13.5 18.75V23.25H18.75V28.5H23.25V23.25H28.5V18.75H23.25V13.5H18.75V18.75H13.5Z"
            fill="#475367"
          />
        </svg>
      ),
      content: <HealthRecord />,
    },

    {
      label: "Medications",
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="41"
            height="41"
            rx="20.5"
            stroke="#E7E9FB"
          />
          <path
            d="M26 12.5H16V17.5H26V12.5Z"
            stroke="#667185"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.5 17.5H12.5C12.2348 17.5 11.9804 17.6054 11.7929 17.7929C11.6054 17.9804 11.5 18.2348 11.5 18.5V28.5C11.5 28.7652 11.6054 29.0196 11.7929 29.2071C11.9804 29.3946 12.2348 29.5 12.5 29.5H29.5C29.7652 29.5 30.0196 29.3946 30.2071 29.2071C30.3946 29.0196 30.5 28.7652 30.5 28.5V18.5C30.5 18.2348 30.3946 17.9804 30.2071 17.7929C30.0196 17.6054 29.7652 17.5 29.5 17.5ZM17.35 23.5C17.35 22.8649 17.8649 22.35 18.5 22.35H19.85V21C19.85 20.3649 20.3649 19.85 21 19.85C21.6351 19.85 22.15 20.3649 22.15 21V22.35H23.5C24.1351 22.35 24.65 22.8649 24.65 23.5C24.65 24.1351 24.1351 24.65 23.5 24.65H22.15V26C22.15 26.6351 21.6351 27.15 21 27.15C20.3649 27.15 19.85 26.6351 19.85 26V24.65H18.5C17.8649 24.65 17.35 24.1351 17.35 23.5Z"
            fill="#667185"
          />
          <path
            d="M11.7929 17.7929L12.2525 18.2525V18.2525L11.7929 17.7929ZM11.7929 29.2071L12.2525 28.7475L11.7929 29.2071ZM30.2071 17.7929L29.7475 18.2525L30.2071 17.7929ZM19.85 22.35V23C20.209 23 20.5 22.709 20.5 22.35H19.85ZM22.15 22.35H21.5C21.5 22.709 21.791 23 22.15 23V22.35ZM22.15 24.65V24C21.791 24 21.5 24.291 21.5 24.65H22.15ZM19.85 24.65H20.5C20.5 24.291 20.209 24 19.85 24V24.65ZM12.5 18.15H29.5V16.85H12.5V18.15ZM12.2525 18.2525C12.3182 18.1869 12.4072 18.15 12.5 18.15V16.85C12.0624 16.85 11.6427 17.0238 11.3333 17.3333L12.2525 18.2525ZM12.15 18.5C12.15 18.4072 12.1869 18.3182 12.2525 18.2525L11.3333 17.3333C11.0238 17.6427 10.85 18.0624 10.85 18.5H12.15ZM12.15 28.5V18.5H10.85V28.5H12.15ZM12.2525 28.7475C12.1869 28.6819 12.15 28.5928 12.15 28.5H10.85C10.85 28.9376 11.0238 29.3573 11.3333 29.6667L12.2525 28.7475ZM12.5 28.85C12.4072 28.85 12.3181 28.8131 12.2525 28.7475L11.3333 29.6667C11.6427 29.9762 12.0624 30.15 12.5 30.15V28.85ZM29.5 28.85H12.5V30.15H29.5V28.85ZM29.7475 28.7475C29.6819 28.8131 29.5928 28.85 29.5 28.85V30.15C29.9376 30.15 30.3573 29.9762 30.6667 29.6667L29.7475 28.7475ZM29.85 28.5C29.85 28.5928 29.8131 28.6819 29.7475 28.7475L30.6667 29.6667C30.9762 29.3573 31.15 28.9376 31.15 28.5H29.85ZM29.85 18.5V28.5H31.15V18.5H29.85ZM29.7475 18.2525C29.8131 18.3181 29.85 18.4072 29.85 18.5H31.15C31.15 18.0624 30.9762 17.6427 30.6667 17.3333L29.7475 18.2525ZM29.5 18.15C29.5928 18.15 29.6819 18.1869 29.7475 18.2525L30.6667 17.3333C30.3573 17.0238 29.9376 16.85 29.5 16.85V18.15ZM18.5 21.7C17.5059 21.7 16.7 22.5059 16.7 23.5H18C18 23.2239 18.2239 23 18.5 23V21.7ZM19.85 21.7H18.5V23H19.85V21.7ZM20.5 22.35V21H19.2V22.35H20.5ZM20.5 21C20.5 20.7239 20.7239 20.5 21 20.5V19.2C20.0059 19.2 19.2 20.0059 19.2 21H20.5ZM21 20.5C21.2761 20.5 21.5 20.7239 21.5 21H22.8C22.8 20.0059 21.9941 19.2 21 19.2V20.5ZM21.5 21V22.35H22.8V21H21.5ZM23.5 21.7H22.15V23H23.5V21.7ZM25.3 23.5C25.3 22.5059 24.4941 21.7 23.5 21.7V23C23.7761 23 24 23.2239 24 23.5H25.3ZM23.5 25.3C24.4941 25.3 25.3 24.4941 25.3 23.5H24C24 23.7761 23.7761 24 23.5 24V25.3ZM22.15 25.3H23.5V24H22.15V25.3ZM21.5 24.65V26H22.8V24.65H21.5ZM21.5 26C21.5 26.2761 21.2761 26.5 21 26.5V27.8C21.9941 27.8 22.8 26.9941 22.8 26H21.5ZM21 26.5C20.7239 26.5 20.5 26.2761 20.5 26H19.2C19.2 26.9941 20.0059 27.8 21 27.8V26.5ZM20.5 26V24.65H19.2V26H20.5ZM18.5 25.3H19.85V24H18.5V25.3ZM16.7 23.5C16.7 24.4941 17.5059 25.3 18.5 25.3V24C18.2239 24 18 23.7761 18 23.5H16.7Z"
            fill="#667185"
          />
        </svg>
      ),
      content: <MedicationRecord />,
    },
    {
      label: "Allergies",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="41"
            height="41"
            rx="20.5"
            stroke="#E7E9FB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.5 20.866V12.5C23.5 12.2348 23.3946 11.9804 23.2071 11.7929C23.0196 11.6054 22.7652 11.5 22.5 11.5C22.2348 11.5 21.9804 11.6054 21.7929 11.7929C21.6054 11.9804 21.5 12.2348 21.5 12.5V19.5H20.5V11C20.5 10.7348 20.3946 10.4804 20.2071 10.2929C20.0196 10.1054 19.7652 10 19.5 10C19.2348 10 18.9804 10.1054 18.7929 10.2929C18.6054 10.4804 18.5 10.7348 18.5 11V19.5H17.5V12.5C17.5 12.2348 17.3946 11.9804 17.2071 11.7929C17.0196 11.6054 16.7652 11.5 16.5 11.5C16.2348 11.5 15.9804 11.6054 15.7929 11.7929C15.6054 11.9804 15.5 12.2348 15.5 12.5V20.556H14.5V15.5C14.5 15.2348 14.3946 14.9804 14.2071 14.7929C14.0196 14.6054 13.7652 14.5 13.5 14.5C13.2348 14.5 12.9804 14.6054 12.7929 14.7929C12.6054 14.9804 12.5 15.2348 12.5 15.5V24C12.5 25.5913 13.1321 27.1174 14.2574 28.2426C15.3826 29.3679 16.9087 30 18.5 30H19.211C20.2923 30.0001 21.3534 29.7079 22.2823 29.1545C23.2112 28.6011 23.9733 27.8069 24.488 26.856L27.956 20.449C28.1139 20.1607 28.1545 19.8226 28.0692 19.5052C27.984 19.1877 27.7796 18.9154 27.4985 18.745C27.2175 18.5745 26.8815 18.5191 26.5606 18.5903C26.2397 18.6615 25.9586 18.8537 25.776 19.127L24.414 21.145C24.354 21.2336 24.2672 21.3006 24.1663 21.3362C24.0655 21.3717 23.9558 21.374 23.8535 21.3427C23.7513 21.3114 23.6617 21.2481 23.5981 21.1621C23.5345 21.0761 23.5001 20.972 23.5 20.865V20.866ZM17.011 22.992C17.1436 22.992 17.2708 22.9393 17.3646 22.8456C17.4583 22.7518 17.511 22.6246 17.511 22.492C17.511 22.3594 17.4583 22.2322 17.3646 22.1384C17.2708 22.0447 17.1436 21.992 17.011 21.992C16.8784 21.992 16.7512 22.0447 16.6574 22.1384C16.5637 22.2322 16.511 22.3594 16.511 22.492C16.511 22.6246 16.5637 22.7518 16.6574 22.8456C16.7512 22.9393 16.8784 22.992 17.011 22.992ZM19.511 23.49C19.6436 23.49 19.7708 23.4373 19.8646 23.3436C19.9583 23.2498 20.011 23.1226 20.011 22.99C20.011 22.8574 19.9583 22.7302 19.8646 22.6364C19.7708 22.5427 19.6436 22.49 19.511 22.49C19.3784 22.49 19.2512 22.5427 19.1574 22.6364C19.0637 22.7302 19.011 22.8574 19.011 22.99C19.011 23.1226 19.0637 23.2498 19.1574 23.3436C19.2512 23.4373 19.3784 23.49 19.511 23.49ZM18.513 24.99C18.5131 25.0557 18.5002 25.1207 18.4751 25.1814C18.4501 25.2421 18.4133 25.2972 18.3669 25.3437C18.3205 25.3902 18.2654 25.4271 18.2048 25.4522C18.1442 25.4774 18.0792 25.4904 18.0135 25.4905C17.9478 25.4906 17.8828 25.4777 17.8221 25.4526C17.7614 25.4276 17.7063 25.3908 17.6598 25.3444C17.6133 25.298 17.5764 25.2429 17.5513 25.1823C17.5261 25.1217 17.5131 25.0567 17.513 24.991C17.513 24.8584 17.5657 24.7312 17.6594 24.6374C17.7532 24.5437 17.8804 24.491 18.013 24.491C18.1456 24.491 18.2728 24.5437 18.3666 24.6374C18.4603 24.7312 18.513 24.8574 18.513 24.99ZM20.513 24.989C20.6456 24.989 20.7728 24.9363 20.8666 24.8426C20.9603 24.7488 21.013 24.6216 21.013 24.489C21.013 24.3564 20.9603 24.2292 20.8666 24.1354C20.7728 24.0417 20.6456 23.989 20.513 23.989C20.3804 23.989 20.2532 24.0417 20.1594 24.1354C20.0657 24.2292 20.013 24.3564 20.013 24.489C20.013 24.6216 20.0657 24.7488 20.1594 24.8426C20.2532 24.9363 20.3804 24.989 20.513 24.989ZM22.014 26.488C22.014 26.6206 21.9613 26.7478 21.8676 26.8416C21.7738 26.9353 21.6466 26.988 21.514 26.988C21.3814 26.988 21.2542 26.9353 21.1604 26.8416C21.0667 26.7478 21.014 26.6206 21.014 26.488C21.014 26.3554 21.0667 26.2282 21.1604 26.1344C21.2542 26.0407 21.3814 25.988 21.514 25.988C21.6466 25.988 21.7738 26.0407 21.8676 26.1344C21.9613 26.2282 22.014 26.3554 22.014 26.488ZM22.513 24.488C22.6456 24.488 22.7728 24.4353 22.8666 24.3416C22.9603 24.2478 23.013 24.1206 23.013 23.988C23.013 23.8554 22.9603 23.7282 22.8666 23.6344C22.7728 23.5407 22.6456 23.488 22.513 23.488C22.3804 23.488 22.2532 23.5407 22.1594 23.6344C22.0657 23.7282 22.013 23.8554 22.013 23.988C22.013 24.1206 22.0657 24.2478 22.1594 24.3416C22.2532 24.4353 22.3804 24.488 22.513 24.488ZM19.515 26.99C19.515 27.1226 19.4623 27.2498 19.3686 27.3436C19.2748 27.4373 19.1476 27.49 19.015 27.49C18.8824 27.49 18.7552 27.4373 18.6614 27.3436C18.5677 27.2498 18.515 27.1226 18.515 26.99C18.515 26.8574 18.5677 26.7302 18.6614 26.6364C18.7552 26.5427 18.8824 26.49 19.015 26.49C19.1476 26.49 19.2748 26.5427 19.3686 26.6364C19.4623 26.7302 19.515 26.8574 19.515 26.99ZM16.515 26.992C16.5807 26.9919 16.6457 26.9789 16.7063 26.9537C16.7669 26.9286 16.822 26.8917 16.8684 26.8452C16.9148 26.7987 16.9516 26.7436 16.9766 26.6829C17.0017 26.6222 17.0146 26.5572 17.0145 26.4915C17.0144 26.4258 17.0014 26.3608 16.9762 26.3002C16.9511 26.2396 16.9142 26.1845 16.8677 26.1381C16.8212 26.0917 16.7661 26.0549 16.7054 26.0299C16.6447 26.0048 16.5797 25.9919 16.514 25.992C16.3814 25.992 16.2542 26.0447 16.1604 26.1384C16.0667 26.2322 16.014 26.3594 16.014 26.492C16.014 26.6246 16.0667 26.7518 16.1604 26.8456C16.2542 26.9393 16.3814 26.992 16.514 26.992H16.515ZM16.013 24.492C16.0131 24.6246 15.9606 24.7518 15.8669 24.8457C15.7732 24.9396 15.6461 24.9924 15.5135 24.9925C15.3809 24.9926 15.2537 24.9401 15.1598 24.8464C15.0659 24.7527 15.0131 24.6256 15.013 24.493C15.013 24.3604 15.0657 24.2332 15.1594 24.1394C15.2532 24.0457 15.3804 23.993 15.513 23.993C15.6456 23.993 15.7728 24.0457 15.8666 24.1394C15.9603 24.2332 16.013 24.3594 16.013 24.492Z"
            fill="#667185"
          />
        </svg>
      ),
      content: <AllergyRecord />,
    },
    {
      label: "Additional Information",
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="41"
            height="41"
            rx="20.5"
            stroke="#E7E9FB"
          />
          <path
            d="M23.25 30H18.75C18.3523 29.9995 17.9711 29.8413 17.6899 29.5601C17.4087 29.2789 17.2505 28.8977 17.25 28.5V24.75H13.5C13.1023 24.7495 12.7211 24.5913 12.4399 24.3101C12.1587 24.0289 12.0005 23.6477 12 23.25V18.75C12.0005 18.3523 12.1587 17.9711 12.4399 17.6899C12.7211 17.4087 13.1023 17.2505 13.5 17.25H17.25V13.5C17.2505 13.1023 17.4087 12.7211 17.6899 12.4399C17.9711 12.1587 18.3523 12.0005 18.75 12H23.25C23.6477 12.0005 24.0289 12.1587 24.3101 12.4399C24.5913 12.7211 24.7495 13.1023 24.75 13.5V17.25H28.5C28.8977 17.2505 29.2789 17.4087 29.5601 17.6899C29.8413 17.9711 29.9995 18.3523 30 18.75V23.25C29.9995 23.6477 29.8413 24.0289 29.5601 24.3101C29.2789 24.5913 28.8977 24.7495 28.5 24.75H24.75V28.5C24.7495 28.8977 24.5913 29.2789 24.3101 29.5601C24.0289 29.8413 23.6477 29.9995 23.25 30ZM13.5 18.75V23.25H18.75V28.5H23.25V23.25H28.5V18.75H23.25V13.5H18.75V18.75H13.5Z"
            fill="#475367"
          />
          <path
            d="M13.5 18.75V23.25H18.75V28.5H23.25V23.25H28.5V18.75H23.25V13.5H18.75V18.75H13.5Z"
            fill="#475367"
          />
        </svg>
      ),
      content: <AdditionalInformationRecord />,
    },
    {
      label: "Referral",
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="41"
            height="41"
            rx="20.5"
            stroke="#E7E9FB"
          />
          <path
            d="M23.25 30H18.75C18.3523 29.9995 17.9711 29.8413 17.6899 29.5601C17.4087 29.2789 17.2505 28.8977 17.25 28.5V24.75H13.5C13.1023 24.7495 12.7211 24.5913 12.4399 24.3101C12.1587 24.0289 12.0005 23.6477 12 23.25V18.75C12.0005 18.3523 12.1587 17.9711 12.4399 17.6899C12.7211 17.4087 13.1023 17.2505 13.5 17.25H17.25V13.5C17.2505 13.1023 17.4087 12.7211 17.6899 12.4399C17.9711 12.1587 18.3523 12.0005 18.75 12H23.25C23.6477 12.0005 24.0289 12.1587 24.3101 12.4399C24.5913 12.7211 24.7495 13.1023 24.75 13.5V17.25H28.5C28.8977 17.2505 29.2789 17.4087 29.5601 17.6899C29.8413 17.9711 29.9995 18.3523 30 18.75V23.25C29.9995 23.6477 29.8413 24.0289 29.5601 24.3101C29.2789 24.5913 28.8977 24.7495 28.5 24.75H24.75V28.5C24.7495 28.8977 24.5913 29.2789 24.3101 29.5601C24.0289 29.8413 23.6477 29.9995 23.25 30ZM13.5 18.75V23.25H18.75V28.5H23.25V23.25H28.5V18.75H23.25V13.5H18.75V18.75H13.5Z"
            fill="#475367"
          />
          <path
            d="M13.5 18.75V23.25H18.75V28.5H23.25V23.25H28.5V18.75H23.25V13.5H18.75V18.75H13.5Z"
            fill="#475367"
          />
        </svg>
      ),
      content: <ReferralRecord />,
    },
  ];

  // Filter tabs based on user's role
  const filteredTabs = tabs.filter((tab) => {
    if (user.role === "admin" || user.role === "superadmin") {
      return true;
    } else {
      return tab.label === "Profile";
    }
  });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: "1px #E7E9FB solid",
        }}
      >
        <Stack p={2} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <div
            style={{ display: "flex", gap: 8, cursor: "pointer" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="18" height="18" fill="#1E1E1E" />
              <g id="Home" clip-path="url(#clip0_1481_37234)">
                <rect
                  width="375"
                  height="812"
                  transform="translate(-25 -49)"
                  fill="#FCFCFD"
                />
                <g id="top">
                  <mask id="path-1-inside-1_1481_37234" fill="white">
                    <path d="M-25 -9H350V31H-25V-9Z" />
                  </mask>
                  <path
                    d="M350 30.5H-25V31.5H350V30.5Z"
                    fill="#E7E9FB"
                    mask="url(#path-1-inside-1_1481_37234)"
                  />
                  <g id="title">
                    <g id="Frame 1000007521">
                      <g id="Hicon / Linear / Left Circle 1">
                        <rect
                          width="20"
                          height="20"
                          transform="translate(-1 -1)"
                          fill="white"
                        />
                        <g id="Left Circle 1">
                          <path
                            id="Vector"
                            d="M12.3333 9.62484C12.6785 9.62484 12.9583 9.34502 12.9583 8.99984C12.9583 8.65466 12.6785 8.37484 12.3333 8.37484V9.62484ZM7.89333 12.7771C8.13849 13.0201 8.53422 13.0183 8.7772 12.7731C9.02019 12.528 9.01842 12.1322 8.77326 11.8893L7.89333 12.7771ZM7.15798 11.1683L7.59795 10.7244L7.59795 10.7244L7.15798 11.1683ZM7.15798 6.83138L6.71801 6.38747L6.71801 6.38747L7.15798 6.83138ZM8.77326 6.11041C9.01842 5.86743 9.02019 5.4717 8.7772 5.22654C8.53422 4.98137 8.13849 4.97961 7.89333 5.22259L8.77326 6.11041ZM5.67989 9.20873L5.0599 9.28775L5.0599 9.28775L5.67989 9.20873ZM5.67989 8.79095L5.0599 8.71192L5.0599 8.71192L5.67989 8.79095ZM16.7083 8.99984C16.7083 13.257 13.2572 16.7082 8.99996 16.7082V17.9582C13.9475 17.9582 17.9583 13.9474 17.9583 8.99984H16.7083ZM8.99996 16.7082C4.74276 16.7082 1.29163 13.257 1.29163 8.99984H0.041626C0.041626 13.9474 4.05241 17.9582 8.99996 17.9582V16.7082ZM1.29163 8.99984C1.29163 4.74264 4.74276 1.2915 8.99996 1.2915V0.0415039C4.05241 0.0415039 0.041626 4.05229 0.041626 8.99984H1.29163ZM8.99996 1.2915C13.2572 1.2915 16.7083 4.74264 16.7083 8.99984H17.9583C17.9583 4.05229 13.9475 0.0415039 8.99996 0.0415039V1.2915ZM12.3333 8.37484H6.33329V9.62484H12.3333V8.37484ZM8.77326 11.8893L7.59795 10.7244L6.71801 11.6122L7.89333 12.7771L8.77326 11.8893ZM7.59794 7.27529L8.77326 6.11041L7.89333 5.22259L6.71801 6.38747L7.59794 7.27529ZM7.59795 10.7244C7.11886 10.2496 6.79773 9.92995 6.58182 9.6611C6.37382 9.4021 6.31539 9.2515 6.29987 9.1297L5.0599 9.28775C5.11654 9.73208 5.32851 10.0968 5.6072 10.4438C5.87797 10.781 6.25981 11.1581 6.71801 11.6122L7.59795 10.7244ZM6.71801 6.38747C6.25981 6.8416 5.87797 7.21871 5.6072 7.55587C5.32851 7.90289 5.11654 8.2676 5.0599 8.71192L6.29987 8.86997C6.31539 8.74817 6.37382 8.59757 6.58182 8.33858C6.79773 8.06972 7.11886 7.75011 7.59795 7.27528L6.71801 6.38747ZM6.29987 9.1297C6.29437 9.08658 6.29163 9.04321 6.29163 8.99984L5.04163 8.99984C5.04163 9.096 5.04772 9.19216 5.0599 9.28775L6.29987 9.1297ZM6.29163 8.99984C6.29163 8.95647 6.29437 8.91309 6.29987 8.86997L5.0599 8.71192C5.04772 8.80751 5.04163 8.90367 5.04163 8.99984L6.29163 8.99984ZM6.33329 8.37484H5.66663V9.62484H6.33329V8.37484Z"
                            fill="#344054"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_1481_37234">
                  <rect
                    width="375"
                    height="812"
                    fill="white"
                    transform="translate(-25 -49)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span>Go Back</span>
          </div>

          <div
            style={{
              color: "#101928",
              fontWeight: 700,
              fontSize: 18,
              fontFamily: "fontBold",
              textTransform: "capitalize",
            }}
          >
            {`${client?.firstName} ${client?.lastName}`}
          </div>
        </Stack>
      </Box>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} sx={{ pb: 12 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                background: "#F7F9FC",
                border: "none",
                boxShadow: "none",
                height: 750,
              }}
            >
              <Tabs
                TabIndicatorProps={{ style: { display: "none" } }}
                value={value}
                orientation="vertical"
                variant="scrollable"
                scrollButtons={false}
                onChange={handleChange}
                textColor="inherit"
                sx={{
                  "& .MuiTabs-flexContainer": {
                    background: "transparent",
                    borderBottom: 0,
                  },
                }}
              >
                {filteredTabs.map((tab, index) => (
                  <Tab
                    sx={{
                      textTransform: "capitalize",
                      color: value === index ? "#099250" : "#344054",
                      fontWeight: 600,
                      fontFamily: "fontBold",
                      background: "transparent",
                      justifyContent: "flex-start",
                      minHeight: 40,
                      // py: 0,
                    }}
                    key={index}
                    label={tab.label}
                    icon={tab.icon}
                    value={index}
                    iconPosition="start"
                    onClick={() => setValue(index)}
                  />
                ))}
              </Tabs>

              <NeedHelp />
            </Card>
          </Grid>

          {/* Display the content of the selected tab */}
          <Grid item xs={12} md={8} sx={{}}>
            <Card
              sx={{
                width: "80%",
                margin: "auto",
                border: "none",
                boxShadow: "none",
              }}
            >
              {filteredTabs[value].content}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
