import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import Modal from "../../../../../components/Modal";
import { reasons } from "../../../../../data/statusChangeData";
import { CustomSelect } from "../../../../../components/Select";
import { PrimaryButton } from "../../../../../components/Button/primaryButton";
import { useForm, FieldError } from "react-hook-form";

interface ReasoningModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  treatmentStatusValue: string;
  sickness: string | undefined;
  selectedId: string | any;
  onClose: (reason: string) => void; // Passes selected reason on close
}

const ReasoningModal: React.FC<ReasoningModalProps> = ({
  open,
  setOpen,
  onClose,
  treatmentStatusValue,
  sickness,
  selectedId,
}) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reasons: "",
    },
  });

  // Form submission handler
  const onSubmit = (data: any) => {
    if (!data.reasons) {
      return; // Show validation error if no reason is selected
    }

    console.log("Form submitted with data: ", data);
    console.log("Selected ID: ", selectedId);

    // Pass selected reason to parent via onClose
    onClose(data.reasons);

    // Close the modal
    setOpen(false);
  };

  // Error handling for reasons field
  const validationError =
    errors.reasons instanceof Object && "message" in errors.reasons
      ? (errors.reasons as FieldError)
      : undefined;

  return (
    <Modal open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col justify-between h-[268px] w-[390px]">
        <Box className="flex justify-between items-center">
          <h2 className="text-[.875rem] font-[400] leading-5">
            {sickness || "Sickness name here"}
          </h2>
          <p
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-center cursor-pointer rounded-full bg-pri-50 text-pri-500"
          >
            x
          </p>
        </Box>
        <h1 className="text-[1.25rem] font-[600] leading-6">
          Select a reason for this change
        </h1>

        <form
          className="flex flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)} // Handle form submission
        >
          <CustomSelect
            label="Reasons for status change"
            name="reasons"
            selectItems={
              treatmentStatusValue === "pending"
                ? reasons.pending
                : reasons.holdCancel
            }
            value={getValues("reasons")} // Reflect the current selection
            onChange={(value) => setValue("reasons", value)} // Update reason value
          />
          {validationError && (
            <p className="text-red-500 text-xs mt-1">
              {validationError.message}
            </p>
          )}

          <Box className="flex justify-between mt-8">
            <PrimaryButton
              type="button"
              width="10.7rem"
              onClick={() => setOpen(false)} // Close modal on cancel
              buttonName="Cancel"
            />
            <PrimaryButton
              type="submit" // Submit the form
              width="10.7rem"
              buttonName="Confirm"
              disabled={false}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ReasoningModal;
