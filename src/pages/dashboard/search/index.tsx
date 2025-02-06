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
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField";
import Buttons from "../../../components/Button";
import Styles from "./home.module.css";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../Utils";
import Page from "../../../components/PageWrapper";
import { list } from "../../../data/searchData";
import { useAlert } from "../../../Utils/useAlert";

export default function Search() {
  const [searchOptions, setSearchOption] = useState(false);

  const token = useSelector((state: any) => state.user.access_token);

  const navigate = useNavigate();

  const [numberValue, setNumberValue] = useState("");

  const [numbError, setNumbError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function formatNumberForView(number: string) {
    return number.replace(/(\d{4})(?=\d)/g, "$1-");
  }

  function parseNumberForApi(number: any) {
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

    const apiData = parseNumberForApi(numberValue);

    try {
      const res = await axiosInstance.get(`/search-serviceuser/${apiData}`);

      if (res.status === 200) {
        navigate(`/dashboard/search/result`, {
          state: { searchResults: res.data },
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      useAlert({
        icon: "info",
        title: "Not Found",
        text: `Incorrect NHR ID, please try again`,
        isToast: true,
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
        navigate(`/dashboard/search/result`, {
          state: { searchResults: res.data },
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      useAlert({
        icon: "info",
        title: "Not Found",
        text: `Incorrect User data, please try again`,
      });
      setIsLoading(false);
    }
  };

  const handleDateChange = (dateObj: Dayjs | null) => {
    const dateString = dateObj ? dateObj.format() : "";
    setDateOfBirth(dateString);
  };

  const handleNavigate = (to: string) => {
    navigate(`${to}`);
    handleClose();
  };

  return (
    <Page title="">
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
            Search client’s Health Record Here
          </Typography>
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
          onClick={handleClick}
        >
          Add New
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ marginTop: "14px" }}
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
                onClick={() => {
                  handleNavigate(`${item.to}`);
                  handleClose();
                }}
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
              <form onSubmit={searchNameDate}>
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

                  <label
                    style={{ marginTop: 10, marginBottom: 25 }}
                    htmlFor="dateOfBirth"
                  >
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

                  <Buttons
                    type="submit"
                    loading={isLoading}
                    disabled={!firstName || !lastName}
                    title="Search records"
                  />
                </div>
              </form>
            ) : (
              // DEFAULT: NHR ID
              <form onSubmit={searchNHRID}>
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
                      type="submit"
                      title="Search records"
                      disabled={!numberValue}
                      loading={isLoading}
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
