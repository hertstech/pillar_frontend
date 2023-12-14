import { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Step,
  Link,
  StepLabel,
  Stepper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import HeaderBreadCrumb from "../../../components/HeaderBreadCrumb";
import Users from "/assets/users.svg";
import Grids from "/assets/grid.svg";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Buttons from "../../../components/Button";

export default function CreateUser() {
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState("");

  const [formData, setFormData] = useState({
    // STEP ONE
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    religion: "",
    PhoneNumber: "",
    height: "",
    weight: "",
    address: "",
    state: "",
    lga: "",
    tribalMark: "",
    legalGuardianOne: "",
    legalGuardianOneNumber: "",
    legalGuardianOneNHR_ID: "",
    legalGuardianOneRelationship: "",
    legalGuardianTwo: "",
    legalGuardianTwoNumber: "",
    legalGuardianTwoNHR_ID: "",
    legalGuardianTwoRelationship: "",
    nextOfKinName: "",
    nextOfKinNameNHR_ID: "",
    nextOfKinNumber: "",
    nextOfKinRelationship: "",
    nominatedPharmacy: "",
    registeredDoctor: "",
    registeredHospital: "",
    HMOPlan: "",

    // STEP TWO
    NIN: "",
    driversLicense: "",
    passportNumber: "",
    day: "",
    month: "",
    year: "",

    // STEP THREE
  });

  const handleChange = (data: any) => {
    setFormData({ ...formData, ...data });

    setResult(formData.NIN);
  };

  const steps = [
    {
      label: "Demographics",
      description: "Basic demographic information",
      content: <StepOne formData={formData} handleChange={handleChange} />,
    },
    {
      label: "Verify Identity",
      description: "Client’s identity information",
      content: (
        <StepTwo
          formData={formData}
          result={result}
          handleChange={handleChange}
        />
      ),
    },
    {
      label: "Generate NHR ID",
      description: "New ID for your client",
      content: <StepThree />,
    },
  ];
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      console.log(formData);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // useEffect(() => {
  const fethcData = async () => {
    try {
      const res = await fetch("../../../nationalIdentificationNumber.json");
      const data = await res.json();

      const matchingRecord = data.find(
        (record: any) => record.nationalNumber === formData.NIN
      );

      if (matchingRecord) {
        // NIN is found in the JSON data
        setResult("Verification Successful");

        setTimeout(() => {
          handleNext(); // Call handleNext after 20 seconds
        }, 10000);
      } else {
        // NIN is not found in the JSON data
        setResult("Verification Failed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ pt: 3 }}>
      <HeaderBreadCrumb
        heading="Add New Record"
        links={[
          { label: "Dashboard", href: "/dashboard", icon: Grids },
          { label: "Clients", href: "", icon: Users },
          { label: "New Client", href: "" },
        ]}
      />

      <Grid container spacing={3} sx={{ pb: 15 }}>
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              py: 2,
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: 24,
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

            <Box>
              <Typography
                variant="h4"
                fontWeight={600}
                fontSize={16}
                sx={{ color: "#344054" }}
              >
                Need Help?
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={14}
                sx={{ color: "#98A2B3", width: 222 }}
              >
                Experiencing any difficulty? Let us know below.
              </Typography>
              <Stack alignItems="flex-start" sx={{ mt: 2 }}>
                <Link
                  href="#"
                  color="#667185"
                  underline="none"
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    border: "1px solid #667185",
                  }}
                >
                  Contact Us
                </Link>
              </Stack>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            {steps[activeStep].content}

            <Stack direction="row" gap={3} alignItems="center" sx={{ mt: 2 }}>
              {activeStep >= 0 && activeStep <= 1 && (
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    color: "#099250",
                    border: "1px solid #099250",
                    outline: "none",
                    textTransform: "capitalize",
                    fontWeight: 600,
                    height: 48,
                  }}
                  disabled={activeStep <= 0}
                  variant="outlined"
                  onClick={handleBack}
                >
                  {"Previous"}
                </Button>
              )}

              {activeStep <= 0 && (
                <Buttons onClick={handleNext} title={"Next"} />
              )}

              {activeStep > 0 && activeStep <= 1 && (
                <Buttons onClick={fethcData} title={"Verify"} />
              )}

              {activeStep === steps.length - 1 && activeStep > 2 && (
                <Buttons onClick={handleNext} title={"Continue"} />
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
