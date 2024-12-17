import { useMemo, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { CustomSelect } from "../../../../../components/Select";
import { useForm, useFieldArray } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { testData } from "../data";
import InputField from "../../../../../components/InputField";
import { FaArrowDown } from "react-icons/fa6";

const testSchema = Joi.object({
  tests: Joi.array().items(
    Joi.object({
      category: Joi.string().required().messages({
        "string.empty": "Category is required",
      }),
      testTypes: Joi.string().required().messages({
        "string.empty": "Test Types is required",
      }),
      reading: Joi.string().required().messages({
        "string.empty": "Reading values is required",
      }),
      notes: Joi.string().optional(),
    })
  ),
});

export function AddTestResultForm() {
  const { tabId } = useParams();
  const [savedTest, setSavedTest] = useState(null);

  const methods = useForm({
    resolver: joiResolver(testSchema),
    defaultValues: {
      tests: [
        {
          category: "",
          testTypes: "",
          reading: "",
          notes: "",
        },
      ],
    },
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append } = useFieldArray({
    control,
    name: "tests",
  });

  const filteredTestTypesList = useMemo(() => {
    return fields.map((_, index) => {
      const categoryValue = watch(`tests.${index}.category`);
      const selectedCategory = testData.category.find(
        (item) => item.value === categoryValue
      );
      return selectedCategory?.subValues || [];
    });
  }, [fields, watch, testData.category]);

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(tabId);
    setSavedTest(data.tests[0]);
  };

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Box className="max-w-[600px] w-full">
          <h3 className="my-6 text-lg font-bold capitalize">Tests</h3>
          {/* Accordion for Saved Test Preview */}
          {savedTest && (
            <Accordion>
              <AccordionSummary expandIcon={<FaArrowDown />}>
                <Typography>Preview Saved Test</Typography>
              </AccordionSummary>
              <AccordionDetails>inputed form</AccordionDetails>
            </Accordion>
          )}

          {/* Form for Adding Tests */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 bg-bg2 rounded-lg p-6 w-[600px]"
          >
            {fields.map((field, index) => {
              const categoryValue = watch(`tests.${index}.category`);
              const filteredTestTypes = filteredTestTypesList[index];

              return (
                <Box key={field.id} className="flex flex-col gap-8">
                  <CustomSelect
                    label={`Category ${index + 1}`}
                    name={`tests.${index}.category`}
                    selectItems={testData.category}
                    value={categoryValue}
                    onChange={(value) =>
                      setValue(`tests.${index}.category`, value, {
                        shouldValidate: true,
                      })
                    }
                    validationError={errors.tests?.[index]?.category}
                  />
                  <CustomSelect
                    label={`Test Types ${index + 1}`}
                    name={`tests.${index}.testTypes`}
                    isDisabled={categoryValue === ""}
                    selectItems={filteredTestTypes}
                    value={watch(`tests.${index}.testTypes`)}
                    onChange={(value) =>
                      setValue(`tests.${index}.testTypes`, value, {
                        shouldValidate: true,
                      })
                    }
                    validationError={errors.tests?.[index]?.testTypes}
                  />
                  <InputField
                    type="text"
                    label="Reading"
                    name={`tests.${index}.reading`}
                    placeholder="eg 60-70"
                    register={methods.register}
                    errors={errors}
                  />
                  <InputField
                    type="text"
                    textarea={true}
                    label="Add Notes (optional)"
                    name={`tests.${index}.notes`}
                    placeholder="Enter notes here"
                    register={methods.register}
                    errors={errors}
                  />
                </Box>
              );
            })}

            <Button
              type="button"
              onClick={() =>
                append({
                  category: "",
                  testTypes: "",
                  reading: "",
                  notes: "",
                })
              }
              className="!w-fit"
            >
              + Add another test
            </Button>
            {/* <Button type="submit" variant="contained" color="primary">
              Submit
            </Button> */}
          </form>
        </Box>
      </Box>
    </Box>
  );
}
