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
import categories from "../../../../categories.json";
import { Calendar } from "../../../components/CalendarField";
import InputField, { TextLabel } from "../../../components/InputField";
import {
  bloodTypes,
  primaryDiagnosis,
  secondaryDiagnosis,
  severity,
  treatmentStatus,
  treatmentType,
  followUpPlans,
} from "../serviceUsers/shared";
import Styles from "../serviceUsers/styles.module.css";
import moment from "moment";

const title = ["Dr.", "Mrs.", "Ms."];

export default function HealthRecord() {
  const [formField, setFormField] = React.useState({
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
  });

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleChange = (name: string, value: any) => {
    setFormField({
      ...formField,
      [name || ""]: value,
    });
  };

  const hasContent =
    formField.categories ||
    formField.type ||
    formField.reading ||
    formField.notes;

  return (
    <Box>
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Record Health Information
        </Typography>
      </div>

      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <label htmlFor="category">
            Category
            <TextField
              select
              fullWidth
              sx={{ marginTop: "5px" }}
              name="categories"
              value={formField.categories}
              onChange={(e: any) => handleChange("categories", e.target.value)}
            >
              {categories.map((item, index) => (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor="type">
            Type
            <TextField
              select
              fullWidth
              sx={{ marginTop: "5px" }}
              name="type"
              value={formField.type}
              onChange={(e: any) => handleChange("type", e.target.value)}
            >
              {categories
                ?.find((category) => category.name === formField.categories)
                ?.type.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item ? item : ""}
                  </MenuItem>
                ))}
            </TextField>
          </label>

          {formField.categories === "Vitals" &&
            formField.type === "Blood pressure" && (
              <div
                style={{ display: "flex", gap: 12, flexDirection: "column" }}
              >
                <InputField
                  type="text"
                  label="Systolic"
                  name="systolic"
                  value={formField.systolic}
                  onChange={(e: any) =>
                    handleChange("systolic", e.target.value)
                  }
                />

                <InputField
                  type="text"
                  label="Diastolic"
                  name="diasttolic"
                  value={formField.diasttolic}
                  onChange={(e: any) =>
                    handleChange("diasttolic", e.target.value)
                  }
                />
              </div>
            )}

          {formField.categories === "Vitals" &&
            formField.type === "Pulse Rate" && (
              <InputField
                type="text"
                label="Pulse Reading"
                name="bpm"
                value={formField.bpm}
                onChange={(e: any) => handleChange("bpm", e.target.value)}
              />
            )}

          {formField.categories === "Vitals" &&
            formField.type === "Glucose Level" && (
              <div style={{ marginTop: "5px" }}>
                <InputField
                  type="text"
                  label="Glucose Level Reading"
                  name="mgDl"
                  value={formField.mgDl}
                  onChange={(e: any) => handleChange("mgDl", e.target.value)}
                />
              </div>
            )}

          {formField.categories === "Vitals" &&
            formField.type === "Body Temperature" && (
              <div style={{ display: "flex", gap: 5, alignItems: "flex-end" }}>
                <InputField
                  type="text"
                  label="Temperature Reading"
                  name="reading"
                  value={formField.reading}
                  onChange={(e: any) => handleChange("reading", e.target.value)}
                />

                <label htmlFor="degreeRating">
                  <TextField
                    select
                    sx={{ width: "100px" }}
                    fullWidth
                    name="degreeRating"
                    value={formField.degreeRating}
                    onChange={(e) =>
                      handleChange("degreeRating", e.target.value)
                    }
                  >
                    <MenuItem value="&deg;C">&deg;C</MenuItem>
                    <MenuItem value="&deg;F">&deg;F</MenuItem>
                  </TextField>
                </label>
              </div>
            )}

          {formField.categories === "Genetic Information" &&
            formField.type === "Blood Type" && (
              <label htmlFor="bloodType">
                Blood Type
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="bloodType"
                  value={formField.bloodType}
                  onChange={(e) => handleChange("bloodType", e.target.value)}
                >
                  {bloodTypes.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>
            )}

          {formField.categories === "Genetic Information" &&
            formField.type === "Genotype" && (
              <label htmlFor="genotype">
                Genotype
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="genotype"
                  value={formField.genotype}
                  onChange={(e) => handleChange("genotype", e.target.value)}
                >
                  <MenuItem value="AA">AA</MenuItem>
                  <MenuItem value="AS">AS</MenuItem>
                  <MenuItem value="SS">SS</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </label>
            )}

          {formField.categories === "Immunization" && (
            <label htmlFor={`manufacturer`}>
              Manufacturer
              <TextField
                select
                sx={{ marginTop: "5px" }}
                fullWidth
                name="manufacturer"
                value={formField.manufacturer}
                onChange={(e) => handleChange("manufacturer", e.target.value)}
              >
                <MenuItem value="Lonza">Lonza</MenuItem>
                <MenuItem value="Pfizer">Pfizer</MenuItem>
                <MenuItem value="Sanofi">Sanofi</MenuItem>
                <MenuItem value="Moderna">Moderna</MenuItem>
                <MenuItem value="Sinovac">Sinovac</MenuItem>
              </TextField>
            </label>
          )}

          {formField.categories === "Immunization" && (
            <InputField
              type="text"
              label="Batch Number"
              name={`batchNumber`}
              value={formField.batchNumber}
              onChange={(e: any) => handleChange("batchNumber", e.target.value)}
            />
          )}

          {formField.categories === "Immunization" && (
            <Calendar
              label="Administration Date"
              value={formField.administrationDate}
              disableFuture={false}
              onChange={(newValue: any) =>
                handleChange("administrationDate", newValue.format())
              }
            />
          )}

          {formField.categories === "Immunization" && (
            <Calendar
              label="Expiration Date"
              value={formField.expirationDate}
              minDate={dayjs(formField.administrationDate)}
              onChange={(newValue: any) =>
                handleChange("expirationDate", newValue.format())
              }
            />
          )}

          {formField.categories === "Diagnosis" &&
            formField.type === "Primary Diagnosis" && (
              <label htmlFor={`primaryDiagnosis`}>
                Primary Diagnosis
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="primaryDiagnosis"
                  value={formField.primaryDiagnosis}
                  onChange={(e) =>
                    handleChange("primaryDiagnosis", e.target.value)
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

          {formField.categories === "Diagnosis" &&
            formField.type === "Secondary Diagnosis" && (
              <label htmlFor={`secondaryDiagnosis`}>
                Secondary Diagnosis
                <TextField
                  select
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="secondaryDiagnosis"
                  value={formField.secondaryDiagnosis}
                  onChange={(e) =>
                    handleChange("secondaryDiagnosis", e.target.value)
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

          {formField.categories === "Diagnosis" && (
            <label htmlFor={`severity`}>
              Severity
              <TextField
                select
                sx={{ marginTop: "5px" }}
                fullWidth
                name="severity"
                value={formField.severity}
                onChange={(e) => handleChange("severity", e.target.value)}
              >
                {severity.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </label>
          )}

          {formField.categories === "Diagnosis" && (
            <label htmlFor={`treatmentStatus`}>
              Treatment Status
              <TextField
                select
                sx={{ marginTop: "5px" }}
                fullWidth
                name="treatmentStatus"
                value={formField.treatmentStatus}
                onChange={(e) =>
                  handleChange("treatmentStatus", e.target.value)
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

          {formField.categories === "Diagnosis" && (
            <label htmlFor={`treatmentType`}>
              Treatment Type
              <TextField
                select
                sx={{ marginTop: "5px" }}
                fullWidth
                name="treatmentType"
                value={formField.treatmentType}
                onChange={(e) => handleChange("treatmentType", e.target.value)}
              >
                {treatmentType.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </label>
          )}

          {formField.categories === "Diagnosis" && (
            <label htmlFor={`followUpPlans`}>
              Follow Up Plan
              <TextField
                select
                sx={{ marginTop: "5px" }}
                fullWidth
                name="followUpPlans"
                value={formField.followUpPlans}
                onChange={(e) => handleChange("followUpPlans", e.target.value)}
              >
                {followUpPlans.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </label>
          )}

          {formField.categories === "Diagnosis" && (
            <div style={{ display: "flex", gap: 5, alignItems: "flex-end" }}>
              <label htmlFor={`title`}>
                Title
                <TextField
                  select
                  sx={{ marginTop: "5px", width: "100px" }}
                  fullWidth
                  name="title"
                  value={formField.title}
                  onChange={(e) => handleChange("title", e.target.value)}
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
                name={`reading_`}
                value={formField.reading}
                onChange={(e: any) => handleChange("reading", e.target.value)}
              />
            </div>
          )}

          {formField.categories === "Diagnosis" && (
            <label htmlFor="notes">
              Progress Notes
              <textarea
                className={Styles.area}
                name={`progressNote_`}
                rows={4}
                cols={50}
                value={formField.progressNote}
                onChange={(e: any) =>
                  handleChange("progressNote", e.target.value)
                }
              ></textarea>
            </label>
          )}

          <label htmlFor="notes">
            Additional Notes
            <textarea
              className={Styles.area}
              name={`notes`}
              rows={7}
              cols={50}
              value={formField.notes}
              onChange={(e: any) => handleChange("notes", e.target.value)}
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
            onClick={() => setIsOpen(true)}
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
              Preview Health Details
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
                <TextLabel label="Category" text={categories} />
                <TextLabel label="Type" text={formField.type} />

                {/* VITALS DATA VIEW*/}
                {formField.type === "Blood pressure" && (
                  <TextLabel
                    label="Systolic Reading"
                    text={formField.systolic}
                  />
                )}

                {formField.type === "Blood pressure" && (
                  <TextLabel
                    label="Diastolic Reading"
                    text={formField.diasttolic}
                  />
                )}

                {formField.type === "Body Temperature" && (
                  <TextLabel
                    label="Reading"
                    text={
                      `${formField.reading} ${formField.degreeRating}` || "N/A"
                    }
                  />
                )}

                {formField.type === "Pulse Rate" && (
                  <TextLabel label="Beat Per Minute" text={formField.bpm} />
                )}

                {formField.type === "Glucose Level" && (
                  <TextLabel label="Glucose level" text={formField.mgDl} />
                )}

                {/* GENETIC INFORMATION */}
                {formField.type === "Blood Type" && (
                  <TextLabel label="Blood Type" text={formField.bloodType} />
                )}

                {formField.type === "Genotype" && (
                  <TextLabel
                    label="Genotype"
                    text={formField.genotype || "N/A"}
                  />
                )}

                {/* IMMUNIZATION DATA */}
                {formField.categories === "Immunization" && (
                  <TextLabel
                    label="Manufacturer"
                    text={formField.manufacturer || "N/A"}
                  />
                )}

                {formField.categories === "Immunization" && (
                  <TextLabel
                    label="Batch Number"
                    text={formField.batchNumber || "N/A"}
                  />
                )}

                {formField.categories === "Immunization" && (
                  <TextLabel
                    label="Administration Date"
                    text={moment(formField.administrationDate).format(
                      "DD/MM/YYYY"
                    )}
                  />
                )}

                {formField.categories === "Immunization" && (
                  <TextLabel
                    label="Expiration Date"
                    text={moment(formField.expirationDate).format("DD/MM/YYYY")}
                  />
                )}

                {/* DIAGNOSIS DATA VIEW*/}
                {formField.type === "Primary Diagnosis" && (
                  <TextLabel
                    label="Primary Diagnosis"
                    text={formField.primaryDiagnosis || "N/A"}
                  />
                )}

                {formField.type === "Secondary Diagnosis" && (
                  <TextLabel
                    label="Secondary Diagnosis"
                    text={formField.secondaryDiagnosis || "N/A"}
                  />
                )}

                {formField.categories === "Diagnosis" && (
                  <TextLabel
                    label="Severity"
                    text={formField.severity || "N/A"}
                  />
                )}

                {formField.categories === "Diagnosis" && (
                  <TextLabel
                    label="Treatment Status"
                    text={formField.treatmentStatus || "N/A"}
                  />
                )}

                {formField.categories === "Diagnosis" && (
                  <TextLabel
                    label="Treatment type"
                    text={formField.treatmentType || "N/A"}
                  />
                )}

                {formField.categories === "Diagnosis" && (
                  <TextLabel
                    label="Follow up Plans"
                    text={formField.followUpPlans || "N/A"}
                  />
                )}

                {formField.categories === "Diagnosis" && (
                  <TextLabel
                    label="Prescribed by"
                    text={`${formField.title} ${formField.reading}` || "N/A"}
                  />
                )}

                {formField.categories === "Diagnosis" && (
                  <TextLabel
                    label="Progress notes"
                    text={formField.progressNote}
                  />
                )}

                <TextLabel label="Notes" text={formField.notes} />
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
              // onClick={handleSubmit}
              // disabled={isLoading}
            >
              Submit
            </Button>
          </Stack>
        </Dialog>
      </>
    </Box>
  );
}