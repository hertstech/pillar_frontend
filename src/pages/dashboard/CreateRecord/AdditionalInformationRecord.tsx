import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Styles from "../serviceUsers/styles.module.css";
import InputField from "../../../components/InputField";

export default function AdditionalInformationRecord() {
  const [formField, setFormField] = React.useState({
    writtenBy: "",
    additionalNote: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormField({
      ...formField,
      [name || ""]: value,
    });
  };
  return (
    <Box>
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Record Additional Informations
        </Typography>
      </div>

      <form>
        <label
          htmlFor="additional notes"
          style={{ marginTop: "8px", marginBottom: 10 }}
        >
          Additional Notes
          <textarea
            className={Styles.area}
            name={`additionalNote`}
            rows={8}
            cols={50}
            value={formField.additionalNote}
            onChange={(e) => handleChange("additionalNote", e.target.value)}
          ></textarea>
        </label>

        <div style={{ marginTop: 10 }}>
          <InputField
            type="text"
            label="Notes by"
            name={`writtenBy`}
            value={formField.writtenBy}
            onChange={(e: any) => handleChange("writtenBy", e.target.value)}
          />
        </div>

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
            // onClick={() => setIsOpen(true)}
          >
            Continue
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
