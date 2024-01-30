import {
  Dialog,
  Box,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: any;
  substance: string;
  reactionType: string;
  reaction: string;
  severity: string;
  certainty: string;
  evidence: string;
  reportedBy: string;
  relativeName: string;
  notes: string;
  createNewRecord: any;
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

export default function AllergiesPreview({
  isOpen,
  onClose,
  substance,
  reactionType,
  reaction,
  severity,
  certainty,
  evidence,
  reportedBy,
  relativeName,
  isLoading,
  notes,
  createNewRecord,
}: Props) {
  const hasContent =
    substance ||
    reactionType ||
    reaction ||
    severity ||
    certainty ||
    evidence ||
    reportedBy ||
    relativeName ||
    notes;

  return (
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
            <TextLabel label="Substance" text={substance} />
            <TextLabel label="Reaction Type" text={reactionType} />
            <TextLabel label="Reaction" text={reaction} />
            <TextLabel label="Severity" text={severity} />
            <TextLabel label="Certainty" text={certainty} />
            <TextLabel label="Evidence" text={evidence} />
            <TextLabel label="Reported By" text={reportedBy} />
            <TextLabel label="Name" text={relativeName} />
            <TextLabel label="Notes" text={notes} />
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
  );
}
