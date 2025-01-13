import { useMemo, useState, useEffect, useRef } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
} from "@mui/material";
import { CustomSelect } from "../../../../../components/Select";
import { useForm, useFieldArray } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { testData, testUnits } from "../data";
import InputField from "../../../../../components/InputField";
import { FaAngleDown } from "react-icons/fa6";
import Buttons from "../../../../../components/Button";
import moment from "moment";
import classNames from "classnames";
import { getNameByValue } from "../../../../../Utils/getByName";
import { TestOrderTypes } from "../DuplicateTest/DupOrderDetails";
import { v4 as uuidv4 } from "uuid";

const testSchema = Joi.object({
  tests_results: Joi.array().items(
    Joi.object({
      id: Joi.string().optional(),
      category: Joi.string().required().messages({
        "string.empty": "Category is required",
      }),
      testTypes: Joi.string().required().messages({
        "string.empty": "Test Types is required",
      }),
      reading: Joi.string().required().messages({
        "string.empty": "Reading values are required",
      }),
      notes: Joi.string().optional(),
    })
  ),
});

interface TestFormValues {
  tests_results: {
    id?: string;
    category: string;
    testTypes: string;
    reading: string;
    notes?: string | null;
  }[];
  saveType: "draft" | "final";
}

type UpdateTestResultProps = {
  orderData: TestOrderTypes;
  testInfo: {
    id?: string;
    additional_notes: string | null;
    category: string;
    reading: string;
    test_types: string;
  }[];
  onSubmit: (data: TestFormValues) => void;
};

export function UpdateTestResultForm({
  onSubmit,
  orderData,
  testInfo,
}: UpdateTestResultProps) {
  const [newTest, setNewTest] = useState<
    TestFormValues["tests_results"][number]
  >({
    id: "" || uuidv4(),
    category: "",
    testTypes: "",
    reading: "",
    notes: "",
  });
  const [newTestUnit, setNewTestUnit] = useState("");
  const [showNewUpdate, setShowNewUpdate] = useState(true);

  const formattedDate = moment(orderData?.testDate).format("DD-MM-YYYY");
  const methods = useForm<TestFormValues>({
    resolver: joiResolver(testSchema),
    defaultValues: {
      tests_results: [],
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
    name: "tests_results",
  });

  const appendedRef = useRef(false);

  const handleSaveNewTest = () => {
    append(newTest);
    setNewTest({
      id: uuidv4(),
      category: "",
      testTypes: "",
      reading: "",
      notes: null,
    });
    setNewTestUnit("");
  };

  const handleSubmitTests = (saveType: "draft" | "final") => {
    if (newTest.category && newTest.testTypes && newTest.reading) {
      append(newTest);
    }
    setTimeout(() => {
      const formValues = methods.getValues();
      formValues.tests_results = formValues.tests_results.filter(
        (test) => test.reading && test.category
      );

      // console.log("newData;", {...formValues});
      // return;

      onSubmit({ ...formValues, saveType });
      methods.reset();
      setNewTest({
        id: uuidv4(),
        category: "",
        testTypes: "",
        reading: "",
        notes: null,
      });
    });
  };

  const filteredTestTypesList = useMemo(() => {
    return fields.map((_, index) => {
      const categoryValue = watch(`tests_results.${index}.category`);
      const selectedCategory = testData?.category?.find(
        (item: any) => item.value === categoryValue
      );
      return selectedCategory?.subValues || [];
    });
  }, [fields, watch, testData]);

  const toDisable = !newTest.category || !newTest.testTypes || !newTest.reading;

  useEffect(() => {
    if (testInfo && !appendedRef.current && fields.length === 0) {
      const initialTests: TestFormValues["tests_results"] = testInfo.map(
        (test) => ({
          id: test.id || "",
          category: test.category,
          testTypes: test.test_types,
          reading: test.reading,
          notes: test.additional_notes,
        })
      );
      initialTests.forEach((test) => append(test));
      appendedRef.current = true;
    }
  }, [testInfo, append, fields.length]);

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Box className="max-w-[600px] w-full">
          <Box className="flex flex-col gap-8 my-8 min-w-[600px]">
            <h3 className="text-lg font-bold capitalize -mb-4">Tests</h3>

            {fields.length > 0 &&
              fields.map((field, index) => {
                const categoryValue = watch(`tests_results.${index}.category`);
                const testTypeValue = watch(`tests_results.${index}.testTypes`);
                const filteredTestTypes = filteredTestTypesList[index];
                const unit = testUnits[testTypeValue] || "";

                return (
                  <Accordion
                    key={`accordion-${field.id}`}
                    className="flex flex-col justify-center gap-8 !bg-bg2 !rounded-xl 
                    !border-none !shadow-none"
                    sx={{
                      "&::before": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <AccordionSummary expandIcon={<FaAngleDown />}>
                      <Box>
                        <h2 className="text-lg font-semibold">
                          {categoryValue || `Test ${index + 1}`}
                        </h2>

                        <p className="text-sm text-neu-600 font-normal">
                          {getNameByValue(
                            watch(`tests_results.${index}.testTypes`),
                            testData.category
                          ) || "Test Type"}{" "}
                          •{" "}
                          {watch(`tests_results.${index}.reading`) || "Reading"}{" "}
                          <span>{unit}</span> • {formattedDate || "Date"} •{" "}
                          {orderData.collectionSite || "Collection site"}
                        </p>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails className="!border-none !shadow-none">
                      <Box className="flex flex-col gap-6">
                        <CustomSelect
                          label={`Category ${index + 1}`}
                          name={`tests_results.${index}.category`}
                          selectItems={testData.category}
                          value={categoryValue}
                          onChange={(value) =>
                            setValue(`tests_results.${index}.category`, value, {
                              shouldValidate: true,
                            })
                          }
                          validationError={
                            errors.tests_results?.[index]?.category
                          }
                        />
                        <CustomSelect
                          label={`Test Types ${index + 1}`}
                          name={`tests.${index}.testTypes`}
                          isDisabled={!categoryValue}
                          selectItems={filteredTestTypes}
                          value={testTypeValue}
                          onChange={(value) =>
                            setValue(
                              `tests_results.${index}.testTypes`,
                              value,
                              {
                                shouldValidate: true,
                              }
                            )
                          }
                          validationError={
                            errors.tests_results?.[index]?.testTypes
                          }
                        />
                        <Box className="relative">
                          <InputField
                            type="text"
                            label="Reading"
                            name={`tests_results.${index}.reading`}
                            placeholder="e.g., 60-70"
                            register={methods.register}
                            errors={errors}
                          />
                          <span className="absolute right-3 top-12 mt-1 text-neu-400 text-base font-normal">
                            {unit}
                          </span>
                        </Box>

                        <InputField
                          type="text"
                          textarea={true}
                          label="Add Notes (optional)"
                          name={`tests_results.${index}.notes`}
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
              {showNewUpdate ? (
                <button
                  type="button"
                  onClick={() => setShowNewUpdate(false)}
                  className={classNames(
                    "font-semibold text-left text-pri-650 "
                  )}
                >
                  <span className="text-xl font-semibold">+</span> Add another
                  test
                </button>
              ) : (
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
                  {newTest.category && (
                    <Box className="flex flex-col gap-8">
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
                      <Box className="relative">
                        <InputField
                          type="text"
                          label="Reading"
                          name="reading"
                          placeholder="e.g., 60-70"
                          value={newTest.reading}
                          onChange={(e) =>
                            setNewTest((prev) => ({
                              ...prev,
                              reading: e.target.value,
                            }))
                          }
                        />
                        <span className="absolute right-3 top-12 mt-1 text-neu-400 text-base font-normal">
                          {newTestUnit}
                        </span>
                      </Box>
                      <InputField
                        type="text"
                        textarea={true}
                        label="Add Notes (optional)"
                        name="notes"
                        placeholder="Enter notes here"
                        value={newTest.notes as string}
                        onChange={(e) =>
                          setNewTest((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                      />
                      <button
                        type="button"
                        onClick={handleSaveNewTest}
                        className={classNames(
                          "font-semibold text-left",
                          toDisable
                            ? "cursor-not-allowed text-neu-300"
                            : "text-pri-650 "
                        )}
                        disabled={toDisable}
                      >
                        <span className="text-xl font-semibold">+</span> Add
                        another test
                      </button>
                    </Box>
                  )}
                </Box>
              )}
              <Stack
                gap={3}
                width={"100%"}
                sx={{ mt: 4 }}
                direction="row"
                alignItems="center"
              >
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    color: "#1570EF",
                    border: "1px solid #D1E9FF",
                    outline: "none",
                    textTransform: "capitalize",
                    fontWeight: 600,
                    height: 48,
                    background: "inherit",
                    "&:hover": { backgroundColor: "#D1E9FF" },
                  }}
                  variant="outlined"
                  onClick={() => handleSubmitTests("draft")}
                >
                  Save as draft
                </Button>
                <Buttons
                  onClick={() => handleSubmitTests("final")}
                  title={"Update test result"}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
