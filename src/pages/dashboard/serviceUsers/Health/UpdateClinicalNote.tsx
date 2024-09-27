import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Box } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, FormProvider } from "react-hook-form";
import { PrimaryButton } from "../../../../components/Button/primaryButton";
import InputField from "../../../../components/InputField";
import { ModalAlt } from "../../../../components/Modals";
import { clinicalNoteSchema } from "./schemas/clinicalNotes";
import { useUpdateClinicalNote } from "../../../../api/HealthServiceUser/clinicalNotes";
import { useAlert } from "../../../../Utils/useAlert";

interface ReasoningModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedId: string | any;
  clinicalNoteData: any;
  onClose: (reason: string) => void;
}

const UpdateClinicalNotes: React.FC<ReasoningModalProps> = ({
  open,
  setOpen,
  onClose,
  selectedId,
  clinicalNoteData,
}) => {
  const { mutate } = useUpdateClinicalNote();

  const methods = useForm({
    resolver: joiResolver(clinicalNoteSchema),
    defaultValues: {
      subject: "",
      notes: "",
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (open && clinicalNoteData) {
      reset({
        subject: clinicalNoteData.subject || "",
        notes: clinicalNoteData.notes || "",
      });
    }
  }, [open, clinicalNoteData, reset]);

  const onSubmit = (data: any) => {
    if (!data.subject || !data.notes) {
      console.error("Subject or notes are missing");
      return;
    }
    mutate(
      { selectedId, ...data },
      {
        onSuccess: () => {
          useAlert({
            isToast: true,
            icon: "success",
            title: "Clinical note updated successfully",
            position: "top-start",
          });
          onClose(data.notes);
          setOpen(false);
          reset();
        },
        onError: () => {
          useAlert({
            icon: "error",
            isToast: true,
            position: "top-start",
            title: "Clinical note not updated",
          });
          reset();
        },
      }
    );
  };

  return (
    <ModalAlt open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col min-h-[515px] w-[808px]">
        <Box className="flex justify-between items-center">
          <h2 className="text-[1.175rem] font-[600] text-neu-900 leading-6">
            Update Clinical Note
          </h2>
          <p
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-center cursor-pointer rounded-full bg-pri-50 text-pri-500"
          >
            x
          </p>
        </Box>

        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-6 justify-between mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              type="text"
              label="Subject"
              name="subject"
              placeholder="Enter subject"
              register={methods.register}
              errors={errors}
            />
            <InputField
              textarea
              rows={9}
              type="text"
              label="Notes"
              name="notes"
              placeholder="Enter notes"
              register={methods.register}
              errors={errors}
            />
            <Box className="flex justify-start mt-6">
              <PrimaryButton
                type="submit"
                width="10.7rem"
                buttonName="Update note"
                disabled={false}
              />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </ModalAlt>
  );
};

export default UpdateClinicalNotes;
