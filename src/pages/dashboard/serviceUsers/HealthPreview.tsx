import {
  Dialog,
  Box,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
//   import moment from "moment";

interface Props {
  isOpen: boolean;
  onClose: any;
  categories: string;
  type: string;
  reading: string;
  notes: string;
  handleSubmit: any;
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

export default function HealthPreview({
  isOpen,
  onClose,
  categories,
  type,
  reading,
  notes,
  handleSubmit,
}: Props) {
  const hasContent = categories || type || reading || notes;
  return (
    <Dialog maxWidth="md" fullWidth open={isOpen} onClose={onClose}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography
          textAlign={"center"}
          variant="h4"
          fontWeight={500}
          sx={{ flexGrow: 1 }}
        >
          Preview Medication Details
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
            <TextLabel label="Category" text={categories} />
            <TextLabel label="TYpe" text={type} />
            <TextLabel label="Reading/Description" text={reading} />
            <TextLabel label="Notes" text={notes} />
          </Box>
        </DialogContent>
      ) : (
        <>
          <div style={{ height: "90vh" }} className="grid place-items-center">
            Loading....
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
        >
          Submit
        </Button>
        {/* <Buttons loading={isLoading} title="Submit" /> */}
      </Stack>
    </Dialog>
  );
}
