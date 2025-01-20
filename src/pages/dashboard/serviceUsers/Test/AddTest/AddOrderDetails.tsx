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
import dayjs, { Dayjs } from "dayjs";
import Buttons from "../../../../../components/Button";
import { FiUploadCloud } from "react-icons/fi";
import {
  useCreateTest,
  useUploadTestDocument,
} from "../../../../../api/HealthServiceUser/test";
import { useAlert } from "../../../../../Utils/useAlert";
import { transformToSnakeCase } from "../../../../../Utils/caseTransformer";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

export type TestOrderTypes = {
  orderId: string;
  testName: string;
  testDate: string;
  collectionSite: string;
  orderedBy: string;
  testDoc?: number | null;
};

type AddOrderDetailsProps = {
  onSubmit: (data: TestOrderTypes) => void;
};

const testSchema = Joi.object({
  orderId: Joi.string()
    .regex(/^\S{1,6}$/)
    .required()
    .messages({
      "string.empty": "Order ID is required",
      "string.pattern.base":
        "Order ID must not contain spaces and be at most 5 characters long",
    }),
  testName: Joi.string().required().messages({
    "string.empty": "A test name is required",
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

export const allowedFileTypes = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function AddOrderDetails({
  onSubmit,
  handleNext,
}: AddOrderDetailsProps & { handleNext: () => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testingDate, setTestingDate] = useState<Dayjs | null>(null);
  const [testTime, setTestTime] = useState<Dayjs | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<number | null>(null);

  const { mutate } = useCreateTest();
  const { mutate: uploadFile, data, isPending } = useUploadTestDocument();

  console.log(data);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TestOrderTypes>({
    resolver: joiResolver(testSchema),
    defaultValues: {
      orderId: "",
      testName: "",
      testDate: "",
      collectionSite: "",
      orderedBy: "",
      testDoc: null,
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        useAlert({
          isToast: true,
          icon: "error",
          title: "invalid file type",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }

      uploadFile(
        { NHRID: id as string, file },
        {
          onSuccess: (response) => {
            const assetId = response?.data?.asset_id;
            if (assetId) {
              setFileName(file.name);
              setUploadedFile(assetId);
              setValue("testDoc", assetId, { shouldValidate: true });
            } else {
              useAlert({
                isToast: true,
                icon: "error",
                title: "Failed to retrieve asset ID from the server.",
              });
            }
          },
          onError: () => {
            useAlert({
              isToast: true,
              icon: "error",
              title: "File upload failed. Please try again.",
            });
          },
        }
      );
    }
  };

  console.log(uploadedFile);

  const handleDrafting = (data: TestOrderTypes) => {
    const newDraftData = transformToSnakeCase({
      ...data,
      testDate: testingDate ? testingDate.toISOString() : "",
      testDoc: uploadedFile,
      status: "draft",
      testsResults: [],
    });

    mutate(
      { testData: newDraftData, NHRID: id },
      {
        onSuccess: () => {
          navigate(-1);
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
      }
    );
  };

  const handleFormSubmit = (data: TestOrderTypes) => {
    onSubmit({
      ...data,
      testDate: testingDate ? testingDate.toISOString() : "",
      testDoc: uploadedFile as number,
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
            placeholder="e.g. 23234"
            register={register}
            errors={errors}
            maxLength={5}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
          />
          <InputField
            type="text"
            label="Test Name"
            name="testName"
            placeholder="John Wick's test"
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
                  shouldDisableDate={(date) => date && date.isAfter(dayjs())}
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
                {isPending ? (
                  <BarLoader width={100} color="#1570EF" />
                ) : (
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
                )}
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
