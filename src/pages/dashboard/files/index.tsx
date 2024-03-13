import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  // LinearProgress,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import NoResultIllustration, {
  TableLoader,
} from "../../../components/NoResult";
import Buttons from "../../../components/Button";
// import { Link } from "react-router-dom";
import { axiosInstance } from "../../../Utils";
import moment from "moment";

const TABLE_HEAD = [
  { id: "c" },
  { id: "name", label: "Full Name", align: "left" },
  { id: "type", label: "File Type", align: "left" },
  { id: "added by", label: "Added By", align: "left" },
  { id: "date", label: "Date Added", align: "left" },
  { id: "o" },
  { id: "" },
];

export default function File() {
  const [search, setSearch] = useState("");

  const [showUpload, setShowUpload] = useState(false);

  const [showRename, setShowRename] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [showOptions, setShowOptions] = useState(false);

  const [data, setData] = useState<any[]>([]);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const [renameValue, setRenameValue] = useState("");

  // const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [isGrid, setIsGrid] = useState(true);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Utility function to format file size
  const formatFileSize = (sizeInBytes: any) => {
    if (sizeInBytes < 1024) {
      return sizeInBytes.toFixed(2) + " B";
    } else if (sizeInBytes < 1024 * 1024) {
      return (sizeInBytes / 1024).toFixed(2) + " KB";
    } else {
      return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files && event.dataTransfer.files[0];

    // Check if the file size exceeds 2MB
    if (file && file.size > 2 * 1024 * 1024) {
      setErrorMessage("File size exceeds 2MB. Please choose a smaller file.");
      setSelectedFile(null); // Clear selected file
    } else {
      setErrorMessage("");
      setSelectedFile(file as File);
    }
  };

  const handleChange = (e: any) => {
    const file = e.target.files && e.target.files[0];

    // Check if the file size exceeds 2MB
    if (file && file.size > 2 * 1024 * 1024) {
      setErrorMessage("File size exceeds 2MB. Please choose a smaller file.");
      setSelectedFile(null); // Clear selected file
    } else {
      setErrorMessage("");
      setSelectedFile(file);
    }
  };

  const getFiles = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/hcp/tenet/files/metadata");

      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const file = selectedFile;

      if (file) {
        const newFile = new FormData();

        newFile.append("file", file);

        await axiosInstance.post(`/hcp/tenet/files/upload`, newFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsLoading(false);

        setSelectedFile(e.target.value);
      }

      setShowUpload(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // const createDownloadLink = (link: string) => {
  //   if (link) {
  //     const first = link.split("upload");
  //     return `${first[0]}${"upload/fl_attachment"}${first[1]}`;
  //   }
  //   return "";
  // };
  const handleCLick = (id: any) => {
    setSelectedUserId(id === selectedUserId ? null : id);
    setShowOptions((prevIndex) => (prevIndex === id ? null : id));
    setSelectedUserId(id);
  };

  const handleRenameFile = async () => {
    setIsLoading(true);

    try {
      const res = await axiosInstance.delete(
        `/hcp/tenet/files/update/metadata/${selectedUserId}`
      );
      console.log(res.data);
      setIsLoading(false);
      setShowRename(false);

      getFiles();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = async () => {
    setIsLoading(true);

    try {
      await axiosInstance.delete(
        `/hcp/tenet/files//delete/metadata/${selectedUserId}`
      );

      setIsLoading(false);
      setShowDelete(false);

      getFiles();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ background: "white" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: "1px #E7E9FB solid",
          px: "20px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={600}
          fontSize={28}
          sx={{
            color: "#000",
            // textTransform: "capitalize",
            pt: "20px",
          }}
        >
          View all files here
        </Typography>
      </Box>

      <Box
        sx={{
          p: "20px",
          background: "#F9F9FB",
        }}
      >
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={3}
        >
          <div style={{ position: "relative", display: "flex" }}>
            <InputField
              label=""
              type="text"
              name="search"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              placeholder="Search activity"
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

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            spacing={3}
          >
            <label
              htmlFor=""
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#232426",
                fontWeight: 500,
                fontSize: 18,
                fontFamily: "fontBold",
              }}
            >
              View
              <Select
                defaultValue={"Recent"}
                sx={{
                  minWidth: 110,
                  color: "#2A2D32",
                  fontWeight: 500,
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                    { px: 2, py: 1 },
                }}
              >
                <MenuItem value="Recent">Recent</MenuItem>
                <MenuItem value="Older">Older</MenuItem>
                <MenuItem value="From z-A">From z-A</MenuItem>
                <MenuItem value="From A-Z">From A-Z</MenuItem>
              </Select>
            </label>

            <label
              htmlFor=""
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#232426",
                fontWeight: 500,
                fontSize: 18,
                fontFamily: "fontBold",
              }}
            >
              View as
              <Select
                defaultValue={"List"}
                sx={{
                  minWidth: 120,
                  color: "#2A2D32",
                  fontWeight: 500,
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                    { px: 2, py: 1 },
                }}
              >
                <MenuItem value="List" onClick={() => setIsGrid(true)}>
                  List
                </MenuItem>
                <MenuItem value="Grid" onClick={() => setIsGrid(false)}>
                  Grid
                </MenuItem>
              </Select>
            </label>

            <Button
              component="label"
              variant="contained"
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
              sx={{
                background: "#099250",
                "&:hover": { backgroundColor: "#099250" },
                px: 2,
                py: 1,
              }}
              onClick={() => setShowUpload(true)}
            >
              Add File
            </Button>
          </Stack>
        </Stack>
        {isGrid && <></>}

        <Box marginTop={2}>
          <TableContainer
            sx={{ borderRadius: 2.5, background: "#FFF", position: "relative" }}
          >
            <Table size="medium">
              <TableHead sx={{ background: "#FCFCFD", fontSize: 12 }}>
                <TableRow
                  hover
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
                  {TABLE_HEAD.map((item) => (
                    <TableCell sx={{ color: "#344054" }} key={item.id}>
                      {item.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody
                sx={{ fontWeight: 500, fontSize: 14, color: "#101828" }}
              >
                {isLoading ? (
                  <TableLoader />
                ) : (
                  <>
                    {data?.length > 0 ? (
                      data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row: any) => {
                          const isSelected = row.id === selectedUserId;
                          return (
                            <TableRow
                              hover
                              onClick={() => handleCLick(`${row.id}`)}
                              role="checkbox"
                              key={row.id}
                              selected={isSelected}
                              sx={{
                                position: "relative",
                                cursor: "pointer",
                                "&:nth-of-type(odd)": {
                                  background: "white",
                                },
                                "&:nth-of-type(even)": {
                                  background: "#FCFCFD",
                                },
                                "&.MuiTableRow-hover": {
                                  "&:hover": {
                                    backgroundColor: "#EDFCF2",
                                    borderBottom: "1px #73E2A3 solid",
                                    borderTop: "1px #73E2A3 solid",
                                    borderTopWidth: 2,
                                    borderBottomWidth: 2,
                                  },
                                },
                              }}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  sx={{
                                    "&.Mui-checked": {
                                      color: "#EDFCF2",
                                      stroke: "#099250",
                                      strokeWidth: 1,
                                      fill: "#099250",
                                    },
                                  }}
                                  checked={isSelected}
                                />
                              </TableCell>
                              <TableCell>
                                {row.fileName.split(".")[0]}
                              </TableCell>
                              <TableCell width={140}>.{row.format}</TableCell>
                              <TableCell sx={{ textTransform: "capitalize" }}>
                                {row.firstName} {row.lastName}
                              </TableCell>
                              <TableCell width={140}>
                                {moment(row.created_at).format("DD/MM/YYYY")}
                              </TableCell>

                              <TableCell align="center" width={160}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  {/* <Link
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  minWidth: "64px",
                                  justifyContent: "center",
                                  verticalAlign: "middle",
                                }}
                                to={createDownloadLink(item.secure_url
                                  )}
                              >
                                <svg
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="download">
                                    <path
                                      id="Icon"
                                      d="M18 13V16.3333C18 16.7754 17.8244 17.1993 17.5118 17.5118C17.1993 17.8244 16.7754 18 16.3333 18H4.66667C4.22464 18 3.80072 17.8244 3.48816 17.5118C3.17559 17.1993 3 16.7754 3 16.3333V13M6.33333 8.83333L10.5 13M10.5 13L14.6667 8.83333M10.5 13V3"
                                      stroke="#667185"
                                      stroke-width="1.66667"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </g>
                                </svg>
                              </Link> */}

                                  {showOptions === row.id && (
                                    <>
                                      <svg
                                        onClick={() => {
                                          setShowRename(true);
                                          // console.log(selectedUserId);
                                          // setSelectedUserId(selectedUserId);
                                        }}
                                        width="21"
                                        height="21"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g id="Edit 2">
                                          <g id="Vector">
                                            <path
                                              fill-rule="evenodd"
                                              clip-rule="evenodd"
                                              d="M13.359 1.67532L13.4641 1.73599C14.3719 2.26007 15.1289 2.69709 15.6832 3.12485C16.2682 3.57634 16.7326 4.09457 16.9271 4.82045C17.1216 5.54633 16.9785 6.22731 16.6976 6.91084C16.4315 7.55843 15.9944 8.3154 15.4702 9.22317L10.9488 17.0547C10.6024 17.6558 10.3284 18.1312 9.91153 18.4894C9.49461 18.8476 8.98344 19.0469 8.33696 19.2988L8.16226 19.367C6.96267 19.8357 5.97385 20.2221 5.16412 20.4113C4.31725 20.6091 3.49958 20.6337 2.73743 20.1937C1.97527 19.7537 1.58776 19.0333 1.33568 18.2009C1.09465 17.4051 0.934834 16.3556 0.740952 15.0823L0.712651 14.8969C0.607617 14.2111 0.524565 13.6688 0.626339 13.1286C0.639061 13.0611 0.654485 12.9946 0.672415 12.9287C0.797926 12.4678 1.04624 12.0385 1.35024 11.5129L5.87179 3.68151C6.39587 2.7737 6.83289 2.01671 7.26064 1.46241C7.71213 0.877344 8.23036 0.412978 8.95624 0.218479C9.68212 0.0239797 10.3631 0.167019 11.0466 0.447952C11.6942 0.714113 12.4512 1.15118 13.359 1.67532ZM6.9195 5.36682L13.4869 9.15849L9.49285 16.0763C9.05773 16.83 8.93332 17.0227 8.77105 17.1621C8.60878 17.3015 8.39954 17.3955 7.58897 17.7122C6.30976 18.212 5.43853 18.55 4.76598 18.7072C4.11629 18.859 3.82149 18.7989 3.61242 18.6782C3.40336 18.5575 3.20394 18.3322 3.01055 17.6937C2.81035 17.0326 2.66751 16.1091 2.46073 14.7514C2.3297 13.8911 2.30647 13.6629 2.34608 13.4526C2.38569 13.2424 2.49037 13.0383 2.92549 12.2847L6.9195 5.36682ZM15.079 6.24559C14.9244 6.62177 14.6879 7.06408 14.36 7.64189L7.79633 3.85234C8.13278 3.27946 8.39761 2.85353 8.64608 2.53155C8.97795 2.1015 9.20149 1.9645 9.40918 1.90885C9.61686 1.8532 9.87895 1.86007 10.3814 2.06657C10.9073 2.28273 11.5625 2.65886 12.5365 3.2212C13.5105 3.78354 14.1639 4.1629 14.614 4.51028C15.0441 4.84215 15.1811 5.06569 15.2367 5.27338C15.2924 5.48106 15.2855 5.74316 15.079 6.24559Z"
                                              fill="#667185"
                                            />
                                            <path
                                              d="M11.7688 19.7917C11.7688 19.3084 12.1606 18.9167 12.6438 18.9167H19.6438C20.127 18.9167 20.5188 19.3084 20.5188 19.7917C20.5188 20.2749 20.127 20.6667 19.6438 20.6667H12.6438C12.1606 20.6667 11.7688 20.2749 11.7688 19.7917Z"
                                              fill="#667185"
                                            />
                                          </g>
                                        </g>
                                      </svg>

                                      <svg
                                        width="32"
                                        height="33"
                                        viewBox="0 0 32 33"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M16.0007 23.0893L20.4113 18.68L19.4673 17.736L16.6673 20.536V14.2693H15.334V20.536L12.534 17.736L11.59 18.68L16.0007 23.0893ZM6.66732 10.5773V24.68C6.66732 24.9191 6.74421 25.1156 6.89798 25.2693C7.05176 25.4231 7.24821 25.5 7.48732 25.5H24.514C24.7531 25.5 24.9495 25.4231 25.1033 25.2693C25.2571 25.1156 25.334 24.9191 25.334 24.68V10.5773H6.66732ZM7.69398 26.8333C7.09665 26.8333 6.55398 26.5893 6.06598 26.1013C5.57798 25.6124 5.33398 25.0702 5.33398 24.4747V10.1493C5.33398 9.88889 5.37532 9.64444 5.45798 9.416C5.54154 9.18667 5.66598 8.97556 5.83132 8.78267L7.90865 6.28667C8.10154 6.02711 8.34287 5.83111 8.63265 5.69867C8.92243 5.56622 9.23354 5.5 9.56598 5.5H22.3846C22.7171 5.5 23.0326 5.56622 23.3313 5.69867C23.6291 5.832 23.8744 6.028 24.0673 6.28667L26.17 8.83333C26.3353 9.02622 26.4598 9.24178 26.5433 9.48C26.626 9.71733 26.6673 9.96622 26.6673 10.2267V24.4733C26.6673 25.0689 26.4233 25.6111 25.9353 26.1C25.4464 26.588 24.9042 26.832 24.3087 26.832L7.69398 26.8333ZM7.17398 9.244H24.8006L23.0273 7.116C22.9411 7.02978 22.8424 6.96133 22.7313 6.91067C22.6202 6.85911 22.5047 6.83333 22.3846 6.83333H9.58998C9.47087 6.83333 9.35532 6.85911 9.24332 6.91067C9.1331 6.96133 9.03532 7.02978 8.94998 7.116L7.17398 9.244Z"
                                          fill="#667185"
                                        />
                                      </svg>

                                      <svg
                                        onClick={() => setShowDelete(true)}
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M12 1.41602C9.37665 1.41602 7.25 3.54266 7.25 6.16602V6.41602H4C3.58579 6.41602 3.25 6.7518 3.25 7.16602C3.25 7.58023 3.58579 7.91602 4 7.91602H20C20.4142 7.91602 20.75 7.58023 20.75 7.16602C20.75 6.7518 20.4142 6.41602 20 6.41602H16.75V6.16602C16.75 3.54266 14.6234 1.41602 12 1.41602ZM12 2.91602C13.7949 2.91602 15.25 4.37109 15.25 6.16602V6.41602H8.75V6.16602C8.75 4.37109 10.2051 2.91602 12 2.91602Z"
                                          fill="#667185"
                                        />
                                        <path
                                          d="M5.74664 9.09508C5.70746 8.68272 5.34142 8.3802 4.92906 8.41938C4.5167 8.45856 4.21418 8.8246 4.25336 9.23696C4.34783 10.2312 4.51833 11.4563 4.73748 13.0311L5.01903 15.0542C5.28819 16.9889 5.44085 18.0861 5.77109 18.985C6.3857 20.6578 7.48205 21.9988 8.89206 22.5938C9.65773 22.9169 10.5335 22.9166 11.8373 22.9161H12.1627C13.4665 22.9166 14.3423 22.9169 15.1079 22.5938C16.5179 21.9988 17.6143 20.6578 18.2289 18.985C18.5592 18.0861 18.7118 16.9889 18.981 15.0541L19.2625 13.0311C19.4817 11.4563 19.6522 10.2312 19.7466 9.23696C19.7858 8.8246 19.4833 8.45856 19.0709 8.41938C18.6586 8.3802 18.2925 8.68272 18.2534 9.09507C18.1623 10.053 17.9965 11.246 17.7744 12.8421L17.512 14.7272C17.2215 16.8148 17.0884 17.7396 16.8209 18.4677C16.305 19.8718 15.4472 20.8226 14.5248 21.2119C14.0746 21.4018 13.5292 21.416 12 21.416C10.4708 21.416 9.92544 21.4018 9.47524 21.2119C8.55279 20.8226 7.69496 19.8718 7.17907 18.4677C6.91156 17.7396 6.77851 16.8148 6.48798 14.7272L6.22564 12.8421C6.00352 11.246 5.83766 10.053 5.74664 9.09508Z"
                                          fill="#667185"
                                        />
                                        <path
                                          d="M10.75 10.166C10.75 9.7518 10.4142 9.41602 10 9.41602C9.58579 9.41602 9.25 9.7518 9.25 10.166V18.166C9.25 18.5802 9.58579 18.916 10 18.916C10.4142 18.916 10.75 18.5802 10.75 18.166V10.166Z"
                                          fill="#667185"
                                        />
                                        <path
                                          d="M14.75 10.166C14.75 9.7518 14.4142 9.41602 14 9.41602C13.5858 9.41602 13.25 9.7518 13.25 10.166V18.166C13.25 18.5802 13.5858 18.916 14 18.916C14.4142 18.916 14.75 18.5802 14.75 18.166V10.166Z"
                                          fill="#667185"
                                        />
                                      </svg>
                                    </>
                                  )}
                                </Box>
                              </TableCell>

                              <TableCell align="right" width={100}>
                                <svg
                                  onClick={() => setShowOptions(!showOptions)}
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
                              </TableCell>
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={12}
                          rowSpan={12}
                          style={{ height: "200px" }}
                          sx={{ height: 200 }}
                        >
                          <NoResultIllustration text="No file has been uploaded yet" />
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[10, 25, 75]}
              count={data.length}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </Box>

      <>
        {/* UPLOAD FILE MODAL */}
        <Dialog maxWidth="sm" fullWidth open={showUpload}>
          <Button
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              padding: "16px 8px",
            }}
            onClick={(e: any) => {
              setShowUpload(false);
              setSelectedFile(e.target.value);
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

          <DialogTitle
            sx={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
              marginTop: 5,
            }}
          >
            Upload files
            <span>Documents uploaded will appear in files.</span>
          </DialogTitle>

          <DialogContent>
            {!selectedFile ? (
              <Box
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                sx={{
                  border: "1px #EAECF0 solid",
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <svg
                  style={{ marginBottom: "30px" }}
                  width="28"
                  height="28"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="upload-cloud" clip-path="url(#clip0_2920_16641)">
                    <path
                      id="Icon"
                      d="M13.3326 13.3332L9.99923 9.9999M9.99923 9.9999L6.6659 13.3332M9.99923 9.9999V17.4999M16.9909 15.3249C17.8037 14.8818 18.4458 14.1806 18.8158 13.3321C19.1858 12.4835 19.2627 11.5359 19.0344 10.6388C18.8061 9.7417 18.2855 8.94616 17.5548 8.37778C16.8241 7.80939 15.925 7.50052 14.9992 7.4999H13.9492C13.697 6.52427 13.2269 5.61852 12.5742 4.85073C11.9215 4.08295 11.1033 3.47311 10.181 3.06708C9.2587 2.66104 8.25636 2.46937 7.24933 2.50647C6.2423 2.54358 5.25679 2.80849 4.36688 3.28129C3.47697 3.7541 2.70583 4.42249 2.11142 5.23622C1.51701 6.04996 1.11481 6.98785 0.935051 7.9794C0.755293 8.97095 0.802655 9.99035 1.07358 10.961C1.3445 11.9316 1.83194 12.8281 2.49923 13.5832"
                      stroke="#344054"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2920_16641">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <label htmlFor="fileInput">
                  <Typography
                    sx={{
                      color: "#099250",
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "inline-flex",
                      zIndex: "1000",
                      placeItems: "center",
                      gap: 0.5,
                    }}
                  >
                    Click to upload
                    <span style={{ color: "#667185" }}> or drag and drop</span>
                  </Typography>
                </label>

                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*, .png, .jpg, .jpeg, .pdf, .docx, .pptx, .xlsx "
                  id="fileInput"
                  onChange={handleChange}
                />

                <span style={{ color: "#667185", fontSize: "14px" }}>
                  .JPG, .PNG, .JPEG, .PDF, .DOCX, .PPTX, .XLSX (max. 2MB)
                </span>
              </Box>
            ) : (
              <Box
                sx={{
                  border: "1px #73E2A3 solid",
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                }}
              >
                <Typography variant="subtitle1">{selectedFile.name}</Typography>
                <Typography variant="subtitle1">
                  {formatFileSize(selectedFile.size)}
                </Typography>

                {/* {uploadProgress !== null && (
                  <>
                    <Box width={"80%"} mr={1}>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                        sx={{ color: "#099250" }}
                      />
                    </Box>
                    <Box minWidth={35}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >{`${uploadProgress}%`}</Typography>
                    </Box>{" "}
                  </>
                )} */}
              </Box>
            )}

            {errorMessage && (
              <Typography variant="body2" color="error" mt={2}>
                {errorMessage}
              </Typography>
            )}
          </DialogContent>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            gap={5}
            p={2}
          >
            <Button
              variant="outlined"
              sx={{
                color: "#099250",
                outline: "none",
                textTransform: "none",
                fontWeight: 600,
                background: "#D3F8DF",
                py: 1.5,
                px: 2,
                "&:hover": { backgroundColor: "#D3F8DF" },
                width: "50%",
                borderRadius: "6px",
              }}
              // onClick={deleteImage}
              onClick={(e: any) => {
                setShowUpload(false);
                setSelectedFile(e.target.value);
              }}
            >
              Cancel
            </Button>

            <div style={{ width: "50%" }}>
              <Buttons
                title="Upload Files"
                onClick={handleUpload}
                loading={isLoading}
              />
            </div>
          </Stack>
        </Dialog>

        {/* RENAME FILE MODAL */}
        <Dialog maxWidth="xs" fullWidth open={showRename}>
          <Button
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              padding: "16px 8px",
            }}
            onClick={() => {
              setShowRename(false);
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

          <DialogTitle
            sx={{
              display: "flex",
              textAlign: "Left",
              flexDirection: "column",
              marginTop: 5,
              pb: 0,
            }}
          >
            Rename File
          </DialogTitle>

          <DialogContent>
            <InputField
              label=""
              type="text"
              name="rename"
              value={renameValue}
              onChange={(e: any) => setRenameValue(e.target.value)}
              placeholder="Enter new file name"
            />
            {/* File Name:{" "}
            {selectedUserId &&
              data.find((user: any) => user.id === selectedUserId)?.fileName} */}
          </DialogContent>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            gap={5}
            p={2}
          >
            <Button
              variant="outlined"
              sx={{
                color: "#099250",
                outline: "none",
                textTransform: "none",
                fontWeight: 600,
                background: "#D3F8DF",
                py: 1.5,
                px: 2,
                "&:hover": { backgroundColor: "#D3F8DF" },
                width: "50%",
                borderRadius: "6px",
              }}
              onClick={() => {
                setShowRename(false);
              }}
            >
              Cancel
            </Button>

            <div style={{ width: "50%" }}>
              <Buttons
                title="Save"
                onClick={handleRenameFile}
                loading={isLoading}
              />
            </div>
          </Stack>
        </Dialog>

        {/* DELETE FILE MODAL */}
        <Dialog maxWidth="xs" fullWidth open={showDelete}>
          <DialogTitle sx={{ marginBottom: 2 }}>
            <Button
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                padding: "16px 8px",
              }}
              onClick={() => setShowDelete(false)}
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
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" width="48" height="48" rx="24" fill="#FBEAE9" />
              <path
                d="M32.321 24.9354L33.2124 25.0594L33.2124 25.0594L32.321 24.9354ZM32.0062 27.1974L32.8976 27.3215L32.8976 27.3215L32.0062 27.1974ZM16.9946 27.1974L17.886 27.0734L17.886 27.0734L16.9946 27.1974ZM16.6798 24.9354L15.7883 25.0595L15.7883 25.0595L16.6798 24.9354ZM21.1208 35.6842L20.7709 36.5134L20.7709 36.5134L21.1208 35.6842ZM17.8705 31.8724L18.7153 31.562L18.7153 31.562L17.8705 31.8724ZM31.1303 31.8724L31.9751 32.1828L31.9751 32.1828L31.1303 31.8724ZM27.88 35.6842L27.5301 34.855L27.5301 34.855L27.88 35.6842ZM16.9964 20.3149C16.9493 19.82 16.5101 19.457 16.0153 19.504C15.5204 19.5511 15.1574 19.9903 15.2044 20.4851L16.9964 20.3149ZM33.7964 20.4851C33.8434 19.9903 33.4803 19.5511 32.9855 19.504C32.4907 19.457 32.0514 19.82 32.0044 20.3149L33.7964 20.4851ZM34.1004 18.9C34.5974 18.9 35.0004 18.4971 35.0004 18C35.0004 17.5029 34.5974 17.1 34.1004 17.1V18.9ZM14.9004 17.1C14.4033 17.1 14.0004 17.5029 14.0004 18C14.0004 18.4971 14.4033 18.9 14.9004 18.9V17.1ZM21.2004 31.2C21.2004 31.6971 21.6033 32.1 22.1004 32.1C22.5974 32.1 23.0004 31.6971 23.0004 31.2H21.2004ZM23.0004 21.6C23.0004 21.1029 22.5974 20.7 22.1004 20.7C21.6033 20.7 21.2004 21.1029 21.2004 21.6H23.0004ZM26.0004 31.2C26.0004 31.6971 26.4033 32.1 26.9004 32.1C27.3974 32.1 27.8004 31.6971 27.8004 31.2H26.0004ZM27.8004 21.6C27.8004 21.1029 27.3974 20.7 26.9004 20.7C26.4033 20.7 26.0004 21.1029 26.0004 21.6H27.8004ZM29.3004 18V18.9H30.2004V18H29.3004ZM19.7004 18H18.8004V18.9H19.7004V18ZM31.4296 24.8113L31.1148 27.0734L32.8976 27.3215L33.2124 25.0594L31.4296 24.8113ZM17.886 27.0734L17.5712 24.8113L15.7883 25.0595L16.1031 27.3215L17.886 27.0734ZM24.5004 35.1C22.6654 35.1 22.0109 35.083 21.4707 34.855L20.7709 36.5134C21.7274 36.917 22.8271 36.9 24.5004 36.9V35.1ZM16.1031 27.3215C16.4388 29.7333 16.6213 31.082 17.0257 32.1828L18.7153 31.562C18.3943 30.6883 18.2346 29.5785 17.886 27.0734L16.1031 27.3215ZM21.4707 34.855C20.3637 34.3879 19.3343 33.247 18.7153 31.562L17.0257 32.1828C17.7632 34.1902 19.0789 35.7994 20.7709 36.5134L21.4707 34.855ZM31.1148 27.0734C30.7662 29.5785 30.6065 30.6883 30.2855 31.562L31.9751 32.1828C32.3795 31.082 32.562 29.7333 32.8976 27.3215L31.1148 27.0734ZM24.5004 36.9C26.1737 36.9 27.2734 36.917 28.2299 36.5134L27.5301 34.855C26.9899 35.083 26.3354 35.1 24.5004 35.1V36.9ZM30.2855 31.562C29.6664 33.247 28.637 34.3879 27.5301 34.855L28.2299 36.5134C29.9219 35.7994 31.2375 34.1902 31.9751 32.1828L30.2855 31.562ZM17.5712 24.8113C17.3046 22.896 17.1056 21.4644 16.9964 20.3149L15.2044 20.4851C15.3182 21.6828 15.5239 23.1595 15.7883 25.0595L17.5712 24.8113ZM33.2124 25.0594C33.4769 23.1595 33.6826 21.6828 33.7964 20.4851L32.0044 20.3149C31.8952 21.4644 31.6962 22.896 31.4296 24.8113L33.2124 25.0594ZM34.1004 17.1H14.9004V18.9H34.1004V17.1ZM23.0004 31.2V21.6H21.2004V31.2H23.0004ZM27.8004 31.2V21.6H26.0004V31.2H27.8004ZM28.4004 16.8V18H30.2004V16.8H28.4004ZM29.3004 17.1H19.7004V18.9H29.3004V17.1ZM20.6004 18V16.8H18.8004V18H20.6004ZM24.5004 12.9C26.6543 12.9 28.4004 14.6461 28.4004 16.8H30.2004C30.2004 13.652 27.6484 11.1 24.5004 11.1V12.9ZM24.5004 11.1C21.3524 11.1 18.8004 13.652 18.8004 16.8H20.6004C20.6004 14.6461 22.3465 12.9 24.5004 12.9V11.1Z"
                fill="#CB1A14"
              />
            </svg>
          </div>

          <Typography variant="h5" align="center" sx={{ p: 2, mb: 0 }}>
            Delete File?
          </Typography>
          <span style={{ padding: 8, textAlign: "center" }}>
            This action cannot be reversed. Deleted files will no longer be
            available on Pillar.
          </span>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            gap={5}
            p={2}
          >
            <Button
              variant="outlined"
              sx={{
                color: "#099250",
                outline: "none",
                textTransform: "none",
                fontWeight: 600,
                background: "#D3F8DF",
                py: 1.5,
                px: 2,
                "&:hover": { backgroundColor: "#D3F8DF" },
                width: "50%",
                borderRadius: "6px",
              }}
              onClick={() => {
                setShowDelete(false);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: "#FBEAE9",
                outline: "none",
                textTransform: "none",
                fontWeight: 600,
                background: "#D42620",
                py: 1.5,
                px: 2,
                "&:hover": { background: "#D42620" },
                width: "50%",
                borderRadius: "6px",
                border: "none",
              }}
              onClick={handleDeleteFile}
              disabled={isLoading}
            >
              Delete
            </Button>
          </Stack>
        </Dialog>
      </>
    </Box>
  );
}
