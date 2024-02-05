import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Styles from "../serviceUsers/styles.module.css";
import InputField, { TextLabel } from "../../../components/InputField";
import {
  substance,
  reactionType,
  reaction,
  severity,
  certainty,
  reportedBy,
} from "../serviceUsers/shared";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosInstance } from "../../../Utils";

export default function AllergyRecord() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [formField, setFormField] = React.useState({
    substance: "",
    reactionType: "",
    reaction: "",
    severity: "",
    certainty: "",
    evidence: "",
    reportedBy: "",
    relativeName: "",
    notes: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormField({
      ...formField,
      [name || ""]: value,
    });
  };

  const createNewRecord = async () => {
    setIsLoading(true);

    const isCategoriesAndTypeEmpty =
      formField.substance === "" && formField.reactionType === "";

    if (isCategoriesAndTypeEmpty) {
      setIsLoading(false);

      setIsOpen(false);
      return Swal.fire({
        icon: "info",
        text: `You can not submit an empty form!`,
        confirmButtonColor: "#099250",
      });
    }

    try {
      const res = await axiosInstance.post(
        `/create-serviceuser-allergiesrecord/${id}`,
        formField
      );

      setIsOpen(false);
      setIsLoading(false);

      Swal.fire({
        icon: "success",
        title: `Successful`,
        text: `${res.data.message}`,
        confirmButtonColor: "#099250",
      });
    } catch (error: any) {
      error;
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
        confirmButtonColor: "#099250",
      });
    }
  };

  const hasContent =
    formField.substance ||
    formField.reactionType ||
    formField.reaction ||
    formField.severity ||
    formField.certainty ||
    formField.evidence ||
    formField.reportedBy ||
    formField.relativeName ||
    formField.notes;
  return (
    <Box>
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Record Allergies
        </Typography>
      </div>

      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <label htmlFor={`substance`}>
            Substance
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name={`substance`}
              value={formField.substance}
              onChange={(e) => handleChange("substance", e.target.value)}
            >
              {substance.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor={`reactionType`}>
            Reaction Type
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name={`reactionType`}
              value={formField.reactionType}
              onChange={(e) => handleChange("reactionType", e.target.value)}
            >
              {reactionType.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor={`reaction`}>
            Reaction
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name={`reaction`}
              value={formField.reaction}
              onChange={(e) => handleChange("reaction", e.target.value)}
            >
              {reaction.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor={`severity`}>
            Severity
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name={`severity`}
              value={formField.severity}
              onChange={(e) => handleChange("severity", e.target.value)}
            >
              {severity.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor={`certainty`}>
            Certainty
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name={`certainty`}
              value={formField.certainty}
              onChange={(e) => handleChange("certainty", e.target.value)}
            >
              {certainty.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <InputField
            type="text"
            label="Evidence"
            name={`evidence`}
            value={formField.evidence}
            onChange={(e: any) => handleChange("evidence", e.target.value)}
          />

          <label htmlFor={`reportedBy`}>
            Reported By
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name={`reportedBy`}
              value={formField.reportedBy}
              onChange={(e) => handleChange("reportedBy", e.target.value)}
            >
              {reportedBy.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <InputField
            type="text"
            label="Name"
            name={`relativeName`}
            value={formField.relativeName}
            onChange={(e: any) => handleChange("relativeName", e.target.value)}
          />

          <label htmlFor="notes">
            Notes
            <textarea
              className={Styles.area}
              name={`notes`}
              rows={4}
              cols={50}
              value={formField.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            ></textarea>
          </label>
        </Box>

        <Stack marginTop={5}>
          <Button
            size="large"
            sx={{
              color: "#FFF",
              outline: "none",
              fontWeight: 600,
              background: "#099250",
              "&:hover": { backgroundColor: "#099250" },
              px: 3,
              width: "100%",
            }}
            variant="outlined"
            onClick={() => setIsOpen(true)}
          >
            Continue
          </Button>
        </Stack>
      </form>

      <>
        <Dialog maxWidth="md" fullWidth open={isOpen}>
          <DialogActions sx={{ py: 2, px: 3 }}>
            <Typography
              textAlign={"center"}
              variant="h4"
              fontWeight={500}
              sx={{ flexGrow: 1 }}
            >
              Preview Allergies Record
            </Typography>
          </DialogActions>
          {hasContent ? (
            <DialogContent>
              <Box
                sx={{
                  mb: 10,
                  display: "grid",
                  columnGap: 1.5,
                  rowGap: 1.5,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                }}
              >
                <TextLabel label="Substance" text={formField.substance} />
                <TextLabel
                  label="Reaction Type"
                  text={formField.reactionType}
                />
                <TextLabel label="Reaction" text={formField.reaction} />
                <TextLabel label="Severity" text={formField.severity} />
                <TextLabel label="Certainty" text={formField.certainty} />
                <TextLabel label="Evidence" text={formField.evidence} />
                <TextLabel label="Reported By" text={formField.reportedBy} />
                <TextLabel label="Name" text={formField.relativeName} />
                <TextLabel label="Notes" text={formField.notes} />
              </Box>
            </DialogContent>
          ) : (
            <>
              <div
                style={{
                  height: "90vh",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "20px",
                }}
              >
                No data was entered or something went wrong, please cancel and
                try again...
              </div>
            </>
          )}
          <Stack direction="row" justifyContent="flex-end" gap={5} p={3}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setIsOpen(false)}
              sx={{ px: 5 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                px: 5,
                background: "#099250",
                "&:hover": { backgroundColor: "#099250" },
              }}
              onClick={createNewRecord}
              disabled={isLoading}
            >
              Submit
            </Button>
          </Stack>
        </Dialog>
      </>
    </Box>
  );
}
