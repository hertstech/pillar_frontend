import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Box } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, FormProvider } from "react-hook-form";
import { PrimaryButton } from "../../../../../components/Button/primaryButton";
import InputField from "../../../../../components/InputField";
import { ModalAlt } from "../../../../../components/Modals";
import { schema } from "../schemas/clinicalNotes";
import {
  useCreateClinicalNote,
  useUpdateClinicalNote,
} from "../../../../../api/HealthServiceUser/clinicalNotes";
import { useAlert } from "../../../../../Utils/useAlert";

interface ReasoningModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedId: string;
  noteData?: any;
  onClose: (reason: string) => void;
}

const AddClinicalNotes: React.FC<ReasoningModalProps> = ({
  open,
  setOpen,
  onClose,
  selectedId,
  noteData,
}) => {

  console.log(noteData)
  const createNote = useCreateClinicalNote();
  const updateNote = useUpdateClinicalNote();

  const methods = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      subject: noteData?.subject || "",
      notes: noteData?.noteText || "",
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  useEffect(() => {
    if (noteData) {
      setValue("subject", noteData.subject);
      setValue("notes", noteData.noteText);
    }
  }, [noteData, setValue]);

  const onSubmit = (data: any) => {
    if (!data.subject || !data.notes) {
      console.error("Subject or notes are missing");
      return;
    }

    const payload: {
      subject: string;
      notes: string;
    } = {
      subject: data.subject,
      notes: data.notes,
    };

    if (selectedId) {
      const updatePayload = { ...payload, selectedId };
      updateNote.mutate(updatePayload, {
        onSuccess: () => {
          onClose(data.notes);
          setOpen(false);
          reset();
        },
        onError: (error: any) => {
          useAlert({
            icon: "error",
            title: "Failure",
            text: error?.message || "Clinical note update failed",
          });
          reset();
        },
      });
    } else {
      const createPayload = { ...payload, selectedId };
      createNote.mutate(createPayload, {
        onSuccess: () => {
          onClose(data.notes);
          setOpen(false);
          reset();
        },
        onError: (error) => {
          useAlert({
            icon: "error",
            title: "Failure",
            text: error?.message || "Clinical note creation failed",
          });
          reset();
        },
      });
    }
  };

  return (
    <ModalAlt open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col min-h-[515px] w-[808px]">
        <Box className="flex justify-between items-center">
          <h2 className="text-[1.175rem] font-[600] text-neu-900 leading-6">
            {selectedId ? "Update Clinical Note" : "New Clinical Note"}
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
                buttonName={selectedId ? "Update" : "Submit"}
                disabled={false}
              />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </ModalAlt>
  );
};

export default AddClinicalNotes;
