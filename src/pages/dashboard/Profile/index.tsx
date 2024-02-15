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
import { axiosInstance } from "../../../Utils";
import Swal from "sweetalert2";

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
        navigate(`/dashboard/search-result`, {
          state: { searchResults: res.data },
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.response);
      Swal.fire({
        icon: "info",
        title: "Not Found",
        text: `Incorrect NHR ID, please try again`,
        confirmButtonColor: "#099250",
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
        navigate(`/dashboard/search-result`, {
          state: { searchResults: res.data },
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "info",
        title: "Not Found",
        text: `Incorrect User data, please try again`,
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
          px: 2.5,
          pt: 2.5,
        }}
      >
        <div>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            fontSize={24}
            textTransform={"capitalize"}
          >
            Welcome back, {user?.title} {user?.lastName}
          </Typography>
          <span style={{ color: "#667185" }}>
            Search client’s health record here
          </span>
        </div>

        <Stack alignItems="start" px={2}>
          <Link
            to="/dashboard/new"
            style={{
              fontWeight: 500,
              color: "#099250",
              textDecoration: "none",
              borderRadius: 10,
              display: "flex",
              background: "#EDFCF2",
              padding: 16,
              gap: 7,
              alignItems: "center",
            }}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 1.25C8.87665 1.25 6.75 3.37665 6.75 6C6.75 8.62335 8.87665 10.75 11.5 10.75C14.1234 10.75 16.25 8.62335 16.25 6C16.25 3.37665 14.1234 1.25 11.5 1.25ZM8.25 6C8.25 4.20507 9.70507 2.75 11.5 2.75C13.2949 2.75 14.75 4.20507 14.75 6C14.75 7.79493 13.2949 9.25 11.5 9.25C9.70507 9.25 8.25 7.79493 8.25 6Z"
                fill="#099250"
              />
              <path
                d="M8.5 12.25C5.87665 12.25 3.75 14.3766 3.75 17C3.75 19.6234 5.87665 21.75 8.5 21.75H14.5C14.9142 21.75 15.25 21.4142 15.25 21C15.25 20.5858 14.9142 20.25 14.5 20.25H8.5C6.70507 20.25 5.25 18.7949 5.25 17C5.25 15.2051 6.70507 13.75 8.5 13.75H14.5C14.9142 13.75 15.25 13.4142 15.25 13C15.25 12.5858 14.9142 12.25 14.5 12.25H8.5Z"
                fill="#099250"
              />
              <path
                d="M19.25 14C19.25 13.5858 18.9142 13.25 18.5 13.25C18.0858 13.25 17.75 13.5858 17.75 14V16.25H15.5C15.0858 16.25 14.75 16.5858 14.75 17C14.75 17.4142 15.0858 17.75 15.5 17.75H17.75V20C17.75 20.4142 18.0858 20.75 18.5 20.75C18.9142 20.75 19.25 20.4142 19.25 20V17.75H21.5C21.9142 17.75 22.25 17.4142 22.25 17C22.25 16.5858 21.9142 16.25 21.5 16.25H19.25V14Z"
                fill="#099250"
              />
            </svg>
            <span>Add New Record</span>
          </Link>
        </Stack>
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
