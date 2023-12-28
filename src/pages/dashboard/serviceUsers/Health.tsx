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
import InputField from "../../../components/InputField";
import categories from "../../../../categories.json";
import { useState } from "react";
import NoResultIllustration from "../../../components/NoResult";
import HealthPreview from "./HealthPreview";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { bloodType } from "./shared";
import { Calendar } from "../../../components/CalendarField";

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
}

const initialFormState = {
  categories: "",
  type: "",
  bloodType: "",
  genotype: "",
  manufacturer: "",
  batchNumber: "",
  administrationDate: "",
  expirationDate: "",
  reading: "",
  notes: "",
};
const details = [
  {
    category: "Vitals",
    notes:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,modi. Lorem ipsum dolor, sit amet consectetur adipisicing elit.Officiis, sapiente nemo impedit eligendi tempore dicta consectetur molestiae. Aut quidem distinctio accusantium soluta eligendi.",
    reading: "118/75 mm/hg",
    type: "Blood pressure",
  },
  {
    category: "Immunization",
    notes:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,modi. Lorem ipsum dolor, sit amet consectetur adipisicing elit.Officiis, sapiente nemo impedit eligendi tempore dicta consectetur molestiae. Aut quidem distinctio accusantium soluta eligendi.",
    reading: "",
    type: "Hepatitis B",
  },
  {
    category: "Medical Conditions",
    notes:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,modi. Lorem ipsum dolor, sit amet consectetur adipisicing elit.Officiis, sapiente nemo impedit eligendi tempore dicta consectetur molestiae. Aut quidem distinctio accusantium soluta eligendi.",
    reading: "4.4ml",
    type: "Type 2 Diabetic",
  },
  {
    category: "Diagnosis",
    notes:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,modi. Lorem ipsum dolor, sit amet consectetur adipisicing elit.Officiis, sapiente nemo impedit eligendi tempore dicta consectetur molestiae. Aut quidem distinctio accusantium soluta eligendi.",
    reading: "",
    type: "",
  },
];

interface TextLabelProps {
  text: any;
  label: string;
}
const TextLabel = ({ text, label }: TextLabelProps) => (
  <label
    style={{
      fontWeight: 600,
      color: "#475467",
      fontSize: 18,
      margin: "10px 0px",
      textTransform: "capitalize",
    }}
  >
    {label}
    <Typography fontWeight={400} marginTop={1} fontSize={16} color={"#101928"}>
      {text}
    </Typography>
  </label>
);

export default function Health() {
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState("");
  const [formField, setFormField] = useState<FormState[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = (index: any) => {
    setShow((prevIndex) => (prevIndex === index ? null : index));
  };

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

  const handleSubmit = () => {
    console.log(formField);
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
        mb: 8,
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

              {form.type === "Blood Type" && (
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
                    {bloodType.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              )}

              {form.type === "Genotype" && (
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
                  disableFuture={false}
                  onChange={(newValue: any) =>
                    handleFormChange(index, "expirationDate", newValue.format())
                  }
                />
              )}

              <div style={{ marginTop: "5px" }}>
                <InputField
                  type="text"
                  label="Reading or Description"
                  name={`reading_${index}`}
                  value={form.reading}
                  onChange={(e: any) =>
                    handleFormChange(index, "reading", e.target.value)
                  }
                />
              </div>
            </Box>

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
      {!hide || (details.length === 0 && <NoResultIllustration />)}

      {details.map((item, index) => (
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
            onClick={() => handleToggle(`${item.category}${index}`)}
          >
            <span>{item.category}</span>
            <span>
              {show === `${item.category}${index}` ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
            </span>
          </Button>

          {show === `${item.category}${index}` && (
            <div style={{ padding: 6 }}>
              <TextLabel label="Type" text={item.type} />
              <TextLabel label="Reading" text={item.reading || "None"} />
              <TextLabel label="Additional Notes" text={item.notes} />
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
          reading={form.reading}
          notes={form.notes}
          handleSubmit={handleSubmit}
        />
      ))}
    </Box>
  );
}
