import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  Checkbox,
  Typography,
  Button,
  FormControl,
  Input,
} from "@mui/material";
import { SpinLoader } from "../../../components/NoResult";
import { allConsentData } from "../../../data/consentData";
import InputField from "../../../components/InputField";

interface StepThreeProps {
  isLoading: boolean;
}

type ConsentData = {
  userName: {
    firstName?: string;
    lastName?: string;
  };
  treatmentConsent: boolean;
  alternateTreatmentConsent: boolean;
  vaccineConsent: string[];
  geneticTestingConsent?: boolean;
  medicalRecordSharing?: boolean;
  providerSharing?: boolean;
  mentalHealthRecordSharing?: boolean;
  familySharing?: boolean;
  researchConsent?: boolean;
  organDonation?: boolean;
  researchOrganDonation?: boolean;
  marketingConsent?: boolean;
};

type VaccineOptionKey = "fluShot" | "covid19" | "hepatitisB";

const ConsentQuestion = ({
  questionText,
  checked,
  onToggle,
}: {
  questionText: string;
  checked: boolean;
  onToggle: () => void;
}) => (
  <Box className="flex justify-between items-center font-normal">
    <FormLabel className="!text-sm max-w-[450px] xl:max-w-[550px] !font-normal">
      {questionText}
    </FormLabel>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        maxWidth: "105px",
        fontWeight: 400,
      }}
    >
      <Typography variant="body2">No</Typography>
      <FormControlLabel
        className="!text-sm"
        value="yes"
        control={
          <Switch
            sx={{ width: 62, height: 40, padding: 1.5 }}
            checked={checked}
            onChange={onToggle}
          />
        }
        label="Yes"
      />
    </Box>
  </Box>
);

export default function StepThree({ isLoading }: StepThreeProps) {
  const [consentData, setConsentData] = useState<ConsentData>({
    treatmentConsent: false,
    alternateTreatmentConsent: false,
    vaccineConsent: [],
    userName: { firstName: "", lastName: "" },
  });
  const [showVaccineOptions, setShowVaccineOptions] = useState(false);
  const [showShareWithFamily, setShowShareWithFamily] = useState(false);

  const handleChange = (key: keyof ConsentData) => {
    if (key === "vaccineConsent") {
      setShowVaccineOptions(!showVaccineOptions);
      setConsentData((prevData) => ({
        ...prevData,
        vaccineConsent: showVaccineOptions ? [] : prevData.vaccineConsent,
      }));
    } else if (key === "familySharing") {
      setShowShareWithFamily(!showShareWithFamily);
      setConsentData((prevData) => ({
        ...prevData,
        [key]: !prevData[key],
      }));
    } else {
      setConsentData((prevData) => ({
        ...prevData,
        [key]: !prevData[key],
      }));
    }
  };

  const handleAdditionalOptionChange = (option: VaccineOptionKey) => {
    setConsentData((prevData) => {
      const currentSelections = Array.isArray(prevData.vaccineConsent)
        ? prevData.vaccineConsent
        : [];

      const newSelections = currentSelections.includes(option)
        ? currentSelections.filter(
            (selectedOption) => selectedOption !== option
          )
        : [...currentSelections, option];

      return {
        ...prevData,
        vaccineConsent: newSelections,
      };
    });
  };

  const handleNameInputChange = (
    field: "firstName" | "lastName",
    value: string
  ) => {
    setConsentData((prevData) => ({
      ...prevData,
      userName: {
        ...prevData.userName,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Collected Consent Data:", consentData);
  };

  const vaccineOptions = [
    { text: "COVID-19 Vaccine", key: "covid19" },
    { text: "Influenza vaccine", key: "fluShot" },
    { text: "Hepatitis B vaccine", key: "hepatitisB" },
  ];

  const handleConsentToAll = () => {
    setConsentData((prevData) => ({
      ...prevData,
      vaccineConsent:
        Array.isArray(prevData.vaccineConsent) &&
        prevData.vaccineConsent.length === vaccineOptions.length
          ? []
          : vaccineOptions.map((option) => option.key),
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        minHeight: 469,
        padding: 2,
      }}
    >
      {isLoading ? (
        <SpinLoader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="lg:max-w-[600px] xl:max-w-full"
        >
          {allConsentData.map((section, index) => (
            <Box key={index}>
              <h1 className="font-bold text-lg py-4">{section.title}</h1>
              <Box className="p-4 rounded-xl bg-bg2">
                <FormGroup>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    {section.questions.map((question) => (
                      <Box key={question.key}>
                        <ConsentQuestion
                          questionText={question.text}
                          checked={
                            question.key === "vaccineConsent"
                              ? showVaccineOptions
                              : !!consentData[question.key as keyof ConsentData]
                          }
                          onToggle={() =>
                            handleChange(question.key as keyof ConsentData)
                          }
                        />

                        {question.key === "vaccineConsent" &&
                          showVaccineOptions && (
                            <Box sx={{ ml: 4 }}>
                              <FormGroup>
                                <FormControlLabel
                                  sx={{ fontSize: "0.75rem !important" }}
                                  control={
                                    <Checkbox
                                      size="small"
                                      color="success"
                                      checked={
                                        Array.isArray(
                                          consentData.vaccineConsent
                                        ) &&
                                        consentData.vaccineConsent.length ===
                                          vaccineOptions.length
                                      }
                                      onChange={handleConsentToAll}
                                    />
                                  }
                                  label="Consent to all"
                                />

                                {vaccineOptions.map((option) => (
                                  <FormControlLabel
                                    sx={{ fontSize: "0.75rem !important" }}
                                    key={option.key}
                                    control={
                                      <Checkbox
                                        size="small"
                                        color="success"
                                        checked={
                                          Array.isArray(
                                            consentData.vaccineConsent
                                          ) &&
                                          consentData.vaccineConsent.includes(
                                            option.key
                                          )
                                        }
                                        onChange={() =>
                                          handleAdditionalOptionChange(
                                            option.key as VaccineOptionKey
                                          )
                                        }
                                      />
                                    }
                                    label={option.text}
                                  />
                                ))}
                              </FormGroup>
                            </Box>
                          )}
                      </Box>
                    ))}

                    {section.questions.some((q) => q.key === "familySharing") &&
                      showShareWithFamily && (
                        <Box sx={{ display: "flex", gap: 4 }}>
                          <InputField
                            label="First Name"
                            name="firstName"
                            placeholder="Abiola"
                            value={consentData.userName.firstName}
                            onChange={(e) =>
                              handleNameInputChange("firstName", e.target.value)
                            }
                          />
                          <InputField
                            label="Last Name"
                            name="lastName"
                            placeholder="Ekanka"
                            value={consentData.userName.lastName}
                            onChange={(e) =>
                              handleNameInputChange("lastName", e.target.value)
                            }
                          />
                        </Box>
                      )}
                  </Box>
                </FormGroup>
              </Box>
            </Box>
          ))}
          <Button
            type="submit"
            sx={{
              marginTop: 2,
              padding: "8px 16px",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
}
