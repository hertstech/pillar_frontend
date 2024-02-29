import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Buttons from "../../components/Button";
import moment from "moment";
import { TableLoader } from "../../components/NoResult";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../Utils";

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "email", label: "Email Address", align: "left" },
  { id: "phone", label: "Phone Number", align: "left" },
  { id: "role", label: "Designation", align: "left" },
  { id: "status", label: "Status", align: "center" },
  { id: "date", label: "Date Created", align: "center" },
  { id: "" },
];

const title = [
  "Mr.",
  "Mrs.",
  "Miss",
  "Ms.",
  "Dr.",
  "Prof.",
  "Rev.",
  "Hon.",
  "Capt.",
  "Sir.",
  "Dame",
];

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  title: "",
  role: "",
  position: "",
};

export default function Management({
  isLoading,
  staffList,
  triggerRefresh,
}: any) {
  const user = useSelector((state: any) => state.user.user);

  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);

  const [openView, setOpenView] = useState(false);

  const [openSuspend, setOpenSuspend] = useState(false);

  const [openActive, setOpenActive] = useState(false);

  const [openArchive, setOpenArchive] = useState(false);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formField, setFormField] = useState(initialFormState);

  const handleChange = (name: string, value: any) => {
    setFormField({
      ...formField,
      [name || ""]: value,
    });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dataFiltered = applySortFilter({ staffList, search });

  useEffect(() => {
    setPage(0);
  }, [staffList]);

  const handleToggle = (id: any) => {
    setShow((prevIndex) => (prevIndex === id ? null : id));
    setSelectedUserId(id);
  };

  const handleActivate = async () => {
    setLoading(true);

    const payload = { status: "active" };
    try {
      await axiosInstance.put(
        `/hcp/update-tenet-status/${selectedUserId}`,
        payload
      );
      setOpenActive(false);
      triggerRefresh();
      Toast.fire({
        icon: "success",
        title: "This User account is now Activated!",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSuspend = async () => {
    setLoading(true);

    const payload = { status: "suspend" };
    try {
      await axiosInstance.put(
        `/hcp/update-tenet-status/${selectedUserId}`,
        payload
      );
      setOpenSuspend(false);
      triggerRefresh();
      Toast.fire({
        icon: "success",
        title: "This User account is now suspended!",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    setLoading(true);

    const payload = { status: "archive" };
    try {
      await axiosInstance.put(
        `/hcp/update-tenet-status/${selectedUserId}`,
        payload
      );
      setOpenArchive(false);
      triggerRefresh();
      Toast.fire({
        icon: "success",
        title: "This User account is now archived!",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const disableField = user.role === "staff" || user.role === "admin";

  const getUser = async () => {
    try {
      const res = await axiosInstance.get(
        `/hcp/tenet-profile/${selectedUserId}`
      );
      setFormField(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleView = () => {
    getUser();

    setOpenView(true);
    setShow(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(`/hcp/tenet-update/${selectedUserId}`, formField);

      setLoading(false);
      setOpenView(false);
      Swal.fire({
        icon: "success",
        title: `Success`,
        text: `You’ve updated your record`,
        confirmButtonColor: "#099250",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `error`,
        text: `Please try again`,
        confirmButtonColor: "#099250",
      });
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Box>
        <div style={{ position: "relative", display: "flex" }}>
          <InputField
            label=""
            type="text"
            name="search"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder="Search by staff name or email address"
          />
          <Button
            sx={{
              position: "absolute",
              right: "0rem",
              top: "13px",
              p: 2,
            }}
          >
            <svg
              width="24"
              height="23"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Search 1">
                <path
                  id="Vector"
                  d="M19.0304 17.4698C18.7375 17.1769 18.2626 17.1769 17.9697 17.4698C17.6768 17.7626 17.6768 18.2375 17.9697 18.5304L19.0304 17.4698ZM21.9696 22.5304C22.2625 22.8233 22.7374 22.8233 23.0303 22.5304C23.3232 22.2375 23.3232 21.7626 23.0303 21.4697L21.9696 22.5304ZM8.83512 4.80232C9.24423 4.73752 9.52336 4.35334 9.45856 3.94423C9.39376 3.53511 9.00958 3.25599 8.60047 3.32079L8.83512 4.80232ZM3.82076 8.1005C3.75596 8.50961 4.03508 8.89379 4.4442 8.95859C4.85331 9.02339 5.23749 8.74426 5.30229 8.33515L3.82076 8.1005ZM17.9697 18.5304L21.9696 22.5304L23.0303 21.4697L19.0304 17.4698L17.9697 18.5304ZM10.5 18.25C5.94365 18.25 2.25 14.5563 2.25 10H0.75C0.75 15.3848 5.11522 19.75 10.5 19.75V18.25ZM18.75 10C18.75 14.5563 15.0563 18.25 10.5 18.25V19.75C15.8848 19.75 20.25 15.3848 20.25 10H18.75ZM10.5 1.75C15.0563 1.75 18.75 5.44365 18.75 10H20.25C20.25 4.61522 15.8848 0.25 10.5 0.25V1.75ZM10.5 0.25C5.11522 0.25 0.75 4.61522 0.75 10H2.25C2.25 5.44365 5.94365 1.75 10.5 1.75V0.25ZM8.60047 3.32079C6.14008 3.71047 4.21044 5.64012 3.82076 8.1005L5.30229 8.33515C5.59032 6.51661 7.01658 5.09035 8.83512 4.80232L8.60047 3.32079Z"
                  fill="#667185"
                />
              </g>
            </svg>
          </Button>
        </div>
      </Box>

      <Box marginTop={2}>
        <TableContainer
          sx={{ borderRadius: 2.5, background: "#FFF", position: "relative" }}
        >
          <Table size="medium">
            <TableHead sx={{ background: "#FCFCFD", fontSize: 12 }}>
              <TableRow>
                {TABLE_HEAD.map((item) => (
                  <TableCell sx={{ color: "#344054" }} key={item.id}>
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody sx={{ fontWeight: 500, fontSize: 14, color: "#101828" }}>
              {isLoading ? (
                <TableLoader />
              ) : (
                <>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item: any) => (
                      <TableRow
                        hover
                        key={item.id}
                        sx={{
                          "&:nth-of-type(odd)": {
                            background: "white",
                          },
                          "&:nth-of-type(even)": {
                            background: "#FCFCFD",
                          },
                          position: "relative",
                        }}
                      >
                        <TableCell>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 8,
                              alignItems: "center",
                            }}
                          >
                            <Avatar sx={{ mr: 1 }} />
                            <Typography
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                textTransform: "capitalize",
                              }}
                              variant="subtitle2"
                              noWrap
                            >
                              {item.title} {item.firstName} {item.lastName}
                              <span>HRT-132422</span>
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span>{item.email}</span>
                        </TableCell>
                        <TableCell>
                          <span>+234 7088 726 290</span>
                        </TableCell>
                        <TableCell>
                          <span style={{ textTransform: "capitalize" }}>
                            {item.position || "IT Support"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Chip
                            sx={{
                              background:
                                item.status === "active"
                                  ? "#36A1500A"
                                  : item.status === "suspend"
                                  ? "#FEF6E7"
                                  : "#FBEAE9",
                              textTransform: "capitalize",
                              fontWeight: "fontBold",
                              color:
                                item.status === "active"
                                  ? "#36A150"
                                  : item.status === "suspend"
                                  ? "#DD900D"
                                  : "#D42620",
                            }}
                            label={item.status}
                          />
                        </TableCell>
                        <TableCell>
                          <span>
                            {moment(item.date_created).format("DD/MM/YYYY")}
                          </span>
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            sx={{
                              borderRadius: "50%",
                              height: "36px",
                              minWidth: "36px",
                            }}
                            onClick={() => handleToggle(`${item.id}`)}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Teeny icon / more-vertical">
                                <g id="Vector">
                                  <path
                                    d="M9.99969 4.00029C9.63149 4.00029 9.33301 3.7018 9.33301 3.33361C9.33301 2.96541 9.63149 2.66693 9.99969 2.66693C10.3679 2.66693 10.6664 2.96541 10.6664 3.33361C10.6664 3.7018 10.3679 4.00029 9.99969 4.00029Z"
                                    stroke="#545C68"
                                    stroke-width="1.33336"
                                  />
                                  <path
                                    d="M9.99969 10.6671C9.63149 10.6671 9.33301 10.3686 9.33301 10.0004C9.33301 9.63221 9.63149 9.33373 9.99969 9.33373C10.3679 9.33373 10.6664 9.63221 10.6664 10.0004C10.6664 10.3686 10.3679 10.6671 9.99969 10.6671Z"
                                    stroke="#545C68"
                                    stroke-width="1.33336"
                                  />
                                  <path
                                    d="M9.99969 17.3339C9.63149 17.3339 9.33301 17.0354 9.33301 16.6672C9.33301 16.299 9.63149 16.0005 9.99969 16.0005C10.3679 16.0005 10.6664 16.299 10.6664 16.6672C10.6664 17.0354 10.3679 17.3339 9.99969 17.3339Z"
                                    stroke="#545C68"
                                    stroke-width="1.33336"
                                  />
                                </g>
                              </g>
                            </svg>
                          </Button>

                          {show === item.id && (
                            <Box
                              sx={{
                                position: "absolute",
                                zIndex: 1,
                                background: "white",
                                border: "1px #F2F4F7 solid",
                                borderRadius: 2,
                                marginTop: "-34px",
                                right: "50px",
                                width: "160px",
                                p: 1,
                              }}
                            >
                              <MenuItem
                                sx={{ padding: "6px 8px" }}
                                onClick={handleView}
                              >
                                View
                              </MenuItem>
                              {item.status === "suspend" ||
                              item.status === "archive" ? (
                                <MenuItem
                                  sx={{ padding: "6px 8px" }}
                                  onClick={() => {
                                    setOpenActive(true);
                                    setShow(false);
                                  }}
                                >
                                  Activate
                                </MenuItem>
                              ) : (
                                <>
                                  {user.role === "superadmin" && (
                                    <MenuItem
                                      sx={{ padding: "6px 8px" }}
                                      onClick={() => {
                                        setOpenSuspend(true);
                                        setShow(false);
                                      }}
                                    >
                                      Suspend
                                    </MenuItem>
                                  )}

                                  {user.role === "superadmin" && (
                                    <MenuItem
                                      sx={{ padding: "6px 8px" }}
                                      onClick={() => {
                                        setOpenArchive(true);
                                        setShow(false);
                                      }}
                                    >
                                      Archive
                                    </MenuItem>
                                  )}
                                </>
                              )}
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 25, 75]}
            count={dataFiltered.length}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      <>
        {/* VIEW AND UPDATE STAFF DETAILS */}
        <Dialog
          maxWidth="xs"
          fullWidth
          open={openView}
          aria-labelledby="alert-view-user"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            {user.role === "superadmin" ? "Edit HCP" : "View HCP"}
            {user.role === "superadmin" && (
              <p style={{ fontSize: "16px", fontWeight: 400 }}>
                Update HCP details
              </p>
            )}
          </DialogTitle>
          <Button
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              padding: "16px 8px",
            }}
            onClick={() => {
              setOpenView(false);
              setFormField(initialFormState);
            }}
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

          <Box flexDirection={"column"} sx={{ p: 3 }}>
            <form>
              <label htmlFor="title">
                Title
                <TextField
                  select
                  sx={{
                    marginTop: "5px",
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "black",
                    },
                  }}
                  fullWidth
                  name="title"
                  value={formField.title}
                  disabled={disableField}
                  onChange={(e) => handleChange("title", e.target.value)}
                >
                  {title.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </label>
              <InputField
                type="text"
                label="First Name"
                name="firstName"
                value={formField.firstName}
                disabled={disableField}
                onChange={(e: any) => handleChange("firstName", e.target.value)}
              />
              <InputField
                type="text"
                label="Last Name"
                name="lastName"
                value={formField.lastName}
                disabled={disableField}
                onChange={(e: any) => handleChange("lastName", e.target.value)}
              />
              <InputField
                type="text"
                label="Email Address"
                name="email"
                value={formField.email}
                disabled
                onChange={(e: any) => handleChange("email", e.target.value)}
              />

              <InputField
                type="text"
                label="Position"
                name="Position"
                value={formField.position || "IT Support"}
                disabled={disableField}
                onChange={(e: any) => handleChange("position", e.target.value)}
              />

              <label htmlFor="role" style={{ marginTop: "8px" }}>
                <span>Role</span>
                <TextField
                  select
                  fullWidth
                  sx={{
                    mt: "5px",
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "black",
                    },
                  }}
                  name="role"
                  value={formField.role}
                  disabled={disableField}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  {user.role === "superadmin" && (
                    <MenuItem value="superadmin">Tenant Admin</MenuItem>
                  )}
                  <MenuItem value="admin">HCP</MenuItem>
                  <MenuItem value="staff">Coordinator</MenuItem>
                </TextField>
              </label>

              {user.role === "superadmin" && (
                <Stack sx={{ mt: 3 }}>
                  <Buttons
                    title="Update Profile"
                    loading={loading}
                    onClick={handleSubmit}
                  />
                </Stack>
              )}
            </form>
          </Box>
        </Dialog>

        {/* OPEN SUSPEND STAFF */}
        <Dialog
          maxWidth="xs"
          fullWidth
          open={openSuspend}
          aria-labelledby="alert-suspend-user"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ marginBottom: 2 }}>
            <Button
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                padding: "16px 8px",
              }}
              onClick={() => setOpenSuspend(false)}
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
          </DialogTitle>

          <div style={{ display: "grid", placeContent: "center" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="24" fill="#FEF6E7" />
              <path
                d="M24.0001 22.5C24.1658 22.5 24.3001 22.6343 24.3001 22.8V30C24.3001 30.1657 24.1658 30.3 24.0001 30.3C23.8344 30.3 23.7001 30.1657 23.7001 30V22.8C23.7001 22.6343 23.8344 22.5 24.0001 22.5ZM11.7001 24C11.7001 17.2069 17.207 11.7 24.0001 11.7C30.7932 11.7 36.3001 17.2069 36.3001 24C36.3001 30.7931 30.7932 36.3 24.0001 36.3C17.207 36.3 11.7001 30.7931 11.7001 24ZM24.0001 12.3C17.5384 12.3 12.3001 17.5383 12.3001 24C12.3001 30.4617 17.5384 35.7 24.0001 35.7C30.4618 35.7 35.7001 30.4617 35.7001 24C35.7001 17.5383 30.4618 12.3 24.0001 12.3ZM24.6001 19.2C24.6001 19.5314 24.3315 19.8 24.0001 19.8C23.6687 19.8 23.4001 19.5314 23.4001 19.2C23.4001 18.8686 23.6687 18.6 24.0001 18.6C24.3315 18.6 24.6001 18.8686 24.6001 19.2Z"
                fill="#2D264B"
                stroke="#DD900D"
                stroke-width="1.2"
              />
            </svg>
          </div>

          <Typography variant="h5" align="center" sx={{ p: 2, mb: 0 }}>
            Suspend HCP
          </Typography>
          <span style={{ padding: 8, textAlign: "center" }}>
            Please be aware that{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {selectedUserId &&
                dataFiltered.find((user: any) => user.id === selectedUserId)
                  ?.firstName}
            </strong>{" "}
            will lose access to Pillar and all associated data will be
            temporarily unavailable. Are you sure you want to continue?
          </span>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            gap={5}
            p={2}
          >
            <Button
              sx={{
                textTransform: "none",
                background: "#EDFCF2",
                py: 1.5,
                px: 2,
                alignItems: "center",
                color: "#099250",
                "&:hover": { backgroundColor: "#EDFCF2" },
                width: "50%",
                borderRadius: "6px",
              }}
              onClick={() => setOpenSuspend(false)}
            >
              Cancel
            </Button>
            <div style={{ width: "50%" }}>
              <Buttons title="Suspend HCP" onClick={handleSuspend} />
            </div>
          </Stack>
        </Dialog>

        {/* OPEN ACTIVATE STAFF */}
        <Dialog
          maxWidth="xs"
          fullWidth
          open={openActive}
          aria-labelledby="alert-suspend-user"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ marginBottom: 2 }}>
            <Button
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                padding: "16px 8px",
              }}
              onClick={() => setOpenActive(false)}
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
          </DialogTitle>

          <div style={{ display: "grid", placeContent: "center" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="24" fill="#FEF6E7" />
              <path
                d="M24.0001 22.5C24.1658 22.5 24.3001 22.6343 24.3001 22.8V30C24.3001 30.1657 24.1658 30.3 24.0001 30.3C23.8344 30.3 23.7001 30.1657 23.7001 30V22.8C23.7001 22.6343 23.8344 22.5 24.0001 22.5ZM11.7001 24C11.7001 17.2069 17.207 11.7 24.0001 11.7C30.7932 11.7 36.3001 17.2069 36.3001 24C36.3001 30.7931 30.7932 36.3 24.0001 36.3C17.207 36.3 11.7001 30.7931 11.7001 24ZM24.0001 12.3C17.5384 12.3 12.3001 17.5383 12.3001 24C12.3001 30.4617 17.5384 35.7 24.0001 35.7C30.4618 35.7 35.7001 30.4617 35.7001 24C35.7001 17.5383 30.4618 12.3 24.0001 12.3ZM24.6001 19.2C24.6001 19.5314 24.3315 19.8 24.0001 19.8C23.6687 19.8 23.4001 19.5314 23.4001 19.2C23.4001 18.8686 23.6687 18.6 24.0001 18.6C24.3315 18.6 24.6001 18.8686 24.6001 19.2Z"
                fill="#2D264B"
                stroke="#DD900D"
                stroke-width="1.2"
              />
            </svg>
          </div>

          <Typography variant="h5" align="center" sx={{ p: 2, mb: 0 }}>
            Activate HCP
          </Typography>
          <span style={{ padding: 8, textAlign: "center" }}>
            Please be aware that{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {selectedUserId &&
                dataFiltered.find((user: any) => user.id === selectedUserId)
                  ?.firstName}
            </strong>{" "}
            will now have access to Pillar and all associated data will be
            available. <br /> Are you sure you want to continue?
          </span>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            gap={5}
            p={2}
          >
            <Button
              sx={{
                textTransform: "none",
                background: "#EDFCF2",
                py: 1.5,
                px: 2,
                alignItems: "center",
                color: "#099250",
                "&:hover": { backgroundColor: "#EDFCF2" },
                width: "50%",
                borderRadius: "6px",
              }}
              onClick={() => setOpenActive(false)}
            >
              Cancel
            </Button>
            <div style={{ width: "50%" }}>
              <Buttons title="Submit" onClick={handleActivate} />
            </div>
          </Stack>
        </Dialog>

        {/* OPEN ARCHIVE STAFF */}
        <Dialog
          maxWidth="xs"
          fullWidth
          open={openArchive}
          aria-labelledby="alert-suspend-user"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ marginBottom: 2 }}>
            <Button
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                padding: "16px 8px",
              }}
              onClick={() => setOpenArchive(false)}
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
          </DialogTitle>

          <div style={{ display: "grid", placeContent: "center" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="24" fill="#FEF6E7" />
              <path
                d="M24.0001 22.5C24.1658 22.5 24.3001 22.6343 24.3001 22.8V30C24.3001 30.1657 24.1658 30.3 24.0001 30.3C23.8344 30.3 23.7001 30.1657 23.7001 30V22.8C23.7001 22.6343 23.8344 22.5 24.0001 22.5ZM11.7001 24C11.7001 17.2069 17.207 11.7 24.0001 11.7C30.7932 11.7 36.3001 17.2069 36.3001 24C36.3001 30.7931 30.7932 36.3 24.0001 36.3C17.207 36.3 11.7001 30.7931 11.7001 24ZM24.0001 12.3C17.5384 12.3 12.3001 17.5383 12.3001 24C12.3001 30.4617 17.5384 35.7 24.0001 35.7C30.4618 35.7 35.7001 30.4617 35.7001 24C35.7001 17.5383 30.4618 12.3 24.0001 12.3ZM24.6001 19.2C24.6001 19.5314 24.3315 19.8 24.0001 19.8C23.6687 19.8 23.4001 19.5314 23.4001 19.2C23.4001 18.8686 23.6687 18.6 24.0001 18.6C24.3315 18.6 24.6001 18.8686 24.6001 19.2Z"
                fill="#2D264B"
                stroke="#DD900D"
                stroke-width="1.2"
              />
            </svg>
          </div>

          <Typography variant="h5" align="center" sx={{ p: 2, mb: 0 }}>
            Archive HCP
          </Typography>
          <span style={{ padding: 8, textAlign: "center" }}>
            Please be aware that access to{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {selectedUserId &&
                dataFiltered.find((user: any) => user.id === selectedUserId)
                  ?.firstName}
            </strong>{" "}
            will be restricted and all associated data will be temporarily
            unavailable. Are you sure you want to continue?
          </span>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            gap={5}
            p={2}
          >
            <Button
              sx={{
                textTransform: "none",
                background: "#EDFCF2",
                py: 1.5,
                px: 2,
                alignItems: "center",
                color: "#099250",
                "&:hover": { backgroundColor: "#EDFCF2" },
                width: "50%",
                borderRadius: "6px",
              }}
              onClick={() => setOpenArchive(false)}
            >
              Cancel
            </Button>
            <div style={{ width: "50%" }}>
              <Buttons title="Archive HCP" onClick={handleArchive} />
            </div>
          </Stack>
        </Dialog>
      </>
    </Box>
  );
}

function applySortFilter({ staffList, search }: any) {
  if (search) {
    staffList = staffList.filter(
      (item: any) =>
        item.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        item.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }
  return staffList;
}
