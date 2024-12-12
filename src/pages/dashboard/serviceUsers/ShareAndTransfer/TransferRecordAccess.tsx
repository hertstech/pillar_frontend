import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Box } from "@mui/material";
import { ModalMain } from "../../../../components/Modals";
import { PrimaryButton } from "../../../../components/Button/primaryButton";
import { CustomSelect } from "../../../../components/Select";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../../../components/InputField";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { RiErrorWarningFill } from "react-icons/ri";
import { docType } from "./ShareUserAccess";
import { debounce } from "lodash";
import {
  useGetClinicUID,
  useTransferRecord,
} from "../../../../api/HealthServiceUser/transferAndShareAccess";
import { useParams } from "react-router-dom";
import { useAlert } from "../../../../Utils/useAlert";

interface ActivityPinModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
}

export const transferSchema = Joi.object({
  hospital_uid: Joi.string().required().messages({
    "string.empty": "UID is required",
  }),
  hospital_name: Joi.string().required().messages({
    "string.empty": "Hospital/Clinic name is required",
  }),
  doctors_name: Joi.string().required().messages({
    "string.empty": "Doctors name is required",
  }),
});

const TransferRecordAccessForm: React.FC<ActivityPinModalProps> = ({
  open,
  setOpen,
}) => {
  const { id } = useParams();

  const NHRID = id;

  const [isValidUID, setIsValidUID] = useState<boolean>(false);

  const methods = useForm({
    resolver: joiResolver(transferSchema),
    defaultValues: {
      hospital_uid: "",
      hospital_name: "",
      doctors_name: "",
    },
  });

  const {
    watch,
    reset,
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const uid = watch("hospital_uid");

  const { data, isLoading, error } = useGetClinicUID(uid);
  const { mutate } = useTransferRecord();

  const validateClinicUID = useCallback(
    debounce((uid: string) => {
      setValue("hospital_uid", uid, { shouldValidate: true });
    }, 2000),
    [setValue]
  );

  const docData =
    data?.data?.doctors?.map((dr: docType) => ({
      id: dr.id,
      name: `${dr.firstName.charAt(0).toUpperCase()}${dr.firstName.slice(
        1
      )} ${dr.lastName.charAt(0).toUpperCase()}${dr.lastName.slice(1)}`,
      value: dr.id,
    })) || [];

  const handleUIDChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const uid = e.target.value.trim();
    validateClinicUID(uid);
  };

  console.log("Form errors:", errors);
  const onSubmit = (data: any) => {
    const submissionData = {
      ...data,
      service_user_id: NHRID,
    };

    mutate(submissionData, {
      onSuccess: () => {
        setOpen(false);
        useAlert({
          timer: 4000,
          isToast: true,
          icon: "success",
          title: "Record transferred successfully",
          position: "top-start",
        });
        reset();
      },
      onError: () => {
        setOpen(false);
        useAlert({
          timer: 4000,
          icon: "error",
          isToast: true,
          position: "top-start",
          title: "Unauthorized transfer",
        });
        reset();
      },
    });
  };

  useEffect(() => {
    if (data?.status === 200) {
      setIsValidUID(true);
      setValue("hospital_name", data?.data.name, { shouldValidate: true });
    } else {
      setIsValidUID(false);
    }
  }, [uid, setValue]);

  return (
    <ModalMain width={"462px"} open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col justify-between py-4">
        <Box>
          <Box className="flex justify-between items-center">
            <h1 className="text-[1.25rem] font-[600] leading-6">
              Transfer record
            </h1>
            <p
              onClick={() => setOpen(false)}
              className="w-6 h-6 text-center cursor-pointer rounded-full bg-green-50 text-succ"
            >
              x
            </p>
          </Box>
          <h3 className="text-base font-[400] text-neu-500 leading-5 mt-2 py-1">
            You’re about to transfer full access of this record to a new doctor.
            Please provide their information below.
          </h3>
        </Box>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4"
          >
            <InputField
              type="text"
              label="Hospital UID"
              name="hospital_uid"
              placeholder="92845**45"
              register={register}
              onChange={handleUIDChange}
              errors={error || errors}
              checking={isValidUID}
            />
            <InputField
              type="text"
              label="Hospital Name"
              name="hospital_name"
              value={getValues("hospital_name")}
              placeholder="Junkyard Clinic"
              register={register}
              errors={errors}
              isReadOnly={true}
            />
            <CustomSelect
              label="Doctors Name"
              name="doctors_name"
              selectItems={docData}
              value={watch("doctors_name")}
              onChange={(value) =>
                setValue("doctors_name", value, { shouldValidate: true })
              }
              register={register("doctors_name")}
              validationError={errors.doctors_name}
            />

            <Box className="flex gap-2 items-center w-full rounded-lg bg-warn-50 max-h-[74px] p-4 text-warn-900">
              <span className="p-1 rounded-full h-fit bg-warn-300">
                <RiErrorWarningFill className="text-white" size={26} />
              </span>
              <p className="text-sm font-normal leading-5">
                This action is permanent, but you will have full access until
                the doctor or service user accepts.
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
                disabled={isLoading}
                type="submit"
                width="100%"
                buttonName="Transfer access"
              />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </ModalMain>
  );
};

export default TransferRecordAccessForm;
