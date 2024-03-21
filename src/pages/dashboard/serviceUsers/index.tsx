import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderTabs from "../../../components/HeaderTabs";
import Demogrphics from "./Demogrphics";
import Health from "./Health";
import Assessment from "./Medication";
import Allergies from "./Allergies";
import Referral from "./Referral";
import Styles from "../serviceUsers/styles.module.css";
import Notes from "./Notes";
import Overview from "./Overview";
// import { resetClientState } from "../../../redux/clientSlice";
import Message from "./Message";
import { useState } from "react";
import { axiosInstance } from "../../../Utils";
import Swal from "sweetalert2";

export default function Singleuser() {
  const client = useSelector((state: any) => state.client.clients.tab1[0]);

  const user = useSelector((state: any) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [message, setMessage] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const isInputEmpty = () => message.trim() === "";

  const isSubmitButtonDisabled = () => isInputEmpty() || isLoading;

  const tabs = [
    {
      label: "Overview",
      content: <Overview client={client} />,
    },
    {
      label: "Demographics",
      content: <Demogrphics client={client} />,
    },
    {
      label: "Health Information",
      content: <Health client={client} />,
    },
    {
      label: "Medication",
      content: <Assessment client={client} />,
    },
    {
      label: `Allergies`,
      content: <Allergies client={client} />,
    },
    {
      label: "Referrals",
      content: <Referral client={client} />,
    },
    {
      label: "Additional Information",
      content: <Notes client={client} />,
    },
    {
      label: "Messages",
      content: <Message />,
    },
  ];

  // Filter tabs based on user's role
  const filteredTabs = tabs.filter((tab) => {
    if (user.role === "admin" || user.role === "superadmin") {
      return true;
    } else {
      return tab.label === "Demographics" || tab.label === "Messages";
    }
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = { message };

    if (message === "") {
      return;
    }
    try {
      const res = await axiosInstance.post(
        `send-serviceuser-messages/${id}`,
        payload
      );
      setMessage("");
      setIsOpen(false);
      setIsLoading(false);

      Swal.fire({
        icon: "success",
        text: `${res.data}`,
        confirmButtonColor: "#099250",
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Stack sx={{}}>
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
          <Stack
            p={2}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <div
              style={{ display: "flex", gap: 8, cursor: "pointer" }}
              onClick={() => {
                navigate(-1);
                // dispatch(resetClientState("tab1"));
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

          <Stack
            alignItems="center"
            sx={{ mr: 2.5, display: "flex", flexDirection: "row", gap: 3 }}
          >
            <Button
              startIcon={
                <svg
                  width="21"
                  height="18"
                  viewBox="0 0 21 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Message 36">
                    <g id="Vector">
                      <path
                        d="M1.96231 4.77004C1.77432 5.53557 1.63702 6.52416 1.44601 7.89945C1.00983 11.0399 0.791745 12.6101 1.27127 13.8297C1.69225 14.9003 2.46954 15.793 3.47208 16.3573C4.61405 17 6.19934 17 9.36992 17H10.9941C14.1647 17 15.75 17 16.892 16.3573C17.8945 15.793 18.6718 14.9003 19.0928 13.8297C19.5723 12.6101 19.3542 11.0399 18.9181 7.89945C18.7106 6.40583 18.5665 5.36829 18.352 4.57727L17.6216 5.30771C15.9893 6.93999 14.7102 8.21918 13.5779 9.08306C12.419 9.96729 11.3263 10.4868 10.0608 10.4868C8.79535 10.4868 7.70261 9.96729 6.54368 9.08306C5.41142 8.21918 4.13225 6.93999 2.49998 5.30771L1.96231 4.77004Z"
                        fill="#099250"
                      />
                      <path
                        d="M2.5747 3.2611L3.52006 4.20646C5.20172 5.88812 6.41074 7.09489 7.45355 7.89053C8.47905 8.67296 9.25518 8.98679 10.0608 8.98679C10.8664 8.98679 11.6425 8.67296 12.668 7.89053C13.7109 7.09489 14.9199 5.88812 16.6015 4.20646L17.6912 3.11676C17.1833 2.39704 16.4932 1.82309 15.6899 1.45483C14.6977 1 13.4632 1 10.9941 1H9.36995C6.90089 1 5.66636 1 4.6742 1.45483C3.81789 1.84739 3.09026 2.47367 2.5747 3.2611Z"
                        fill="#099250"
                      />
                      <path
                        d="M1.96231 4.77004C1.77432 5.53557 1.63702 6.52416 1.44601 7.89945C1.00983 11.0399 0.791745 12.6101 1.27127 13.8297C1.69225 14.9003 2.46954 15.793 3.47208 16.3573C4.61405 17 6.19934 17 9.36992 17H10.9941C14.1647 17 15.75 17 16.892 16.3573C17.8945 15.793 18.6718 14.9003 19.0928 13.8297C19.5723 12.6101 19.3542 11.0399 18.9181 7.89945C18.7106 6.40583 18.5665 5.36829 18.352 4.57727L17.6216 5.30771C15.9893 6.93999 14.7102 8.21918 13.5779 9.08306C12.419 9.96729 11.3263 10.4868 10.0608 10.4868C8.79535 10.4868 7.70261 9.96729 6.54368 9.08306C5.41142 8.21918 4.13225 6.93999 2.49998 5.30771L1.96231 4.77004Z"
                        stroke="#F6FEF9"
                        stroke-width="1.5"
                      />
                      <path
                        d="M2.5747 3.2611L3.52006 4.20646C5.20172 5.88812 6.41074 7.09489 7.45355 7.89053C8.47905 8.67296 9.25518 8.98679 10.0608 8.98679C10.8664 8.98679 11.6425 8.67296 12.668 7.89053C13.7109 7.09489 14.9199 5.88812 16.6015 4.20646L17.6912 3.11676C17.1833 2.39704 16.4932 1.82309 15.6899 1.45483C14.6977 1 13.4632 1 10.9941 1H9.36995C6.90089 1 5.66636 1 4.6742 1.45483C3.81789 1.84739 3.09026 2.47367 2.5747 3.2611Z"
                        stroke="#F6FEF9"
                        stroke-width="1.5"
                      />
                    </g>
                  </g>
                </svg>
              }
              sx={{
                textTransform: "none",
                background: "#EDFCF2",
                p: 1.5,
                alignItems: "center",
                color: "#099250",
                "&:hover": { backgroundColor: "#EDFCF2" },
              }}
              onClick={() => setIsOpen(true)}
            >
              Send New Message
            </Button>

            <Link
              to={`/dashboard/user/${id}/update`}
              style={{
                fontWeight: 500,
                color: "#FFF",
                textDecoration: "none",
                borderRadius: 10,
                display: "flex",
                background: "#099250",
                padding: 12,
                gap: 5,
                textTransform: "capitalize",
                alignItems: "flex-start",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Edit 2">
                  <path
                    id="Vector"
                    d="M4.3542 10.6793L4.17225 10.2135L4.3542 10.6793ZM1.64994 11.1985L1.39994 11.6316H1.39994L1.64994 11.1985ZM0.747525 8.59694L0.253225 8.67222L0.747525 8.59694ZM1.07439 6.86209L1.5074 7.11209L1.07439 6.86209ZM0.684957 7.68693L0.193602 7.59436L0.193602 7.59436L0.684957 7.68693ZM5.69319 9.52876L6.1262 9.77876L5.69319 9.52876ZM5.17357 10.2784L5.49942 10.6577H5.49943L5.17357 10.2784ZM3.60668 2.47603L3.17367 2.22603L3.60668 2.47603ZM10.94 12C11.2162 12 11.44 11.7761 11.44 11.5C11.44 11.2238 11.2162 11 10.94 11V12ZM6.94001 11C6.66387 11 6.44001 11.2238 6.44001 11.5C6.44001 11.7761 6.66387 12 6.94001 12V11ZM7.79247 4.8927L5.26018 9.27876L6.1262 9.77876L8.6585 5.3927L7.79247 4.8927ZM1.5074 7.11209L4.03969 2.72603L3.17367 2.22603L0.641377 6.61209L1.5074 7.11209ZM4.17225 10.2135C3.44127 10.4991 2.94343 10.6923 2.55911 10.7821C2.18786 10.8688 2.0194 10.8345 1.89994 10.7655L1.39994 11.6316C1.83545 11.883 2.30269 11.8689 2.78662 11.7559C3.25748 11.6459 3.83428 11.4192 4.53616 11.145L4.17225 10.2135ZM0.253225 8.67222C0.366684 9.41718 0.45878 10.03 0.598938 10.4928C0.742986 10.9684 0.964423 11.3801 1.39994 11.6316L1.89994 10.7655C1.78047 10.6966 1.66652 10.5678 1.55601 10.203C1.44161 9.82523 1.35999 9.2975 1.24182 8.52166L0.253225 8.67222ZM0.641377 6.61209C0.426829 6.9837 0.255053 7.26821 0.193602 7.59436L1.17631 7.77951C1.19895 7.65937 1.25876 7.54275 1.5074 7.11209L0.641377 6.61209ZM1.24182 8.52166C1.16695 8.03005 1.15368 7.89965 1.17631 7.77951L0.193602 7.59436C0.132151 7.92051 0.188617 8.24802 0.253225 8.67222L1.24182 8.52166ZM5.26018 9.27876C5.01154 9.70942 4.94045 9.81953 4.84772 9.8992L5.49943 10.6577C5.75116 10.4414 5.91166 10.1504 6.1262 9.77876L5.26018 9.27876ZM4.53616 11.145C4.93583 10.9888 5.24769 10.874 5.49942 10.6577L4.84772 9.8992C4.755 9.97887 4.63543 10.0326 4.17225 10.2135L4.53616 11.145ZM6.99942 1.93298C7.55599 2.25432 7.92933 2.47109 8.18656 2.6696C8.4323 2.85924 8.51059 2.98697 8.54239 3.10565L9.50831 2.84683C9.39717 2.43204 9.13182 2.13591 8.7975 1.87792C8.47466 1.62879 8.03151 1.37416 7.49942 1.06695L6.99942 1.93298ZM8.6585 5.3927C8.9657 4.86061 9.22217 4.41851 9.37719 4.04135C9.53772 3.65075 9.61946 3.26162 9.50831 2.84683L8.54239 3.10565C8.57419 3.22433 8.57026 3.37409 8.45226 3.6612C8.32874 3.96173 8.11381 4.33613 7.79247 4.8927L8.6585 5.3927ZM7.49942 1.06695C6.96733 0.759752 6.52523 0.503281 6.14806 0.348264C5.75747 0.187731 5.36834 0.105994 4.95355 0.217137L5.21237 1.18306C5.33104 1.15126 5.48081 1.15519 5.76792 1.27319C6.06844 1.39671 6.44284 1.61164 6.99942 1.93298L7.49942 1.06695ZM4.03969 2.72603C4.36103 2.16946 4.5778 1.79612 4.77631 1.53889C4.96595 1.29315 5.09369 1.21486 5.21237 1.18306L4.95355 0.217137C4.53876 0.328279 4.24263 0.593631 3.98463 0.927953C3.7355 1.25079 3.48087 1.69394 3.17367 2.22603L4.03969 2.72603ZM8.47548 4.70969L3.85668 2.04302L3.35668 2.90905L7.97548 5.57571L8.47548 4.70969ZM10.94 11H6.94001V12H10.94V11Z"
                    fill="#FFF"
                  />
                </g>
              </svg>
              Update Record
            </Link>
          </Stack>
        </Box>

        <HeaderTabs links={filteredTabs} />
      </Box>

      <>
        <Dialog maxWidth="sm" fullWidth open={isOpen}>
          <DialogTitle>New Message</DialogTitle>

          <Button
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              padding: "16px 8px",
            }}
            onClick={() => setIsOpen(false)}
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

          <DialogContent>
            <form action="">
              <textarea
                className={Styles.area}
                name={`additionalNote`}
                rows={8}
                cols={50}
                placeholder="Enter message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <Stack marginTop={3}>
                <Button
                  size="large"
                  sx={{
                    color: "#F6FEF9",
                    outline: "none",
                    fontWeight: 600,
                    background: "#099250",
                    "&:hover": { backgroundColor: "#099250" },
                    px: 3,
                    width: "40%",
                    "&.Mui-disabled": {
                      opacity: 0.3,
                      color: "white",
                    },
                  }}
                  disabled={isSubmitButtonDisabled()}
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Send Message
                </Button>
              </Stack>
            </form>
          </DialogContent>
        </Dialog>
      </>
    </Stack>
  );
}
