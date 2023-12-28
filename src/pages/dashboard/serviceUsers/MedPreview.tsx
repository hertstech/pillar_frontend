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
// import { useState } from "react";

interface Props {
  isOpen: boolean;
  medicationName: string;
  medicationType: string;
  medicationRoute: string;
  medicationDosageForm: string;
  dosage: string;
  dosagemeasurement: string;
  frequencyNumber: string;
  frequencyType: string;
  datePrescribed: string;
  startDate: string;
  endDate: string;
  prescriber: string;
  additionalNote: string;
  onClose: any;
  isLoading: boolean;
  createNewMedication: any;
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

export default function Preview({
  isOpen,
  onClose,
  medicationName,
  medicationType,
  medicationRoute,
  medicationDosageForm,
  dosage,
  dosagemeasurement,
  frequencyNumber,
  frequencyType,
  datePrescribed,
  startDate,
  endDate,
  prescriber,
  additionalNote,
  createNewMedication,
  isLoading,
}: Props) {
  const hasContent =
    medicationName ||
    medicationType ||
    medicationRoute ||
    medicationDosageForm ||
    dosage ||
    dosagemeasurement ||
    frequencyNumber ||
    frequencyType ||
    datePrescribed ||
    startDate ||
    endDate ||
    prescriber ||
    additionalNote;

  // const [isLoading, setIsLoading] = useState(false);

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
            <TextLabel label="Name of Medication" text={medicationName} />
            <TextLabel label="Type of Medication" text={medicationType} />
            <TextLabel label="Route" text={medicationRoute} />
            <TextLabel label="Dosage Form" text={medicationDosageForm} />
            <TextLabel
              label="Dosage"
              text={`${dosage}, ${dosagemeasurement}`}
            />
            <TextLabel
              label="Frequency"
              text={`${frequencyNumber}, ${frequencyType}`}
            />
            <TextLabel
              label="Date Prescribed"
              text={moment(datePrescribed).format("l")}
            />
            <TextLabel
              label="Start Date"
              text={moment(startDate).format("l")}
            />
            <TextLabel label="End Date" text={moment(endDate).format("l")} />
            <TextLabel label="Prescriber Information" text={prescriber} />
            <TextLabel label="Additional Notes" text={additionalNote} />
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
          onClick={createNewMedication}
          disabled={isLoading}
        >
          Submit
        </Button>
        {/* <Buttons loading={isLoading} title="Submit" /> */}
      </Stack>
    </Dialog>
  );
}
