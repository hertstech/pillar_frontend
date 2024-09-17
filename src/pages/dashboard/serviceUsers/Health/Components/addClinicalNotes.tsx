import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { useForm, FieldError } from "react-hook-form";
import Modal from "../../../../../components/Modal";
import { PrimaryButton } from "../../../../../components/Button/primaryButton";
import InputField from "../../../../../components/InputField";

interface ReasoningModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  selectedId: string | any;
  onClose: (reason: string) => void;
}

const AddClinicalNotes: React.FC<ReasoningModalProps> = ({
  open,
  setOpen,
  onClose,
  selectedId,
}) => {
  const {
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      notes: "",
    },
  });
  const validationError =
    errors.subject instanceof Object && "message" in errors.subject
      ? (errors.subject as FieldError)
      : undefined;

  console.log(validationError);
  const onSubmit = (data: any) => {
    if (!data.reasons) {
      return;
    }

    console.log("Form submitted with data: ", data);
    console.log("Selected ID: ", selectedId);

    onClose(data.reasons);

    setOpen(false);
  };

  return (
    <Modal open={open} handleClose={() => setOpen(false)} width={"808px"}>
      <Box className="flex flex-col h-[515px] ">
        <Box className="flex justify-between items-center">
          <h2 className="text-[1.175rem] font-[600] text-neu-900 leading-6">
            New Clinical Note
          </h2>
          <p
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-center cursor-pointer rounded-full bg-pri-50 text-pri-500"
          >
            x
          </p>
        </Box>

        <form
          className="flex flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            type="text"
            label="Subject"
            name="subject"
            value={""}
            placeholder=""
          />
          <Box className="flex justify-start mt-8">
            <PrimaryButton
              type="submit"
              width="10.7rem"
              buttonName="Submit"
              disabled={false}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddClinicalNotes;
