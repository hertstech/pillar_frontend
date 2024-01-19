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
  writtenBy: string;
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

export default function NotePreview({
  isOpen,
  onClose,
  writtenBy,
  additionalNote,
  handleSubmit,
  isLoading,
}: Props) {
  const hasContent = writtenBy || additionalNote;

  return (
    <Dialog maxWidth="md" fullWidth open={isOpen}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography
          textAlign={"center"}
          variant="h4"
          fontWeight={500}
          sx={{ flexGrow: 1 }}
        >
          Preview Health Details
        </Typography>
      </DialogActions>
      {hasContent ? (
        <DialogContent>
          <Box>
            <TextLabel label="Additional Notes" text={additionalNote} />
            <TextLabel label="Written By" text={writtenBy} />
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
          variant="contained"
          sx={{ px: 5 }}
          color="success"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onClose}
          sx={{ px: 5 }}
        >
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
}
