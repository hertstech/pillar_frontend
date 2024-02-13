import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Avatar from "../../assets/avatar.svg";
import InputField from "../../components/InputField";
// import { useSelector } from "react-redux";
// import Buttons from "../../components/Button";
import Styles from "./styles.module.css";
import { FiCamera } from "react-icons/fi";

export default function General({ organization }: any) {
  const [profilePicture, setProfilePicture] = React.useState(Avatar);
  const [previewImage, setPreviewImage] = React.useState("");

  const handleImagePreview = (e: any) => {
    setProfilePicture(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    localStorage.setItem("profilePicture", profilePicture);
  };

  return (
    <Box
      sx={{
        background: "white",
        px: 3,
        pb: 3,
        borderRadius: 2,
      }}
    >
      <Typography fontSize={24} mb={2} fontWeight={600} color={"#1A1C1E"}>
        Organization
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ position: "relative" }}>
            <img
              src={!profilePicture ? previewImage : previewImage}
              className={Styles.image}
              alt="Organization image"
              loading="lazy"
            />

            <label htmlFor="fusk" className={Styles.label}>
              <span className={Styles.span}>
                <FiCamera size={32} color={"#099250"} />
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/*, capture=camera "
                id="fusk"
                onChange={handleImagePreview}
              />
            </label>

            <Stack direction="row" gap={5} p={3} justifyContent="flex-start">
              <Button
                variant="contained"
                sx={{
                  color: "#FFF",
                  outline: "none",
                  textTransform: "capitalize",
                  fontWeight: 600,
                  background: "#099250",
                  "&:hover": { backgroundColor: "#099250" },
                }}
                color="success"
                onClick={() => {}}
              >
                Upload Image
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={(e: any) => setPreviewImage(e.target.value)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <InputField
              type="text"
              label="Hospital Name"
              name="newName"
              value={organization?.name}
              onChange={() => {}}
              disabled
            />
            <InputField
              type="text"
              label="Address"
              name="newName"
              value={organization?.address}
              onChange={() => {}}
              disabled
            />
            <InputField
              type="text"
              label="Hospital ID"
              name="newName"
              value={organization?.facility_id}
              onChange={() => {}}
              disabled
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
