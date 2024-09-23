import { Box, Typography } from "@mui/material";
import { TextLabel } from "./Components/textLabel";
import moment from "moment";

interface IProps {
  item: any;
}

export const RecordDetails = ({ item }: IProps) => {
  const isDiagnosis = item.categories === "diagnosis";
  const isImmunization = item.categories === "immunization";

  const renderVitals = () => {
    switch (item.type) {
      case "blood pressure":
        return (
          <>
            <TextLabel label="Systolic Reading" text={item.systolic || "N/A"} />
            <TextLabel
              label="Diastolic Reading"
              text={item.diastolic || "N/A"}
            />
          </>
        );
      case "body temperature":
        return (
          <TextLabel
            label="Reading"
            text={`${item.reading} ${item.degreeRating}` || "N/A"}
          />
        );
      case "pulse rate":
        return <TextLabel label="Beat Per Minute" text={item.bpm || "N/A"} />;
      case "glucose level":
        return <TextLabel label="Glucose level" text={item.mgDl || "N/A"} />;
      case "blood group":
        return (
          <TextLabel label="Blood Group" text={item.bloodGroup || "N/A"} />
        );
      case "genotype":
        return <TextLabel label="Genotype" text={item.genotype || "N/A"} />;
      case "primary diagnosis":
        return (
          <TextLabel
            label="Primary Diagnosis"
            text={item.primaryDiagnosis || "N/A"}
          />
        );
      case "secondary diagnosis":
        return (
          <TextLabel
            label="Secondary Diagnosis"
            text={item.secondaryDiagnosis || "N/A"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: "24px" }} className="bg-neu-100 rounded-lg">
      <Box
        sx={{
          display: "grid",
          columnGap: 1.5,
          rowGap: 1.5,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
          },
        }}
      >
        <TextLabel label="Type" text={item.categories || "None"} />

        {renderVitals()}

        {isImmunization && (
          <>
            <TextLabel label="Manufacturer" text={item.manufacturer || "N/A"} />
            <TextLabel label="Batch Number" text={item.batchNumber || "N/A"} />
            <TextLabel
              label="Administration Date"
              text={moment(item.administrationDate).format("DD/MM/YYYY")}
            />
            <TextLabel
              label="Expiration Date"
              text={moment(item.expirationDate).format("DD/MM/YYYY")}
            />
          </>
        )}

        {isDiagnosis && (
          <>
            <TextLabel label="Severity" text={item.severity || "N/A"} />
            <TextLabel
              label="Treatment Status"
              text={
                item.treatmentStatus === "on_hold"
                  ? "On Hold"
                  : item.treatmentStatus || "N/A"
              }
            />
            <TextLabel
              label="Treatment Type"
              text={item.treatmentType || "N/A"}
            />
            <TextLabel
              label="Follow Up Plans"
              text={item.followUpPlans || "N/A"}
            />
            {/* <TextLabel
              label="Prescribed by"
              text={`${item.title} ${item.reading}` || "N/A"}
            />
            <TextLabel
              label="Clinical Notes"
              text={item.progressNote || "N/A"}
            /> */}
          </>
        )}
      </Box>

      <TextLabel label="Additional Notes" text={item.notes || "None"} />

      <Box sx={{ padding: "16px 0px", color: "#101928" }}>
        <Typography fontWeight={400} fontSize={12}>
          Administered by
        </Typography>
        <Typography
          fontWeight={400}
          fontSize={14}
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
        >
          🕒 ID: #{item.pillar_user_id_fk}
        </Typography>
      </Box>
    </Box>
  );
};
