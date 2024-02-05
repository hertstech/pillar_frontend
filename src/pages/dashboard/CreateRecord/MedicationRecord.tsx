import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import Styles from "../serviceUsers/styles.module.css";
import { Calendar } from "../../../components/CalendarField";
import InputField from "../../../components/InputField";
import {
  medName,
  medType,
  medRoute,
  medDosageForm,
  medDosage,
  medFrequency,
} from "../serviceUsers/shared";

export default function MedicationRecord() {
  const [formField, setFormField] = React.useState({
    medicationName: "",
    medicationType: "",
    medicationRoute: "",
    medicationDosageForm: "",
    dosage: "",
    dosagemeasurement: "",
    frequencyNumber: "",
    frequencyType: "",
    datePrescribed: "",
    startDate: "",
    endDate: "",
    prescriber: "",
    additionalNote: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormField({
      ...formField,
      [name || ""]: value,
    });
  };
  return (
    <Box>
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Prescribe Medications
        </Typography>
      </div>

      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <label htmlFor={`med_Name`}>
            Name of Medication
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name={`medicationName`}
              value={formField.medicationName}
              onChange={(e) => handleChange("medicationName", e.target.value)}
            >
              {medName.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor={`med_Type`}>
            Type of Medication
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name={`medicationType`}
              value={formField.medicationType}
              onChange={(e) => handleChange("medicationType", e.target.value)}
            >
              {medType.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor="med_Route">
            Route
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              name={`medicationRoute`}
              value={formField.medicationRoute}
              onChange={(e) => handleChange("medicationRoute", e.target.value)}
            >
              {medRoute.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor="dosage_form">
            Dosage Form
            <TextField
              select
              sx={{ marginTop: "8px" }}
              fullWidth
              name={`medicationDosageForm`}
              value={formField.medicationDosageForm}
              onChange={(e) =>
                handleChange("medicationDosageForm", e.target.value)
              }
            >
              {medDosageForm.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <div style={{ display: "flex", gap: 5, alignItems: "flex-end" }}>
            <InputField
              type="text"
              label="Dosage"
              name={`dosage`}
              value={formField.dosage}
              onChange={(e: any) => handleChange("dosage", e.target.value)}
            />

            <TextField
              select
              sx={{ width: "120px" }}
              name={`dosagemeasurement`}
              value={formField.dosagemeasurement}
              onChange={(e) =>
                handleChange("dosagemeasurement", e.target.value)
              }
            >
              {medDosage.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div style={{ display: "flex", gap: 5, alignItems: "flex-end" }}>
            <InputField
              type="text"
              label="Frequency"
              name={`frequencyNumber`}
              value={formField.frequencyNumber}
              onChange={(e: any) =>
                handleChange("frequencyNumber", e.target.value)
              }
            />

            <TextField
              select
              sx={{ width: "120px" }}
              name={`frequencyType`}
              value={formField.frequencyType}
              onChange={(e) => handleChange("frequencyType", e.target.value)}
            >
              {medFrequency.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Calendar
            label="Date Prescribed"
            value={formField.datePrescribed}
            disableFuture={false}
            onChange={(newValue: any) =>
              handleChange("datePrescribed", newValue.format())
            }
          />
          <Calendar
            label="Start Date"
            value={formField.startDate}
            disableFuture={false}
            onChange={(newValue: any) =>
              handleChange("startDate", newValue.format())
            }
          />

          <Calendar
            label="End Date"
            value={formField.endDate}
            minDate={dayjs(formField.startDate)}
            onChange={(newValue: any) =>
              handleChange("endDate", newValue.format())
            }
          />

          <InputField
            type="text"
            label="Prescriber Name"
            name={`prescriber`}
            value={formField.prescriber}
            onChange={(e: any) => handleChange("prescriber", e.target.value)}
          />

          <label htmlFor="additional notes">
            Additional Notes
            <textarea
              className={Styles.area}
              name={`additionalNote`}
              rows={5}
              cols={50}
              value={formField.additionalNote}
              onChange={(e) => handleChange("additionalNote", e.target.value)}
            ></textarea>
          </label>
        </Box>

        <Stack marginTop={5}>
          <Button
            size="large"
            sx={{
              color: "#FFF",
              outline: "none",
              fontWeight: 600,
              background: "#099250",
              "&:hover": { backgroundColor: "#099250" },
              px: 3,
              width: "100%",
            }}
            variant="outlined"
            // onClick={() => setIsOpen(true)}
          >
            Continue
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
