import { useMemo, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { CustomSelect } from "../../../../../components/Select";
import { useForm, useFieldArray } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { testData } from "../data";
import InputField from "../../../../../components/InputField";
import { FaAngleDown } from "react-icons/fa6";

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

interface TestFormValues {
  tests: {
    category: string;
    testTypes: string;
    reading: string;
    notes?: string;
  }[];
}

export function AddTestResultForm() {
  const [newTest, setNewTest] = useState({
    category: "",
    testTypes: "",
    reading: "",
    notes: "",
  });

  const methods = useForm<TestFormValues>({
    resolver: joiResolver(testSchema),
    defaultValues: {
      tests: [],
    },
  });

  const {
    control,
    watch,
    setValue,
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
  }, [fields, watch]);

  const onSubmit = () => {
    append(newTest);
    setNewTest({ category: "", testTypes: "", reading: "", notes: "" });
  };

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Box className="max-w-[600px] w-full">
          <Box className="flex flex-col gap-8 my-8 min-w-[600px]">
            <h3 className="text-lg font-bold capitalize -mb-4">Saved Tests</h3>
            {fields.length > 0 &&
              fields.map((field, index) => {
                const categoryValue = watch(`tests.${index}.category`);
                const filteredTestTypes = filteredTestTypesList[index];

                return (
                  <Accordion
                    key={field.id}
                    className="flex flex-col justify-center gap-8 !bg-bg2 !rounded-lg !border-none"
                  >
                    <AccordionSummary
                      expandIcon={<FaAngleDown />}
                      className="!max-h-[50px] !mt-7"
                    >
                      <Box className="flex flex-col">
                        <h2 className="text-lg font-semibold capitalize">
                          {categoryValue || `Test ${index + 1}`}
                        </h2>
                        <p className="text-sm text-neu-600 font-normal capitalize">
                          {watch(`tests.${index}.testTypes`) || "Test Type"} •{" "}
                          {watch(`tests.${index}.reading`) || "Reading"} •{" "}
                          {watch(`tests.${index}.notes`) || "Notes"}
                        </p>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box className="flex flex-col gap-6">
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
                          isDisabled={!categoryValue}
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
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </Box>

          <Box className="p-6 w-[600px] !bg-bg2 !rounded-lg">
            <Box className="flex flex-col gap-8">
              <CustomSelect
                label="Category"
                name="category"
                selectItems={testData.category}
                value={newTest.category}
                onChange={(value) =>
                  setNewTest((prev) => ({ ...prev, category: value }))
                }
              />
              <CustomSelect
                label="Test Types"
                name="testTypes"
                isDisabled={!newTest.category}
                selectItems={
                  testData.category.find(
                    (item) => item.value === newTest.category
                  )?.subValues || []
                }
                value={newTest.testTypes}
                onChange={(value) =>
                  setNewTest((prev) => ({ ...prev, testTypes: value }))
                }
              />
              <InputField
                type="text"
                label="Reading"
                name="reading"
                placeholder="eg 60-70"
                value={newTest.reading}
                onChange={(e) =>
                  setNewTest((prev) => ({ ...prev, reading: e.target.value }))
                }
              />
              <InputField
                type="text"
                textarea={true}
                label="Add Notes (optional)"
                name="notes"
                placeholder="Enter notes here"
                value={newTest.notes}
                onChange={(e) =>
                  setNewTest((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={onSubmit}
                disabled={
                  !newTest.category || !newTest.testTypes || !newTest.reading
                }
              >
                Save Test
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
