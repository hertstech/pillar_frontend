import { Box, Stack, Button, Card, TextField, MenuItem } from "@mui/material";
import NoResultIllustration from "../../../components/NoResult";
import { useState } from "react";
import {
  medDosage,
  medDosageForm,
  medFrequency,
  medName,
  medRoute,
  medType,
} from "./shared";
import Styles from "./styles.module.css";
import { Calendar } from "../../../components/CalendarField";
import InputField from "../../../components/InputField";
import Preview from "./MedPreview";

// Define the type for your form state
interface FormState {
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
}

const initialFormState = {
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
};

export default function Assessment() {
  const [hide, setHide] = useState(false);
  const [formField, setFormField] = useState<FormState[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addForm = () => {
    setHide(true);
    setFormField((prevForms) => [...prevForms, { ...initialFormState }]);
  };

  const deleteForm = (index: number) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
  };

  const handleFormChange = (index: number, field: any, value: any) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms[index] = {
        ...newForms[index],
        [field]: value,
      };
      return newForms;
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        flexDirection: "column",
        display: "flex",
        mb: 10,
        background: "white",
        px: 3,
        pb: 3,
        borderRadius: 2,
        gap: 3,
      }}
    >
      <div style={{ marginBottom: "50px" }}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          position={"absolute"}
          p={1.5}
          display={"flex"}
          right={0}
        >
          <Button
            variant="contained"
            sx={{
              color: "#FFF",
              outline: "none",
              textTransform: "capitalize",
              fontWeight: 600,
              background: "#099250",
              "&:hover": { backgroundColor: "#099250" },
            }}
            onClick={addForm}
          >
            Add New
          </Button>
        </Stack>
      </div>

      {formField.map((form: any, index: any) => (
        <form>
          <Card sx={{ p: 2 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 1.5,
                rowGap: 1.5,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
              }}
            >
              <label htmlFor={`med_Name_${index}`}>
                Name of Medication
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name={`medicationName_${index}`}
                  value={form.medicationName}
                  onChange={(e) =>
                    handleFormChange(index, "medicationName", e.target.value)
                  }
                >
                  {medName.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>

              <label htmlFor={`med_Type_${index}`}>
                Type of Medication
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name={`medicationType_${index}`}
                  value={form.medicationType}
                  onChange={(e) =>
                    handleFormChange(index, "medicationType", e.target.value)
                  }
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
                  name={`medicationRoute_${index}`}
                  value={form.medicationRoute}
                  onChange={(e) =>
                    handleFormChange(index, "medicationRoute", e.target.value)
                  }
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
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name={`medicationDosageForm_${index}`}
                  value={form.medicationDosageForm}
                  onChange={(e) =>
                    handleFormChange(
                      index,
                      "medicationDosageForm",
                      e.target.value
                    )
                  }
                >
                  {medDosageForm.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>

              <label htmlFor="dosage">
                Dosage
                <div style={{ display: "flex", gap: 5 }}>
                  <input
                    type="text"
                    name={`dosage_${index}`}
                    value={form.dosage}
                    onChange={(e) =>
                      handleFormChange(index, "dosage", e.target.value)
                    }
                    className={Styles.input}
                  />
                  <TextField
                    select
                    sx={{ marginTop: "5px", width: "40%" }}
                    name={`dosagemeasurement_${index}`}
                    value={form.dosagemeasurement}
                    onChange={(e) =>
                      handleFormChange(
                        index,
                        "dosagemeasurement",
                        e.target.value
                      )
                    }
                  >
                    {medDosage.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </label>

              <label htmlFor="frequency">
                Frequency
                <div style={{ display: "flex", gap: 5 }}>
                  <input
                    type="text"
                    name={`frequencyNumber_${index}`}
                    value={form.frequencyNumber}
                    onChange={(e) =>
                      handleFormChange(index, "frequencyNumber", e.target.value)
                    }
                    className={Styles.input}
                  />
                  <TextField
                    select
                    sx={{ marginTop: "5px", width: "40%" }}
                    name={`frequencyType_${index}`}
                    value={form.frequencyType}
                    onChange={(e) =>
                      handleFormChange(index, "frequencyType", e.target.value)
                    }
                  >
                    {medFrequency.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </label>

              <Calendar
                label="Date Prescribed"
                value={form.datePrescribed}
                onChange={(newValue: any) =>
                  handleFormChange(index, "datePrescribed", newValue.format())
                }
              />
              <Calendar
                label="Start Date"
                value={form.startDate}
                onChange={(newValue: any) =>
                  handleFormChange(index, "startDate", newValue.format())
                }
              />

              <Calendar
                label="End Date"
                value={form.endDate}
                onChange={(newValue: any) =>
                  handleFormChange(index, "endDate", newValue.format())
                }
              />
            </Box>

            <InputField
              type="text"
              label="Prescriber Name"
              name={`prescriber_${index}`}
              value={form.prescriber}
              onChange={(e: any) =>
                handleFormChange(index, "prescriber", e.target.value)
              }
            />

            <label htmlFor="additional notes" style={{ marginTop: "8px" }}>
              Additional Notes
              <textarea
                className={Styles.area}
                name={`additionalNote_${index}`}
                rows={4}
                cols={50}
                value={form.additionalNote}
                onChange={(e) =>
                  handleFormChange(index, "additionalNote", e.target.value)
                }
              ></textarea>
            </label>

            <Stack
              direction="row"
              justifyContent="flex-end"
              marginTop={2}
              gap={5}
            >
              <Button
                sx={{
                  color: "#FFF",
                  outline: "none",
                  fontWeight: 600,
                  background: "#099250",
                  "&:hover": { backgroundColor: "#099250" },
                  px: 3,
                }}
                variant="outlined"
                onClick={() => setIsOpen(true)}
              >
                Preview
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteForm(index)}
              >
                Delete Form
              </Button>
            </Stack>
          </Card>
        </form>
      ))}

      {/* INITIAL STATE WHEN EMPTY */}
      {!hide && formField.length === 0 && <NoResultIllustration />}

      {/* <Stack>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px #E4E7EC solid",
            gap: 2,
            background: "white",
            width: "100%",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
            Dr Ojo’s Assessment - 7th October 2021
          </Typography>

          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              padding: "16px 24px",
            }}
          >
            <TextLabel label="Health Condition" text="Severe Headache" />
            <TextLabel label="Prescription" text="Paracetamol tablet" />
            <TextLabel
              label="Comment"
              text="Patient looking to respond tp treatment"
            />
          </div>
        </Box>
      </Stack> */}

      {/* <Stack>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px #E4E7EC solid",
            gap: 2,
            background: "white",
            width: "100%",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
            Dr Ojo’s Assessment - 6th October 2021
          </Typography>

          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              padding: "16px 24px",
            }}
          >
            <TextLabel label="Health Condition" text="Severe Headache" />
            <TextLabel label="Prescription" text="Paracetamol tablet" />
            <TextLabel
              label="Comment"
              text="Patient looking to respond tp treatment"
            />
          </div>
        </Box>
      </Stack> */}

      {/* <Stack>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px #E4E7EC solid",
            gap: 2,
            background: "white",
            width: "100%",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
            Dr Ojo’s Assessment - 5th October 2021
          </Typography>

          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              padding: "16px 24px",
            }}
          >
            <TextLabel label="Health Condition" text="Severe Headache" />
            <TextLabel label="Prescription" text="Paracetamol tablet" />
            <TextLabel
              label="Comment"
              text="Patient looking to respond tp treatment"
            />
          </div>
        </Box>
      </Stack> */}
      {formField.map((form, index) => (
        <Preview
          key={index}
          medicationName={form.medicationName}
          medicationType={form.medicationType}
          medicationRoute={form.medicationRoute}
          medicationDosageForm={form.medicationDosageForm}
          dosage={form.dosage}
          dosagemeasurement={form.dosagemeasurement}
          frequencyNumber={form.frequencyNumber}
          frequencyType={form.frequencyType}
          datePrescribed={form.datePrescribed}
          startDate={form.startDate}
          endDate={form.endDate}
          prescriber={form.prescriber}
          additionalNote={form.additionalNote}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      ))}
    </Box>
  );
}
