import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HeaderTabs from "../../../components/HeaderTabs";
import Profile from "./Profile";
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
import { useGetUserConsent } from "../../../api/HealthServiceUser/consent";
import { ConsentBoxes } from "../../../components/ServiceUser/ConsentPills";
import PopperOver from "../../../components/Popover";
import ShareUserAccessForm from "./ShareAndTransfer/ShareUserAccess";
import TransferRecordAccessForm from "./ShareAndTransfer/TransferRecordAccess";
import RequestRecordAccess from "./ShareAndTransfer/RequestRecordAccess";
import ServiceUserTest from "./Test";
import { BackIcon, SendIcon } from "../../../../public/assets/Icons";
import { useAlert } from "../../../Utils/useAlert";

export default function SingleUser() {
  const client = useSelector((state: any) => state.client.clients.tab1[0]);

  console.log("client information on first load:", client);

  const writeAccess = client?.read_access;

  const user = useSelector((state: any) => state.user.user);
  console.log("user information on first load:", user);

  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isOpenRequestForm, setIsOpenRequestForm] = useState<boolean>(false);
  const [isOpenAccessForm, setIsOpenAccessForm] = useState<boolean>(false);
  const [isTransferAccessForm, setIsTransferAccessForm] =
    useState<boolean>(false);

  const [message, setMessage] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const newId = id ? parseInt(id) : NaN;

  const { data } = useGetUserConsent(newId);

  const isInputEmpty = () => message.trim() === "";

  const isSubmitButtonDisabled = () => isInputEmpty() || isLoading;

  const tabs = [
    {
      label: "Overview",
      content: <Overview client={client} />,
    },
    {
      label: "Profile",
      content: <Profile client={client} isLoading={isLoading} />,
    },
    {
      label: "Health Information",
      content: <Health client={client} />,
    },
    {
      label: "Test",
      content: <ServiceUserTest client={client} />,
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
      return tab.label === "Profile" || tab.label === "Messages";
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

      useAlert({
        icon: "success",
        title: `${res.data}`,
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Stack sx={{}}>
      <Box>
        <Box
          pr={2}
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
              <BackIcon />
              <span>Go Back</span>
            </div>

            <Box className="flex gap-2 items-center">
              <Box className="font-bold text-lg capitalize text-neu-900">
                {`${client?.firstName} ${client?.lastName}`}
              </Box>
              <ConsentBoxes data={data?.data} />
            </Box>
          </Stack>

          <Box className="flex items-center gap-8">
            <Button
              startIcon={<SendIcon />}
              sx={{
                textTransform: "none",
                background: "#D1E9FF",
                p: 1.5,
                alignItems: "center",
                color: "#1570EF",
                "&:hover": { backgroundColor: "#D1E9FF" },
                borderRadius: 2,
                height: "48px",
              }}
              onClick={() => setIsOpen(true)}
              className="!bg-pri-650 !text-white min-w-[188px] max-h-[40px]"
            >
              Send message
            </Button>
            <PopperOver
              position="bottom-end"
              popperContent={
                !writeAccess ? (
                  <Box className="bg-white min-w-[200px] max-h-[112px] rounded-lg border-t">
                    <button
                      onClick={() => setIsOpenRequestForm(true)}
                      className="p-3 border-b w-full text font-medium text-base  text-left"
                    >
                      Request access
                    </button>
                  </Box>
                ) : (
                  <Box className="bg-white min-w-[200px] max-h-[112px] rounded-lg border-t">
                    <button
                      onClick={() => setIsOpenAccessForm(true)}
                      className="p-3 border-b w-full text font-medium text-base  text-left"
                    >
                      Share access
                    </button>
                    <button
                      onClick={() => setIsTransferAccessForm(true)}
                      className="p-3 w-full text font-medium text-base  text-left"
                    >
                      Transfer record
                    </button>
                  </Box>
                )
              }
            />
          </Box>
        </Box>

        <HeaderTabs links={filteredTabs} writeAccess={writeAccess} />
      </Box>

      {/* Modals here */}

      <RequestRecordAccess
        open={isOpenRequestForm}
        setOpen={setIsOpenRequestForm}
        data={user}
      />
      <ShareUserAccessForm
        open={isOpenAccessForm}
        setOpen={setIsOpenAccessForm}
      />
      <TransferRecordAccessForm
        open={isTransferAccessForm}
        setOpen={setIsTransferAccessForm}
      />

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
                    background: "#2E90FA",
                    "&:hover": { backgroundColor: "#2E90FA" },
                    px: 3,
                    borderRadius: 2,
                    height: "48px",
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
