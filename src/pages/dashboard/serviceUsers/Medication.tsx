import { Box, Stack, Button, Card, TextField, MenuItem } from "@mui/material";
import NoResultIllustration from "../../../components/NoResult";
import { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import { Calendar } from "../../../components/CalendarField";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import InputField, { TextLabel } from "../../../components/InputField";
import Preview from "./MedPreview";
import {
  medName,
  medType,
  medRoute,
  medDosageForm,
  medDosage,
  medFrequency,
} from "./shared";
import { axiosInstance } from "../../../Utils/axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

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

interface apiResponse {
  additionalNote: string;
  datePrescribed: string;
  date_created: string;
  dosage: string;
  dosagemeasurement: string;
  endDate: string;
  frequencyNumber: string;
  frequencyType: string;
  id: string;
  medicationDosageForm: string;
  medicationName: string;
  medicationRoute: string;
  medicationType: string;
  pillar_faclityname_fk: string;
  pillar_user_id_fk: string;
  prescriber: string;
  serviceuser_id_fk: string;
  startDate: string;
}

export default function Assessment() {
  const [hide, setHide] = useState(false);

  const [show, setShow] = useState("");

  const [formField, setFormField] = useState<FormState[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [record, setRecord] = useState<apiResponse[]>([]);

  const addForm = () => {
    // Check if any of the form fields have a value
    const isFormEmpty = Object.values(formField).every((value) => !value);

    if (!isFormEmpty) {
      // If any form field has a value, disable the "Add New" button
      return;
    }

    setHide(true);
    setFormField((prevForms) => [...prevForms, { ...initialFormState }]);
  };

  const deleteForm = (index: number) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
    setHide(false);
  };

  const handleToggle = (index: any) => {
    setShow((prevIndex) => (prevIndex === index ? null : index));
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

  const createNewMedication = async () => {
    setIsLoading(true);
    const dataObject = formField[0];
    console.log(dataObject);

    try {
      const res = await axiosInstance.post(
        `/create-serviceuser-medicationrecord/${id}`,
        dataObject
      );

      console.log(res.data);
      setIsOpen(false);
      setIsLoading(false);

      Swal.fire({
        icon: "success",
        title: `Successful`,
        text: `${res.data.message}`,
        confirmButtonColor: "#099250",
      });

      setFormField([]);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
        confirmButtonColor: "#099250",
      });
    }
  };

  useEffect(() => {
    const getMedication = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `/serviceuser-medicationrecord/${id}`
        );

        setRecord(res?.data.result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getMedication();
  }, [id]);

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
        minHeight: "610px",
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
            disabled={hide}
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
                  sx={{ marginTop: "8px" }}
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
                    sx={{ marginTop: "8px", width: "40%" }}
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
                    sx={{ marginTop: "8px", width: "40%" }}
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
                disableFuture={false}
                onChange={(newValue: any) =>
                  handleFormChange(index, "datePrescribed", newValue.format())
                }
              />
              <Calendar
                label="Start Date"
                value={form.startDate}
                disableFuture={false}
                disablePast={true}
                onChange={(newValue: any) =>
                  handleFormChange(index, "startDate", newValue.format())
                }
              />

              <Calendar
                label="End Date"
                value={form.endDate}
                disableFuture={false}
                disablePast={true}
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
                rows={5}
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
                Continue
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
      {!hide && record.length === 0 && <NoResultIllustration />}

      {record.map((item, index) => (
        <Box key={index}>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              userSelect: "none",
              fontSize: 18,
              justifyContent: "space-between",
              border: "1px #E4E7EC solid",
              textTransform: "capitalize",
              color: "#099250",
            }}
            fullWidth
            onClick={() => handleToggle(`${item?.medicationName}${index}`)}
          >
            <span>{item?.medicationName}</span>
            <span>
              {show === `${item?.medicationName}${index}` ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
            </span>
          </Button>

          {show === `${item?.medicationName}${index}` && (
            <div style={{ padding: 6 }}>
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
                <TextLabel
                  label="Date Prescribed"
                  text={moment(item.date_created).format("l") || "None"}
                />
                <TextLabel
                  label="Name of Medication"
                  text={item.medicationName || "None"}
                />
                <TextLabel
                  label="Type of Medication"
                  text={item.medicationType || "None"}
                />
                <TextLabel
                  label="Route"
                  text={item.medicationRoute || "None"}
                />
                <TextLabel
                  label="Dosage Form"
                  text={item.medicationDosageForm || "None"}
                />
                <TextLabel label="Dosage" text={item.dosage || "None"} />
                <TextLabel
                  label="Frequency"
                  text={item.frequencyType || "None"}
                />
              </Box>
              <TextLabel
                label="Prescriber Information"
                text={item.prescriber || "None"}
              />
              <TextLabel
                label="Additional Notes"
                text={item.additionalNote || "None"}
              />
            </div>
          )}
        </Box>
      ))}

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
          createNewMedication={createNewMedication}
          isLoading={isLoading}
        />
      ))}
    </Box>
  );
}
