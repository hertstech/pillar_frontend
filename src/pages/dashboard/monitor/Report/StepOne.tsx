import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";

const states = ["Abuja", "Anambra", "Kano", "Lagos"];

const ageRange = [
  { value: "(0, 12)", label: "0-12" },
  { value: "(13, 18)", label: "13-18" },
  { value: "(19, 29)", label: "19-29" },
  { value: "(30, 60)", label: "30-60" },
  { value: "(60, 110)", label: "60 and Above" },
];

export default function StepOne({ formData, handleChange }: any) {
  const [selectedValue1, setSelectedValue1] = useState("State");
  const [selectedValue2, setSelectedValue2] = useState("Gender");

  // const [fields, setFields] = useState([{ key: "State", value: "" }]);

  // const [hide, setHide] = useState(false);

  const handleSelectChange1 = (event: any) => {
    setSelectedValue1(event.target.value);
  };

  const handleSelectChange2 = (event: any) => {
    setSelectedValue2(event.target.value);
  };

  // const addNew = () => {
  //   // setFields((prevFields: any) => [...prevFields, { key: "", value: "" }]);
  // };

  // const handleFieldChange = (key: any, value: any) => {
  //   setFormData((prevData: { fields: any }) => ({
  //     ...prevData,
  //     fields: {
  //       ...prevData.fields,
  //       [key]: value,
  //     },
  //   }));
  // };

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
            <MenuItem value="Allergy">Allergy</MenuItem>
            <MenuItem value="Referral">Referral</MenuItem>
          </TextField>
        </label>

        <div className="">
          <Typography color={"#090816"} fontWeight={600} fontSize={18}>
            Data Fields
          </Typography>

          <label htmlFor={"data"}>
            Y- Axis
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: "50%" }}>
                <TextField
                  select
                  fullWidth
                  value={selectedValue1}
                  onChange={handleSelectChange1}
                >
                  {selectedValue2 === "State" ? null : (
                    <MenuItem value="State">State</MenuItem>
                  )}
                  {selectedValue2 === "Gender" ? null : (
                    <MenuItem value="Gender">Gender</MenuItem>
                  )}
                  {selectedValue2 === "Age" ? null : (
                    <MenuItem value="Age">Age</MenuItem>
                  )}
                </TextField>
              </div>

              <div style={{ width: "50%" }}>
                {selectedValue1 === "State" && (
                  <Select
                    multiple
                    fullWidth
                    name="state"
                    onChange={(e) =>
                      handleChange("state", e.target.value, "yAxis")
                    }
                    value={formData.yAxis.state || []}
                  >
                    <MenuItem value=""></MenuItem>
                    {states?.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                )}

                {selectedValue1 === "Gender" && (
                  <TextField
                    select
                    fullWidth
                    name="gender"
                    value={formData.yAxis.gender}
                    onChange={(e) =>
                      handleChange("gender", e.target.value, "yAxis")
                    }
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male and Female">Male and Female</MenuItem>
                  </TextField>
                )}

                {selectedValue1 === "Age" && (
                  <Select
                    multiple
                    fullWidth
                    name="age"
                    value={formData.yAxis.age || []}
                    onChange={(e) =>
                      handleChange("age", e.target.value, "yAxis")
                    }
                  >
                    {ageRange.map((age) => (
                      <MenuItem key={age.label} value={age.value}>
                        {age.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </div>
            </div>
          </label>

          <label htmlFor={"data"} style={{ marginTop: "20px" }}>
            X- Axis
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: "50%" }}>
                <TextField
                  select
                  fullWidth
                  value={selectedValue2}
                  onChange={handleSelectChange2}
                >
                  {selectedValue1 === "State" ? null : (
                    <MenuItem value="State">State</MenuItem>
                  )}
                  {selectedValue1 === "Gender" ? null : (
                    <MenuItem value="Gender">Gender</MenuItem>
                  )}
                  {selectedValue1 === "Age" ? null : (
                    <MenuItem value="Age">Age</MenuItem>
                  )}
                </TextField>
              </div>

              <div style={{ width: "50%" }}>
                {selectedValue2 === "State" && (
                  <Select
                    multiple
                    fullWidth
                    name="state"
                    onChange={(e) =>
                      handleChange("state", e.target.value, "xAxis")
                    }
                    value={formData.xAxis.state || []}
                  >
                    <MenuItem value=""></MenuItem>
                    {states?.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                )}

                {selectedValue2 === "Gender" && (
                  <TextField
                    select
                    fullWidth
                    name="gender"
                    value={formData.xAxis.gender}
                    onChange={(e) =>
                      handleChange("gender", e.target.value, "xAxis")
                    }
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male and Female">Male and Female</MenuItem>
                  </TextField>
                )}

                {selectedValue2 === "Age" && (
                  <Select
                    multiple
                    fullWidth
                    name="age"
                    value={formData.xAxis.age || []}
                    onChange={(e) =>
                      handleChange("age", e.target.value, "xAxis")
                    }
                  >
                    {ageRange.map((age) => (
                      <MenuItem key={age.label} value={age.value}>
                        {age.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </div>
            </div>
          </label>

          {/* <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              title="Add new field"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#099250",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "10px",
              }}
              onClick={addNew}
            >
              Add Field{" "}
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.75 8C11.75 7.58579 11.4142 7.25 11 7.25C10.5858 7.25 10.25 7.58579 10.25 8V10.25H8C7.58579 10.25 7.25 10.5858 7.25 11C7.25 11.4142 7.58579 11.75 8 11.75H10.25V14C10.25 14.4142 10.5858 14.75 11 14.75C11.4142 14.75 11.75 14.4142 11.75 14V11.75H14C14.4142 11.75 14.75 11.4142 14.75 11C14.75 10.5858 14.4142 10.25 14 10.25H11.75V8Z"
                  fill="#099250"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 0.25C5.06294 0.25 0.25 5.06294 0.25 11C0.25 16.9371 5.06294 21.75 11 21.75C16.9371 21.75 21.75 16.9371 21.75 11C21.75 5.06294 16.9371 0.25 11 0.25ZM1.75 11C1.75 5.89137 5.89137 1.75 11 1.75C16.1086 1.75 20.25 5.89137 20.25 11C20.25 16.1086 16.1086 20.25 11 20.25C5.89137 20.25 1.75 16.1086 1.75 11Z"
                  fill="#099250"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </Box>
  );
}
