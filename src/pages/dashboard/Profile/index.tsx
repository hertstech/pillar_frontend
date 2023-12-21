import dayjs, { Dayjs } from "dayjs";
import { Box, Stack, Typography, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField";
import Buttons from "../../../components/Button";
import Styles from "./profile.module.css";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../Utils/axios";
import Swal from "sweetalert2";
// import NoResultIllustration from "../../../components/NoResult";

export default function ProfileHome() {
  const [searchOptions, setSearchOption] = useState(false);
  const user = useSelector((state: any) => state.user.user);

  const token = useSelector((state: any) => state.user.access_token);

  const navigate = useNavigate();

  const [numberValue, setNumberValue] = useState("");
  const [numbError, setNumbError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");

  const name = user?.lastName.split(" ")[0];

  const searchNHRID = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (numberValue === "") {
      setNumbError("Please input a valid NHR ID!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get(
        `/search-service-user/${numberValue}`
      );

      navigate(`/dashboard/search-result`, {
        state: { searchResults: res.data.result },
      });
      setIsLoading(false);
    } catch (error: any) {
      // console.error(error.response);
      Swal.fire({
        icon: "info",
        title: "Not Found",
        text: `${error.response.data}`,
        confirmButtonColor: "#099250",
      });
      setIsLoading(false);
    }
  };

  const searchNameDate = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if ((firstName === "" && lastName === "") || dateOfBirth === "") {
      setError("Please input a valid name and date of birth!!!");
      setIsLoading(false);
      return;
    }

    const payload = {
      firstName,
      lastName,
      dateOfBirth,
    };

    try {
      const res = await axiosInstance.get("/search-service-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: payload,
      });

      navigate(`/dashboard/search-result`, {
        state: { searchResults: res.data.result },
      });

      console.log(res.data.result.length);
      setIsLoading(false);
    } catch (error: any) {
      // console.error(error.response.data);
      Swal.fire({
        icon: "info",
        title: "Not Found",
        text: `${error.response.data}`,
        confirmButtonColor: "#099250",
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

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="subtitle2" fontWeight={600} fontSize={24}>
            Welcome, Dr. {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#667185" }}>
            Check and get client’s health record here
          </Typography>
        </div>
        <Stack alignItems="start">
          <Link
            to="/dashboard/new"
            style={{
              fontWeight: 500,
              color: "#FFF",
              textDecoration: "none",
              borderRadius: 10,
              display: "flex",
              background: "#099250",
              padding: 16,
              gap: 5,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="button-icon">
                <g id="icon">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7ZM12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.55543 21.9174C8.22982 22.6502 10.4595 23 12 23C13.5405 23 15.7702 22.6502 17.4446 21.9174C18.2666 21.5576 19.1025 21.0427 19.5882 20.2974C19.8437 19.9054 20.0052 19.4437 19.9999 18.9282C19.9946 18.4174 19.8266 17.9281 19.5441 17.4728C18.1747 15.2656 15.3732 13 12 13C8.62679 13 5.82532 15.2656 4.45591 17.4728C4.17344 17.9281 4.00537 18.4174 4.00013 18.9282C3.99483 19.4437 4.15632 19.9054 4.41175 20.2974C4.89745 21.0427 5.73343 21.5576 6.55543 21.9174ZM6.00002 18.9487C6.00077 18.8757 6.02372 18.7394 6.15539 18.5272C7.27754 16.7185 9.51566 15 12 15C14.4843 15 16.7225 16.7185 17.8446 18.5272C17.9763 18.7394 17.9992 18.8757 18 18.9487C18.0007 19.017 17.9831 19.0973 17.9126 19.2055C17.7465 19.4605 17.3429 19.7787 16.6427 20.0852C15.2726 20.6848 13.3268 21 12 21C10.6732 21 8.72744 20.6848 7.35732 20.0852C6.65707 19.7787 6.25354 19.4605 6.08736 19.2055C6.01686 19.0973 5.99932 19.017 6.00002 18.9487Z"
                    fill="white"
                  />
                  <path
                    d="M21 3C21 2.44772 20.5523 2 20 2C19.4477 2 19 2.44772 19 3V4H18C17.4477 4 17 4.44772 17 5C17 5.55228 17.4477 6 18 6H19V7C19 7.55228 19.4477 8 20 8C20.5523 8 21 7.55228 21 7V6H22C22.5523 6 23 5.55228 23 5C23 4.44772 22.5523 4 22 4H21V3Z"
                    fill="white"
                  />
                </g>
              </g>
            </svg>
            <span>Add New Record</span>
          </Link>
        </Stack>
      </Box>
      <div className={Styles.boxContainer}>
        <div className={Styles.boxWrapper}>
          <div className="" style={{ background: "white" }}>
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
                  borderRadius: 0,
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
                  borderRadius: 0,
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
                    fontWeight={400}
                    fontSize={18}
                    sx={{ color: "#101828", textAlign: "center" }}
                  >
                    Welcome Dr. {name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    // lineHeight={1}
                    fontSize={28}
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
                    fontWeight={400}
                    fontSize={20}
                    sx={{ color: "#101828", textAlign: "center" }}
                  >
                    Welcome Dr. {name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    fontSize={28}
                    sx={{
                      color: "#101828",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Enter client's NHR ID
                  </Typography>

                  <InputField
                    type="number"
                    label="NHR ID"
                    name="parentOneNHR_ID"
                    value={numberValue}
                    onChange={(e: any) => {
                      setNumberValue(e.target.value);
                      setNumbError("");
                    }}
                    placeholder="Enter NHR ID number"
                  />
                  <Typography sx={{ mb: 1 }} color="error" fontSize={12}>
                    {numbError && numbError}
                  </Typography>

                  <div className={Styles.bttn}>
                    <Buttons
                      title="Search records"
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
    </Box>
  );
}

// { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
