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
//   import moment from "moment";

interface Props {
  isOpen: boolean;
  onClose: any;
  categories: string;
  type: string;
  reading: string;
  notes: string;
  systolic: string;
  diasttolic: string;
  bloodType: string;
  genotype: string;
  manufacturer: string;
  bpm: string;
  title: string;
  mgDl: string;
  degreeRating: string;
  primaryDiagnosis: string;
  secondaryDiagnosis: string;
  severity: string;
  treatmentStatus: string;
  treatmentType: string;
  followUpPlans: string;
  progressNote: string;
  batchNumber: string;
  administrationDate: string;
  expirationDate: string;
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

export default function HealthPreview({
  isOpen,
  onClose,
  categories,
  type,
  reading,
  bloodType,
  genotype,
  manufacturer,
  batchNumber,
  administrationDate,
  expirationDate,
  notes,
  handleSubmit,
  isLoading,
  systolic,
  diasttolic,
  bpm,
  title,
  mgDl,
  degreeRating,
  primaryDiagnosis,
  secondaryDiagnosis,
  severity,
  treatmentStatus,
  treatmentType,
  followUpPlans,
  progressNote,
}: Props) {
  const hasContent = categories || type || reading || notes;
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
            <TextLabel label="Type" text={type} />
            <TextLabel label="Reading/Description" text={reading} />
            {categories === "Genetic Information" && (
              <TextLabel label="Blood Type" text={bloodType} />
            )}
            {type === "Genotype" && (
              <TextLabel label="Genotype" text={genotype} />
            )}

            {type === "Blood pressure" && (
              <TextLabel label="Genotype" text={systolic} />
            )}

            {type === "Blood pressure" && (
              <TextLabel label="Genotype" text={diasttolic} />
            )}

            {categories === "Immunization" && (
              <TextLabel label="Manufacturer" text={manufacturer} />
            )}
            {categories === "Immunization" && (
              <TextLabel label="Batch Number" text={batchNumber} />
            )}
            {categories === "Immunization" && (
              <TextLabel
                label="Administration Date"
                text={moment(administrationDate).format("DD/MM/YYYY")}
              />
            )}
            {categories === "Immunization" && (
              <TextLabel
                label="Expiration Date"
                text={moment(expirationDate).format("DD/MM/YYYY")}
              />
            )}
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
          disabled={isLoading}
        >
          Submit
        </Button>
      </Stack>
    </Dialog>
  );
}
