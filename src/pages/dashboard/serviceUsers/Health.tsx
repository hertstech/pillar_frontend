import {
  Box,
  Button,
  Card,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Styles from "./styles.module.css";
import InputField, { TextLabel } from "../../../components/InputField";
import categories from "../../../../categories.json";
import { useEffect, useState } from "react";
import NoResultIllustration from "../../../components/NoResult";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { Calendar } from "../../../components/CalendarField";
import {
  bloodTypes,
  followUpPlans,
  primaryDiagnosis,
  secondaryDiagnosis,
  severity,
  treatmentStatus,
  treatmentType,
} from "./shared";
import HealthPreview from "./HealthPreview";
import { axiosInstance } from "../../../Utils/axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";

const title = ["Dr.", "Mrs.", "Ms."];

interface FormState {
  categories: string;
  type: string;
  bloodType: string;
  genotype: string;
  manufacturer: string;
  batchNumber: string;
  administrationDate: string;
  expirationDate: string;
  reading: string;
  notes: string;
  systolic: string;
  diasttolic: string;
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
}

interface apiResponse {
  administrationDate: string;
  batchNumber: string;
  bloodType: string;
  categories: string;
  date_created: string;
  expirationDate: string;
  genotype: string;
  id: string;
  manufacturer: string;
  notes: string;
  pillar_faclityname_fk: string;
  pillar_user_id_fk: string;
  reading: string;
  serviceuser_id_fk: string;
  type: string;
}

const initialFormState = {
  categories: "",
  type: "",
  bloodType: "",
  genotype: "",
  manufacturer: "",
  batchNumber: "",
  administrationDate: "",
  systolic: "",
  diasttolic: "",
  bpm: "",
  title: "",
  mgDl: "",
  degreeRating: "",
  primaryDiagnosis: "",
  secondaryDiagnosis: "",
  severity: "",
  treatmentStatus: "",
  treatmentType: "",
  followUpPlans: "",
  progressNote: "",
  expirationDate: "",
  reading: "",
  notes: "",
};

export default function Health() {
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState("");
  const [formField, setFormField] = useState<FormState[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [record, setRecord] = useState<apiResponse[]>([]);

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (index: any) => {
    setShow((prevIndex) => (prevIndex === index ? null : index));
  };

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

  const handleSubmit = async () => {
    setIsLoading(true);
    const dataObject = formField[0];

    try {
      const res = await axiosInstance.post(
        `/create-serviceuser-healthsummary/${id}`,
        dataObject
      );

      setIsOpen(false);
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: `Successful`,
        text: `${res.data.message}`,
        confirmButtonColor: "#099250",
      });

      setFormField([]);
      setHide(false);
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
    const getHealthRecord = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `/serviceuser-healthsummaryrecord/${id}`
        );

        setRecord(res?.data.result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getHealthRecord();
  }, [id]);

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
        mb: 8,
        background: "white",
        px: 3,
        pb: 3,
        borderRadius: 2,
        gap: 3,
        minHeight: "610px",
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
              <label
                htmlFor={`category_${index}`}
                style={{ marginTop: "10px" }}
              >
                Category
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="categories"
                  value={form.categories}
                  onChange={(e) =>
                    handleFormChange(index, "categories", e.target.value)
                  }
                >
                  {categories.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </label>

              <label htmlFor={`types${index}`} style={{ marginTop: "10px" }}>
                Type
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="type"
                  value={form.type}
                  onChange={(e) =>
                    handleFormChange(index, "type", e.target.value)
                  }
                >
                  {categories
                    ?.find((category) => category.name === form.categories)
                    ?.type.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item ? item : ""}
                      </MenuItem>
                    ))}
                </TextField>
              </label>

              {form.categories === "Vitals" &&
                form.type === "Blood pressure" && (
                  <div style={{ marginTop: "5px", display: "flex", gap: 5 }}>
                    <InputField
                      type="text"
                      label="Systolic"
                      name={`systolic_${index}`}
                      value={form.systolic}
                      onChange={(e: any) =>
                        handleFormChange(index, "systolic", e.target.value)
                      }
                    />

                    <InputField
                      type="text"
                      label="Diastolic"
                      name={`diasttolic_${index}`}
                      value={form.diasttolic}
                      onChange={(e: any) =>
                        handleFormChange(index, "diasttolic", e.target.value)
                      }
                    />
                  </div>
                )}

              {form.categories === "Vitals" && form.type === "Pulse Rate" && (
                <div style={{ marginTop: "5px" }}>
                  <InputField
                    type="text"
                    label="bpm"
                    name={`bpm_${index}`}
                    value={form.bpm}
                    onChange={(e: any) =>
                      handleFormChange(index, "bpm", e.target.value)
                    }
                  />
                </div>
              )}

              {form.categories === "Vitals" &&
                form.type === "Glucose Level" && (
                  <div style={{ marginTop: "5px" }}>
                    <InputField
                      type="text"
                      label="mg/dl"
                      name={`mg_dl_${index}`}
                      value={form.mg_dl}
                      onChange={(e: any) =>
                        handleFormChange(index, "mg_dl", e.target.value)
                      }
                    />
                  </div>
                )}

              {form.categories === "Vitals" &&
                form.type === "Body Temperature" && (
                  <div style={{ marginTop: "5px", display: "flex", gap: 5 }}>
                    <InputField
                      type="text"
                      label="Reading"
                      name={`reading_${index}`}
                      value={form.reading}
                      onChange={(e: any) =>
                        handleFormChange(index, "reading", e.target.value)
                      }
                    />
                    <label
                      htmlFor={`degreeRating${index}`}
                      style={{ marginTop: "10px" }}
                    >
                      <TextField
                        select
                        sx={{ marginTop: "19px", marginRight: "32px" }}
                        fullWidth
                        name="degreeRating"
                        // value={form.degreeRating}
                        // onChange={(e) =>
                        //   handleFormChange(index, "degreeRating", e.target.value)
                        // }
                      >
                        <MenuItem value="&deg;C">&deg;C</MenuItem>
                        <MenuItem value="&deg;F">&deg;F</MenuItem>
                      </TextField>
                    </label>
                  </div>
                )}

              {form.categories === "Genetic Information" &&
                form.type === "Blood Type" && (
                  <label
                    htmlFor={`bloodType${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Blood Type
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="bloodType"
                      value={form.bloodType}
                      onChange={(e) =>
                        handleFormChange(index, "bloodType", e.target.value)
                      }
                    >
                      {bloodTypes.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                )}

              {form.categories === "Genetic Information" &&
                form.type === "Genotype" && (
                  <label
                    htmlFor={`genotype${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Genotype
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="genotype"
                      value={form.genotype}
                      onChange={(e) =>
                        handleFormChange(index, "genotype", e.target.value)
                      }
                    >
                      <MenuItem value="AA">AA</MenuItem>
                      <MenuItem value="AS">AS</MenuItem>
                      <MenuItem value="SS">SS</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </label>
                )}

              {form.categories === "Immunization" && (
                <label
                  htmlFor={`manufacturer${index}`}
                  style={{ marginTop: "10px" }}
                >
                  Manufacturer
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name="manufacturer"
                    value={form.manufacturer}
                    onChange={(e) =>
                      handleFormChange(index, "manufacturer", e.target.value)
                    }
                  >
                    <MenuItem value="Lonza">Lonza</MenuItem>
                    <MenuItem value="Pfizer">Pfizer</MenuItem>
                    <MenuItem value="Sanofi">Sanofi</MenuItem>
                    <MenuItem value="Moderna">Moderna</MenuItem>
                    <MenuItem value="Sinovac">Sinovac</MenuItem>
                  </TextField>
                </label>
              )}

              {form.categories === "Immunization" && (
                <div style={{ marginTop: "5px" }}>
                  <InputField
                    type="text"
                    label="Batch Number"
                    name={`batchNumber_${index}`}
                    value={form.batchNumber}
                    onChange={(e: any) =>
                      handleFormChange(index, "batchNumber", e.target.value)
                    }
                  />
                </div>
              )}

              {form.categories === "Immunization" && (
                <Calendar
                  label="Administration Date"
                  value={form.administrationDate}
                  disableFuture={false}
                  onChange={(newValue: any) =>
                    handleFormChange(
                      index,
                      "administrationDate",
                      newValue.format()
                    )
                  }
                />
              )}

              {form.categories === "Immunization" && (
                <Calendar
                  label="Expiration Date"
                  value={form.expirationDate}
                  minDate={dayjs(form.administrationDate)}
                  // disableFuture={false}
                  onChange={(newValue: any) =>
                    handleFormChange(index, "expirationDate", newValue.format())
                  }
                />
              )}

              {form.categories === "Diagnosis" &&
                form.type === "Primary Diagnosis" && (
                  <label
                    htmlFor={`primaryDiagnosis${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Primary Diagnosis
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="primaryDiagnosis"
                      value={form.primaryDiagnosis}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "primaryDiagnosis",
                          e.target.value
                        )
                      }
                    >
                      {primaryDiagnosis.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                )}

              {form.categories === "Diagnosis" &&
                form.type === "Secondary Diagnosis" && (
                  <label
                    htmlFor={`secondaryDiagnosis${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Secondary Diagnosis
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="secondaryDiagnosis"
                      value={form.secondaryDiagnosis}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "secondaryDiagnosis",
                          e.target.value
                        )
                      }
                    >
                      {secondaryDiagnosis.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                )}

              {form.categories === "Diagnosis" && (
                <label
                  htmlFor={`severity${index}`}
                  style={{ marginTop: "10px" }}
                >
                  Severity
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name="severity"
                    value={form.severity}
                    onChange={(e) =>
                      handleFormChange(index, "severity", e.target.value)
                    }
                  >
                    {severity.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              )}

              {form.categories === "Diagnosis" && (
                <label
                  htmlFor={`treatmentStatus${index}`}
                  style={{ marginTop: "10px" }}
                >
                  Treatment Status
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name="treatmentStatus"
                    value={form.treatmentStatus}
                    onChange={(e) =>
                      handleFormChange(index, "treatmentStatus", e.target.value)
                    }
                  >
                    {treatmentStatus.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              )}

              {form.categories === "Diagnosis" && (
                <label
                  htmlFor={`treatmentType${index}`}
                  style={{ marginTop: "10px" }}
                >
                  Treatment Type
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name="treatmentType"
                    value={form.treatmentType}
                    onChange={(e) =>
                      handleFormChange(index, "treatmentType", e.target.value)
                    }
                  >
                    {treatmentType.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              )}

              {form.categories === "Diagnosis" && (
                <label
                  htmlFor={`followUpPlans${index}`}
                  style={{ marginTop: "10px" }}
                >
                  Follow Up Plan
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name="followUpPlans"
                    value={form.followUpPlans}
                    onChange={(e) =>
                      handleFormChange(index, "followUpPlans", e.target.value)
                    }
                  >
                    {followUpPlans.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              )}
            </Box>

            {form.categories === "Diagnosis" && (
              <div style={{ marginTop: "5px", display: "flex", gap: 5 }}>
                <label htmlFor={`title${index}`} style={{ marginTop: "10px" }}>
                  Title
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name="title"
                    value={form.title}
                    onChange={(e) =>
                      handleFormChange(index, "title", e.target.value)
                    }
                  >
                    {title.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
                <InputField
                  type="text"
                  label="Name"
                  name={`reading_${index}`}
                  value={form.reading}
                  onChange={(e: any) =>
                    handleFormChange(index, "reading", e.target.value)
                  }
                />
              </div>
            )}

            {form.categories === "Diagnosis" && (
              <label htmlFor="notes" style={{ marginTop: "10px" }}>
                Progress Notes
                <textarea
                  className={Styles.area}
                  name={`progressNote_${index}`}
                  rows={4}
                  cols={50}
                  value={form.progressNote}
                  onChange={(e: any) =>
                    handleFormChange(index, "progressNote", e.target.value)
                  }
                ></textarea>
              </label>
            )}

            <label htmlFor="notes" style={{ marginTop: "10px" }}>
              Additional Notes
              <textarea
                className={Styles.area}
                name={`notes_${index}`}
                rows={7}
                cols={50}
                value={form.notes}
                onChange={(e: any) =>
                  handleFormChange(index, "notes", e.target.value)
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
            onClick={() => handleToggle(`${item?.categories}${index}`)}
          >
            <span>{item?.categories}</span>
            <span>
              {show === `${item?.categories}${index}` ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
            </span>
          </Button>

          {show === `${item?.categories}${index}` && (
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
                  label="Date Created"
                  text={
                    moment(item.date_created).format("DD/MM/YYYY") || "None"
                  }
                />
                <TextLabel label="Type" text={item.type || "None"} />
                <TextLabel label="Reading" text={item.reading || "None"} />

                {item.categories === "Immunization" && (
                  <TextLabel
                    label="Manufacturer"
                    text={item.manufacturer || "None"}
                  />
                )}
                {item.categories === "Immunization" && (
                  <TextLabel
                    label="Batch Number"
                    text={item.batchNumber || "None"}
                  />
                )}
                {item.type === "Genotype" && (
                  <TextLabel label="Genotype" text={item.genotype || "None"} />
                )}

                {item.categories === "Genetic Information" && (
                  <TextLabel
                    label="Blood Type"
                    text={item.bloodType || "None"}
                  />
                )}
              </Box>
              <TextLabel label="Additional Notes" text={item.notes || "None"} />

              <div
                style={{
                  padding: "16px 0px",
                  color: "#101928",
                }}
              >
                <Typography fontWeight={400} fontSize={12}>
                  Administered by
                </Typography>
                <Typography
                  fontWeight={400}
                  fontSize={14}
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <IoTimeOutline style={{ height: 15, width: 15 }} /> ID: #
                  {item.pillar_user_id_fk}
                </Typography>
              </div>
            </div>
          )}
        </Box>
      ))}

      {formField.map((form, index) => (
        <HealthPreview
          key={index}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          categories={form.categories}
          type={form.type}
          systolic={form.systolic}
          diasttolic={form.diasttolic}
          reading={form.reading}
          notes={form.notes}
          bpm={form.bpm}
          title={form.title}
          mgDl={form.mgDl}
          degreeRating={form.degreeRating}
          primaryDiagnosis={form.primaryDiagnosis}
          secondaryDiagnosis={form.secondaryDiagnosis}
          severity={form.severity}
          treatmentStatus={form.treatmentStatus}
          treatmentType={form.treatmentType}
          followUpPlans={form.followUpPlans}
          progressNote={form.progressNote}
          bloodType={form.bloodType}
          genotype={form.genotype}
          manufacturer={form.manufacturer}
          batchNumber={form.batchNumber}
          administrationDate={form.administrationDate}
          expirationDate={form.expirationDate}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ))}
    </Box>
  );
}
