import {
  Box,
  Button,
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
// import NoResultIllustration from "../../../components/NoResult";
import Buttons from "../../../components/Button";
// import { Link } from "react-router-dom";
// import { axiosInstance } from "../../../Utils";

// const viteEnvs = import.meta.env.VITE_CLOUD_NAME;

const TABLE_HEAD = [
  { id: "name", label: "Full Name", align: "left" },
  { id: "type", label: "File Type", align: "left" },
  { id: "added by", label: "Added By", align: "left" },
  { id: "date", label: "Date Added", align: "left" },
  { id: "" },
];

export default function File() {
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // const file = selectedFile;

      // if (file) {
      //   const newFile = new FormData();
      //   newFile.append("file", file);
      //   newFile.append("upload_preset", "pillarz");

      //   const res = await axiosInstance.post(`/hcp/tenet/files/upload`,)



      //   const data = res.data;
      //   setIsLoading(false);

      //   setSelectedFile(e.target.value);
      //   console.log(data);
      // }

      setShow(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // const public_id =
  //   // "https://res.cloudinary.com/pillar-test/image/upload/v1710105202/Introduction_to_Tax_Planning_07Feb2024_qn1979.pdf";

  // const createDownloadLink = (link: string) => {
  //   if (link) {
  //     const first = link.split("upload");
  //     return `${first[0]}${"upload/fl_attachment"}${first[1]}`;
  //   }
  //   return "";
  // };

  // const downloadLink = createDownloadLink(public_id);

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
              onClick={() => setShow(true)}
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
                {/* <TableRow
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
                  <TableCell>Blood Pressure of Youths in Edo State</TableCell>
                  <TableCell>.pdf</TableCell>
                  <TableCell>Olumide Chukwudife</TableCell>
                  <TableCell>3rd Jan, 2023</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          minWidth: "64px",
                          justifyContent: "center",
                          verticalAlign: "middle",
                        }}
                        to={downloadLink}
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
                      </Link>
                      <Button sx={{ p: 0 }}>
                        <svg
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
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow> */}

                {/* <TableRow
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
                  <TableCell>Blood Pressure of Youths in Edo State</TableCell>
                  <TableCell>.pdf</TableCell>
                  <TableCell>Olumide Chukwudife</TableCell>
                  <TableCell>3rd Jan, 2023</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          minWidth: "64px",
                          justifyContent: "center",
                          verticalAlign: "middle",
                        }}
                        to={downloadLink}
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
                      </Link>
                      <Button sx={{ p: 0 }}>
                        <svg
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
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>

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
                  <TableCell>Blood Pressure of Youths in Edo State</TableCell>
                  <TableCell>.pdf</TableCell>
                  <TableCell>Olumide Chukwudife</TableCell>
                  <TableCell>3rd Jan, 2023</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          minWidth: "64px",
                          justifyContent: "center",
                          verticalAlign: "middle",
                        }}
                        to={downloadLink}
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
                      </Link>
                      <Button sx={{ p: 0 }}>
                        <svg
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
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>

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
                  <TableCell>Blood Pressure of Youths in Edo State</TableCell>
                  <TableCell>.pdf</TableCell>
                  <TableCell>Olumide Chukwudife</TableCell>
                  <TableCell>3rd Jan, 2023</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          minWidth: "64px",
                          justifyContent: "center",
                          verticalAlign: "middle",
                        }}
                        to={downloadLink}
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
                      </Link>
                      <Button sx={{ p: 0 }}>
                        <svg
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
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow> */}
                {/* <TableCell
                  colSpan={12}
                  rowSpan={12}
                  style={{ height: "200px" }}
                  sx={{ height: 200 }}
                >
                  {/* <NoResultIllustration text="No files has been uploaded yet" />

                </TableCell> */}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[10, 25, 75]}
              count={length}
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
        <Dialog maxWidth="sm" fullWidth open={show}>
          <Button
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              padding: "16px 8px",
            }}
            onClick={(e: any) => {
              setShow(false);
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
                setShow(false);
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
      </>
    </Box>
  );
}
