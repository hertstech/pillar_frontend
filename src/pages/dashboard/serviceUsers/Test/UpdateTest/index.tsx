import { useNavigate, useParams, useLocation } from "react-router-dom";
import { LiaArrowCircleLeftSolid } from "react-icons/lia";
import { Box, Card, Grid, Stack, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UpdateTestResultForm } from "./UpdateTestResult";
import Buttons from "../../../../../components/Button";
import { transformToSnakeCase } from "../../../../../Utils/caseTransformer";
import { useUpdateTest } from "../../../../../api/HealthServiceUser/test";
import { useAlert } from "../../../../../Utils/useAlert";
import { useGetSingleTest } from "../../../../../api/HealthServiceUser/test";
import { TestOrderTypes } from "../DuplicateTest/DupOrderDetails";

type FormDataTypes = {
  orderDetails: Record<string, any>;
  testResults: {
    id?: string;
    category: string;
    testTypes: string;
    reading: string;
    notes?: string | null;
  }[];
};

export const UpdateTestRecord: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const testId = location.state?.id;

  const { id } = useParams();
  const { mutate } = useUpdateTest();
  const [activeStep, setActiveStep] = useState(0);

  const { data } = useGetSingleTest(testId as string);

  const [formData, setFormData] = useState<FormDataTypes>({
    orderDetails: {
      orderId: data?.data.order_id || "",
      testName: data?.data?.test_name || "",
      testDate: data?.data?.test_date || "",
      collectionSite: data?.data?.collection_site,
      orderedBy: data?.data?.ordered_by,
      testDoc: null,
    },
    testResults: [],
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      console.log("Final submission data:", formData);
    }
  };

  const handlePrev = () => {
    if (activeStep === 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const steps = [
    {
      label: "Test result",
      description: "Enter the test results accurately.",
      content: (
        <UpdateTestResultForm
          testInfo={data?.data?.tests}
          orderData={formData.orderDetails as TestOrderTypes}
          onSubmit={(data) => {
            const { saveType, tests } = data;
            setFormData((prev) => ({ ...prev, testResults: tests }));

            if (saveType === "final") {
              const newData = transformToSnakeCase({
                ...formData.orderDetails,
                testsResults: tests,
              });

              mutate(
                { testData: newData, NHRID: id },
                {
                  onSuccess: () => {
                    navigate(-1);
                    useAlert({
                      timer: 4000,
                      isToast: true,
                      icon: "success",
                      title: "Test duplicated successfully",
                      position: "top-start",
                    });
                  },
                  onError: () => {
                    setActiveStep(0);
                    useAlert({
                      timer: 4000,
                      icon: "error",
                      isToast: true,
                      position: "top-start",
                      title: "Test record not duplicated",
                    });
                  },
                }
              );
            } else {
              const draftData = transformToSnakeCase({
                ...formData.orderDetails,
                testResults: tests,
              });

              mutate(draftData, {
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
                  setActiveStep(0);
                  useAlert({
                    timer: 4000,
                    icon: "error",
                    isToast: true,
                    position: "top-start",
                    title: "Test drafting failed",
                  });
                },
              });
            }

            if (saveType === "final") handleNext();
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    if (data?.data && !formData.orderDetails.orderId) {
      setFormData((prev) => ({
        ...prev,
        orderDetails: {
          orderId: data?.data.order_id || "",
          testName: data?.data.test_name || "",
          testDate: data?.data.test_date || "",
          collectionSite: data?.data.collection_site || "",
          orderedBy: data?.data.order_by || "",
          testDoc: null,
        },
        testResults: data?.data.tests || [],
      }));
    }
  }, [data]);

  return (
    <Box>
      <Box className="flex items-center justify-between border-b border-neu-50">
        <Stack p={2} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <div
            className="flex items-center cursor-pointer text-neu-500 gap-1 text-sm"
            onClick={() => navigate(-1)}
          >
            <LiaArrowCircleLeftSolid size={20} />
            <span className="mt-1">Go Back</span>
          </div>
          <div className="text-neu-900 font-bold text-lg capitalize">
            Update Record
          </div>
        </Stack>
      </Box>

      <Box sx={{ pt: 3 }}>
        <Grid
          container
          spacing={3}
          sx={{
            pb: 15,
            px: 2.5,
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                p: 3,
                width: "80%",
                margin: "auto",
                border: "none",
                boxShadow: "none",
              }}
              className="flex flex-col items-center relative"
            >
              {activeStep === 1 && (
                <div
                  className="absolute left-0 flex items-center cursor-pointer text-neu-500 gap-1 text-sm"
                  onClick={handlePrev}
                >
                  <LiaArrowCircleLeftSolid size={20} />
                </div>
              )}
              <div style={{ textAlign: "center", marginBottom: 25 }}>
                <Typography fontWeight={700} color={"#101928"} fontSize={32}>
                  {"Update test result"}
                </Typography>
              </div>

              {steps[activeStep].content}

              {/* STAle  */}
              {activeStep > 10 && (
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
                    onClick={() => null}
                  >
                    Save as draft
                  </Button>

                  <Buttons onClick={handleNext} title={"Save test result"} />
                </Stack>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
