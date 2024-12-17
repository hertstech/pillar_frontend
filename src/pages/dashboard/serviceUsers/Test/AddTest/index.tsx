import { useNavigate } from "react-router-dom";
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
import { client } from "../../../../../types/serviceUserTypes/health";
import { NeedHelp } from "../../../../../components/CalendarField";
import { useState } from "react";
import { AddOrderDetails } from "./AddOrderDetails";

import Buttons from "../../../../../components/Button";
import { AddTestResultForm } from "./AddTestResult";

interface IProps {
  client?: client;
}

export const AddTestRecord: React.FC<IProps> = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, _] = useState(false);

  const steps = [
    {
      label: "Order details",
      description: "Add the test order details",
      content: <AddOrderDetails />,
    },
    {
      label: "Test result",
      description: "Enter the test results accurately.",
      content: <AddTestResultForm />,
    },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
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
                        sx={{
                          fontWeight: activeStep === index ? 600 : 400,
                        }}
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
              className="flex flex-col items-center "
            >
              <div style={{ textAlign: "center", marginBottom: 25 }}>
                <Typography fontWeight={700} color={"#101928"} fontSize={32}>
                  Record test result
                </Typography>
              </div>

              {steps[activeStep].content}

              <Stack
                direction="row"
                gap={3}
                alignItems="center"
                sx={{ mt: 2 }}
                width={"75%"}
              >
                {activeStep >= 0 && activeStep <= 2 && (
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
                      background: "#D1E9FF",
                      "&:hover": { backgroundColor: "#D1E9FF" },
                    }}
                    disabled={activeStep <= 0 || isLoading}
                    variant="outlined"
                    onClick={handleBack}
                  >
                    {"Save as draft"}
                  </Button>
                )}

                {activeStep <= 0 && (
                  <Buttons onClick={handleNext} title={"Next"} />
                )}

                {activeStep > 0 && activeStep <= 1 && (
                  <>
                    <Buttons
                      onClick={() => null}
                      loading={isLoading}
                      title={"Continue"}
                    />
                  </>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
