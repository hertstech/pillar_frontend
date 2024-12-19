import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import Buttons from "../../../components/Button";
import {
  //  useDispatch,
  useSelector,
} from "react-redux";
import { axiosInstance } from "../../../Utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { NeedHelp } from "../../../components/CalendarField";

export default function CreateUser() {
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state: any) => state.user.access_token);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // STEP ONE
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    religion: "",
    PhoneNumber: "",
    height: "",
    weight: "",
    address: "",
    state: "",
    lga: "",
    tribalMarks: "",
    parentOne: "",
    parentOneNumber: "",
    parentOneNHR_ID: "",
    parentOneRelationship: "",
    parentTwo: "",
    parentTwoNumber: "",
    parentTwoNHR_ID: "",
    parentTwoRelationship: "",
    nokFullName: "",
    nokNHR_ID: "",
    nokPhoneNumber: "",
    nokRelationship: "",
    nominatedPharmarcy: "",
    registeredDoctor: "",
    registeredHospital: "",
    HMOPlan: "",
    title: "",

    // STEP TWO
    NIN: "",
    driversLicense: "",
    passportNumber: "",
    day: "",
    month: "",
    year: "",

    // STEP THREE
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (data: any) => {
    setFormData({ ...formData, ...data });

    setResult(formData.NIN);
  };

  const steps = [
    {
      label: "Profile",
      description: "Basic profile information",
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
          isLoading={isLoading}
        />
      ),
    },
    {
      label: "Generate NHR ID",
      description: "New ID for your client",
      content: <StepThree data={data} />,
    },
    {
      label: "Consent information",
      description: "Choose medical and data sharing choices",
      // @ts-ignore
      content: <StepFour NHRID={data?.NHRID as number} />,
    },
  ];

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const verify = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("../../../nationalIdentificationNumber.json");
      const data = await res.json();

      const matchingRecord = data.find(
        (record: any) => record.nationalNumber === formData.NIN
      );

      setTimeout(() => {
        setIsLoading(false);
      }, 4000);

      if (matchingRecord) {
        // NIN is found in the JSON data
        setResult("Verification Successful");
      } else {
        // NIN is not found in the JSON data
        setResult("Verification Failed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const createUser = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        "/create-serviceuser-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);

      setIsLoading(false);

      handleNext();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.detail}`,
        confirmButtonColor: "#2E90FA",
      });

      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Stack
        p={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          borderBottom: "1px #E7E9FB solid",
        }}
      >
        <div
          style={{ display: "flex", gap: 8, cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="18" height="18" fill="#1E1E1E" />
            <g id="Home" clip-path="url(#clip0_1481_37234)">
              <rect
                width="375"
                height="812"
                transform="translate(-25 -49)"
                fill="#FCFCFD"
              />
              <g id="top">
                <mask id="path-1-inside-1_1481_37234" fill="white">
                  <path d="M-25 -9H350V31H-25V-9Z" />
                </mask>
                <path
                  d="M350 30.5H-25V31.5H350V30.5Z"
                  fill="#E7E9FB"
                  mask="url(#path-1-inside-1_1481_37234)"
                />
                <g id="title">
                  <g id="Frame 1000007521">
                    <g id="Hicon / Linear / Left Circle 1">
                      <rect
                        width="20"
                        height="20"
                        transform="translate(-1 -1)"
                        fill="white"
                      />
                      <g id="Left Circle 1">
                        <path
                          id="Vector"
                          d="M12.3333 9.62484C12.6785 9.62484 12.9583 9.34502 12.9583 8.99984C12.9583 8.65466 12.6785 8.37484 12.3333 8.37484V9.62484ZM7.89333 12.7771C8.13849 13.0201 8.53422 13.0183 8.7772 12.7731C9.02019 12.528 9.01842 12.1322 8.77326 11.8893L7.89333 12.7771ZM7.15798 11.1683L7.59795 10.7244L7.59795 10.7244L7.15798 11.1683ZM7.15798 6.83138L6.71801 6.38747L6.71801 6.38747L7.15798 6.83138ZM8.77326 6.11041C9.01842 5.86743 9.02019 5.4717 8.7772 5.22654C8.53422 4.98137 8.13849 4.97961 7.89333 5.22259L8.77326 6.11041ZM5.67989 9.20873L5.0599 9.28775L5.0599 9.28775L5.67989 9.20873ZM5.67989 8.79095L5.0599 8.71192L5.0599 8.71192L5.67989 8.79095ZM16.7083 8.99984C16.7083 13.257 13.2572 16.7082 8.99996 16.7082V17.9582C13.9475 17.9582 17.9583 13.9474 17.9583 8.99984H16.7083ZM8.99996 16.7082C4.74276 16.7082 1.29163 13.257 1.29163 8.99984H0.041626C0.041626 13.9474 4.05241 17.9582 8.99996 17.9582V16.7082ZM1.29163 8.99984C1.29163 4.74264 4.74276 1.2915 8.99996 1.2915V0.0415039C4.05241 0.0415039 0.041626 4.05229 0.041626 8.99984H1.29163ZM8.99996 1.2915C13.2572 1.2915 16.7083 4.74264 16.7083 8.99984H17.9583C17.9583 4.05229 13.9475 0.0415039 8.99996 0.0415039V1.2915ZM12.3333 8.37484H6.33329V9.62484H12.3333V8.37484ZM8.77326 11.8893L7.59795 10.7244L6.71801 11.6122L7.89333 12.7771L8.77326 11.8893ZM7.59794 7.27529L8.77326 6.11041L7.89333 5.22259L6.71801 6.38747L7.59794 7.27529ZM7.59795 10.7244C7.11886 10.2496 6.79773 9.92995 6.58182 9.6611C6.37382 9.4021 6.31539 9.2515 6.29987 9.1297L5.0599 9.28775C5.11654 9.73208 5.32851 10.0968 5.6072 10.4438C5.87797 10.781 6.25981 11.1581 6.71801 11.6122L7.59795 10.7244ZM6.71801 6.38747C6.25981 6.8416 5.87797 7.21871 5.6072 7.55587C5.32851 7.90289 5.11654 8.2676 5.0599 8.71192L6.29987 8.86997C6.31539 8.74817 6.37382 8.59757 6.58182 8.33858C6.79773 8.06972 7.11886 7.75011 7.59795 7.27528L6.71801 6.38747ZM6.29987 9.1297C6.29437 9.08658 6.29163 9.04321 6.29163 8.99984L5.04163 8.99984C5.04163 9.096 5.04772 9.19216 5.0599 9.28775L6.29987 9.1297ZM6.29163 8.99984C6.29163 8.95647 6.29437 8.91309 6.29987 8.86997L5.0599 8.71192C5.04772 8.80751 5.04163 8.90367 5.04163 8.99984L6.29163 8.99984ZM6.33329 8.37484H5.66663V9.62484H6.33329V8.37484Z"
                          fill="#344054"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1481_37234">
                <rect
                  width="375"
                  height="812"
                  fill="white"
                  transform="translate(-25 -49)"
                />
              </clipPath>
            </defs>
          </svg>
          <span>Go Back</span>
        </div>

        <div
          style={{
            color: "#101928",
            fontWeight: 700,
            fontSize: 18,
            fontFamily: "fontBold",
          }}
        >
          Add New Record
        </div>
      </Stack>

       <Box sx={{ pt: 3 }}>
        <Grid container spacing={3} sx={{ pb: 15, px: 2.5 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                py: 2,
                px: 3,
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
            >
              {(steps[activeStep].label as string) !== "Consent information" ? (
                <div style={{ textAlign: "center", marginBottom: 25 }}>
                  <Typography fontWeight={700} color={"#101928"} fontSize={32}>
                    Create Service User
                  </Typography>
                  <span
                    style={{
                      color: "#101928",
                      fontWeight: 400,
                    }}
                  >
                    Enter profile information below
                  </span>
                </div>
              ) : (
                <div style={{ textAlign: "center", marginBottom: 25 }}>
                  <Typography fontWeight={700} color={"#101928"} fontSize={32}>
                    Consent information
                  </Typography>
                  <span
                    style={{
                      color: "#101928",
                      fontWeight: 400,
                    }}
                  >
                    Customize client’s consent preferences here
                  </span>
                </div>
              )}

              {steps[activeStep].content}

              <Stack direction="row" gap={3} alignItems="center" sx={{ mt: 2 }}>
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
                    {"Previous"}
                  </Button>
                )}

                {activeStep <= 0 && (
                  <Buttons onClick={handleNext} title={"Next"} />
                )}
                {activeStep === 2 && (
                  <Buttons onClick={handleNext} title={"Next"} />
                )}

                {activeStep > 0 && activeStep <= 1 && (
                  <>
                    {result === "Verification Successful" ? (
                      <Buttons
                        onClick={createUser}
                        loading={isLoading}
                        title={"Continue"}
                      />
                    ) : (
                      <Buttons onClick={verify} title={"Verify"} />
                    )}
                  </>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
