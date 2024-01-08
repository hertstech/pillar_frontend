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
import { TiUserAddOutline } from "react-icons/ti";
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
      const res = await axiosInstance.get(`/search-serviceuser/${numberValue}`);

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
      const res = await axiosInstance.get("/search-serviceuser", {
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
          <Typography
            variant="subtitle2"
            fontWeight={600}
            fontSize={24}
            textTransform={"capitalize"}
          >
            Welcome back, {user?.title} {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#667185" }}>
            Search client’s health record here
          </Typography>
        </div>
        <Stack alignItems="start">
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
            <TiUserAddOutline size={30} />
            <span>Add New Record</span>
          </Link>
        </Stack>
      </Box>
      <div className={Styles.boxContainer}>
        <div className={Styles.boxWrapper}>
          <div
            className=""
            style={{ background: "white", border: "1px #E7E9FB solid" }}
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
                  borderRadius: 0,
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
                  borderRadius: 0,
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
