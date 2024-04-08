import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
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
  demographics: {
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
  status: boolean;
  description: string | null;
  title: string | null;
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
    demographics: { gender: [], age: [] },
    diagnosis: {
      primaryDiagnosis: null,
      secondaryDiagnosis: null,
      treatmentStatus: [],
    },
    chartType: null,
    bloodType: [],
    genoType: [],
    immunizationtype: [],
    medicationName: [],

    // STEP TWO
    from: null,
    to: null,
    static: false,
    status: false,
    description: null,
    title: null,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    name: string,
    value: any,
    axis: "demographics",
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

  const handleSaveReport = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/save/charts`,
        formData
      );

      setIsLoading(false);
      console.log(res.data);
      if (res.data === "Successful") {
        setShowModal(true);
      }
    } catch (error) {
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
      content: <StepOne formData={formData} handleChange={handleChange} />,
    },
    {
      icon: "",
      label: "Chart Type",
      description: "Select a chart for your report",
      content: <StepTwo formData={formData} handleChange={handleChange} />,
    },
    {
      label: "Save Report",
      content: (
        <StepThree
          formData={formData}
          result={result}
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
                  <Buttons
                    loading={isLoading}
                    onClick={handleSaveReport}
                    title={"Save Report"}
                  />
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <>
        <Dialog
          open={showModal}
          maxWidth="xs"
          fullWidth
          aria-labelledby="alert-saved-report"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ marginBottom: 2 }}>
            <Button
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                padding: "16px 8px",
              }}
              onClick={() => setShowModal(false)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Teeny icon / x-small">
                  <path
                    id="Vector"
                    d="M4.19922 4.2002L9.79922 9.8002M4.19922 9.8002L9.79922 4.2002"
                    stroke="#099250"
                  />
                </g>
              </svg>
            </Button>
          </DialogTitle>

          <div style={{ display: "grid", placeContent: "center" }}>
            <svg
              width="186"
              height="109"
              viewBox="0 0 186 109"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M169.049 43.6348L167.727 44.9563L167.066 45.6171L167.912 46.4629L169.049 47.5994L170.37 46.2779L171.031 45.6171L170.04 44.6259L169.049 43.6348Z"
                fill="#FBC02D"
              />
              <path
                d="M143.939 58.1719L142.618 59.4934L141.957 60.1542L142.885 61.0819L143.939 62.1365L145.096 60.9802L145.922 60.1542L145.262 59.4934L143.939 58.1719Z"
                fill="#1976D2"
              />
              <path
                d="M139.975 14.5605L138.619 15.9165L137.992 16.5429L138.55 17.1006L139.975 18.5252L140.989 17.5103L141.957 16.5429L140.861 15.4473L139.975 14.5605Z"
                fill="#FBC02D"
              />
              <path
                d="M154.514 14.5605L152.9 16.1742L152.531 16.5429L153.041 17.053L154.514 18.5252L156.496 16.5429L154.514 14.5605Z"
                fill="#1976D2"
              />
              <path
                d="M157.154 22.4893L155.867 23.7765L155.172 24.4716L156.071 25.3702L157.154 26.4539L158.309 25.2989L159.137 24.4716L158.226 23.561L157.154 22.4893Z"
                fill="#FF8F00"
              />
              <path
                d="M175.654 29.0977L174.766 29.9857L173.672 31.08L174.416 31.824L175.654 33.0623L176.873 31.8438L177.637 31.08L176.87 30.3135L175.654 29.0977Z"
                fill="#F50057"
              />
              <path
                d="M132.045 38.3477L130.682 39.7102L130.062 40.33L130.807 41.074L132.045 42.3123L133.325 41.0317L134.027 40.33L133.306 39.6084L132.045 38.3477Z"
                fill="#1976D2"
              />
              <path
                d="M174.995 47.5996L173.302 49.2925L172.352 50.2427L173.24 51.1308L174.995 52.8858L176.853 51.0277L177.638 50.2427L176.998 49.6031L174.995 47.5996Z"
                fill="#FF8F00"
              />
              <path
                d="M153.852 52.8851L152.035 54.7023L151.209 55.5282L151.911 56.23L153.852 58.1713L155.67 56.3542L156.496 55.5282L155.876 54.9084L153.852 52.8851ZM148.566 33.0618C148.68 32.96 149.888 29.0971 149.888 25.1325C149.888 23.4554 149.433 22.1576 148.536 21.2735C147.072 19.8317 144.832 19.8542 144.795 19.8462H144.602V17.2031H144.767C144.866 17.2058 148.083 17.141 150.365 19.3665C151.803 20.7674 152.531 22.7074 152.531 25.1325C152.531 30.4187 148.566 33.0618 148.566 33.0618ZM177.64 62.136H174.997V61.9708C174.935 60.0704 174.281 58.1713 173.841 58.1713C172.878 58.1713 171.93 59.3317 171.169 60.2647C170.349 61.2691 169.642 62.136 168.555 62.136C166.734 62.136 166.329 59.9739 165.938 57.8846C165.872 57.5317 165.787 57.0784 165.691 56.6476C165.624 56.785 165.556 56.9185 165.495 57.0441C164.26 59.5484 162.982 62.136 160.956 62.136C159.394 62.136 157.817 60.9096 157.817 58.1713H160.46C160.46 58.9497 160.664 59.4929 160.956 59.4929C161.462 59.2444 162.628 56.8828 163.126 55.8745C164.077 53.9463 164.601 52.8851 165.746 52.8851C167.692 52.8851 168.12 55.1793 168.536 57.3982C168.618 57.833 168.729 58.433 168.851 58.9246C168.945 58.8123 169.037 58.6986 169.122 58.5942C170.178 57.3004 171.623 55.5282 173.841 55.5282C177.272 55.5282 177.607 60.862 177.64 61.9312V62.136Z"
                fill="#F50057"
              />
              <path
                d="M176.317 14.5618C173.651 14.6054 171.8 15.1802 170.722 16.2494C170.111 16.856 169.764 17.6225 169.715 18.4749C169.714 18.4907 169.709 18.578 169.709 18.6044C169.733 20.2537 170.541 21.6823 170.826 22.1594C170.878 22.2492 170.971 22.4316 170.991 22.4977C170.281 22.4647 168.999 22.2017 168.196 22.0299C165.831 21.5264 163.794 21.0902 162.575 22.0735C162.062 22.4898 161.779 23.1056 161.779 23.8113C161.779 25.3351 162.765 26.6778 163.557 27.7575C163.885 28.2042 164.38 28.8782 164.423 29.0975C164.423 29.7834 163.943 30.0411 161.407 30.7283C158.558 31.5001 153.85 33.0622 151.207 37.0269C155.172 34.3838 159.271 34.0454 162.097 33.2803C164.54 32.6195 167.066 31.9349 167.066 29.0975C167.066 28.0707 166.397 27.1588 165.687 26.1928C165.208 25.5386 164.629 24.7496 164.466 24.1219C165.194 24.1007 166.69 24.4113 167.643 24.6148C168.938 24.891 170.129 25.1263 171.083 25.1302V25.1329C172.214 25.1329 173.006 24.5501 173.339 24.0492L173.467 23.806C173.618 23.4307 173.673 23.062 173.673 22.721C173.673 21.7973 173.261 21.0731 173.174 20.9303C172.985 20.6462 172.421 19.659 172.366 18.6863C172.365 18.6652 172.365 18.5978 172.366 18.5859C172.385 18.4048 172.446 18.2608 172.585 18.1247C172.808 17.9026 173.771 17.185 176.977 17.2035H177.638V14.5604C177.638 14.5604 176.503 14.5578 176.317 14.5618Z"
                fill="#FF8F00"
              />
              <path
                d="M174.995 43.6341H177.638C177.638 43.4068 177.625 43.1861 177.601 42.9734C177.063 38.299 170.822 37.0264 167.066 37.0264C159.137 37.0264 155.172 40.991 155.172 40.991C155.172 40.991 159.137 39.6695 167.066 39.6695C167.145 39.6695 174.995 39.7778 174.995 43.6341Z"
                fill="#1976D2"
              />
              <path
                d="M136.175 26.4545C133.14 26.4545 132.739 25.9867 132.725 25.9709C132.725 25.9709 132.706 25.9246 132.677 25.9206C132.831 25.6643 133.728 25.2374 134.211 25.0088C135.213 24.533 136.329 24.0004 136.606 22.9855C136.648 22.8322 136.67 22.667 136.67 22.4899C136.67 22.3141 136.654 22.1502 136.625 21.9943C136.38 20.6979 135.181 20.0714 134.28 19.5996C133.08 18.9719 132.706 18.6732 132.706 18.0296C132.706 17.2631 133.814 17.2063 134.038 17.2037H134.027V14.5605C132.433 14.5605 130.062 15.4843 130.062 18.0296C130.062 20.3767 131.935 21.356 133.055 21.9414C133.259 22.0498 133.525 22.1886 133.728 22.3022C133.514 22.4132 133.27 22.5295 133.074 22.6234C131.804 23.2273 130.062 24.0559 130.062 25.7938C130.062 29.0977 134.039 29.0977 136.175 29.0977C136.265 29.0977 136.345 29.1016 136.417 29.1082C135.848 29.7228 134.323 30.7932 131.437 31.8174L132.321 34.3086C134.424 33.5619 139.313 31.5293 139.313 28.7673C139.313 27.6532 138.331 26.4545 136.175 26.4545Z"
                fill="#FF8F00"
              />
              <path
                d="M16.9513 43.6348L18.2728 44.9563L18.9336 45.6171L18.0878 46.4629L16.9513 47.5994L15.6297 46.2779L14.9689 45.6171L15.9601 44.6259L16.9513 43.6348Z"
                fill="#FBC02D"
              />
              <path
                d="M42.0606 58.1719L43.3822 59.4934L44.043 60.1542L43.1152 61.0819L42.0606 62.1365L40.9043 60.9802L40.0783 60.1542L40.7378 59.4934L42.0606 58.1719Z"
                fill="#1976D2"
              />
              <path
                d="M46.0255 14.5605L47.3814 15.9165L48.0078 16.5429L47.4501 17.1006L46.0255 18.5252L45.0105 17.5103L44.0431 16.5429L45.1387 15.4473L46.0255 14.5605Z"
                fill="#FBC02D"
              />
              <path
                d="M31.4864 14.5605L33.1 16.1742L33.4688 16.5429L32.9586 17.053L31.4864 18.5252L29.5041 16.5429L31.4864 14.5605Z"
                fill="#1976D2"
              />
              <path
                d="M28.8458 22.4893L30.133 23.7765L30.8281 24.4716L29.9295 25.3702L28.8458 26.4539L27.6908 25.2989L26.8635 24.4716L27.774 23.561L28.8458 22.4893Z"
                fill="#FF8F00"
              />
              <path
                d="M10.3458 29.0977L11.2339 29.9857L12.3281 31.08L11.5841 31.824L10.3458 33.0623L9.12732 31.8438L8.36346 31.08L9.12996 30.3135L10.3458 29.0977Z"
                fill="#F50057"
              />
              <path
                d="M53.9552 38.3477L55.3177 39.7102L55.9375 40.33L55.1935 41.074L53.9552 42.3123L52.6746 41.0317L51.9728 40.33L52.6944 39.6084L53.9552 38.3477Z"
                fill="#1976D2"
              />
              <path
                d="M11.0053 47.5996L12.6982 49.2925L13.6484 50.2427L12.7604 51.1308L11.0053 52.8858L9.14722 51.0277L8.36222 50.2427L9.00185 49.6031L11.0053 47.5996Z"
                fill="#FF8F00"
              />
              <path
                d="M32.1475 52.8851L33.9647 54.7023L34.7907 55.5282L34.0889 56.23L32.1475 58.1713L30.3304 56.3542L29.5044 55.5282L30.1242 54.9084L32.1475 52.8851ZM37.4338 33.0618C37.3201 32.96 36.1122 29.0971 36.1122 25.1325C36.1122 23.4554 36.5668 22.1576 37.4642 21.2735C38.9285 19.8317 41.1685 19.8542 41.2055 19.8462H41.3984V17.2031H41.2332C41.1341 17.2058 37.9175 17.141 35.6351 19.3665C34.1973 20.7674 33.4691 22.7074 33.4691 25.1325C33.4691 30.4187 37.4338 33.0618 37.4338 33.0618ZM8.35955 62.136H11.0027V61.9708C11.0648 60.0704 11.7189 58.1713 12.159 58.1713C13.1224 58.1713 14.07 59.3317 14.8312 60.2647C15.6506 61.2691 16.3576 62.136 17.4452 62.136C19.2663 62.136 19.6707 59.9739 20.0619 57.8846C20.128 57.5317 20.2126 57.0784 20.3091 56.6476C20.3765 56.785 20.4439 56.9185 20.5046 57.0441C21.7403 59.5484 23.0182 62.136 25.0442 62.136C26.6063 62.136 28.1829 60.9096 28.1829 58.1713H25.5398C25.5398 58.9497 25.3363 59.4929 25.0442 59.4929C24.538 59.2444 23.3724 56.8828 22.8742 55.8745C21.9227 53.9463 21.3993 52.8851 20.2535 52.8851C18.3082 52.8851 17.88 55.1793 17.4637 57.3982C17.3818 57.833 17.2708 58.433 17.1492 58.9246C17.0554 58.8123 16.9629 58.6986 16.8783 58.5942C15.8224 57.3004 14.3766 55.5282 12.159 55.5282C8.72826 55.5282 8.39259 60.862 8.35955 61.9312V62.136Z"
                fill="#F50057"
              />
              <path
                d="M9.68341 14.5618C12.349 14.6054 14.2005 15.1802 15.2776 16.2494C15.8894 16.856 16.2357 17.6225 16.2846 18.4749C16.2859 18.4907 16.2912 18.578 16.2912 18.6044C16.2674 20.2537 15.4586 21.6823 15.1745 22.1594C15.1216 22.2492 15.0291 22.4316 15.0093 22.4977C15.719 22.4647 17.0009 22.2017 17.8044 22.0299C20.1686 21.5264 22.2065 21.0902 23.4249 22.0735C23.9377 22.4898 24.2205 23.1056 24.2205 23.8113C24.2205 25.3351 23.2346 26.6778 22.443 27.7575C22.1153 28.2042 21.6197 28.8782 21.5774 29.0975C21.5774 29.7834 22.0571 30.0411 24.5932 30.7283C27.4425 31.5001 32.1499 33.0622 34.793 37.0269C30.8283 34.3838 26.7288 34.0454 23.9034 33.2803C21.4598 32.6195 18.9343 31.9349 18.9343 29.0975C18.9343 28.0707 19.603 27.1588 20.3127 26.1928C20.7924 25.5386 21.3713 24.7496 21.5338 24.1219C20.8056 24.1007 19.3096 24.4113 18.3568 24.6148C17.0617 24.891 15.8709 25.1263 14.9168 25.1302V25.1329C13.7855 25.1329 12.9939 24.5501 12.6609 24.0492L12.5327 23.806C12.382 23.4307 12.3265 23.062 12.3265 22.721C12.3265 21.7973 12.7388 21.0731 12.8261 20.9303C13.0151 20.6462 13.5794 19.659 13.6335 18.6863C13.6349 18.6652 13.6349 18.5978 13.6335 18.5859C13.615 18.4048 13.5543 18.2608 13.4155 18.1247C13.1921 17.9026 12.2287 17.185 9.02264 17.2035H8.36186V14.5604C8.36186 14.5604 9.49707 14.5578 9.68341 14.5618Z"
                fill="#FF8F00"
              />
              <path
                d="M11.0048 43.6341H8.36168C8.36168 43.4068 8.3749 43.1861 8.39869 42.9734C8.93656 38.299 15.1783 37.0264 18.9341 37.0264C26.8635 37.0264 30.8281 40.991 30.8281 40.991C30.8281 40.991 26.8635 39.6695 18.9341 39.6695C18.8548 39.6695 11.0048 39.7778 11.0048 43.6341Z"
                fill="#1976D2"
              />
              <path
                d="M49.8253 26.4545C52.8596 26.4545 53.2613 25.9867 53.2746 25.9709C53.2746 25.9709 53.2944 25.9246 53.3235 25.9206C53.1688 25.6643 52.2715 25.2374 51.7891 25.0088C50.7874 24.533 49.6707 24.0004 49.3945 22.9855C49.3522 22.8322 49.3297 22.667 49.3297 22.4899C49.3297 22.3141 49.3456 22.1502 49.3747 21.9943C49.6205 20.6979 50.8191 20.0714 51.7204 19.5996C52.9204 18.9719 53.2944 18.6732 53.2944 18.0296C53.2944 17.2631 52.1856 17.2063 51.9623 17.2037H51.9728V14.5605C53.5666 14.5605 55.9375 15.4843 55.9375 18.0296C55.9375 20.3767 54.0649 21.356 52.9455 21.9414C52.7407 22.0498 52.475 22.1886 52.2715 22.3022C52.4856 22.4132 52.7301 22.5295 52.9257 22.6234C54.1957 23.2273 55.9375 24.0559 55.9375 25.7938C55.9375 29.0977 51.9609 29.0977 49.8253 29.0977C49.7354 29.0977 49.6548 29.1016 49.5835 29.1082C50.1517 29.7228 51.6768 30.7932 54.5631 31.8174L53.679 34.3086C51.5764 33.5619 46.6866 31.5293 46.6866 28.7673C46.6866 27.6532 47.6685 26.4545 49.8253 26.4545Z"
                fill="#FF8F00"
              />
              <circle cx="92.5" cy="54.5" r="54" fill="#F3F6F5" />
              <circle
                cx="92.5"
                cy="54.5"
                r="44"
                fill="#27AE60"
                fill-opacity="0.27"
              />
              <circle
                cx="92.5"
                cy="54.5"
                r="33"
                fill="#27AE60"
                fill-opacity="0.83"
              />
              <path
                d="M106.449 43.4834L106.449 43.4834C105.866 43.5008 105.312 43.744 104.905 44.1618L87.248 61.8186L81.8422 56.4128C81.6357 56.1987 81.3887 56.0276 81.1156 55.9096C80.8408 55.7908 80.5451 55.7281 80.2457 55.725C79.9464 55.722 79.6495 55.7787 79.3723 55.8918C79.0952 56.005 78.8434 56.1723 78.6317 56.384C78.42 56.5957 78.2527 56.8474 78.1396 57.1246C78.0264 57.4017 77.9697 57.6986 77.9728 57.998C77.9758 58.2973 78.0386 58.593 78.1573 58.8678C78.2754 59.1409 78.4464 59.3879 78.6605 59.5945L85.6572 66.5911L85.6572 66.5912C86.0792 67.013 86.6514 67.2499 87.248 67.2499C87.8446 67.2499 88.4168 67.013 88.8388 66.5912L88.8389 66.5911L108.087 47.3434C108.41 47.0278 108.631 46.6219 108.721 46.1788C108.811 45.7344 108.764 45.2732 108.588 44.8556L108.132 45.0486L108.588 44.8556C108.411 44.4381 108.112 44.0836 107.731 43.8388C107.349 43.5939 106.902 43.47 106.449 43.4834Z"
                fill="white"
                stroke="white"
              />
            </svg>
          </div>

          <Typography variant="h5" align="center" sx={{ p: 2, mb: 0 }}>
            Report Saved!
          </Typography>

          <span style={{ textAlign: "center" }}>
            Your report can now be shared and downloaded.
          </span>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            gap={5}
            p={2}
          >
            <Button
              sx={{
                textTransform: "none",
                background: "#EDFCF2",
                py: 1.5,
                px: 2,
                alignItems: "center",
                color: "#099250",
                "&:hover": { backgroundColor: "#EDFCF2" },
                width: "50%",
                borderRadius: "6px",
              }}
              onClick={() => {
                navigate("/dashboard/app");
                setShowModal(false);
              }}
            >
              Go Home
            </Button>
            <Button
              sx={{
                textTransform: "none",
                background: "#099250",
                py: 1.5,
                px: 2,
                alignItems: "center",
                color: "#FFF",
                "&:hover": { backgroundColor: "#099250" },
                width: "50%",
                borderRadius: "6px",
              }}
              onClick={() => {
                navigate("/dashboard/monitoring");
                setShowModal(false);
              }}
            >
              View Report
            </Button>
          </Stack>
        </Dialog>
      </>
    </Box>
  );
}
