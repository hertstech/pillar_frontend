import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { LiaArrowCircleLeftSolid } from "react-icons/lia";
import { CustomSelect } from "../../../../components/Select";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { testData } from "./data";
import InputField from "../../../../components/InputField";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";

type testTypes = {
  category: string;
  testTypes: string;
};

const testSchema = Joi.object({
  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  testTypes: Joi.string().required().messages({
    "string.empty": "Test Types is required",
  }),
  reading: Joi.string().required().messages({
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

export function AddTestRecord() {
  const navigate = useNavigate();
  const { tabId } = useParams();

  const [testingDate, setTestingDate] = useState<Dayjs | null>(null);
  const [testTime, setTestTime] = useState<Dayjs | null>(null);

  const methods = useForm({
    resolver: joiResolver(testSchema),
    defaultValues: {
      category: "",
      testTypes: "",
      reading: "",
      testDate: "",
    },
  });

  const {
    watch,
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const categoryValue = watch("category");
  const filteredTestTypes = React.useMemo(() => {
    const selectedCategory = testData.category.find(
      (item) => item.value === categoryValue
    );
    return selectedCategory?.subValues || [];
  }, [categoryValue]);

  const onSubmit = (data: testTypes) => {
    console.log(data);
    console.log(tabId);
  };

  return (
    <Box>
      <Box className="flex items-center justify-between border-b border-neu-50">
        <Stack p={2} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <div
            className="flex items-center cursor-pointer text-neu-500 gap-1 text-sm"
            onClick={() => {
              navigate(-1);
            }}
          >
            <LiaArrowCircleLeftSolid size={20} />
            <span className="mt-1">Go Back</span>
          </div>

          <div className="text-neu-900 font-bold text-lg capitalize">
            Record Test
          </div>
        </Stack>
      </Box>

      <Box sx={{ p: 2 }}>
        <Box className="max-w-[600px] w-full">
          <h1 className="text-3xl font-bold">Add Test Result</h1>
          <h3 className="my-6 text-lg font-bold capitalize">Test 1</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 bg-bg2 rounded-lg p-6"
          >
            <CustomSelect
              label="Category"
              name="category"
              selectItems={testData.category}
              value={categoryValue}
              onChange={(value) =>
                setValue("category", value, { shouldValidate: true })
              }
              register={register("category")}
              validationError={errors.category}
            />
            <CustomSelect
              label="Test Types"
              name="testTypes"
              isDisabled={getValues("category") === ""}
              selectItems={filteredTestTypes}
              value={watch("testTypes")}
              onChange={(value) =>
                setValue("testTypes", value, { shouldValidate: true })
              }
              register={register("testTypes")}
              validationError={errors.testTypes}
            />
            <InputField
              type="text"
              label="Reading"
              name="reading"
              placeholder="eg 60-70"
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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
