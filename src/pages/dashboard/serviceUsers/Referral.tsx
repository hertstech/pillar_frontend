import { Box, Button, Card, MenuItem, Stack, TextField } from "@mui/material";
import NoResultIllustration from "../../../components/NoResult";
import Styles from "./styles.module.css";
import { useState } from "react";
import { Calendar } from "../../../components/CalendarField";
import InputField from "../../../components/InputField";
import ReferralPReview from "./ReferralPReview";

interface FormState {
  dateInitiated: string;
  careSetting: string;
  referralSource: string;
  referralName: string;
  referralReason: string;
  urgencyStatus: string;
  waitingStatus: string;
  teamReferredTo: string;
  referralComment: string;
  referralDateReceived: string;
  referralAcceptedDate: string;
  additionalNote: string;
}

const initialFormState = {
  dateInitiated: "",
  careSetting: "",
  referralSource: "",
  referralName: "",
  referralReason: "",
  urgencyStatus: "",
  waitingStatus: "",
  teamReferredTo: "",
  referralComment: "",
  referralDateReceived: "",
  referralAcceptedDate: "",
  additionalNote: "",
};

export default function Referral() {
  const [hide, setHide] = useState(false);
  const [formField, setFormField] = useState<FormState[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addForm = () => {
    setHide(true);
    setFormField((prevForms) => [...prevForms, { ...initialFormState }]);
  };

  const deleteForm = (index: number) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
  };

  const handleFormChange = (index: number, field: any, value: any) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms[index] = {
        ...newForms[index],
        [field]: value,
      };
      return newForms;
    });
  };
  return (
    <Box
      sx={{
        position: "relative",
        flexDirection: "column",
        display: "flex",
        mb: 10,
        background: "white",
        px: 3,
        pb: 3,
        borderRadius: 2,
        gap: 3,
      }}
    >
      <div style={{ marginBottom: "50px" }}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          position={"absolute"}
          p={1.5}
          display={"flex"}
          right={0}
        >
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
            onClick={addForm}
          >
            Add New
          </Button>
        </Stack>
      </div>
      {formField.map((form: any, index: any) => (
        <form>
          <Card sx={{ p: 2 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 1.5,
                rowGap: 1.5,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
              }}
            >
              <Calendar
                label="Date of Referral"
                value={form.dateInitiated}
                disableFuture={false}
                onChange={(newValue: any) =>
                  handleFormChange(index, "dateInitiated", newValue.format())
                }
              />

              <label htmlFor="care_setting" style={{ marginTop: 10 }}>
                Care Setting
                <TextField
                  select
                  sx={{ marginTop: "8px" }}
                  fullWidth
                  name={`careSetting_${index}`}
                  value={form.careSetting}
                  onChange={(e) =>
                    handleFormChange(index, "careSetting", e.target.value)
                  }
                >
                  <MenuItem value="Community">Community</MenuItem>
                  <MenuItem value="Primary Care">Primary Care</MenuItem>
                </TextField>
              </label>

              <div style={{ marginTop: 5 }}>
                <InputField
                  type="text"
                  label="Referral Source (Name of Hospital)"
                  name={`referralSource_${index}`}
                  value={form.referralSource}
                  onChange={(e: any) =>
                    handleFormChange(index, "referralSource", e.target.value)
                  }
                />
              </div>

              <InputField
                type="text"
                label="Referral (Name of referral)"
                name={`referralName_${index}`}
                value={form.referralName}
                onChange={(e: any) =>
                  handleFormChange(index, "referralName", e.target.value)
                }
              />

              <label htmlFor="referral_reason" style={{ marginTop: 5 }}>
                Referral reason
                <TextField
                  select
                  sx={{ marginTop: "8px" }}
                  fullWidth
                  name={`referralReason_${index}`}
                  value={form.referralReason}
                  onChange={(e) =>
                    handleFormChange(index, "referralReason", e.target.value)
                  }
                >
                  <MenuItem value="Complex condition Diagnostic procedure">
                    Complex condition Diagnostic procedure
                  </MenuItem>
                  <MenuItem value="Surgery">Surgery</MenuItem>
                  <MenuItem value="Specialized Care">Specialized Care</MenuItem>
                  <MenuItem value="Maternity Care">Maternity Care</MenuItem>
                </TextField>
              </label>

              <label htmlFor="urgency_status" style={{ marginTop: 5 }}>
                Urgency Status
                <TextField
                  select
                  sx={{ marginTop: "8px" }}
                  fullWidth
                  name={`urgencyStatus_${index}`}
                  value={form.urgencyStatus}
                  onChange={(e) =>
                    handleFormChange(index, "urgencyStatus", e.target.value)
                  }
                >
                  <MenuItem value="Emergency">Emergency</MenuItem>
                  <MenuItem value="Non-Urgent">Non-Urgent</MenuItem>
                  <MenuItem value="Routine">Routine</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                </TextField>
              </label>

              <label htmlFor="waiting_status" style={{ marginTop: 5 }}>
                Waiting Status
                <TextField
                  select
                  sx={{ marginTop: "8px" }}
                  fullWidth
                  name={`waitingStatus_${index}`}
                  value={form.waitingStatus}
                  onChange={(e) =>
                    handleFormChange(index, "waitingStatus", e.target.value)
                  }
                >
                  <MenuItem value="Waiting for response">
                    Waiting for response
                  </MenuItem>
                  <MenuItem value="Waiting for letter">
                    Waiting for letter
                  </MenuItem>
                  <MenuItem value="Cleared">Cleared</MenuItem>
                  <MenuItem value="Client unavailable">
                    Client unavailable
                  </MenuItem>
                  <MenuItem value="Under review">Under review</MenuItem>
                </TextField>
              </label>

              <InputField
                type="text"
                label="Team referred to"
                name={`teamReferredTo_${index}`}
                value={form.teamReferredTo}
                onChange={(e: any) =>
                  handleFormChange(index, "teamReferredTo", e.target.value)
                }
              />

              <InputField
                type="text"
                label="Referral Comment"
                name={`referralComment_${index}`}
                value={form.referralComment}
                onChange={(e: any) =>
                  handleFormChange(index, "referralComment", e.target.value)
                }
              />

              <Calendar
                label="Date Referral was Received"
                value={form.referralDateReceived}
                disableFuture={false}
                onChange={(newValue: any) =>
                  handleFormChange(
                    index,
                    "referralDateReceived",
                    newValue.format()
                  )
                }
              />

              <Calendar
                label="Referral Accepted Date"
                value={form.referralAcceptedDate}
                disableFuture={false}
                onChange={(newValue: any) =>
                  handleFormChange(
                    index,
                    "referralAcceptedDate",
                    newValue.format()
                  )
                }
              />
            </Box>
            <label htmlFor="additional notes" style={{ marginTop: "8px" }}>
              Additional Notes
              <textarea
                className={Styles.area}
                name={`referralName_${index}`}
                rows={5}
                cols={50}
                value={form.additionalNote}
                onChange={(e) =>
                  handleFormChange(index, "additionalNote", e.target.value)
                }
              ></textarea>
            </label>

            <Stack
              direction="row"
              justifyContent="flex-end"
              marginTop={2}
              gap={5}
            >
              <Button
                sx={{
                  color: "#FFF",
                  outline: "none",
                  fontWeight: 600,
                  background: "#099250",
                  "&:hover": { backgroundColor: "#099250" },
                  px: 3,
                }}
                variant="outlined"
                onClick={() => setIsOpen(true)}
              >
                Preview
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteForm(index)}
              >
                Delete Form
              </Button>
            </Stack>
          </Card>
        </form>
      ))}
      {!hide && formField.length === 0 && <NoResultIllustration />}

      {formField.map((form, index) => (
        <ReferralPReview
          key={index}
          dateInitiated={form.dateInitiated}
          careSetting={form.careSetting}
          referralSource={form.referralSource}
          referralName={form.referralName}
          referralReason={form.referralReason}
          urgencyStatus={form.urgencyStatus}
          waitingStatus={form.waitingStatus}
          teamReferredTo={form.teamReferredTo}
          referralComment={form.referralComment}
          referralDateReceived={form.referralDateReceived}
          referralAcceptedDate={form.referralAcceptedDate}
          additionalNote={form.additionalNote}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      ))}
    </Box>
  );
}
