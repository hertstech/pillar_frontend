import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../../Utils";
import { dispatchClient } from "../../../../redux/clientSlice";
import { UpdateConsent } from "./updateConsent";
import { ProfileForm } from "./profile";
import { useAlert } from "../../../../Utils/useAlert";

export default function Profile() {
  const user = useSelector((state: any) => state.user.user);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newId = parseInt(id as string);

  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [consentData, setConsentData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const steps = ["Profile Information", "Consent Form"];

  const profileRef = useRef<any>(null);
  const consentRef = useRef<any>(null);

  const handleNext = () => {
    if (activeStep === 0 && profileRef.current) {
      profileRef.current.submitForm();
      if (Object.keys(profileData).length === 0) {
        useAlert({
          icon: "warning",
          title: "Incomplete Profile",
          text: "Please make changes to the profile before proceeding.",
        });
        return;
      }
    } else if (activeStep === 1 && consentRef.current) {
      consentRef.current.submitForm();
      if (Object.keys(consentData).length === 0) {
        useAlert({
          icon: "warning",
          title: "Incomplete Consent",
          text: "Please make changes to the consent form before submission.",
        });
        return;
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = (formData: any) => {
    setProfileData(formData);
    console.log("Updated Form Data:", formData);
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleConsentSubmit = (formData: any) => {
    setConsentData(formData);
    updateUser();
  };

  const retryDataLoad = () => {
    setTimeout(() => {
      setRetryCount((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    const profileKeys = Object.keys(profileData).length;
    const consentKeys = Object.keys(consentData).length;

    if (profileKeys && consentKeys) {
      setIsDataLoaded(true);
    } else {
      retryDataLoad();
    }
  }, [profileData, consentData, retryCount]);


 const updateUser = async () => {
   if (!isDataLoaded) {
     return;
   }

   setSubmitting(true);
   try {
     const res = await axiosInstance.put(`/update-serviceiuser-profile/${id}`, {
       ...profileData,
       ...consentData,
     });
     dispatch(dispatchClient({ tabId: "tab1", client: [res.data] }));
     setSubmitting(false);
     useAlert({
       icon: "success",
       title: "Successful",
       text: "Record Successfully Updated",
     });

     if (user.role === "superadmin" || user.role === "admin") {
       navigate(`/dashboard/user/${id}?tabId=1`);
     } else {
       navigate(`/dashboard/user/${id}`);
     }
   } catch (error) {
     setSubmitting(false);
     useAlert({
       icon: "error",
       title: "Error",
       text: "Something went wrong, try again!",
     });
   }
 };

  return (
    <Box>
      <Typography fontWeight={700} color="#101928" fontSize={32} align="center">
        Update Profile
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-8">
        {activeStep === 0 && (
          <ProfileForm ref={profileRef} onSubmit={handleFormSubmit} />
        )}

        {activeStep === 1 && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Consent Form</Typography>
            <UpdateConsent
              ref={consentRef}
              NHRID={newId}
              onNext={handleConsentSubmit}
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 4,
              marginTop: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ width: "100%" }}
            >
              Back
            </Button>
            <Button
              disabled={submitting}
              variant="contained"
              onClick={handleNext}
              sx={{ width: "100%" }}
            >
              {activeStep === 1 ? "Update profile" : "Continue"}
            </Button>
          </Box>
        )}
      </div>
    </Box>
  );
}
