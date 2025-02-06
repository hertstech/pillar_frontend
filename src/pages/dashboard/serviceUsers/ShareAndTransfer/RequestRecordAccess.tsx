import React, { useState } from "react";
import { Box } from "@mui/material";
import { ModalMain } from "../../../../components/Modals";
import { PrimaryButton } from "../../../../components/Button/primaryButton";
import { CustomSelect } from "../../../../components/Select";
import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { PlSwitcher } from "../../../../components/Switcher";
import { RiErrorWarningFill } from "react-icons/ri";
import { accessData } from "../../../../data/statusChangeData";
import { useTransferRecord } from "../../../../api/HealthServiceUser/transferAndShareAccess";
import { useAlert } from "../../../../Utils/useAlert";
import { useParams } from "react-router-dom";

interface ActivityPinModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  data?: any;
}

const accessSchema = Joi.object({
  consenting: Joi.string()
    .allow("")
    .when("$isToggleFalse", {
      is: true,
      then: Joi.string().required().messages({
        "string.empty": "Please provide a reason.",
      }),
    }),
});

const RequestRecordAccess: React.FC<ActivityPinModalProps> = ({
  open,
  setOpen,
  ...rest
}) => {
  const [toggle, setToggle] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const { mutate } = useTransferRecord();
  const { id: NHRID } = useParams();

  const methods = useForm({
    resolver: joiResolver(accessSchema),
    context: { isToggleFalse: !toggle },
    defaultValues: {
      consenting: "",
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Record<string, any>) => {
    setIsSending(true);
    const submissionData = {
      ...data,
      consenting: toggle ? "" : data.consenting,
      hospital_uid: rest.data?.hospital_uid,
      service_user_id: NHRID,
    };

    mutate(submissionData, {
      onSuccess: () => {
        reset();
        setOpen(false);
        setIsSending(false);
        useAlert({
          timer: 4000,
          isToast: true,
          icon: "success",
          title: "Transfer request sent!",
          position: "top-start",
        });
      },
      onError: () => {
        reset();
        setOpen(false);
        setIsSending(false);
        useAlert({
          timer: 4000,
          icon: "error",
          isToast: true,
          position: "top-start",
          title: "Transfer request failed",
        });
      },
    });
  };

  return (
    <ModalMain
      width="462px"
      open={open}
      handleClose={() => {
        setOpen(false);
        reset();
      }}
    >
      <Box className="flex flex-col justify-between py-4">
        <Box>
          <Box className="flex justify-between items-center">
            <h1 className="text-[1.14rem] font-[600] leading-6">
              Request access to medical record
            </h1>
            <p
              onClick={() => setOpen(false)}
              className="w-6 h-6 text-center cursor-pointer rounded-full bg-green-50 text-succ"
            >
              x
            </p>
          </Box>
          <h3 className="text-base font-[400] text-neu-500 leading-5 mt-2 py-1">
            Send a request to access this service user’s records.
          </h3>
        </Box>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 mt-4"
          >
            <Box className="flex flex-col gap-4">
              <PlSwitcher
                checked={toggle}
                onToggle={() => setToggle(!toggle)}
                questionText="Is service user capable of consenting to this?"
              />
              {!toggle && (
                <CustomSelect
                  label="Reason"
                  name="consenting"
                  selectItems={accessData.specialty}
                  value={watch("consenting")}
                  onChange={(value) => setValue("consenting", value)}
                  validationError={errors.consenting}
                />
              )}
            </Box>

            <Box className="flex gap-2 items-center w-full rounded-lg bg-warn-50 max-h-[74px] p-4 text-warn-900">
              <span className="p-1 rounded-full h-fit bg-warn-300">
                <RiErrorWarningFill className="text-white" size={26} />
              </span>
              <p className="text-sm font-normal leading-5">
                This request requires service user’s consent and approval from
                their health provider.
              </p>
            </Box>

            <Box className="flex justify-between mt-8 gap-4">
              <PrimaryButton
                variant="light"
                type="button"
                width="100%"
                onClick={() => setOpen(false)}
                buttonName="Cancel"
              />
              <PrimaryButton
                disabled={isSending}
                type="submit"
                width="100%"
                buttonName="Access record"
              />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </ModalMain>
  );
};

export default RequestRecordAccess;
