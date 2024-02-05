import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Styles from "../serviceUsers/styles.module.css";
import InputField from "../../../components/InputField";
import {
  substance,
  reactionType,
  reaction,
  severity,
  certainty,
  reportedBy,
} from "../serviceUsers/shared";

export default function AllergyRecord() {
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
            // onClick={() => setIsOpen(true)}
          >
            Continue
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
