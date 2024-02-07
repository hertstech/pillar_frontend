import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Styles from "../serviceUsers/styles.module.css";
import InputField from "../../../components/InputField";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosInstance } from "../../../Utils";

interface TextLabelProps {
  text: any;
  label: string;
}

const TextLabel = ({ text, label }: TextLabelProps) => (
  <label
    style={{
      fontWeight: 400,
      color: "#475467",
      fontSize: 12,
      margin: "20px 0px",
    }}
  >
    {label}
    <Typography fontWeight={600} fontSize={16} color={"#101928"}>
      {text}
    </Typography>
  </label>
);

export default function AdditionalInformationRecord() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

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

  const hasContent = formField.writtenBy || formField.additionalNote;

  const handleSubmit = async () => {
    setIsLoading(true);


    const isCategoriesAndTypeEmpty =
      formField.writtenBy === "" && formField.additionalNote === "";

    if (isCategoriesAndTypeEmpty) {
      setIsLoading(false);

      setIsOpen(false);
      return Swal.fire({
        icon: "info",
        text: `You can not submit an empty form!`,
        confirmButtonColor: "#099250",
      });
    }

    try {
      const res = await axiosInstance.post(
        `/create-serviceuser-additionalnotes/${id}`,
        formField
      );

      setIsOpen(false);
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: `Successful`,
        text: `${res.data.message}`,
        confirmButtonColor: "#099250",
      });

      navigate(`/dashboard/user/${id}/6`);
    } catch (error: any) {
      error;
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
        confirmButtonColor: "#099250",
      });
    }
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
              <Box>
                <TextLabel
                  label="Additional Notes"
                  text={formField.additionalNote}
                />
                <TextLabel label="Written By" text={formField.writtenBy} />
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
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </Button>
          </Stack>
        </Dialog>
      </>
    </Box>
  );
}
