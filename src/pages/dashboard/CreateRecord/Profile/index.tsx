import { useState, useRef } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../../Utils";
import { dispatchClient } from "../../../../redux/clientSlice";
import { UpdateConsent } from "./updateConsent";
import { ProfileForm } from "./profile";

export default function Profile() {
  const user = useSelector((state: any) => state.user.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newId = parseInt(id as string);

  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [consentData, setConsentData] = useState({});
  const steps = ["Profile Information", "Consent Form"];

  const profileRef = useRef<any>(null);
  const consentRef = useRef<any>(null);

  const handleNext = async () => {
    if (activeStep === 0 && profileRef.current) {
      profileRef.current.submitForm();
    } else if (activeStep === 1 && consentRef.current) {
      consentRef.current.submitForm();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
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

  const updateUser = async () => {
    console.log("updated data for sub;",{ ...profileData, ...consentData });
    return;
    try {
      const res = await axiosInstance.put(
        `/update-serviceiuser-profile/${id}`,
        {
          ...profileData,
          ...consentData,
        }
      );
      const responseArray = [res.data];
      dispatch(dispatchClient({ tabId: "tab1", client: responseArray }));

      Swal.fire({
        icon: "success",
        title: `Successful`,
        text: "Record Successfully Updated",
        confirmButtonColor: "#2E90FA",
      });

      if (user.role === "superadmin" || user.role === "admin") {
        navigate(`/dashboard/user/${id}?tabId=1`);
      } else {
        navigate(`/dashboard/user/${id}`);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        confirmButtonColor: "#2E90FA",
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
