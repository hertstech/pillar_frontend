import { useState } from "react";
import { Box, Stack, Button } from "@mui/material";
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
import Buttons from "../../../../../components/Button";
import { FiUploadCloud } from "react-icons/fi";
import { useCreateTest } from "../../../../../api/HealthServiceUser/test";
import { useAlert } from "../../../../../Utils/useAlert";
import { transformToSnakeCase } from "../../../../../Utils/caseTransformtter";

type TestFormData = {
  orderId: string;
  testDate: string;
  collectionSite: string;
  orderedBy: string;
  testDoc?: File | null;
};

type AddOrderDetailsProps = {
  onSubmit: (data: TestFormData) => void;
};

const testSchema = Joi.object({
  orderId: Joi.string().required().messages({
    "string.empty": "Order ID is required",
  }),
  testDate: Joi.string().optional(),
  collectionSite: Joi.string().required().messages({
    "string.empty": "Collection site is required",
  }),
  orderedBy: Joi.string().required().messages({
    "string.empty": "Order author is required",
  }),
  testDoc: Joi.alternatives()
    .try(Joi.object().instance(File), Joi.allow(null))
    .optional(),
});

export function AddOrderDetails({
  onSubmit,
  handleNext,
}: AddOrderDetailsProps & { handleNext: () => void }) {
  const [testingDate, setTestingDate] = useState<Dayjs | null>(null);
  const [testTime, setTestTime] = useState<Dayjs | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { mutate } = useCreateTest();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TestFormData>({
    resolver: joiResolver(testSchema),
    defaultValues: {
      orderId: "",
      testDate: "",
      collectionSite: "",
      orderedBy: "",
      testDoc: null,
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadedFile(file);
      setValue("testDoc", file, { shouldValidate: true });
    }
  };

  const handleDrafting = (data: TestFormData) => {
    const newDraftData = transformToSnakeCase({
      ...data,
      testDate: testingDate ? testingDate.toISOString() : "",
      testDoc: uploadedFile,
    });

    mutate(newDraftData, {
      onSuccess: () => {
        useAlert({
          timer: 4000,
          isToast: true,
          icon: "success",
          title: "Test drafted successfully",
          position: "top-start",
        });
      },
      onError: () => {
        useAlert({
          timer: 4000,
          icon: "error",
          isToast: true,
          position: "top-start",
          title: "Test drafting failed",
        });
      },
    });
  };

  const handleFormSubmit = (data: TestFormData) => {
    onSubmit({
      ...data,
      testDate: testingDate ? testingDate.toISOString() : "",
      testDoc: uploadedFile,
    });
    handleNext();
  };

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-8 bg-bg2 rounded-lg p-6 max-w-[600px] w-full"
        >
          <InputField
            type="text"
            label="Enter new order ID"
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
          <div className="relative w-full gap-1">
            <p className="py-2 text-sm font-semibold">
              Attach document (optional)
            </p>
            <label
              htmlFor="testDoc"
              className="border-neu-300 border-dashed bg-white px-2 py-4 min-w-[552px] h-[146px]
               flex-col border rounded-md flex items-center justify-center cursor-pointer"
            >
              <div>
                <div className="text-sm text-[#A8B8C2] text-center">
                  {fileName ? (
                    <div className="text-base text-succ">{fileName}</div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-2 text-sm font-normal">
                        <div className="p-3 bg-bg2 rounded-full text-center w-fit">
                          <FiUploadCloud size={24} className="text-neu-900" />
                        </div>
                        <p className="text-err">
                          Click to upload{" "}
                          <span className="font-normal text-neu-900">
                            or drag and drop
                          </span>
                        </p>
                        <p className="text-neu-400">
                          SVG, PNG, JPG, GIF, DOC, DOCX, or PDF
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <input
                type="file"
                id="testDoc"
                className="hidden px-2 py-4 w-full h-full"
                name="testDoc"
                accept="image/svg,image/png,image/jpeg,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <Stack
            gap={3}
            width={"100%"}
            sx={{ mt: 2 }}
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
              onClick={handleSubmit(handleDrafting)}
            >
              Save as draft
            </Button>

            <Buttons type="submit" title={"Continue"} />
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
