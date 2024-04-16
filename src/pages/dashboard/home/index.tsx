import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  Popover,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField";
import Buttons from "../../../components/Button";
import Styles from "./home.module.css";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../Utils";
import Swal from "sweetalert2";
import Page from "../../../components/PageWrapper";

const list = [
  {
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="health-record">
          <path
            id="Vector"
            d="M16.9177 13.6281L16.5639 13.9819L14.8977 15.6481L16.9177 13.6281ZM16.9177 13.6281L16.5637 13.2745M16.9177 13.6281L16.5637 13.2745M16.5637 13.2745L15.9737 12.6854L15.6201 12.3323L15.2668 12.6856L14.2484 13.704L14.0628 13.5187L13.7093 13.1657L13.356 13.5189L12.7668 14.1081L12.4133 14.4617M16.5637 13.2745L12.4133 14.4617M12.4133 14.4617L12.7668 14.8152M12.4133 14.4617L12.7668 14.8152M12.7668 14.8152L13.5997 15.6481L12.7668 14.8152ZM14.6 15.8474C14.4887 15.8936 14.3693 15.9174 14.2487 15.9174C14.1281 15.9174 14.0087 15.8936 13.8974 15.8474C13.7862 15.8013 13.6852 15.7337 13.6001 15.6486L14.6 15.8474ZM14.6 15.8474C14.7112 15.8013 14.8122 15.7337 14.8973 15.6486L14.6 15.8474ZM14.96 3.87204C14.8819 3.7939 14.7759 3.75 14.6654 3.75H13.9154H13.4154L14.96 3.87204ZM12.2487 14.4951V14.495V11.75H17.082V14.495V14.495C17.0821 14.8928 16.9839 15.2845 16.7962 15.6352C16.6086 15.9859 16.3373 16.2849 16.0063 16.5056C16.0063 16.5057 16.0063 16.5057 16.0063 16.5057L14.6654 17.3996L13.3252 16.5064L13.3251 16.5064C12.994 16.2857 12.7224 15.9866 12.5347 15.6358C12.3469 15.2849 12.2486 14.893 12.2487 14.4951Z"
            fill="#344054"
            stroke="#344054"
          />
        </g>
      </svg>
    ),

    title: "health record",
    to: "/dashboard/create-new",
  },
  {
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="birth-record">
          <g id="Vector">
            <mask id="path-1-inside-1_3348_146703" fill="white">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 5.00083C13 6.35333 11.8808 7.45 10.5 7.45C9.11917 7.45 8 6.35333 8 5.00083C8 3.64833 9.11917 2.55167 10.5 2.55167C11.8808 2.55167 13 3.6475 13 5.00083ZM10.5 6.63417C11.4208 6.63417 12.1667 5.9025 12.1667 5.00083C12.1667 4.09917 11.4208 3.36833 10.5 3.36833C9.57917 3.36833 8.83333 4.09917 8.83333 5.00167C8.83333 5.9025 9.57917 6.63333 10.5 6.63333V6.63417Z"
              />
            </mask>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13 5.00083C13 6.35333 11.8808 7.45 10.5 7.45C9.11917 7.45 8 6.35333 8 5.00083C8 3.64833 9.11917 2.55167 10.5 2.55167C11.8808 2.55167 13 3.6475 13 5.00083ZM10.5 6.63417C11.4208 6.63417 12.1667 5.9025 12.1667 5.00083C12.1667 4.09917 11.4208 3.36833 10.5 3.36833C9.57917 3.36833 8.83333 4.09917 8.83333 5.00167C8.83333 5.9025 9.57917 6.63333 10.5 6.63333V6.63417Z"
              fill="#344054"
            />
            <path
              d="M10.5 6.63417H9.5V7.63417H10.5V6.63417ZM10.5 6.63333H11.5V5.63333H10.5V6.63333ZM12 5.00083C12 5.78185 11.3479 6.45 10.5 6.45V8.45C12.4137 8.45 14 6.92482 14 5.00083H12ZM10.5 6.45C9.65205 6.45 9 5.78185 9 5.00083H7C7 6.92482 8.58628 8.45 10.5 8.45V6.45ZM9 5.00083C9 4.21982 9.65205 3.55167 10.5 3.55167V1.55167C8.58628 1.55167 7 3.07685 7 5.00083H9ZM10.5 3.55167C11.3482 3.55167 12 4.2192 12 5.00083H14C14 3.0758 12.4135 1.55167 10.5 1.55167V3.55167ZM10.5 7.63417C11.9543 7.63417 13.1667 6.47344 13.1667 5.00083H11.1667C11.1667 5.33156 10.8874 5.63417 10.5 5.63417V7.63417ZM13.1667 5.00083C13.1667 3.52757 11.9536 2.36833 10.5 2.36833V4.36833C10.8881 4.36833 11.1667 4.67076 11.1667 5.00083H13.1667ZM10.5 2.36833C9.04606 2.36833 7.83333 3.5279 7.83333 5.00167H9.83333C9.83333 4.67043 10.1123 4.36833 10.5 4.36833V2.36833ZM7.83333 5.00167C7.83333 6.47442 9.04673 7.63333 10.5 7.63333V5.63333C10.1116 5.63333 9.83333 5.33057 9.83333 5.00167H7.83333ZM9.5 6.63333V6.63417H11.5V6.63333H9.5Z"
              fill="#344054"
              mask="url(#path-1-inside-1_3348_146703)"
            />
          </g>
          <path
            id="Vector_2"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.0133 6.67417C14.0837 6.70676 14.1433 6.75871 14.1852 6.82394C14.2271 6.88916 14.2496 6.96497 14.25 7.0425V13.9983C14.25 14.8917 13.9642 15.805 13.3392 16.5008C12.7058 17.2058 11.7558 17.6542 10.5 17.6542C7.91333 17.6542 6.75 15.5458 6.75 13.9983V7.04167C6.75036 6.96519 6.77218 6.89035 6.81299 6.82567C6.8538 6.761 6.91196 6.70908 6.98083 6.67583C7.05036 6.64209 7.12778 6.62798 7.20474 6.63503C7.28169 6.64208 7.35526 6.67002 7.4175 6.71583C8.75417 7.70333 9.70083 8.1275 10.5725 8.125C11.44 8.12333 12.3358 7.69917 13.5725 6.72333C13.6342 6.67503 13.708 6.64479 13.7858 6.63596C13.8637 6.62713 13.9424 6.6409 14.0133 6.67417ZM7.58333 8.06167V13.9983C7.58333 15.2342 8.50417 16.8383 10.5 16.8383C11.5367 16.8383 12.2525 16.475 12.7133 15.9617C13.0708 15.5633 13.2917 15.0558 13.3767 14.5133C13.3223 14.4738 13.2785 14.4214 13.2492 14.3608C12.6225 13.0775 11.4608 11.6508 10.23 10.4025C9.29417 9.4525 8.33833 8.62667 7.58333 8.06167ZM13.4167 12.9808C12.72 11.8967 11.7808 10.8 10.8292 9.835C10.5025 9.50366 10.1677 9.1805 9.825 8.86583C10.075 8.91667 10.325 8.9425 10.575 8.9425C11.525 8.94 12.425 8.55417 13.4167 7.865V12.9817V12.9808Z"
            fill="black"
          />
        </g>
      </svg>
    ),
    title: "birth record",
    to: "/",
  },
  {
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="death-record">
          <path
            id="Vector"
            d="M7.74145 2.16716L7.74127 2.40698L7.44145 2.35119L7.51249 2.16696L7.74145 2.16716Z"
            fill="#344054"
            stroke="#344054"
          />
        </g>
      </svg>
    ),
    title: "death record",
    to: "/",
  },
];

export default function Home() {
  const [searchOptions, setSearchOption] = useState(false);

  const user = useSelector((state: any) => state.user.user);

  const token = useSelector((state: any) => state.user.access_token);

  const navigate = useNavigate();

  const [numberValue, setNumberValue] = useState("");

  const [numbError, setNumbError] = useState("");

  const [showList, setShowList] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");

  function formatNumberForView(number: string) {
    // Add a dash after every 4 characters
    return number.replace(/(\d{4})(?=\d)/g, "$1-");
  }

  function parseNumberForApi(number: any) {
    // Remove dashes before sending to the API
    return number.replace(/-/g, "");
  }

  const handleIDChange = (e: any) => {
    const inputValue = e.target.value;

    const numericValue = inputValue.replace(/-/g, "");

    const formattedValue = formatNumberForView(numericValue);

    setNumberValue(formattedValue);
    setNumbError("");
  };

  const searchNHRID = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (numberValue === "") {
      setNumbError("Please input a valid NHR ID!");
      setIsLoading(false);
      return;
    }

    // Remove dashes before sending to the API
    const apiData = parseNumberForApi(numberValue);

    try {
      const res = await axiosInstance.get(`/search-serviceuser/${apiData}`);

      if (res.status === 200) {
        navigate(`/dashboard/app/search`, {
          state: { searchResults: res.data },
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "info",
        title: "Not Found",
        text: `Incorrect NHR ID, please try again`,
        confirmButtonColor: "#2E90FA",
      });
      setIsLoading(false);
    }
  };

  const searchNameDate = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (firstName === "" && lastName === "") {
      setError("Please input a valid name and date of birth!!!");
      setIsLoading(false);
      return;
    }

    interface Payload {
      firstName?: string | null;
      lastName?: string | null;
      dateOfBirth?: string | null;
    }

    const payload: Payload = {};

    if (firstName) {
      payload.firstName = firstName;
    }

    if (lastName) {
      payload.lastName = lastName;
    }

    if (dateOfBirth) {
      payload.dateOfBirth = dateOfBirth;
    }

    try {
      const res = await axiosInstance.get("/search-serviceuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: payload,
      });

      if (res.status === 200) {
        navigate(`/dashboard/app/search`, {
          state: { searchResults: res.data },
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "info",
        title: "Not Found",
        text: `Incorrect User data, please try again`,
        confirmButtonColor: "#2E90FA",
      });
      setIsLoading(false);
    }
  };

  // Assuming dateObj is of type Dayjs | null
  const handleDateChange = (dateObj: Dayjs | null) => {
    // Convert Dayjs object to string or use an empty string if null
    const dateString = dateObj ? dateObj.format() : "";
    setDateOfBirth(dateString);
  };

  const handleNavigate = (to: string) => {
    navigate(`${to}`);
    // console.log(to);
  };
  return (
    <Page title="EHR Portal">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          p: 2.5,
          borderBottom: "1px #E7E9FB solid",
        }}
      >
        <div>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            fontSize={24}
            sx={{
              "&::first-letter": {
                textTransform: "uppercase",
              },
            }}
          >
            Welcome back, {user?.title} {user?.lastName}
          </Typography>
          <span style={{ color: "#667185" }}>
            Search client’s health record here
          </span>
        </div>

        <Button
          variant="contained"
          size="large"
          sx={{
            px: 2,
            textTransform: "none",
            color: "#F5FAFF",
            gap: 1,
            alignItems: "center",
            display: "flex",
            fontFamily: "fontbold",
            width: "147px",
            height: "48px",
          }}
          startIcon={
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Add">
                <path
                  id="Vector"
                  d="M10.25 1.5C10.25 1.08579 9.91421 0.75 9.5 0.75C9.08579 0.75 8.75 1.08579 8.75 1.5L8.75 8.75H1.5C1.08579 8.75 0.75 9.08579 0.75 9.5C0.75 9.91421 1.08579 10.25 1.5 10.25H8.75V17.5C8.75 17.9142 9.08579 18.25 9.5 18.25C9.91421 18.25 10.25 17.9142 10.25 17.5V10.25H17.5C17.9142 10.25 18.25 9.91421 18.25 9.5C18.25 9.08579 17.9142 8.75 17.5 8.75H10.25L10.25 1.5Z"
                  fill="#FAFEF5"
                />
              </g>
            </svg>
          }
          onClick={() => setShowList(true)}
        >
          Add New
        </Button>
        <>
          <Popover
            open={showList}
            onClose={() => setShowList(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ marginTop: "140px" }}
          >
            <List
              sx={{
                p: 0,
                textTransform: "capitalize",
                fontFamily: "fontBold",
                fontWeight: 500,
                width: "175px",
              }}
            >
              {list.map((item) => (
                <ListItem
                  key={item.title}
                  onClick={() => handleNavigate(`${item.to}`)}
                >
                  <ListItemButton
                    sx={{
                      textTransform: "capitalize",
                      fontFamily: "fontBold",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Popover>
        </>
      </Box>

      <div className={Styles.boxContainer}>
        <div className={Styles.boxWrapper}>
          <div
            className=""
            style={{
              background: "white",
              border: "1px #E7E9FB solid",
              borderRadius: 12,
            }}
          >
            <div className={Styles.bttnWrapper}>
              <Button
                fullWidth
                sx={{
                  color: "#000",
                  outline: "none",
                  textTransform: "capitalize",
                  fontWeight: 600,
                  height: 48,
                  background: searchOptions ? "#FFF" : "#EDFCF2",
                  borderBottom: searchOptions ? "none" : "2px solid #3CCB7F",
                  borderTopLeftRadius: 12,
                  fontSize: 18,
                }}
                size="large"
                onClick={() => setSearchOption(false)}
              >
                NHR ID
              </Button>

              <Button
                fullWidth
                sx={{
                  color: "#000",
                  outline: "none",
                  textTransform: "capitalize",
                  fontWeight: 600,
                  height: 48,
                  background: searchOptions ? "#EDFCF2" : "#FFF",
                  borderBottom: searchOptions ? "2px solid #3CCB7F" : "none",
                  borderTopRightRadius: 12,
                  fontSize: 18,
                }}
                size="large"
                onClick={() => setSearchOption(true)}
              >
                Client Details
              </Button>
            </div>

            {searchOptions ? (
              // SECOND CHOICE CLIENT DETAILS
              <form action="">
                <div className={Styles.content}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    fontSize={32}
                    sx={{
                      color: "#101828",
                      textAlign: "center",
                      marginBottom: 3,
                    }}
                  >
                    Enter client's details
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      columnGap: 1.5,
                      rowGap: 1.5,
                      gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                      },
                    }}
                  >
                    <InputField
                      type="text"
                      label="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={(e: any) => {
                        setfirstName(e.target.value);
                        setError("");
                      }}
                      placeholder=""
                    />

                    <InputField
                      type="text"
                      label="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={(e: any) => {
                        setLastName(e.target.value);
                        setError("");
                      }}
                      placeholder=""
                    />
                  </Box>
                  <Typography sx={{ mb: 1 }} color="error" fontSize={12}>
                    {error && error}
                  </Typography>

                  <label style={{ marginTop: 10 }} htmlFor="dateOfBirth">
                    Date of Birth
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          orientation="portrait"
                          views={["year", "month", "day"]}
                          format="DD/MM/YYYY"
                          sx={{ marginTop: "5px", width: "100%" }}
                          disableFuture={true}
                          value={dayjs(dateOfBirth)}
                          slotProps={{
                            field: {
                              readOnly: true,
                            },
                          }}
                          onChange={handleDateChange}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </label>

                  <div className={Styles.bttn}>
                    <Buttons
                      loading={isLoading}
                      disabled={!firstName || !lastName}
                      title="Search records"
                      onClick={searchNameDate}
                    />
                  </div>
                </div>
              </form>
            ) : (
              // DEFAULT: NHR ID
              <form action="">
                <div className={Styles.content}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    fontSize={32}
                    sx={{
                      color: "#101828",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Enter client's NHR ID
                  </Typography>

                  <InputField
                    type="text"
                    label="NHR ID"
                    name="NHR_ID"
                    value={numberValue}
                    onChange={handleIDChange}
                    placeholder="Enter NHR ID number"
                  />
                  <Typography sx={{ mb: 1 }} color="error" fontSize={12}>
                    {numbError && numbError}
                  </Typography>

                  <div className={Styles.bttn}>
                    <Buttons
                      title="Search records"
                      disabled={!numberValue}
                      loading={isLoading}
                      onClick={searchNHRID}
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
