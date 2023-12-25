import { Box, Stack, Button, Card, TextField, MenuItem } from "@mui/material";
import Styles from "./styles.module.css";
import NoResultIllustration from "../../../components/NoResult";
import { useState } from "react";
import {
  certainty,
  reaction,
  reactionType,
  reportedBy,
  severity,
  substance,
} from "./shared";
import InputField from "../../../components/InputField";
import AllergiesPreview from "./AllergiesPreview";

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

export default function Allergies() {
  const [hide, setHide] = useState(false);
  const [formField, setFormField] = useState<FormState[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

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

              <label htmlFor={`severity_${index}`}>
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

              <label htmlFor={`certainty_${index}`}>
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

          <ul className={Styles.lists}>
            <li>Anxiety disorder, unspecified</li>
            <li>Adjustement disorder and anxiety</li>
            <li>Major depressive disorder</li>
          </ul>
          <div
            style={{
              padding: "16px",
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
              <IoTimeOutline style={{ height: 15, width: 15 }} /> ID: #37493873
            </Typography>
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

          <ul className={Styles.lists}>
            <li>Anxiety disorder, unspecified</li>
            <li>Adjustement disorder and anxiety</li>
            <li>Major depressive disorder</li>
          </ul>
          <div
            style={{
              padding: "16px",
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
              <IoTimeOutline style={{ height: 15, width: 15 }} /> ID: #37493873
            </Typography>
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
          <ul className={Styles.lists}>
            <li>Anxiety disorder, unspecified</li>
            <li>Adjustement disorder and anxiety</li>
            <li>Major depressive disorder</li>
          </ul>
          <div
            style={{
              padding: "16px",
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
              <IoTimeOutline style={{ height: 15, width: 15 }} /> ID: #37493873
            </Typography>
          </div>
        </Box>
      </Stack> */}

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
        />
      ))}
    </Box>
  );
}
