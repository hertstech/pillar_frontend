import { useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import InputField from "../../../components/InputField";
import { Loader } from "../../../components/NoResult";

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function StepTwo({
  formData,
  handleChange: superHandleChange,
  result,
  isLoading,
}: any) {
  const [selectedValue, setSelectedValue] = useState("NIN");
  const [years] = useState(new Date().getFullYear());

  const yearList = Array.from(
    { length: years - 1959 + 1 },
    (_, index) => years - index
  );
  const dayList = Array.from({ length: 31 }, (_, index) => index + 1);

  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: any; value: any }>
  ) => {
    const { name, value } = event.target;
    superHandleChange({ ...formData, [name || ""]: value });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          minHeight: 469,
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <Box>
            <label htmlFor="IDType">
              ID Type
              <TextField
                select
                sx={{ marginTop: "5px" }}
                fullWidth
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <MenuItem value="NIN">NIN</MenuItem>
                <MenuItem value="Birth Certificate">Birth Certificate</MenuItem>
                <MenuItem value="Drivers Licence">Drivers Licence</MenuItem>
                <MenuItem value="International Passport">
                  International Passport
                </MenuItem>
              </TextField>
            </label>

            {selectedValue === "NIN" && (
              <InputField
                type="text"
                label="Enter client’s NIN"
                name="NIN"
                value={formData.NIN}
                onChange={handleChange}
                placeholder="1234-567-8901 enter NIN without the dash"
              />
            )}

            <Typography
              color={result === "Verification Successful" ? "green" : "red"}
              sx={{ my: 2 }}
            >
              {result}
            </Typography>

            {selectedValue === "Drivers Licence" && (
              <>
                <InputField
                  type="text"
                  label="Enter License Number"
                  name="driversLicense"
                  value={formData.driversLicense}
                  onChange={handleChange}
                  placeholder=""
                />

                <Box
                  sx={{
                    display: "grid",
                    columnGap: 1.5,
                    rowGap: 1.5,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      lg: "repeat(2, 1fr)",
                    },
                    marginTop: 2,
                  }}
                >
                  <label htmlFor="years">
                    Year of Expiry
                    <TextField
                      select
                      name="year"
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      value={formData.year}
                      onChange={handleChange}
                    >
                      {yearList.map((months) => (
                        <MenuItem key={months} value={months}>
                          {months}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>

                  <label htmlFor="months">
                    Month of Expiry
                    <TextField
                      select
                      name="month"
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      value={formData.month}
                      onChange={handleChange}
                    >
                      {months.map((months) => (
                        <MenuItem key={months} value={months}>
                          {months}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                </Box>
              </>
            )}

            {selectedValue === "International Passport" && (
              <>
                <InputField
                  type="text"
                  label="Passport Number"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  placeholder=""
                />

                <Box
                  sx={{
                    display: "grid",
                    columnGap: 1.5,
                    rowGap: 1.5,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      lg: "repeat(2, 1fr)",
                    },
                    marginTop: 2,
                  }}
                >
                  <label htmlFor="years">
                    Year of Expiry
                    <TextField
                      select
                      name="year"
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      value={formData.year}
                      onChange={handleChange}
                    >
                      {yearList.map((months) => (
                        <MenuItem key={months} value={months}>
                          {months}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>

                  <label htmlFor="months">
                    Month of Expiry
                    <TextField
                      select
                      name="month"
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      value={formData.month}
                      onChange={handleChange}
                    >
                      {months.map((months) => (
                        <MenuItem key={months} value={months}>
                          {months}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                </Box>
              </>
            )}

            {selectedValue === "Birth Certificate" && (
              <Box
                sx={{
                  display: "grid",
                  columnGap: 1.5,
                  rowGap: 1.5,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  marginTop: 2,
                }}
              >
                <label htmlFor="days">
                  Day
                  <TextField
                    select
                    name="day"
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    value={formData.day}
                    onChange={handleChange}
                  >
                    {dayList.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>

                <label htmlFor="months">
                  Month
                  <TextField
                    select
                    name="month"
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    value={formData.month}
                    onChange={handleChange}
                  >
                    {months.map((months) => (
                      <MenuItem key={months} value={months}>
                        {months}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>

                <label htmlFor="years">
                  Year
                  <TextField
                    select
                    name="year"
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    value={formData.year}
                    onChange={handleChange}
                  >
                    {yearList.map((years) => (
                      <MenuItem key={years} value={years}>
                        {years}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
