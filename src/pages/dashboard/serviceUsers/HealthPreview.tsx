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

            {/* VITALS DATA VIEW*/}
            {type === "Blood pressure" && (
              <TextLabel label="Systolic Reading" text={systolic} />
            )}

            {type === "Blood pressure" && (
              <TextLabel label="Diastolic Reading" text={diasttolic} />
            )}

            {type === "Body Temperature" && (
              <TextLabel
                label="Reading"
                text={`${reading} ${degreeRating}` || "N/A"}
              />
            )}

            {type === "Pulse Rate" && (
              <TextLabel label="Beat Per Minute" text={bpm} />
            )}

            {type === "Glucose Level" && (
              <TextLabel label="Glucose level" text={mgDl} />
            )}

            {/* GENETIC INFORMATION */}
            {type === "Blood Type" && (
              <TextLabel label="Blood Type" text={bloodType} />
            )}

            {type === "Genotype" && (
              <TextLabel label="Genotype" text={genotype || "N/A"} />
            )}

            {/* IMMUNIZATION DATA */}
            {categories === "Immunization" && (
              <TextLabel label="Manufacturer" text={manufacturer || "N/A"} />
            )}

            {categories === "Immunization" && (
              <TextLabel label="Batch Number" text={batchNumber || "N/A"} />
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

            {/* DIAGNOSIS DATA VIEW*/}
            {type === "Primary Diagnosis" && (
              <TextLabel
                label="Primary Diagnosis"
                text={primaryDiagnosis || "N/A"}
              />
            )}

            {type === "Secondary Diagnosis" && (
              <TextLabel
                label="Secondary Diagnosis"
                text={secondaryDiagnosis || "N/A"}
              />
            )}

            {categories === "Diagnosis" && (
              <TextLabel label="Severity" text={severity || "N/A"} />
            )}

            {categories === "Diagnosis" && (
              <TextLabel
                label="Treatment Status"
                text={treatmentStatus || "N/A"}
              />
            )}

            {categories === "Diagnosis" && (
              <TextLabel label="Treatment type" text={treatmentType || "N/A"} />
            )}

            {categories === "Diagnosis" && (
              <TextLabel
                label="Follow up Plans"
                text={followUpPlans || "N/A"}
              />
            )}

            {categories === "Diagnosis" && (
              <TextLabel
                label="Prescribed by"
                text={`${title} ${reading}` || "N/A"}
              />
            )}

            {categories === "Diagnosis" && (
              <TextLabel label="Progress notes" text={progressNote} />
            )}

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
