import { Stack, Box, Button, Card } from "@mui/material";
import NoResultIllustration from "../../../components/NoResult";
import { useState } from "react";
import InputField from "../../../components/InputField";
import Styles from "./styles.module.css";
import NotePreview from "./NotePreview";

interface FormState {
  writtenBy: string;
  additionalNote: string;
}

// interface apiResponse {
//   additionalNote: string;
//   date_created: string;
//   id: string;
//   pillar_faclityname_fk: string;
//   pillar_user_id_fk: string;
//   serviceuser_id_fk: string;
// }

const initialFormState = {
  writtenBy: "",
  additionalNote: "",
};

export default function Notes() {
  const [hide, setHide] = useState(false);
  const [formField, setFormField] = useState<FormState[]>([]);

  // const [show, setShow] = useState("");

  // const [record, setRecord] = useState<apiResponse[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  // const { id } = useParams();

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

    console.log(dataObject);
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
            disabled={hide}
          >
            Add New
          </Button>
        </Stack>
      </div>

      {formField.map((form: any, index: any) => (
        <form>
          <Card sx={{ p: 2 }}>
            <label
              htmlFor="additional notes"
              style={{ marginTop: "8px", marginBottom: 10 }}
            >
              Additional Notes
              <textarea
                className={Styles.area}
                name={`additionalNote_${index}`}
                rows={8}
                cols={50}
                value={form.additionalNote}
                onChange={(e) =>
                  handleFormChange(index, "additionalNote", e.target.value)
                }
              ></textarea>
            </label>

            <div style={{ marginTop: 10 }}>
              <InputField
                type="text"
                label="Notes by"
                name={`writtenBy_${index}`}
                value={form.writtenBy}
                onChange={(e: any) =>
                  handleFormChange(index, "writtenBy", e.target.value)
                }
              />
            </div>

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
                // onClick={() => setIsOpen(true)}
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

      {!hide && formField.length === 0 && <NoResultIllustration />}

      {formField.map((form, index) => (
        <NotePreview
          key={index}
          isOpen={isOpen}
          writtenBy={form.writtenBy}
          additionalNote={form.additionalNote}
          onClose={() => setIsOpen(false)}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ))}
    </Box>
  );
}
