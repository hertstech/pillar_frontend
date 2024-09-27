import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, FormProvider } from "react-hook-form";
import { PrimaryButton } from "../../../../components/Button/primaryButton";
import InputField from "../../../../components/InputField";
import { ModalAlt } from "../../../../components/Modals";
import { clinicalNoteSchema } from "./schemas/clinicalNotes";
import { useCreateClinicalNote } from "../../../../api/HealthServiceUser/clinicalNotes";
import { useAlert } from "../../../../Utils/useAlert";

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
  const { mutate } = useCreateClinicalNote();

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

  const onSubmit = (data: any) => {
    if (!data.subject || !data.notes) {
      console.error("Subject or notes are missing");
      return;
    }
    mutate(
      { selectedId, subject: data.subject, notes: data.notes },
      {
        onSuccess: () => {
          useAlert({
            isToast: true,
            icon: "success",
            position: "top-start",
            title: "Clinical note created successfully",
          });
          onClose(data.notes);
          setOpen(false);
          reset();
        },
        onError: () => {
          useAlert({
            isToast: true,
            icon: "error",
            position: "top-start",
            title: "Clinical not created",
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
            New Clinical Note
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
                buttonName="Submit"
                disabled={selectedId === undefined}
              />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </ModalAlt>
  );
};

export default AddClinicalNotes;
