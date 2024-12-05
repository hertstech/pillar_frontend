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
import { accessData } from "../../../../data/statusChangeData";
import InputField from "../../../../components/InputField";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { PlSwitcher } from "../../../../components/Switcher";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useGetClinicUID } from "../../../../api/HealthServiceUser/transferAndShareAccess";
import { debounce } from "lodash";

interface ActivityPinModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
}

export type docType = {
  firstName: string;
  lastName: string;
  position: string | null;
  title: string;
  id: string;
};

const accessSchema = Joi.object({
  hospital_uid: Joi.string().required().messages({
    "string.empty": "UID is required",
  }),
  hospital_name: Joi.string().required().messages({
    "string.empty": "Hospital/Clinic name is required",
  }),
  doctors_name: Joi.string().required().messages({
    "string.empty": "Doctors name is required",
  }),
  start_date: Joi.date().optional(),
  end_date: Joi.date().greater(Joi.ref("start_date")).optional().messages({
    "date.greater": "End date must be after the start date",
  }),

  consenting: Joi.string().when("toggle", {
    is: true,
    then: Joi.required().messages({ "string.empty": "Consent is required" }),
  }),
});

const ShareUserAccessForm: React.FC<ActivityPinModalProps> = ({
  open,
  setOpen,
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [toggle, setToggle] = useState(false);
  const [isValidUID, setIsValidUID] = useState<boolean>(false);

  const methods = useForm({
    resolver: joiResolver(accessSchema),
    defaultValues: {
      hospital_uid: "",
      hospital_name: "",
      doctors_name: "",
      consenting: "",
      start_date: "",
      end_date: "",
    },
  });

  const {
    watch,
    setValue,
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const uid = watch("hospital_uid");

  const { data, isLoading, error } = useGetClinicUID(uid);

  console.log(data);

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
  const mergedStartDateTime = startDate
    ?.set("hour", startTime?.hour() || 0)
    .set("minute", startTime?.minute() || 0);

  const mergedEndDateTime = endDate
    ?.set("hour", endTime?.hour() || 0)
    .set("minute", endTime?.minute() || 0);

  data.start_date = mergedStartDateTime?.toISOString() || null;
  data.end_date = mergedEndDateTime?.toISOString() || null;

  console.log("Form Submission Data:", data);
};


  useEffect(() => {
    if (data?.status === 200) {
      setIsValidUID(true);
      setValue("hospital_name", data?.data.name, { shouldValidate: true });
    } else {
      setIsValidUID(false);
    }
  }, [uid]);

  return (
    <ModalMain
      width={"462px"}
      open={open}
      handleClose={() => {
        setOpen(false);
        reset();
      }}
    >
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
            Provide temporary access to a new doctor. Fill out the details
            below.
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

            <Box className="flex gap-4 items-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Start Date">
                  <DatePicker value={startDate} onChange={setStartDate} />
                </DemoItem>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <span className="mt-6">
                  <TimePicker value={startTime} onChange={setStartTime} />
                </span>
              </LocalizationProvider>
            </Box>
            <Box className="flex gap-4 items-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="End Date">
                  <DatePicker value={endDate} onChange={setEndDate} />
                </DemoItem>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <span className="mt-6">
                  <TimePicker value={endTime} onChange={setEndTime} />
                </span>
              </LocalizationProvider>
            </Box>
            <Box className="flex flex-col gap-4 mt-4">
              <PlSwitcher
                checked={toggle}
                onToggle={() => setToggle(!toggle)}
                questionText="Is service user capable of consenting to this?"
              />
              {toggle && (
                <CustomSelect
                  label="Why"
                  name="consenting"
                  selectItems={accessData.specialty}
                  value={watch("consenting")}
                  onChange={(value) => {
                    setValue("consenting", value);
                  }}
                  register={register("consenting")}
                  validationError={errors.consenting}
                />
              )}
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
                buttonName="Grant access"
              />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </ModalMain>
  );
};

export default ShareUserAccessForm;
