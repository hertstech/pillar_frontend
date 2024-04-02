import {
  Box,
  Checkbox,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Calendar } from "../../../../components/CalendarField";
import { useState } from "react";
import {
  bloodTypes,
  genoTypes,
  immunizationTypes,
  medName,
  primaryDiagnosis,
  secondaryDiagnosis,
  treatmentStatus,
} from "../../serviceUsers/shared";

const states = ["Abuja", "Anambra", "Kano", "Lagos"];

const genderType = ["male", "female"];

const ageRange = [
  { value: [0, 12], label: "0-12" },
  { value: [13, 18], label: "13-18" },
  { value: [19, 29], label: "19-29" },
  { value: [30, 60], label: "30-60" },
  { value: [60, 110], label: "60 and Above" },
];

export default function StepOne({ formData, handleChange }: any) {
  const [selectedValue2, setSelectedValue2] = useState("Gender");

  const [diagnosisValue, setDiagnosisValue] = useState("Primary Diagnosis");

  const handleSelectChange = (event: any) => {
    setSelectedValue2(event.target.value);
  };

  const DIAGNOSIS =
    diagnosisValue === "Primary Diagnosis" ||
    diagnosisValue === "Secondary Diagnosis";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "column",
        marginBottom: 2,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Create Report
        </Typography>
        <span
          style={{
            color: "#101928",
            fontWeight: 400,
          }}
        >
          Select the data fields for your report
        </span>
      </div>

      <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
        <>
          {formData.static === false ? (
            <label htmlFor="period">
              Data Period
              <TextField
                select
                fullWidth
                name="duration"
                sx={{ marginTop: "8px" }}
                defaultValue={"Choose data period"}
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
              >
                <MenuItem disabled value="Choose data period">
                  Choose data period
                </MenuItem>
                <MenuItem value={moment().subtract(24, "h").fromNow()}>
                  Last 24 hours
                </MenuItem>
                <MenuItem value={moment().subtract(7, "d").fromNow()}>
                  Last 7 days
                </MenuItem>
                <MenuItem value={moment().subtract(3, "months").fromNow()}>
                  3 months ago
                </MenuItem>
                <MenuItem value={moment().subtract(6, "months").fromNow()}>
                  6 months ago
                </MenuItem>
                <MenuItem value={moment().subtract(1, "years").fromNow()}>
                  1 year
                </MenuItem>
              </TextField>
            </label>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: "50%" }}>
                <Calendar
                  label="From"
                  value={formData.from}
                  disableFuture={true}
                  onChange={(newValue: any) =>
                    handleChange("from", newValue.format())
                  }
                />
              </div>

              <div style={{ width: "50%" }}>
                <Calendar
                  label="To"
                  value={formData.to}
                  disableFuture={false}
                  onChange={(newValue: any) =>
                    handleChange("to", newValue.format())
                  }
                />
              </div>
            </div>
          )}
          <Switch
            sx={{
              "&.MuiSwitch-root .MuiSwitch-switchBase": {
                color: "#101928",
              },

              "&.MuiSwitch-root .Mui-checked": {
                color: "#099250",
              },
            }}
            name="static"
            checked={formData.static}
            onChange={(e: any) => handleChange("static", e.target.checked)}
          />
        </>

        <label htmlFor="report">
          Report Type
          <TextField
            select
            fullWidth
            name="reportType"
            sx={{ marginTop: "8px" }}
            defaultValue={"Choose report type"}
            value={formData.reportType}
            onChange={(e: any) => handleChange("reportType", e.target.value)}
          >
            <MenuItem disabled value="Choose report type">
              Choose report type
            </MenuItem>
            <MenuItem value="Demographics">Demographics</MenuItem>
            <MenuItem value="Health Information">Health Information</MenuItem>
            <MenuItem value="Medication">Medication</MenuItem>
          </TextField>
        </label>

        <div className="">
          <Typography color={"#090816"} fontWeight={600} fontSize={18}>
            Data Fields
          </Typography>

          <label htmlFor="xAxis">
            Field 1
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: "50%" }}>
                <Select fullWidth name="state" defaultValue={"State"}>
                  <MenuItem value="State">State</MenuItem>
                </Select>
              </div>
              <div style={{ width: "50%" }}>
                <Select
                  multiple
                  fullWidth
                  name="state"
                  onChange={(e) => handleChange("state", e.target.value)}
                  value={formData.state || []}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {/* <MenuItem disableGutters onClick={() => [states.length]}>
                    Select All
                  </MenuItem> */}
                    <Checkbox
                      checked={formData.state.length === states.length}
                      indeterminate={
                        formData.state.length > 0 &&
                        formData.state.length < states.length
                      }
                      onChange={(e) => {
                        const allStates = e.target.checked ? states : [];
                        handleChange("state", allStates);
                      }}
                    />
                  {states?.map((state) => (
                    <MenuItem disableGutters selected key={state} value={state}>
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#EDFCF2",
                            stroke: "#099250",
                            strokeWidth: 1,
                            fill: "#099250",
                          },
                        }}
                        checked={formData.state.indexOf(state) > -1}
                      />
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </label>

          <label htmlFor="yAxis" style={{ marginTop: "20px" }}>
            Field 2
            {formData.reportType === "Demographics" && (
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: "50%" }}>
                  <Select
                    fullWidth
                    name="yAxis"
                    value={selectedValue2}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Gender">Gender</MenuItem>
                    <MenuItem value="Age">Age</MenuItem>
                  </Select>
                </div>

                <div style={{ width: "50%" }}>
                  {selectedValue2 === "Gender" && (
                    <Select
                      multiple
                      fullWidth
                      name="gender"
                      value={formData.yAxis.gender || []}
                      onChange={(e) =>
                        handleChange("gender", e.target.value, "yAxis")
                      }
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {genderType.map((item) => (
                        <MenuItem
                          disableGutters
                          selected
                          key={item}
                          value={item}
                        >
                          <Checkbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#EDFCF2",
                                stroke: "#099250",
                                strokeWidth: 1,
                                fill: "#099250",
                              },
                            }}
                            checked={formData.yAxis.gender.indexOf(item) > -1}
                          />
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  )}

                  {selectedValue2 === "Age" && (
                    <Select
                      multiple
                      fullWidth
                      name="age"
                      value={formData.yAxis.age || []}
                      onChange={(e) =>
                        handleChange("age", e.target.value, "yAxis")
                      }
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {ageRange.map((age) => (
                        // @ts-ignore
                        <MenuItem
                          disableGutters
                          selected
                          key={age.label}
                          value={age.value}
                          // disabled={formData.yAxis.age.length > 2 && !formData.yAxis.age.includes(age.value)}
                        >
                          <Checkbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#EDFCF2",
                                stroke: "#099250",
                                strokeWidth: 1,
                                fill: "#099250",
                              },
                            }}
                            checked={formData.yAxis.age.indexOf(age.value) > -1}
                          />
                          {age.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </div>
              </div>
            )}
            {formData.reportType === "Health Information" && (
              <>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: "50%" }}>
                    <Select
                      fullWidth
                      name="yAxis"
                      value={diagnosisValue}
                      onChange={(e: any) => setDiagnosisValue(e.target.value)}
                    >
                      <MenuItem value="Primary Diagnosis">
                        Primary Diagnosis
                      </MenuItem>
                      <MenuItem value="Secondary Diagnosis">
                        Secondary Diagnosis
                      </MenuItem>
                      <MenuItem value="Blood Group">Blood Group</MenuItem>
                      <MenuItem value="Genotype">Genotype</MenuItem>
                      <MenuItem value="Immunization">Immunization</MenuItem>
                    </Select>
                  </div>

                  <div style={{ width: "50%" }}>
                    {diagnosisValue === "Primary Diagnosis" && (
                      <TextField
                        select
                        fullWidth
                        name="primaryDiagnosis"
                        value={formData.diagnosis.primaryDiagnosis}
                        onChange={(e) =>
                          handleChange(
                            "primaryDiagnosis",
                            e.target.value,
                            "",
                            "",
                            true
                          )
                        }
                      >
                        {primaryDiagnosis.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}

                    {diagnosisValue === "Secondary Diagnosis" && (
                      <TextField
                        select
                        fullWidth
                        name="secondaryDiagnosis"
                        value={formData.diagnosis.secondaryDiagnosis}
                        onChange={(e) =>
                          handleChange(
                            "secondaryDiagnosis",
                            e.target.value,
                            "",
                            "",
                            true
                          )
                        }
                      >
                        {secondaryDiagnosis.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}

                    {diagnosisValue === "Blood Group" && (
                      <Select
                        multiple
                        fullWidth
                        name="bloodType"
                        value={formData.bloodType || []}
                        onChange={(e) =>
                          handleChange("bloodType", e.target.value)
                        }
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {bloodTypes.map((item, index) => (
                          <MenuItem
                            disableGutters
                            selected
                            key={index}
                            value={item.value}
                          >
                            <Checkbox
                              sx={{
                                "&.Mui-checked": {
                                  color: "#EDFCF2",
                                  stroke: "#099250",
                                  strokeWidth: 1,
                                  fill: "#099250",
                                },
                              }}
                              checked={
                                formData.bloodType.indexOf(item.value) > -1
                              }
                            />
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}

                    {diagnosisValue === "Immunization" && (
                      <Select
                        multiple
                        fullWidth
                        name="immunizationtype"
                        value={formData.immunizationtype || []}
                        onChange={(e) =>
                          handleChange("immunizationtype", e.target.value)
                        }
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {immunizationTypes.map((immunization) => (
                          <MenuItem
                            disableGutters
                            selected
                            key={immunization}
                            value={immunization}
                          >
                            <Checkbox
                              sx={{
                                "&.Mui-checked": {
                                  color: "#EDFCF2",
                                  stroke: "#099250",
                                  strokeWidth: 1,
                                  fill: "#099250",
                                },
                              }}
                              checked={
                                formData.immunizationtype.indexOf(
                                  immunization
                                ) > -1
                              }
                            />
                            {immunization}
                          </MenuItem>
                        ))}
                      </Select>
                    )}

                    {diagnosisValue === "Genotype" && (
                      <Select
                        multiple
                        fullWidth
                        name="genoType"
                        value={formData.genoType || []}
                        onChange={(e) =>
                          handleChange("genoType", e.target.value)
                        }
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {genoTypes.map((genotype) => (
                          <MenuItem
                            disableGutters
                            selected
                            key={genotype}
                            value={genotype}
                          >
                            <Checkbox
                              sx={{
                                "&.Mui-checked": {
                                  color: "#EDFCF2",
                                  stroke: "#099250",
                                  strokeWidth: 1,
                                  fill: "#099250",
                                },
                              }}
                              checked={formData.genoType.indexOf(genotype) > -1}
                            />
                            {genotype}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </div>
                </div>

                {DIAGNOSIS && (
                  <label
                    htmlFor={`treatmentStatus`}
                    style={{ marginTop: "15px" }}
                  >
                    Treatment Status
                    <Select
                      multiple
                      fullWidth
                      name="treatmentStatus"
                      value={formData.diagnosis.treatmentStatus}
                      onChange={(e) =>
                        handleChange(
                          "treatmentStatus",
                          e.target.value,
                          "",
                          "",
                          true
                        )
                      }
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {treatmentStatus.map((item) => (
                        <MenuItem
                          disableGutters
                          selected
                          key={item}
                          value={item}
                        >
                          <Checkbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#EDFCF2",
                                stroke: "#099250",
                                strokeWidth: 1,
                                fill: "#099250",
                              },
                            }}
                            checked={
                              formData.diagnosis.treatmentStatus.indexOf(item) >
                              -1
                            }
                          />
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </label>
                )}
              </>
            )}
            {formData.reportType === "Medication" && (
              <Select
                multiple
                sx={{ marginTop: "5px" }}
                fullWidth
                name="medicationName"
                value={formData.medicationName || []}
                onChange={(e) => handleChange("medicationName", e.target.value)}
                renderValue={(selected) => selected.join(", ")}
              >
                {medName.map((item, index) => (
                  <MenuItem
                    disableGutters
                    selected
                    key={index}
                    value={item.value}
                    disabled={
                      formData.medicationName.length > 4 &&
                      !formData.medicationName.includes(item.value)
                    }
                  >
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#EDFCF2",
                          stroke: "#099250",
                          strokeWidth: 1,
                          fill: "#099250",
                        },
                      }}
                      checked={formData.medicationName.indexOf(item.value) > -1}
                    />
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </label>
        </div>
      </div>
    </Box>
  );
}
[];
