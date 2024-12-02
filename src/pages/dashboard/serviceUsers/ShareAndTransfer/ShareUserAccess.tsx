import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { ModalMain } from "../../../../components/Modals";
import { PrimaryButton } from "../../../../components/Button/primaryButton";
import { CustomSelect } from "../../../../components/Select";
import { FieldError, FormProvider, useForm } from "react-hook-form";
import { accessData } from "../../../../data/statusChangeData";
import InputField from "../../../../components/InputField";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

interface ActivityPinModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
}

export const accessSchema = Joi.object({
  full_name: Joi.string().required().messages({
    "string.empty": "full name is required",
  }),
  specialty: Joi.string().optional(),
});

const ShareUserAccessForm: React.FC<ActivityPinModalProps> = ({
  open,
  setOpen,
  onClose,
}) => {
  const methods = useForm({
    resolver: joiResolver(accessSchema),
    defaultValues: {
      full_name: "",
      specialty: "",
    },
  });

  const {

    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    if (!data.specialty) {
      return;
    }


    setOpen(false);
  };

 
  const reasonsValue = watch("specialty");

  return (
    <ModalMain width={"462px"} open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col justify-between py-4">
        <Box>
          <Box className="flex justify-between items-center">
            <h1 className="text-[1.25rem] font-[600] leading-6">
              Share access
            </h1>
            <p
              onClick={() => setOpen(false)}
              className="w-6 h-6 text-center cursor-pointer rounded-full bg-green-50 text-succ"
            >
              x
            </p>
          </Box>
          <h3 className="text-base font-[400] text-neu-500 leading-5 mt-2 py-1">
            Give temporary access to a new doctor to view this record. Please
            provide their information below.
          </h3>
        </Box>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 justify-between mt-4"
          >
            <InputField
              type="text"
              label="Full Name"
              name="full_name"
              placeholder="Enter full name"
              register={methods.register}
              errors={errors}
            />
            <CustomSelect
              label="Specialty"
              name="specialty"
              selectItems={accessData.specialty}
              value={reasonsValue}
              onChange={(value) => {
                setValue("specialty", value);
              }}
              register={register("specialty")}
              validationError={errors.specialty}
            />
            <InputField
              type="text"
              label="Email address"
              name="email"
              placeholder="aaron@hotmail.com"
              register={methods.register}
              errors={errors}
            />

            <Box className="flex justify-between mt-8 gap-4">
              <PrimaryButton
                variant="light"
                type="button"
                width="100%"
                onClick={() => setOpen(false)}
                buttonName="Cancel"
              />
              <PrimaryButton
                type="submit"
                width="100%"
                buttonName="Update access"
              />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </ModalMain>
  );
};

export default ShareUserAccessForm;
