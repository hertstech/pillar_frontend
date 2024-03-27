import {
  Box,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Calendar } from "../../../../components/CalendarField";
import { useState } from "react";

const states = ["Abuja", "Anambra", "Kano", "Lagos"];

const ageRange = [
  { value: [0, 12], label: "0-12" },
  { value: [13, 18], label: "13-18" },
  { value: [19, 29], label: "19-29" },
  { value: [30, 60], label: "30-60" },
  { value: [60, 110], label: "60 and Above" },
];

export default function StepOne({ formData, handleChange }: any) {
  const [selectedValue2, setSelectedValue2] = useState("Gender");

  const handleSelectChange = (event: any) => {
    setSelectedValue2(event.target.value);
  };

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
            <MenuItem value="Allergy">Allergy</MenuItem>
            <MenuItem value="Referral">Referral</MenuItem>
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
                >
                  <MenuItem value=""></MenuItem>
                  {states?.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </label>

          <label htmlFor="yAxis" style={{ marginTop: "20px" }}>
            Field 2
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
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
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
                  >
                    {ageRange.map((age) => (
                      // @ts-ignore
                      <MenuItem key={age.label} value={age.value}>
                        {age.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </div>
            </div>
          </label>
        </div>
      </div>
    </Box>
  );
}
[];
