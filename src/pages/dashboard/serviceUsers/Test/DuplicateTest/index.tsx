import { useNavigate, useParams, useLocation } from "react-router-dom";
import { LiaArrowCircleLeftSolid } from "react-icons/lia";
import {
  Box,
  Card,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DupOrderDetails, TestOrderTypes } from "./DupOrderDetails";
import { DupTestResultForm } from "./DupTestResult";
import { NeedHelp } from "../../../../../components/CalendarField";
import Buttons from "../../../../../components/Button";
import { transformToSnakeCase } from "../../../../../Utils/caseTransformer";
import { useCreateTest } from "../../../../../api/HealthServiceUser/test";
import { useAlert } from "../../../../../Utils/useAlert";
import { useGetSingleTest } from "../../../../../api/HealthServiceUser/test";

type FormDataTypes = {
  orderDetails: Record<string, any>;
  testsResults: {
    category: string;
    testTypes: string;
    reading: string;
    notes?: string;
  }[];
};

export const DupTestRecord: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const testId = location.state?.id;

  const { id } = useParams();
  const { mutate } = useCreateTest();
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState<FormDataTypes>({
    orderDetails: {},
    testsResults: [],
  });

  const { data } = useGetSingleTest(testId as string);

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
      label: "Order details",
      description: "Add the test order details",
      content: (
        <DupOrderDetails
          orderData={data?.data}
          onSubmit={(data) => {
            setFormData((prev) => ({ ...prev, orderDetails: data }));
          }}
          handleNext={handleNext}
        />
      ),
    },
    {
      label: "Test result",
      description: "Enter the test results accurately.",
      content: (
        <DupTestResultForm
          testInfo={data?.data?.tests_results}
          orderData={formData.orderDetails as TestOrderTypes}
          onSubmit={(data) => {
            const { saveType, tests_results: tests } = data;
            setFormData((prev) => ({ ...prev, testsResults: tests }));

            const status = saveType === "draft" ? "draft" : "active";

            const transformedData = transformToSnakeCase({
              ...formData.orderDetails,
              testsResults: tests,
              status,
            });

            if (saveType === "final") {
              console.log("Submitting final data:", transformedData);
              mutate(
                { testData: transformedData, NHRID: id },
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
              console.log("Saving as draft:", transformedData);
              mutate(
                { testData: transformedData, NHRID: id },
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
                    setActiveStep(0);
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
            }

            if (saveType === "final") handleNext();
          }}
        />
      ),
    },
  ];

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
            Duplicate Record
          </div>
        </Stack>
      </Box>

      <Box sx={{ pt: 3 }}>
        <Grid container spacing={3} sx={{ pb: 15, px: 2.5 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                py: 2,
                px: 3,
                minHeight: "85vh",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100%",
                background: "#F7F9FC",
                border: "none",
                boxShadow: "none",
              }}
            >
              <Stepper
                activeStep={activeStep}
                sx={{
                  "& .MuiStepConnector-root": {
                    display: "none",
                  },
                  "& .MuiStepIcon-root": {
                    width: "48px",
                    height: "48px",
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: "#099250",
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: "#099250",
                  },
                }}
                orientation="vertical"
              >
                {steps.map((item, index) => (
                  <Step sx={{ marginTop: 2 }} key={item.label}>
                    <StepLabel>
                      <Typography
                        sx={{ fontWeight: activeStep === index ? 600 : 400 }}
                        color="#101928"
                        fontSize={16}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          color: activeStep === index ? "#475367" : "#667185",
                        }}
                        fontWeight={400}
                        fontSize={12}
                      >
                        {item.description}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <NeedHelp />
            </Card>
          </Grid>

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
                  {activeStep > 0 ? "Record test result" : "Order Details"}
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
