import { useState } from "react";
import {
  Box,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  Checkbox,
  Typography,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { allConsentData } from "../../../data/consentData";
import InputField from "../../../components/InputField";
import BaseButton from "../../../components/Button";
import { consentSchema } from "../../../schemas/createUserSchema";
import { transformToSnakeCase } from "../../../Utils/caseTransformtter";
import { ConsentData } from "../../../types/serviceUserTypes/consent";
import {
  useGetUserConsent,
  useUpdateUserConsent,
} from "../../../api/HealthServiceUser/consent";
import { useAlert } from "../../../Utils/useAlert";
import { useNavigate } from "react-router-dom";

interface StepFourProps {
  NHRID: number;
}

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

export default function StepFour({ NHRID }: StepFourProps) {
  const navigate = useNavigate();

  const [showVaccineOptions, setShowVaccineOptions] = useState(false);
  const [showShareWithFamily, setShowShareWithFamily] = useState(false);

  const { mutate } = useUpdateUserConsent();
  const { data } = useGetUserConsent(NHRID);

  const {
    handleSubmit,
    watch,
    setValue,

    formState: { errors },
  } = useForm<ConsentData>({
    resolver: joiResolver(consentSchema),
    defaultValues: {
      treatmentConsent: data?.data.treatment_consent ?? false,
      alternateTreatmentConsent:
        data?.data.alternate_treatment_consent ?? false,
      vaccineConsent: data?.data.vaccine_consent ?? [],
      providerSharing: data?.data.provide_sharing ?? false,
      mentalHealthRecordSharing:
        data?.data.mental_health_recording_sharing ?? false,
      familySharing: data?.data.family_sharing ?? [
        { firstName: null, lastName: null },
      ],
      geneticTestingConsent: data?.data.genetic_testing_consent ?? false,
      medicalRecordSharing: data?.data.medical_record_sharing ?? false,
      organDonation: data?.data.organ_donation ?? false,
      marketingConsent: data?.data.market_consent ?? false,
      researchOrganDonation: data?.data.research_organ_donation ?? false,
      researchConsent: data?.data.research_consent ?? false,
      transfusionConsent: data?.data.transfusion_consent ?? false,
    },
  });

  const consentData = watch();

  const handleChange = (key: keyof ConsentData) => {
    if (key === "familySharing") {
      const newState = !showShareWithFamily;
      setShowShareWithFamily(newState);
      setValue(
        "familySharing",
        newState ? [{ firstName: "", lastName: "" }] : []
      );
    } else if (key === "vaccineConsent") {
      setShowVaccineOptions(!showVaccineOptions);

      setValue("vaccineConsent", consentData.vaccineConsent || []);
    } else {
      setValue(key, !(consentData[key] as boolean));
    }
  };

  const vaccineOptions = [
    { text: "COVID-19 Vaccine", key: "covid19" as VaccineOptionKey },
    { text: "Influenza vaccine", key: "fluShot" as VaccineOptionKey },
    { text: "Hepatitis B vaccine", key: "hepatitisB" as VaccineOptionKey },
  ];

  const toggleVaccineOption = (optionKey: VaccineOptionKey) => {
    setValue(
      "vaccineConsent",
      consentData.vaccineConsent.includes(optionKey)
        ? consentData.vaccineConsent.filter((key) => key !== optionKey)
        : [...consentData.vaccineConsent, optionKey]
    );
  };

  const handleConsentToAll = () => {
    const allConsentGiven = vaccineOptions.every((option) =>
      consentData.vaccineConsent.includes(option.key)
    );
    const newConsent = allConsentGiven
      ? []
      : vaccineOptions.map((option) => option.key);
    setValue("vaccineConsent", newConsent);
  };

  console.error("submission errors:", errors);
  const onSubmit = (data: ConsentData) => {
    const newData = transformToSnakeCase(data);
    mutate(
      { data: newData, NHRID },
      {
        onSuccess: () => {
          useAlert({
            isToast: true,
            icon: "success",
            position: "top-start",
            title: "Consent successfully set",
          });
          navigate("/dashboard/home");
        },
        onError: () => {
          useAlert({
            isToast: true,
            icon: "error",
            position: "top-start",
            title: "Consent not set",
          });
        },
      }
    );
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:max-w-[600px] xl:max-w-full"
      >
        {allConsentData.map((section, index) => (
          <Box key={index}>
            <h1 className="font-bold text-lg py-4">{section.title}</h1>
            <Box className="p-4 rounded-xl bg-bg2">
              <FormGroup>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {section.questions.map((question) => (
                    <Box key={question.key}>
                      <ConsentQuestion
                        questionText={question.text}
                        checked={
                          question.key === "vaccineConsent"
                            ? showVaccineOptions
                            : question.key === "familySharing"
                            ? showShareWithFamily
                            : !!consentData[question.key as keyof ConsentData]
                        }
                        onToggle={() =>
                          handleChange(question.key as keyof ConsentData)
                        }
                      />
                      {question.key === "familySharing" &&
                        showShareWithFamily && (
                          <Box sx={{ mt: 2 }}>
                            {consentData.familySharing.map(
                              (familyMember, idx) => (
                                <Box key={idx} sx={{ display: "flex", gap: 2 }}>
                                  <InputField
                                    label="First Name"
                                    name={`familySharing[${idx}].firstName`}
                                    value={familyMember.firstName || ""}
                                    placeholder="Sadam"
                                    onChange={(e) =>
                                      setValue(
                                        `familySharing.${idx}.firstName` as const,
                                        e.target.value || null
                                      )
                                    }
                                  />
                                  <InputField
                                    label="Last Name"
                                    name={`familySharing[${idx}].lastName`}
                                    value={familyMember.lastName || ""}
                                    placeholder="Ekanka"
                                    onChange={(e) =>
                                      setValue(
                                        `familySharing.${idx}.lastName` as const,
                                        e.target.value || null
                                      )
                                    }
                                  />
                                </Box>
                              )
                            )}
                          </Box>
                        )}

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
                                      checked={consentData.vaccineConsent.includes(
                                        option.key
                                      )}
                                      onChange={() =>
                                        toggleVaccineOption(option.key)
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
                </Box>
              </FormGroup>
            </Box>
          </Box>
        ))}
        <Box className="flex items-center justify-center mt-8 gap-4">
          <Link
            href="/dashboard/home"
            fontWeight={500}
            color="#2E90FA"
            underline="none"
            variant="body2"
            width="100%"
          >
            Cancel
          </Link>
          <BaseButton title="Save & Continue" type="submit" />
        </Box>
      </form>
    </Box>
  );
}
