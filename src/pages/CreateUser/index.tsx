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
import HeaderBreadCrumb from "../../components/HeaderBreadCrumb";
import Users from "../../assets/users.svg";
import Grids from "../../assets/grid.svg";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Buttons from "../../components/Button";

export default function CreateUser() {
  const [activeStep, setActiveStep] = useState(0);

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
    parentOne: "",
    parentOneNumber: "",
    parentOneNHRID: "",
    parentTwo: "",
    parentTwoNumber: "",
    parentTwoNHRID: "",
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
  };

  const data = {
    1: [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "religion",
      // "PhoneNumber",
      "height",
      "weight",
      "address",
      "state",
      "lga",
      "parentOne",
      "parentOneNumber",
      "parentOneNHRID",
      "parentTwo",
      "parentTwoNumber",
      "parentTwoNHRID",
      "nominatedPharmacy",
      "registeredDoctor",
      "registeredHospital",
      "HMOPlan",
    ],
    2: ["NIN", "driversLicense", "passportNumber", "day", "month", "year"],
  };

  // const checkValues = (step) => {
  //   const errors: string[] = [];
  //   const keys = data[step.toString()];
  //   keys.forEach((value: string | number) => {
  //     if (formData[value] === "" || formData[value].length === 0) {
  //       errors.push(`${value} is required`);
  //     }
  //   });
  //   return errors.length ? { valid: false, errors } : { valid: true };
  // };

  const steps = [
    {
      label: "Demographics",
      description: "Basic demographic information",
      content: <StepOne formData={formData} handleChange={handleChange} />,
    },
    {
      label: "Verify Identity",
      description: "Client’s identity information",
      content: <StepTwo formData={formData} handleChange={handleChange} />,
    },
    {
      label: "Generate NHR ID",
      description: "New ID for your client",
      content: <StepThree />,
    },
  ];
  const handleNext = () => {
    console.log(formData);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep < steps.length - 1) {
      // const result = checkValues(activeStep + 1);
      // if (result.valid) {
      setActiveStep(activeStep + 1);
      // } else {
      //   alert(result.errors[0]);
      // }
    }
  };

  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);

    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  return (
    <Box>
      <HeaderBreadCrumb
        heading="Add New Record"
        links={[
          { label: "Dashboard", href: "", icon: Grids },
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
              <Button
                fullWidth
                size="large"
                sx={{
                  color: "#099250",
                  border: "1px solid #099250",
                  outline: "none",
                  textTransform: "capitalize",
                  fontWeight: 600,
                }}
                variant="outlined"
                onClick={handleBack}
              >
                {activeStep > 0 ? "back" : "save"}
              </Button>
              <Buttons
                onClick={handleNext}
                title={activeStep < 1 ? "Continue" : "Verify"}
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
