import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { ModalMain } from "../../../../../components/Modals";
import { reasons } from "../../../../../data/statusChangeData";
import { CustomSelect } from "../../../../../components/Select";
import { PrimaryButton } from "../../../../../components/Button/primaryButton";

interface ReasoningModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  treatmentStatusValue: string;
  selectedId: string | any;
  onClose: (reason: string) => void;
}

const ReasoningModal: React.FC<ReasoningModalProps> = ({
  open,
  setOpen,
  onClose,
  treatmentStatusValue,
  selectedId,
}) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reasons: "",
    },
  });

  const reasonsValue = watch("reasons");

  const onSubmit = (data: any) => {
    if (!data.reasons) {
      return;
    }
    onClose(data.reasons);
    setOpen(false);
  };

  const isSubmitDisabled = !reasonsValue;

  return (
    <ModalMain open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col justify-between h-[268px]">
        <Box className="flex justify-between items-center">
          <h2 className="text-[.875rem] font-[400] text-neu-600 leading-5">
            {selectedId || "test id here"}
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomSelect
            label="Reasons for status change"
            name="reasons"
            selectItems={
              treatmentStatusValue === "pending"
                ? reasons.pending
                : reasons.holdCancel
            }
            value={reasonsValue}
            onChange={(value) => setValue("reasons", value)}
          />
          {errors.reasons && (
            <p className="text-red-500 text-xs mt-1">
              {errors.reasons.message}
            </p>
          )}
          <Box className="flex justify-between mt-8">
            <PrimaryButton
              variant="light"
              type="button"
              width="10.7rem"
              onClick={() => setOpen(false)}
              buttonName="Cancel"
            />
            <PrimaryButton
              type="submit"
              width="10.7rem"
              buttonName="Confirm"
              disabled={isSubmitDisabled}
            />
          </Box>
        </form>
      </Box>
    </ModalMain>
  );
};


export default ReasoningModal;
