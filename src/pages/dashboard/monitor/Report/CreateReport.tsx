import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  Stack,
  Step,
  // StepIcon,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Buttons from "../../../../components/Button";
import StepThree from "./StepThree";
import { axiosInstance } from "../../../../Utils";

interface FormData {
  duration: string | null;
  reportType: string | null;
  state: string[] | null;
  yAxis: {
    gender: string[] | null;
    age: number[] | null;
  };
  diagnosis: {
    primaryDiagnosis: string | null;
    secondaryDiagnosis: string | null;
    treatmentStatus: string[] | null;
  };
  bloodType: string[];
  genoType: string[];
  immunizationtype: string[];
  medicationName: string[];
  from: string | null;
  to: string | null;
  chartType: string | null;
  static: boolean;
  // description: string | null;
  // chartTitle: string | null;
}

export default function CreateReport() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState({});

  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    // STEP ONE
    duration: null,
    reportType: null,
    state: [],
    yAxis: { gender: [], age: [] },
    chartType: null,
    diagnosis: {
      primaryDiagnosis: null,
      secondaryDiagnosis: null,
      treatmentStatus: [],
    },
    bloodType: [],
    genoType: [],
    immunizationtype: [],
    medicationName: [],

    // STEP TWO
    from: null,
    to: null,
    static: false,
    // description: null,
    // chartTitle: null,
  });


  // const handleChange = (
  //   name: string,
  //   value: any,
  //   axis: "yAxis",
  //   chartType: string
  // ) => {
  //   if (name === "age" || name === "gender") {
  //     const selectedState =
  //       typeof value === "string" ? value.split(",") : value;

  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [axis]: {
  //         ...prevData[axis],
  //         [name]: selectedState,
  //       },
  //       chartType: chartType,
  //     }));
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name || ""]: value,
  //       chartType: chartType,
  //     });
  //   }
  // };

  const handleChange = (
    name: string,
    value: any,
    axis: "yAxis",
    chartType: string,
    healthInfo?: boolean
  ) => {
    if (healthInfo) {
      setFormData((prevData) => ({
        ...prevData,
        diagnosis: {
          ...prevData.diagnosis,
          [name]: value === "" ? null : value,
        },
        chartType: chartType,
      }));
    } else if (name === "age" || name === "gender") {
      const selectedState =
        typeof value === "string" ? value.split(",") : value;

      setFormData((prevData) => ({
        ...prevData,
        [axis]: {
          ...prevData[axis],
          [name]: selectedState,
        },
        chartType: chartType,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name || ""]: value === "" ? null : value,
        chartType: chartType,
      }));
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < tabs.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    console.log(formData);
  };

  const handleSubmitDemographicChart = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/demographics`,
        formData
      );
      setResult(res.data);
      setIsLoading(false);

      if (res.status === 200) {
        if (activeStep < tabs.length - 1) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
      // setFormData(formData);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSubmitHealthInfoChart = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/healthinformation`,
        formData
      );
      setResult(res.data);
      setIsLoading(false);

      if (res.status === 200) {
        if (activeStep < tabs.length - 1) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
      // setFormData(formData);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSubmitMedicationsChart = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/medicationinformation`,
        formData
      );
      setResult(res.data);
      setIsLoading(false);

      if (res.status === 200) {
        if (activeStep < tabs.length - 1) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
      // setFormData(formData);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const tabs = [
    {
      icon: (
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Edit 2">
            <g id="Vector">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.359 1.67532L13.4641 1.73599C14.3719 2.26007 15.1289 2.69709 15.6832 3.12485C16.2682 3.57634 16.7326 4.09457 16.9271 4.82045C17.1216 5.54633 16.9785 6.22731 16.6976 6.91084C16.4315 7.55843 15.9944 8.3154 15.4702 9.22317L10.9488 17.0547C10.6024 17.6558 10.3284 18.1312 9.91153 18.4894C9.49461 18.8476 8.98344 19.0469 8.33696 19.2988L8.16226 19.367C6.96267 19.8357 5.97385 20.2221 5.16412 20.4113C4.31725 20.6091 3.49958 20.6337 2.73743 20.1937C1.97527 19.7537 1.58776 19.0333 1.33568 18.2009C1.09465 17.4051 0.934834 16.3556 0.740952 15.0823L0.712651 14.8969C0.607617 14.2111 0.524565 13.6688 0.626339 13.1286C0.639061 13.0611 0.654485 12.9946 0.672415 12.9287C0.797926 12.4678 1.04624 12.0385 1.35024 11.5129L5.87179 3.68151C6.39587 2.7737 6.83289 2.01671 7.26064 1.46241C7.71213 0.877344 8.23036 0.412978 8.95624 0.218479C9.68212 0.0239797 10.3631 0.167019 11.0466 0.447952C11.6942 0.714113 12.4512 1.15118 13.359 1.67532ZM6.9195 5.36682L13.4869 9.15849L9.49285 16.0763C9.05773 16.83 8.93332 17.0227 8.77105 17.1621C8.60878 17.3015 8.39954 17.3955 7.58897 17.7122C6.30976 18.212 5.43853 18.55 4.76598 18.7072C4.11629 18.859 3.82149 18.7989 3.61242 18.6782C3.40336 18.5575 3.20394 18.3322 3.01055 17.6937C2.81035 17.0326 2.66751 16.1091 2.46073 14.7514C2.3297 13.8911 2.30647 13.6629 2.34608 13.4526C2.38569 13.2424 2.49037 13.0383 2.92549 12.2847L6.9195 5.36682ZM15.079 6.24559C14.9244 6.62177 14.6879 7.06408 14.36 7.64189L7.79633 3.85234C8.13278 3.27946 8.39761 2.85353 8.64608 2.53155C8.97795 2.1015 9.20149 1.9645 9.40918 1.90885C9.61686 1.8532 9.87895 1.86007 10.3814 2.06657C10.9073 2.28273 11.5625 2.65886 12.5365 3.2212C13.5105 3.78354 14.1639 4.1629 14.614 4.51028C15.0441 4.84215 15.1811 5.06569 15.2367 5.27338C15.2924 5.48106 15.2855 5.74316 15.079 6.24559Z"
                fill="#667185"
              />
              <path
                d="M11.7688 19.7917C11.7688 19.3084 12.1606 18.9167 12.6438 18.9167H19.6438C20.127 18.9167 20.5188 19.3084 20.5188 19.7917C20.5188 20.2749 20.127 20.6667 19.6438 20.6667H12.6438C12.1606 20.6667 11.7688 20.2749 11.7688 19.7917Z"
                fill="#667185"
              />
            </g>
          </g>
        </svg>
      ),
      label: "Report Data",
      description: "Enter report details",
      content: (
        <StepOne
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      ),
    },
    {
      icon: "",
      label: "Chart Type",
      description: "Select a chart for your report",
      content: (
        <StepTwo
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      ),
    },
    {
      label: "Save Report",
      content: (
        <StepThree
          formData={formData}
          result={result}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: "1px #E7E9FB solid",
        }}
      >
        <Stack p={2} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
          </div>{" "}
          <Typography>Generate Report</Typography>
        </Stack>
      </Box>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} sx={{ pb: 12 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                background: "#F7F9FC",
                border: "none",
                boxShadow: "none",
                height: 750,
                p: 3,
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
                {tabs.map((item, index) => (
                  <Step sx={{ marginTop: 2 }} key={item.label}>
                    <StepLabel
                    // StepIconComponent={() => (
                    //   <StepIcon
                    //     active={activeStep === index}
                    //     completed
                    //     icon={index + 1}
                    //   />
                    // )}
                    >
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
                        <span>{item.description}</span>
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
                <span
                  style={{
                    color: "#98A2B3",
                    width: "250px",
                    display: "block",
                    fontWeight: 400,
                  }}
                >
                  Experiencing any difficulty? Let us know below.
                </span>
                <Stack alignItems="flex-start" sx={{ mt: 2 }}>
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      borderRadius: 2.5,
                      px: 2,
                      py: 1,
                      border: "1px solid #16B364",
                      color: "#099250",
                    }}
                  >
                    Contact Us
                  </Link>
                </Stack>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card
              sx={{
                width: "80%",
                margin: "auto",
                border: "none",
                boxShadow: "none",
              }}
            >
              {tabs[activeStep].content}

              <Stack direction="row" gap={3} alignItems="center" sx={{ mt: 4 }}>
                {activeStep <= 0 && (
                  <Buttons onClick={handleNext} title={"Continue"} />
                )}

                {activeStep >= 1 && (
                  <Button
                    fullWidth
                    size="large"
                    sx={{
                      color: "#099250",
                      border: "1px solid #D3F8DF",
                      outline: "none",
                      textTransform: "capitalize",
                      fontWeight: 600,
                      height: 48,
                      background: "#D3F8DF",
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "#D3F8DF",
                        border: "1px solid #D3F8DF",
                      },
                    }}
                    disabled={activeStep <= 0}
                    variant="outlined"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}

                {activeStep > 0 && activeStep <= 1 && (
                  <>
                    {formData.reportType === "Demographics" && (
                      <Buttons
                        loading={isLoading}
                        onClick={handleSubmitDemographicChart}
                        title={"Generate Report"}
                      />
                    )}

                    {formData.reportType === "Health Information" && (
                      <Buttons
                        loading={isLoading}
                        onClick={handleSubmitHealthInfoChart}
                        title={"Generate Report"}
                      />
                    )}

                    {formData.reportType === "Medication" && (
                      <Buttons
                        loading={isLoading}
                        onClick={handleSubmitMedicationsChart}
                        title={"Generate Report"}
                      />
                    )}
                  </>
                )}

                {activeStep >= 2 && (
                  <Buttons onClick={() => {}} title={"Save Report"} />
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
