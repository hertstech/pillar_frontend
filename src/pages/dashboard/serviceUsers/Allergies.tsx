import {
  Box,
  Stack,
  Button,
  Card,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import Styles from "./styles.module.css";
import NoResultIllustration from "../../../components/NoResult";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import InputField, { TextLabel } from "../../../components/InputField";
import AllergiesPreview from "./AllergiesPreview";
import {
  certainty,
  reaction,
  reactionType,
  reportedBy,
  severity,
  substance,
} from "./shared";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../Utils/axios";
import Swal from "sweetalert2";
import moment from "moment";

interface FormState {
  substance: string;
  reactionType: string;
  reaction: string;
  severity: string;
  certainty: string;
  evidence: string;
  reportedBy: string;
  relativeName: string;
  notes: string;
}

const initialState = {
  substance: "",
  reactionType: "",
  reaction: "",
  severity: "",
  certainty: "",
  evidence: "",
  reportedBy: "",
  relativeName: "",
  notes: "",
};

interface apiResponse {
  certainty: string;
  date_created: string;
  evidence: string;
  id: string;
  notes: string;
  pillar_faclityname_fk: string;
  pillar_user_id_fk: string;
  reaction: string;
  reactionType: string;
  relativeName: string;
  reportedBy: string;
  serviceuser_id_fk: string;
  severity: string;
  substance: string;
}

export default function Allergies() {
  const [hide, setHide] = useState(false);

  const [show, setShow] = useState("");

  const [formField, setFormField] = useState<FormState[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { id } = useParams();

  const [record, setRecord] = useState<apiResponse[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const addForm = () => {
    setHide(true);
    setFormField((prevForms) => [...prevForms, { ...initialState }]);
  };

  const deleteForm = (index: number) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
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

  const createNewRecord = async () => {
    setIsLoading(true);
    const dataObject = formField[0];
    console.log(dataObject);

    try {
      const res = await axiosInstance.post(
        `/create-serviceuser-allergiesrecord/${id}`,
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
    const getAllergy = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `/serviceuser-allergiesrecord/${id}`
        );

        setRecord(res?.data.result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getAllergy();
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
              <label htmlFor={`substance_${index}`}>
                Substance
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name={`substance_${index}`}
                  value={form.substance}
                  onChange={(e) =>
                    handleFormChange(index, "substance", e.target.value)
                  }
                >
                  {substance.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>

              <label htmlFor={`reactionType_${index}`}>
                Reaction Type
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name={`reactionType_${index}`}
                  value={form.reactionType}
                  onChange={(e) =>
                    handleFormChange(index, "reactionType", e.target.value)
                  }
                >
                  {reactionType.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>

              <label htmlFor={`reaction_${index}`}>
                Reaction
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name={`reaction_${index}`}
                  value={form.reaction}
                  onChange={(e) =>
                    handleFormChange(index, "reaction", e.target.value)
                  }
                >
                  {reaction.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>

              <label
                htmlFor={`severity_${index}`}
                style={{ marginTop: "10px" }}
              >
                Severity
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name={`severity_${index}`}
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

              <label
                htmlFor={`certainty_${index}`}
                style={{ marginTop: "10px" }}
              >
                Certainty
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name={`certainty_${index}`}
                  value={form.certainty}
                  onChange={(e) =>
                    handleFormChange(index, "certainty", e.target.value)
                  }
                >
                  {certainty.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>

              <InputField
                type="text"
                label="Evidence"
                name={`evidence_${index}`}
                value={form.evidence}
                onChange={(e: any) =>
                  handleFormChange(index, "evidence", e.target.value)
                }
              />

              <label htmlFor={`reportedBy_${index}`}>
                Reported By
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name={`reportedBy_${index}`}
                  value={form.reportedBy}
                  onChange={(e) =>
                    handleFormChange(index, "reportedBy", e.target.value)
                  }
                >
                  {reportedBy.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>
            </Box>

            <InputField
              type="text"
              label="Name"
              name={`relativeName_${index}`}
              value={form.relativeName}
              onChange={(e: any) =>
                handleFormChange(index, "relativeName", e.target.value)
              }
            />

            <label htmlFor="notes" style={{ marginTop: "8px" }}>
              Notes
              <textarea
                className={Styles.area}
                name={`notes_${index}`}
                rows={4}
                cols={50}
                value={form.notes}
                onChange={(e) =>
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
      {!hide || (record.length === 0 && <NoResultIllustration />)}

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
            onClick={() => handleToggle(`${item?.substance}${index}`)}
          >
            <span>{item?.substance}</span>
            <span>
              {show === `${item?.substance}${index}` ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
            </span>
          </Button>

          {show === `${item?.substance}${index}` && (
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
                  label="Reaction Type"
                  text={item.reactionType || "None"}
                />
                <TextLabel label="Reaction" text={item.reaction || "None"} />
                <TextLabel label="Severity" text={item.severity || "None"} />
                <TextLabel label="Certainty" text={item.certainty || "None"} />
                <TextLabel label="EVidence" text={item.evidence || "None"} />
                <TextLabel
                  label="Reported by"
                  text={item.reportedBy || "None"}
                />

                <TextLabel
                  label="Name of reporter"
                  text={item.relativeName || "None"}
                />
              </Box>
              <TextLabel label="Additional Notes" text={item.notes || "None"} />

              <div
                style={{
                  padding: "16px 0px",
                  color: "#101928",
                }}
              >
                <Typography fontWeight={400} fontSize={16}>
                  Report created on {moment(item.date_created).format("l")} by
                  ID: #{item.pillar_user_id_fk}
                </Typography>
              </div>
            </div>
          )}
        </Box>
      ))}

      {formField.map((form, index) => (
        <AllergiesPreview
          key={index}
          isOpen={isOpen}
          substance={form.substance}
          reactionType={form.reactionType}
          reaction={form.reaction}
          severity={form.severity}
          certainty={form.certainty}
          evidence={form.evidence}
          reportedBy={form.reportedBy}
          relativeName={form.relativeName}
          notes={form.notes}
          onClose={() => setIsOpen(false)}
          createNewRecord={createNewRecord}
          isLoading={isLoading}
        />
      ))}
    </Box>
  );
}
