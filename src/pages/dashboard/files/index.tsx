import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  // LinearProgress,
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
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../Utils";
import moment from "moment";
import { FileIcon } from "react-file-icon";

const TABLE_HEAD = [
  { id: "c" },
  { id: "name", label: "Full Name", align: "left" },
  { id: "type", label: "File Type", align: "left" },
  { id: "added by", label: "Added By", align: "left" },
  { id: "date", label: "Date Added", align: "left" },
  { id: "o" },
];

// type Order = "asc" | "desc";

export default function File() {
  const [search, setSearch] = useState("");

  const [showUpload, setShowUpload] = useState(false);

  const [showRename, setShowRename] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [showRenameAlert, setShowRenameAlert] = useState(false);

  const [showDownloadAlert, setShowDownloadAlert] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [upLoading, setUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const [showOptions, setShowOptions] = useState(false);

  const [data, setData] = useState<any[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<any[]>([]);

  const [renameValue, setRenameValue] = useState("");

  const [fileId, setFileId] = useState("");

  const [fileExt, setFileExt] = useState("");

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
  }, [data]);

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

  const dataFiltered = applySortFilter({ data, search });

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setUploading(true);
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

        setSelectedFile(e.target.value);
        setUploading(false);
      }
      getFiles();
      setShowUpload(false);
    } catch (error) {
      setUploading(false);
    }
  };

  // const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.checked) {
  //     const newSelected = dataFiltered.map((n: any) => n.id);
  //     setSelectedUserId(newSelected);
  //     return;
  //   }
  //   setSelectedUserId([]);
  // };

  const handleCLick = ({ id, fileName, asset_id, format }: any) => {
    setSelectedUserId(id === selectedUserId ? null : id);
    // setShowOptions((prevIndex) => (prevIndex === id ? null : id));
    setSelectedUserId(id);

    setRenameValue(fileName);
    setFileId(asset_id);
    setFileExt(format);
  };


  const handleRenameFile = async () => {
    setIsLoading(true);

    const payLoad = { fileName: renameValue, status: "active" };

    try {
      await axiosInstance.post(
        `/hcp/tenet/files/update/metadata/${selectedUserId}`,
        payLoad
      );

      setIsLoading(false);
      setShowRename(false);

      getFiles();
      setShowRenameAlert(true);

      setTimeout(() => {
        setShowRenameAlert(false);
      }, 5000);
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

      setShowDeleteAlert(true);

      setTimeout(() => {
        setShowDeleteAlert(false);
      }, 5000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDownloadFile = async () => {
    try {
      const response = await axiosInstance.get(`/download/file/${fileId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${renameValue}${fileExt}`); // Specify the filename here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // getFiles();

      setShowDownloadAlert(true);

      setTimeout(() => {
        setShowDownloadAlert(false);
      }, 5000);
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
            {/* <label
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
                // value={sortCriterion}
                // onChange={(e) => toggleSortOrder(e.target.value)}
                sx={{
                  minWidth: 110,
                  color: "#2A2D32",
                  fontWeight: 500,
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                    { px: 2, py: 1 },
                }}
              >
                <MenuItem value="date">Recent</MenuItem>
                <MenuItem value="dater">Older</MenuItem>
                <MenuItem value="name">From z-A</MenuItem>
                <MenuItem value="name">From A-Z</MenuItem>
              </Select>
            </label> */}

            <label
              htmlFor="view"
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
              <Button
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  background: isGrid ? "transparent" : "#EDFCF2",
                  color: isGrid ? "#2A2D32" : "#099250",
                  textTransform: "none",
                  fontWeight: 400,
                  "&:hover": { backgroundColor: "#D3F8DF" },
                }}
                endIcon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2727_128166)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.2695 2.33268C13.2695 1.44673 12.5513 0.728516 11.6654 0.728516C10.7794 0.728516 10.0612 1.44673 10.0612 2.33268C10.0612 3.21864 10.7794 3.93685 11.6654 3.93685C12.5513 3.93685 13.2695 3.21864 13.2695 2.33268ZM11.6654 1.60352C12.0681 1.60352 12.3945 1.92998 12.3945 2.33268C12.3945 2.73539 12.0681 3.06185 11.6654 3.06185C11.2627 3.06185 10.9362 2.73539 10.9362 2.33268C10.9362 1.92998 11.2627 1.60352 11.6654 1.60352Z"
                        fill={isGrid ? "#2A2D32" : "#099250"}
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.2695 6.99935C13.2695 6.1134 12.5513 5.39519 11.6654 5.39519C10.7794 5.39519 10.0612 6.1134 10.0612 6.99935C10.0612 7.88531 10.7794 8.60352 11.6654 8.60352C12.5513 8.60352 13.2695 7.88531 13.2695 6.99935ZM11.6654 6.27019C12.0681 6.27019 12.3945 6.59664 12.3945 6.99935C12.3945 7.40206 12.0681 7.72852 11.6654 7.72852C11.2627 7.72852 10.9362 7.40206 10.9362 6.99935C10.9362 6.59664 11.2627 6.27019 11.6654 6.27019Z"
                        fill={isGrid ? "#2A2D32" : "#099250"}
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.2695 11.666C13.2695 10.7801 12.5513 10.0619 11.6654 10.0619C10.7794 10.0619 10.0612 10.7801 10.0612 11.666C10.0612 12.552 10.7794 13.2702 11.6654 13.2702C12.5513 13.2702 13.2695 12.552 13.2695 11.666ZM11.6654 10.9369C12.0681 10.9369 12.3945 11.2633 12.3945 11.666C12.3945 12.0687 12.0681 12.3952 11.6654 12.3952C11.2627 12.3952 10.9362 12.0687 10.9362 11.666C10.9362 11.2633 11.2627 10.9369 11.6654 10.9369Z"
                        fill={isGrid ? "#2A2D32" : "#099250"}
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.60287 2.33268C8.60287 1.44673 7.88465 0.728516 6.9987 0.728516C6.11274 0.728516 5.39453 1.44673 5.39453 2.33268C5.39453 3.21864 6.11274 3.93685 6.9987 3.93685C7.88466 3.93685 8.60287 3.21864 8.60287 2.33268ZM6.9987 1.60352C7.40141 1.60352 7.72787 1.92997 7.72787 2.33268C7.72787 2.73539 7.40141 3.06185 6.9987 3.06185C6.59599 3.06185 6.26953 2.73539 6.26953 2.33268C6.26953 1.92997 6.59599 1.60352 6.9987 1.60352Z"
                        fill={isGrid ? "#2A2D32" : "#099250"}
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.60287 6.99935C8.60287 6.1134 7.88466 5.39519 6.9987 5.39519C6.11274 5.39519 5.39453 6.1134 5.39453 6.99935C5.39453 7.88531 6.11274 8.60352 6.9987 8.60352C7.88466 8.60352 8.60287 7.88531 8.60287 6.99935ZM6.9987 6.27019C7.40141 6.27019 7.72786 6.59664 7.72786 6.99935C7.72786 7.40206 7.40141 7.72852 6.9987 7.72852C6.59599 7.72852 6.26953 7.40206 6.26953 6.99935C6.26953 6.59664 6.59599 6.27019 6.9987 6.27019Z"
                        fill={isGrid ? "#2A2D32" : "#099250"}
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.60286 11.666C8.60286 10.7801 7.88466 10.0619 6.9987 10.0619C6.11274 10.0619 5.39453 10.7801 5.39453 11.666C5.39453 12.552 6.11274 13.2702 6.9987 13.2702C7.88466 13.2702 8.60286 12.552 8.60286 11.666ZM6.9987 10.9369C7.40141 10.9369 7.72786 11.2633 7.72786 11.666C7.72786 12.0687 7.40141 12.3952 6.9987 12.3952C6.59599 12.3952 6.26953 12.0687 6.26953 11.666C6.26953 11.2633 6.59599 10.9369 6.9987 10.9369Z"
                        fill={isGrid ? "#2A2D32" : "#099250"}
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.9362 2.33268C3.9362 1.44673 3.21799 0.728516 2.33203 0.728516C1.44607 0.728516 0.727865 1.44673 0.727865 2.33268C0.727865 3.21864 1.44607 3.93685 2.33203 3.93685C3.21799 3.93685 3.9362 3.21864 3.9362 2.33268ZM2.33203 1.60352C2.73474 1.60352 3.0612 1.92997 3.0612 2.33268C3.0612 2.73539 2.73474 3.06185 2.33203 3.06185C1.92932 3.06185 1.60287 2.73539 1.60287 2.33268C1.60287 1.92997 1.92932 1.60352 2.33203 1.60352Z"
                        fill={isGrid ? "#2A2D32" : "#099250"}
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.9362 6.99935C3.9362 6.1134 3.21799 5.39519 2.33203 5.39519C1.44607 5.39519 0.727865 6.1134 0.727865 6.99935C0.727865 7.88531 1.44607 8.60352 2.33203 8.60352C3.21799 8.60352 3.9362 7.88531 3.9362 6.99935ZM2.33203 6.27019C2.73474 6.27019 3.0612 6.59665 3.0612 6.99935C3.0612 7.40206 2.73474 7.72852 2.33203 7.72852C1.92932 7.72852 1.60287 7.40206 1.60287 6.99935C1.60287 6.59664 1.92932 6.27019 2.33203 6.27019Z"
                        fill={isGrid ? "#2A2D32" : "#099250"}
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.9362 11.666C3.9362 10.7801 3.21799 10.0619 2.33203 10.0619C1.44607 10.0619 0.727865 10.7801 0.727865 11.666C0.727865 12.552 1.44607 13.2702 2.33203 13.2702C3.21799 13.2702 3.9362 12.552 3.9362 11.666ZM2.33203 10.9369C2.73474 10.9369 3.0612 11.2633 3.0612 11.666C3.0612 12.0687 2.73474 12.3952 2.33203 12.3952C1.92932 12.3952 1.60287 12.0687 1.60287 11.666C1.60287 11.2633 1.92932 10.9369 2.33203 10.9369Z"
                        fill={isGrid ? "#2A2D32" : "#099250"}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2727_128166">
                        <rect
                          width="14"
                          height="14"
                          fill="white"
                          transform="translate(14) rotate(90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
                onClick={() => setIsGrid(false)}
              >
                Grid
              </Button>
              <Button
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  background: isGrid ? "#EDFCF2" : "transparent",
                  color: isGrid ? "#099250" : "#2A2D32",
                  textTransform: "none",
                  fontWeight: 400,
                  "&:hover": { backgroundColor: "#EDFCF2" },
                }}
                endIcon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.08333 10.9382C3.84171 10.9382 3.64583 10.7423 3.64583 10.5007C3.64583 10.259 3.84171 10.0632 4.08333 10.0632L12.25 10.0632C12.4916 10.0632 12.6875 10.259 12.6875 10.5007C12.6875 10.7423 12.4916 10.9382 12.25 10.9382L4.08333 10.9382Z"
                      fill={isGrid ? "#099250" : "#2A2D32"}
                    />
                    <path
                      d="M4.08333 7.43815C3.84171 7.43815 3.64583 7.24228 3.64583 7.00065C3.64583 6.75903 3.84171 6.56315 4.08333 6.56315L12.25 6.56315C12.4916 6.56315 12.6875 6.75903 12.6875 7.00065C12.6875 7.24228 12.4916 7.43815 12.25 7.43815L4.08333 7.43815Z"
                      fill={isGrid ? "#099250" : "#2A2D32"}
                    />
                    <path
                      d="M4.08333 3.93815C3.84171 3.93815 3.64583 3.74228 3.64583 3.50065C3.64583 3.25903 3.84171 3.06315 4.08333 3.06315L12.25 3.06315C12.4916 3.06315 12.6875 3.25903 12.6875 3.50065C12.6875 3.74228 12.4916 3.93815 12.25 3.93815L4.08333 3.93815Z"
                      fill={isGrid ? "#099250" : "#2A2D32"}
                    />
                    <path
                      d="M2.91667 7.00065C2.91667 6.67848 2.6555 6.41732 2.33333 6.41732C2.01117 6.41732 1.75 6.67848 1.75 7.00065C1.75 7.32282 2.01117 7.58398 2.33333 7.58398C2.6555 7.58398 2.91667 7.32282 2.91667 7.00065Z"
                      fill={isGrid ? "#099250" : "#2A2D32"}
                    />
                    <path
                      d="M2.91667 10.5007C2.91667 10.1785 2.6555 9.91732 2.33333 9.91732C2.01117 9.91732 1.75 10.1785 1.75 10.5007C1.75 10.8228 2.01117 11.084 2.33333 11.084C2.6555 11.084 2.91667 10.8228 2.91667 10.5007Z"
                      fill={isGrid ? "#099250" : "#2A2D32"}
                    />
                    <path
                      d="M2.91667 3.50065C2.91667 3.17849 2.6555 2.91732 2.33333 2.91732C2.01117 2.91732 1.75 3.17849 1.75 3.50065C1.75 3.82282 2.01117 4.08398 2.33333 4.08398C2.6555 4.08398 2.91667 3.82282 2.91667 3.50065Z"
                      fill={isGrid ? "#099250" : "#2A2D32"}
                    />
                  </svg>
                }
                onClick={() => setIsGrid(true)}
              >
                List
              </Button>
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

        {isGrid ? (
          <Box marginTop={2}>
            {showRenameAlert && (
              <Stack
                sx={{
                  width: "40%",
                  background: "#F6FEF9",
                  p: 1,
                  position: "absolute",
                  zIndex: 10,
                  borderRadius: 2,
                  border: "1px solid #6CE9A6",
                }}
              >
                <Alert
                  sx={{
                    background: "#ECFDF3",
                    border: "0px",
                    fontWeight: 600,
                    gap: 3,
                    color: "#036B26",
                    py: 0,
                  }}
                  icon={false}
                  variant="outlined"
                  severity="success"
                >
                  <Chip
                    sx={{ color: "#027A48", background: "white" }}
                    label="Success"
                  />{" "}
                  You have renamed a file.
                </Alert>
              </Stack>
            )}

            {showDownloadAlert && (
              <Stack
                sx={{
                  width: "40%",
                  background: "#F6FEF9",
                  p: 1,
                  position: "absolute",
                  zIndex: 10,
                  borderRadius: 2,
                  border: "1px solid #6CE9A6",
                }}
              >
                <Alert
                  sx={{
                    background: "#ECFDF3",
                    border: "0px",
                    fontWeight: 600,
                    gap: 3,
                    color: "#036B26",
                    py: 0,
                  }}
                  icon={false}
                  variant="outlined"
                  severity="success"
                >
                  <Chip
                    sx={{ color: "#027A48", background: "white" }}
                    label="Success"
                  />{" "}
                  Your file will be dowloaded to your file explorer.
                </Alert>
              </Stack>
            )}

            {showDeleteAlert && (
              <Stack
                sx={{
                  width: "40%",
                  background: "#F6FEF9",
                  p: 1,
                  position: "absolute",
                  zIndex: 10,
                  borderRadius: 2,
                  border: "1px solid #6CE9A6",
                }}
              >
                <Alert
                  sx={{
                    background: "#ECFDF3",
                    border: "0px",
                    fontWeight: 600,
                    gap: 3,
                    color: "#036B26",
                    py: 0,
                  }}
                  icon={false}
                  variant="outlined"
                  severity="success"
                >
                  <Chip
                    sx={{ color: "#027A48", background: "white" }}
                    label="Success"
                  />{" "}
                  You have deleted a file.
                </Alert>
              </Stack>
            )}

            <TableContainer
              sx={{
                borderRadius: 2.5,
                background: "#FFF",
                position: "relative",
              }}
            >
              <Table size="medium">
                <TableHead sx={{ background: "#FCFCFD", fontSize: 12 }}>
                  <TableRow
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#EDFCF2",
                            stroke: "#099250",
                            strokeWidth: 1,
                            fill: "#099250",
                          },
                        }}
                        checked={
                          dataFiltered.length > 0 &&
                          selectedUserId.length === dataFiltered.length
                        }
                        onChange={handleSelectAll}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    </TableCell> */}
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
                        dataFiltered
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row: any) => {
                            const isSelected = row.id === selectedUserId;
                            return (
                              <TableRow
                                hover
                                onClick={() =>
                                  handleCLick({
                                    id: row.id,
                                    fileName: row.fileName,
                                    asset_id: row.asset_id,
                                    format: row.format,
                                  })
                                }
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
                                    // onClick={(event) => {
                                    //   event.stopPropagation();
                                    // }}
                                    onChange={() => {
                                      handleCLick({
                                        id: row.id,
                                        fileName: row.fileName,
                                        asset_id: row.asset_id,
                                        format: row.format,
                                      });
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "baseline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: "2px",
                                        width: "15px",
                                        margin: "10px",
                                      }}
                                    >
                                      <FileIcon
                                        extension={row.format}
                                        gradientOpacity={0}
                                        radius={2}
                                        labelUppercase
                                        color={
                                          row.format === ".png"
                                            ? "aliceblue"
                                            : row.format === ".jpg"
                                            ? "lightgreen"
                                            : row.format === ".jpeg"
                                            ? "lightgreen"
                                            : row.format === ".docx"
                                            ? "#2C5898"
                                            : row.format === ".xlsx"
                                            ? "#1A754C"
                                            : row.format === ".pptx"
                                            ? "#D14423"
                                            : row.format === ".pdf"
                                            ? "mistyrose"
                                            : ""
                                        }
                                        labelColor={
                                          row.format === ".docx"
                                            ? "#2C5898"
                                            : row.format === ".xlsx"
                                            ? "#1A754C"
                                            : row.format === ".pptx"
                                            ? "#D14423"
                                            : ""
                                        }
                                        type={
                                          row.format === ".docx"
                                            ? "document"
                                            : row.format === ".xlsx"
                                            ? "spreadsheet"
                                            : row.format === ".pptx"
                                            ? "presentation"
                                            : row.format === ".png"
                                            ? "image"
                                            : row.format === ".jpg"
                                            ? "image"
                                            : row.format === ".jpeg"
                                            ? "image"
                                            : "document"
                                        }
                                        glyphColor="rgba(255,255,255,0.4)"
                                      />
                                    </div>
                                    <Typography>
                                      {row.fileName.split(".")[0]}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell width={140}>{row.format}</TableCell>
                                <TableCell sx={{ textTransform: "capitalize" }}>
                                  {row.firstName} {row.lastName}
                                </TableCell>
                                <TableCell width={140}>
                                  {moment(row.created_at).format("DD/MM/YYYY")}
                                </TableCell>

                                <TableCell align="center">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 2,
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    <>
                                      <svg
                                        onClick={() => {
                                          setShowRename(true);
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

                                      <Link
                                        download
                                        to=""
                                        onClick={handleDownloadFile}
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          verticalAlign: "middle",
                                          padding: 0,
                                          minWidth: "0px",
                                        }}
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
                                  </Box>
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
        ) : (
          <>
            {data.length > 0 ? (
              <Box
                marginTop={2}
                sx={{
                  display: "grid",
                  marginBottom: 10,
                  gap: 3,
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {dataFiltered.map((item: any) => (
                  <Card
                    key={item.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: 320,
                      margin: "auto",
                      borderRadius: 1.5,
                      justifyContent: "space-between",
                      border: "1px #E7E9FB solid",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        px: 2,
                      }}
                    >
                      <div
                        style={{
                          height: "70px",
                          width: "48px",
                          margin: "10px",
                        }}
                      >
                        <FileIcon
                          extension={item.format}
                          gradientOpacity={0}
                          radius={2}
                          labelUppercase
                          color={
                            item.format === ".png"
                              ? "aliceblue"
                              : item.format === ".jpg"
                              ? "lightgreen"
                              : item.format === ".jpeg"
                              ? "lightgreen"
                              : item.format === ".docx"
                              ? "#2C5898"
                              : item.format === ".xlsx"
                              ? "#1A754C"
                              : item.format === ".pptx"
                              ? "#D14423"
                              : item.format === ".pdf"
                              ? "mistyrose"
                              : ""
                          }
                          labelColor={
                            item.format === ".docx"
                              ? "#2C5898"
                              : item.format === ".xlsx"
                              ? "#1A754C"
                              : item.format === ".pptx"
                              ? "#D14423"
                              : ""
                          }
                          type={
                            item.format === ".docx"
                              ? "document"
                              : item.format === ".xlsx"
                              ? "spreadsheet"
                              : item.format === ".pptx"
                              ? "presentation"
                              : item.format === ".png"
                              ? "image"
                              : item.format === ".jpg"
                              ? "image"
                              : item.format === ".jpeg"
                              ? "image"
                              : "document"
                          }
                          glyphColor="rgba(255,255,255,0.4)"
                        />
                      </div>

                      <Typography>{item.fileName.split(".")[0]}</Typography>

                      <svg
                        // onClick={() => setShowOptions(!showOptions)}
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
                    </Box>
                  </Card>
                ))}
              </Box>
            ) : (
              <div className="">
                <NoResultIllustration text="No file has been uploaded yet" />
              </div>
            )}
          </>
        )}
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
                    Browse
                    <span style={{ color: "#667185" }}>
                      {" "}
                      or drag and drop a file here
                    </span>
                  </Typography>
                </label>

                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*, .png, .jpg, .jpeg, .pdf, .docx, doc, .pptx, .xlsx"
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
                loading={upLoading}
                disabled={!selectedFile}
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

function applySortFilter({ data, search }: any) {
  if (search) {
    data = data.filter(
      (item: any) =>
        item.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        item.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        item.fileName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }
  return data;
}
