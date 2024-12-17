import { useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import InputField from "../../../../../components/InputField";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";

type testTypes = {
  orderId: string;
  testDate: string;
};

const testSchema = Joi.object({
  orderId: Joi.string().required().messages({
    "string.empty": "Reading values is required",
  }),
  testDate: Joi.string().optional(),
  collectionSite: Joi.string().required().messages({
    "string.empty": "Place of collection is required",
  }),
  orderedBy: Joi.string().required().messages({
    "string.empty": "Order author is required",
  }),
});

export function AddOrderDetails() {
  const { tabId } = useParams();

  const [testingDate, setTestingDate] = useState<Dayjs | null>(null);
  const [testTime, setTestTime] = useState<Dayjs | null>(null);

  const methods = useForm({
    resolver: joiResolver(testSchema),
    defaultValues: {
      orderId: "",
      reading: "",
      testDate: "",
    },
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: testTypes) => {
    console.log(data);
    console.log(tabId);
  };

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Box className="max-w-[600px] w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 bg-bg2 rounded-lg p-6"
          >
            <InputField
              type="text"
              label="Order ID"
              name="orderId"
              placeholder="e.g. 2323422"
              register={register}
              errors={errors}
            />
            <Box className="flex gap-4 items-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Date of Test">
                  <DatePicker
                    value={testingDate}
                    onChange={(newValue) => {
                      setTestingDate(newValue);
                      setValue(
                        "testDate",
                        newValue ? newValue.toISOString() : "",
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                  />
                </DemoItem>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <span className="mt-6">
                  <TimePicker value={testTime} onChange={setTestTime} />
                </span>
              </LocalizationProvider>
            </Box>

            <InputField
              type="text"
              label="Collection site"
              name="collectionSite"
              placeholder="xyz Health ltd"
              register={register}
              errors={errors}
            />
            <InputField
              type="text"
              label="Test ordered by"
              name="orderedBy"
              placeholder="Zamari Olu Chuck"
              register={register}
              errors={errors}
            />

            {/* <button type="submit" className="btn btn-primary">
              Submit
            </button> */}
          </form>
        </Box>
      </Box>
    </Box>
  );
}
