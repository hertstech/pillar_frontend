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
import { useParams, useNavigate } from "react-router-dom";
import { Calendar } from "../../../components/CalendarField";
import InputField, { TextLabel } from "../../../components/InputField";
import moment from "moment";
import { axiosInstance } from "../../../Utils";
import { useAlert } from "../../../Utils/useAlert";

export default function ReferralRecord() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const [formField, setFormField] = React.useState({
    dateInitiated: "",
    careSetting: "",
    referralSource: "",
    referralName: "",
    referralReason: "",
    otherReferralReason: "",
    urgencyStatus: "",
    waitingStatus: "",
    teamReferredTo: "",
    referralDateReceived: "",
    referralAcceptedDate: "",
    additionalNote: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormField({
      ...formField,
      [name || ""]: value,
    });
  };

  const hasContent =
    formField.dateInitiated ||
    formField.careSetting ||
    formField.referralName ||
    formField.referralReason ||
    formField.urgencyStatus ||
    formField.waitingStatus ||
    formField.teamReferredTo ||
    formField.referralDateReceived ||
    formField.referralAcceptedDate ||
    formField.additionalNote;

  const handleSubmit = async () => {
    setIsLoading(true);

    const finalReferralReason =
      formField.referralReason === "other"
        ? formField.otherReferralReason
        : formField.referralReason;

    const { otherReferralReason, ...filteredFormField } = formField;

    const payload = {
      ...filteredFormField,
      referralReason: finalReferralReason,
    };

    console.log(payload);

    if (!formField.careSetting) {
      setIsLoading(false);
      setIsOpen(false);
      return useAlert({
        icon: "info",
        title: `You cannot submit an empty form!`,
      });
    }

    try {
      const res = await axiosInstance.post(
        `/create-serviceuser-referralrecord/${id}`,
        payload
      );

      setIsOpen(false);
      setIsLoading(false);
      useAlert({
        icon: "success",
        title: `Successful`,
        isToast: true,
        position: "top-start",
        text: `${res.data.message}`,
      });

      navigate(`/dashboard/user/${id}/5`);
    } catch (error: any) {
      setIsLoading(false);
      useAlert({
        icon: "error",
        title: "Error",
        isToast: true,
        position: "top-start",
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <Box>
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Create a Referral record
        </Typography>
      </div>

      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Calendar
            label="Date of Referral"
            value={formField.dateInitiated}
            disableFuture={false}
            onChange={(newValue: any) =>
              handleChange("dateInitiated", newValue.format())
            }
          />

          <label htmlFor="care_setting">
            Care Setting
            <TextField
              select
              sx={{ marginTop: "8px" }}
              fullWidth
              name={`careSetting`}
              value={formField.careSetting}
              onChange={(e) => handleChange("careSetting", e.target.value)}
            >
              <MenuItem value="Community">Community</MenuItem>
              <MenuItem value="Primary Care">Primary Care</MenuItem>
            </TextField>
          </label>

          <InputField
            type="text"
            label="Referral (Name of referral)"
            name={`referralName`}
            value={formField.referralName}
            onChange={(e: any) => handleChange("referralName", e.target.value)}
          />

          <label htmlFor="referral_reason">
            Referral reason
            <TextField
              select
              sx={{ marginTop: "8px" }}
              fullWidth
              name={`referralReason`}
              value={formField.referralReason}
              onChange={(e) => handleChange("referralReason", e.target.value)}
            >
              <MenuItem value="Complex condition Diagnostic procedure">
                Complex condition Diagnostic procedure
              </MenuItem>
              <MenuItem value="Surgery">Surgery</MenuItem>
              <MenuItem value="Specialized Care">Specialized Care</MenuItem>
              <MenuItem value="Maternity Care">Maternity Care</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </label>

          {formField.referralReason === "other" && (
            <InputField
              type="text"
              label="Other referral reasons"
              placeholder="Enter possible reasons"
              name={`otherReferralReason`}
              value={formField.otherReferralReason}
              onChange={(e: any) =>
                handleChange("otherReferralReason", e.target.value)
              }
            />
          )}

          <label htmlFor="urgency_status">
            Urgency Status
            <TextField
              select
              sx={{ marginTop: "8px" }}
              fullWidth
              name={`urgencyStatus`}
              value={formField.urgencyStatus}
              onChange={(e) => handleChange("urgencyStatus", e.target.value)}
            >
              <MenuItem value="Emergency">Emergency</MenuItem>
              <MenuItem value="Non-Urgent">Non-Urgent</MenuItem>
              <MenuItem value="Routine">Routine</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </TextField>
          </label>

          <label htmlFor="waiting_status">
            Waiting Status
            <TextField
              select
              sx={{ marginTop: "8px" }}
              fullWidth
              name={`waitingStatus`}
              value={formField.waitingStatus}
              onChange={(e) => handleChange("waitingStatus", e.target.value)}
            >
              <MenuItem value="Waiting for response">
                Waiting for response
              </MenuItem>
              <MenuItem value="Waiting for letter">Waiting for letter</MenuItem>
              <MenuItem value="Cleared">Cleared</MenuItem>
              <MenuItem value="Client unavailable">Client unavailable</MenuItem>
              <MenuItem value="Under review">Under review</MenuItem>
            </TextField>
          </label>

          <InputField
            type="text"
            label="Team referred to"
            name={`teamReferredTo`}
            value={formField.teamReferredTo}
            onChange={(e: any) =>
              handleChange("teamReferredTo", e.target.value)
            }
          />

          <Calendar
            label="Date Referral was Received"
            value={formField.referralDateReceived}
            disableFuture={false}
            onChange={(newValue: any) =>
              handleChange("referralDateReceived", newValue.format())
            }
          />

          <Calendar
            label="Referral Accepted Date"
            value={formField.referralAcceptedDate}
            disableFuture={false}
            onChange={(newValue: any) =>
              handleChange("referralAcceptedDate", newValue.format())
            }
          />

          <label htmlFor="additional notes" style={{ marginTop: "8px" }}>
            Additional Notes
            <textarea
              className={Styles.area}
              name={`referralName`}
              rows={5}
              cols={50}
              value={formField.additionalNote}
              onChange={(e) => handleChange("additionalNote", e.target.value)}
            ></textarea>
          </label>
        </Box>

        <Stack marginTop={5}>
          <Button
            sx={{
              color: "#FFF",
              outline: "none",
              fontWeight: 600,
              background: "#2E90FA",
              height: "48px",
              "&:hover": { backgroundColor: "#2E90FA" },
              borderRadius: 2,
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
              Preview Referral Form Details
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
                <TextLabel label="Created By" text={formField.referralName} />
                <TextLabel
                  label="Referral Initiated Date"
                  text={moment(formField.dateInitiated).format("DD/MM/YYYY")}
                />
                <TextLabel label="Care Setting" text={formField.careSetting} />
                {/* <TextLabel label="Referral Source" text={referralSource} /> */}
                <TextLabel
                  label="Referral (Name of referral)"
                  text={formField.referralName}
                />
                {formField.otherReferralReason !== "" &&
                formField.referralReason === "other" ? (
                  <TextLabel
                    label="Referral reason"
                    text={formField.otherReferralReason}
                  />
                ) : (
                  <TextLabel
                    label="Referral reason"
                    text={formField.referralReason}
                  />
                )}
                <TextLabel
                  label="Urgency Status"
                  text={formField.urgencyStatus}
                />
                <TextLabel
                  label="Waiting Status"
                  text={formField.waitingStatus}
                />
                <TextLabel
                  label="Team Referred to"
                  text={formField.teamReferredTo}
                />
                <TextLabel
                  label="Date referral received"
                  text={moment(formField.referralDateReceived).format(
                    "DD/MM/YYYY"
                  )}
                />
                <TextLabel
                  label="Referral accepted Date"
                  text={moment(formField.referralAcceptedDate).format(
                    "DD/MM/YYYY"
                  )}
                />
                <TextLabel
                  label="Additional Notes"
                  text={formField.additionalNote}
                />
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
                background: "#2E90FA",
                height: "48px",
                "&:hover": { backgroundColor: "#2E90FA" },
                borderRadius: 2,
              }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Save
            </Button>
          </Stack>
        </Dialog>
      </>
    </Box>
  );
}
