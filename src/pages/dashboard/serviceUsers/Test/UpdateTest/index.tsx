import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LiaArrowCircleLeftSolid } from "react-icons/lia";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { UpdateTestResultForm } from "./UpdateTestResult";
import { transformToSnakeCase } from "../../../../../Utils/caseTransformer";
import { useUpdateTest } from "../../../../../api/HealthServiceUser/test";
import { useAlert } from "../../../../../Utils/useAlert";
import { useGetSingleTest } from "../../../../../api/HealthServiceUser/test";
import ReasoningModal from "../Components/updateResonsModal";
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

  const { mutate } = useUpdateTest();
  const { data } = useGetSingleTest(testId as string);

  const [activeStep, setActiveStep] = useState(0);
  const [isReasoningModalOpen, setIsReasoningModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataTypes>({
    orderDetails: {
      orderId: data?.data.order_id || "",
      testName: data?.data?.test_name || "",
      testDate: data?.data?.test_date || "",
      collectionSite: data?.data?.collection_site || "",
      orderedBy: data?.data?.ordered_by || "",
      testDoc: data?.data?.document_id || null,
    },
    testResults: [],
  });

  const handlePrev = () => {
    if (activeStep === 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = (reason: string) => {
    if (!formData.orderDetails.orderId || !formData.testResults.length) {
      useAlert({
        timer: 4000,
        icon: "warning",
        isToast: true,
        position: "top-start",
        title: "Incomplete data, please check before submitting.",
      });
      return;
    }

    const newData = transformToSnakeCase({
      ...formData.orderDetails,
      testsResults: formData.testResults,
      reasoning: reason,
      status: "active",
    });

    mutate(
      { testData: newData, NHRID: newData.order_id },
      {
        onSuccess: () => {
          navigate(-1);
          useAlert({
            timer: 4000,
            isToast: true,
            icon: "success",
            title: "Test updated successfully",
            position: "top-start",
          });
        },
        onError: () => {
          // setActiveStep(0);
          navigate(-1);
          useAlert({
            timer: 4000,
            icon: "error",
            isToast: true,
            position: "top-start",
            title: "Failed to update test record",
          });
        },
      }
    );
  };

  const steps = [
    {
      label: "Test result",
      description: "Enter the test results accurately.",
      content: (
        <UpdateTestResultForm
          testInfo={data?.data?.tests_results}
          orderData={formData.orderDetails as TestOrderTypes}
          onSubmit={(data) => {
            const { saveType, tests_results: tests } = data;
            setFormData((prev) => ({
              ...prev,
              testResults: tests,
            }));

            if (saveType === "final") {
              setIsReasoningModalOpen(true);
            } else {
              const draftData = transformToSnakeCase({
                ...formData.orderDetails,
                testsResults: formData.testResults,
                status: "draft",
              });

              mutate(
                { testData: draftData, NHRID: draftData.order_id },
                {
                  onSuccess: () => {
                    navigate(-1);
                    useAlert({
                      timer: 4000,
                      isToast: true,
                      icon: "success",
                      title: "Draft saved successfully",
                      position: "top-start",
                    });
                  },
                  onError: () => {
                    useAlert({
                      timer: 4000,
                      icon: "error",
                      isToast: true,
                      position: "top-start",
                      title: "Failed to save draft",
                    });
                  },
                }
              );
            }
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    if (data?.data && !formData.orderDetails.orderId) {
      setFormData({
        orderDetails: {
          orderId: data?.data.order_id || "",
          testName: data?.data.test_name || "",
          testDate: data?.data.test_date || "",
          collectionSite: data?.data.collection_site || "",
          orderedBy: data?.data.ordered_by || "",
          testDoc: null,
        },
        testResults: data?.data.tests_results || [],
      });
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
          sx={{ pb: 15, px: 2.5, justifyContent: "center" }}
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
              <ReasoningModal
                selectedId={formData.orderDetails.order_id}
                open={isReasoningModalOpen}
                setOpen={setIsReasoningModalOpen}
                onClose={(reason) => {
                  setIsReasoningModalOpen(false);
                  handleFinalSubmit(reason);
                }}
                treatmentStatusValue={"pending"}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
