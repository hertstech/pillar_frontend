import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
import moment from "moment";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosInstance } from "../../../Utils";

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

export default function MedicationRecord() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

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

  const createNewMedication = async () => {
    setIsLoading(true);

    const isCategoriesAndTypeEmpty =
      formField.medicationName === "" && formField.medicationType === "";

    if (isCategoriesAndTypeEmpty) {
      setIsLoading(false);

      setIsOpen(false);
      return Swal.fire({
        icon: "info",
        text: `You can not submit an empty form!`,
        confirmButtonColor: "#099250",
      });
    }

    try {
      const res = await axiosInstance.post(
        `/create-serviceuser-medicationrecord/${id}`,
        formField
      );

      setIsOpen(false);
      setIsLoading(false);

      Swal.fire({
        icon: "success",
        title: `Successful`,
        text: `${res.data.message}`,
        confirmButtonColor: "#099250",
      });
    } catch (error: any) {
      error;
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
        confirmButtonColor: "#099250",
      });
    }
  };

  const hasContent =
    formField.medicationName ||
    formField.medicationType ||
    formField.medicationRoute ||
    formField.medicationDosageForm ||
    formField.dosage ||
    formField.dosagemeasurement ||
    formField.frequencyNumber ||
    formField.frequencyType ||
    formField.datePrescribed ||
    formField.startDate ||
    formField.endDate ||
    formField.prescriber ||
    formField.additionalNote;
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

      <>
        <Dialog maxWidth="md" fullWidth open={isOpen}>
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
                <TextLabel
                  label="Name of Medication"
                  text={formField.medicationName}
                />
                <TextLabel
                  label="Type of Medication"
                  text={formField.medicationType}
                />
                <TextLabel label="Route" text={formField.medicationRoute} />
                <TextLabel
                  label="Dosage Form"
                  text={formField.medicationDosageForm}
                />
                <TextLabel
                  label="Dosage"
                  text={`${formField.dosage}, ${formField.dosagemeasurement}`}
                />
                <TextLabel
                  label="Frequency"
                  text={`${formField.frequencyNumber}, ${formField.frequencyType}`}
                />
                <TextLabel
                  label="Date Prescribed"
                  text={moment(formField.datePrescribed).format("DD/MM/YYYY")}
                />
                <TextLabel
                  label="Start Date"
                  text={moment(formField.startDate).format("DD/MM/YYYY")}
                />
                <TextLabel
                  label="End Date"
                  text={moment(formField.endDate).format("DD/MM/YYYY")}
                />
                <TextLabel
                  label="Prescriber Information"
                  text={formField.prescriber}
                />
                <TextLabel
                  label="Additional Notes"
                  text={formField.additionalNote}
                />
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
                No data was entered or something went wrong, please cancel and
                try again...
              </div>
            </>
          )}
          <Stack direction="row" justifyContent="flex-end" gap={5} p={3}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setIsOpen(false)}
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
              onClick={createNewMedication}
              disabled={isLoading}
            >
              Submit
            </Button>
          </Stack>
        </Dialog>
      </>
    </Box>
  );
}
