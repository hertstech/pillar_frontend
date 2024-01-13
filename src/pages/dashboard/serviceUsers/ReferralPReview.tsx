import {
  Dialog,
  Box,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import moment from "moment";

interface Props {
  isOpen: boolean;
  onClose: any;
  dateInitiated: string;
  careSetting: string;
  referralSource: string;
  referralName: string;
  referralReason: string;
  urgencyStatus: string;
  waitingStatus: string;
  teamReferredTo: string;
  referralDateReceived: string;
  referralAcceptedDate: string;
  additionalNote: string;
  handleSubmit: any;
  isLoading: boolean;
}

interface TextLabelProps {
  text: any;
  label: string;
}

const TextLabel = ({ text, label }: TextLabelProps) => (
  <label
    style={{
      fontWeight: 400,
      color: "#475467",
      fontSize: 12,
      margin: "20px 0px",
    }}
  >
    {label}
    <Typography fontWeight={600} fontSize={16} color={"#101928"}>
      {text}
    </Typography>
  </label>
);

export default function ReferralPReview({
  isOpen,
  onClose,
  dateInitiated,
  careSetting,
  referralSource,
  referralName,
  referralReason,
  urgencyStatus,
  waitingStatus,
  teamReferredTo,
  referralDateReceived,
  referralAcceptedDate,
  handleSubmit,
  isLoading,
  additionalNote,
}: Props) {
  const hasContent =
    dateInitiated ||
    careSetting ||
    referralSource ||
    referralName ||
    referralReason ||
    urgencyStatus ||
    waitingStatus ||
    teamReferredTo ||
    referralDateReceived ||
    referralAcceptedDate ||
    additionalNote;
  return (
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
            <TextLabel label="Created By" text={referralName} />
            <TextLabel
              label="Referral Initiated Date"
              text={moment(dateInitiated).format("DD/MM/YYYY")}
            />
            <TextLabel label="Care Setting" text={careSetting} />
            <TextLabel label="Referral Source" text={referralSource} />
            <TextLabel
              label="Referral (Name of referral)"
              text={referralName}
            />
            <TextLabel label="Referral reason" text={referralReason} />
            <TextLabel label="Urgency Status" text={urgencyStatus} />
            <TextLabel label="Waiting Status" text={waitingStatus} />
            <TextLabel label="Team Referred to" text={teamReferredTo} />
            <TextLabel
              label="Date referral received"
              text={moment(referralDateReceived).format("DD/MM/YYYY")}
            />
            <TextLabel
              label="Referral accepted Date"
              text={moment(referralAcceptedDate).format("DD/MM/YYYY")}
            />
            <TextLabel label="Additional Notes" text={additionalNote} />
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
            No data was entered or something went wrong, please cancel and try
            again...
          </div>
        </>
      )}
      <Stack direction="row" justifyContent="flex-end" gap={5} p={3}>
        <Button
          variant="outlined"
          color="error"
          onClick={onClose}
          sx={{ px: 5 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ px: 5 }}
          color="success"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Submit
        </Button>
        {/* <Buttons loading={isLoading} title="Submit" /> */}
      </Stack>
    </Dialog>
  );
}
