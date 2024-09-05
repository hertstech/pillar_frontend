import {
  FieldError,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Modal from "../../../../../components/Modal";
import { reasons } from "../../../../../data/statusChangeData";
import { CustomSelect } from "../../../../../components/Select";
import { PrimaryButton } from "../../../../../components/Button/primaryButton";

interface ReasoningModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  treatmentTypeValue: string;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
  register: UseFormRegister<any>;
}

const ReasoningModal: React.FC<ReasoningModalProps> = ({
  open,
  setOpen,
  treatmentTypeValue,
  setValue,
  errors,
  register,
}) => {
  const validationError =
    errors.treatmentType instanceof Object && "type" in errors.treatmentType
      ? (errors.treatmentType as FieldError)
      : undefined;

  return (
    <Modal open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col justify-between h-[268px] w-[390px]">
        <Box className="flex justify-between items-center">
          <h2 className="text-[.875rem] font-[400] leading-5">
            Sickness name here
          </h2>
          <p
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-center cursor-pointer rounded-full bg-pri-50 text-pri-500"
          >
            x
          </p>
        </Box>
        <h1 className=" text-[1.25rem] font-[600] leading-6">
          Select a reason for this change
        </h1>

        <form className="flex flex-col justify-between ">
          <CustomSelect
            label="Reasons for status change"
            name="status_change"
            selectItems={reasons.holdCancel}
            value={treatmentTypeValue}
            onChange={(value) => setValue("reasons", value)}
            register={register}
            validationError={validationError}
          />
          <Box className="flex justify-between mt-8">
            <PrimaryButton
              type="button"
              width="10.7rem"
              onClick={() => setOpen(false)}
              buttonName="Cancel"
            />
            <PrimaryButton
              type="submit"
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
