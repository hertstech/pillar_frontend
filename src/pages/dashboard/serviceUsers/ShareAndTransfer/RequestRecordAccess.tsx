import React, { Dispatch, SetStateAction, useState } from "react";
import { Box } from "@mui/material";
import { ModalMain } from "../../../../components/Modals";
import { PrimaryButton } from "../../../../components/Button/primaryButton";
import { CustomSelect } from "../../../../components/Select";
import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { PlSwitcher } from "../../../../components/Switcher";
import { RiErrorWarningFill } from "react-icons/ri";
import { accessData } from "../../../../data/statusChangeData";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

interface ActivityPinModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
}

const accessSchema = Joi.object({
  access_type: Joi.string().required().messages({
    "string.empty": "Access type is required.",
  }),
  start_date: Joi.date().optional(),
  end_date: Joi.date().greater(Joi.ref("start_date")).optional().messages({
    "date.greater": "End date must be after the start date.",
  }),
  consenting: Joi.string().optional(),
});

const RequestRecordAccess: React.FC<ActivityPinModalProps> = ({
  open,
  setOpen,
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [toggle, setToggle] = useState(false);

  const methods = useForm({
    resolver: joiResolver(accessSchema),
    defaultValues: {
      access_type: "",
      consenting: "",
      start_date: "",
      end_date: "",
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const accessTypes = [
    { id: "43", name: "Sharing access", value: "sharing_access" },
    { id: "2s", name: "Transfer access", value: "transfer_access" },
  ];

  const onSubmit = (data: any) => {
    console.log("Form Submission Data:", data);
    setOpen(false);
    reset();
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
            <CustomSelect
              label="Access type"
              name="access_type"
              selectItems={accessTypes}
              value={watch("access_type")}
              onChange={(value) =>
                setValue("access_type", value, { shouldValidate: true })
              }
              validationError={errors.access_type}
            />

            <DemoItem label="Access duration">
              <Box className="flex gap-4 items-center ">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    onChange={(date: Dayjs | null) => {
                      setStartDate(date);
                      setValue("start_date", date ? date.toISOString() : "", {
                        shouldValidate: true,
                      });
                    }}
                    slotProps={{
                      textField: {
                        error: !!errors.start_date,
                        helperText: errors.start_date?.message || "",
                      },
                    }}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={endDate}
                    onChange={(date: Dayjs | null) => {
                      setEndDate(date);
                      setValue("end_date", date ? date.toISOString() : "", {
                        shouldValidate: true,
                      });
                    }}
                    slotProps={{
                      textField: {
                        error: !!errors.end_date,
                        helperText: errors.end_date?.message || "",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </DemoItem>

            <Box className="flex flex-col gap-4 ">
              <PlSwitcher
                checked={toggle}
                onToggle={() => setToggle(!toggle)}
                questionText="Is service user capable of consenting to this?"
              />
              {toggle && (
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
                disabled={false}
                type="submit"
                width="100%"
                buttonName="Send Request"
              />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </ModalMain>
  );
};

export default RequestRecordAccess;
