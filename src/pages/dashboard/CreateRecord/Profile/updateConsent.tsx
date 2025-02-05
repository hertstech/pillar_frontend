import { forwardRef, useEffect, useState } from "react";
import {
  Box,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { allConsentData } from "../../../../data/consentData";
import InputField from "../../../../components/InputField";
import { consentSchema } from "../../../../schemas/createUserSchema";
import { transformToSnakeCase } from "../../../../Utils/caseTransformer";
import { ConsentData } from "../../../../types/serviceUserTypes/consent";
import {
  useGetUserConsent,
  useUpdateUserConsent,
} from "../../../../api/HealthServiceUser/consent";
import { useAlert } from "../../../../Utils/useAlert";
import { useNavigate } from "react-router-dom";

interface StepFourProps {
  NHRID: number;
  onNext?: (data: any) => void;
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

export const UpdateConsent = forwardRef(({ NHRID }: StepFourProps) => {
  const navigate = useNavigate();
  const [showVaccineOptions, setShowVaccineOptions] = useState(false);
  const [showShareWithFamily, setShowShareWithFamily] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { mutate, isPending } = useUpdateUserConsent();

  const { data } = useGetUserConsent(NHRID);

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ConsentData>({
    resolver: joiResolver(consentSchema),
    defaultValues: {
      treatmentConsent: false,
      alternateTreatmentConsent: false,
      vaccineConsent: [],
      providerSharing: false,
      mentalHealthRecordSharing: false,

      geneticTestingConsent: false,
      medicalRecordSharing: false,
      organDonation: false,
      marketingConsent: false,
      researchOrganDonation: false,
      researchConsent: false,
      transfusionConsent: false,
    },
  });

  useEffect(() => {
    if (data?.data) {
      const hasFamilySharing = data.data.family_sharing?.some(
        (member: any) => member.first_name || member.last_name
      );

      const hasVaccines =
        data.data.vaccine_consent && data.data.vaccine_consent.length > 0;

      setShowShareWithFamily(!!hasFamilySharing);
      setShowVaccineOptions(!!hasVaccines);

      reset({
        treatmentConsent: data.data.treatment_consent ?? false,
        alternateTreatmentConsent:
          data.data.alternate_treatment_consent ?? false,
        providerSharing: data.data.provide_sharing ?? false,
        mentalHealthRecordSharing:
          data.data.mental_health_record_sharing ?? false,
        familySharing:
          data.data.family_sharing?.map((member: any) => ({
            firstName: member.first_name || null,
            lastName: member.last_name || null,
          })) || [],
        vaccineConsent: data.data.vaccine_consent || [],
        geneticTestingConsent: data.data.genetic_testing_consent ?? false,
        medicalRecordSharing: data.data.medical_record_sharing ?? false,
        organDonation: data.data.organ_donation ?? false,
        marketingConsent: data.data.marketing_consent ?? false,
        researchOrganDonation: data.data.research_organ_donation ?? false,
        researchConsent: data.data.research_consent ?? false,
        transfusionConsent: data.data.transfusion_consent ?? false,
      });
    }
  }, [data, reset]);

  useEffect(() => {
    watch();
  }, [watch()]);

  const consentData = watch();

  const handleChange = (key: keyof ConsentData) => {
    if (key === "familySharing") {
      const newState = !showShareWithFamily;
      setShowShareWithFamily(newState);
      if (showShareWithFamily) {
        setValue(
          "familySharing",
          newState ? [{ firstName: "", lastName: "" }] : []
        );
      }
    } else if (key === "vaccineConsent") {
      const newState = !showVaccineOptions;
      setShowVaccineOptions(newState);
      setValue("vaccineConsent", newState ? [] : []);
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
    const updatedConsent = consentData.vaccineConsent.includes(optionKey)
      ? consentData.vaccineConsent.filter((key) => key !== optionKey)
      : [...consentData.vaccineConsent, optionKey];
    setValue("vaccineConsent", updatedConsent);
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

  useEffect(() => {
    const subscription = watch(() => setIsDirty(true));
    return () => subscription.unsubscribe();
  }, [watch]);

  console.log(errors);
  const onSubmit = (data: ConsentData) => {
    if (!showShareWithFamily) {
      data.familySharing = [];
    }
    if (!isDirty) {
      useAlert({
        icon: "warning",
        position: "top-start",
        title: "No Changes Detected",
        text: "Please update the consent form before submission.",
      });
      return;
    }

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
          navigate(`/dashboard/user/${NHRID}`);
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
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Update Consent
        </Typography>
      </div>

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
        <Box>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            sx={{ width: "100%", color: "white", marginTop: 4 }}
          >
            Update consent
          </Button>
        </Box>
      </form>
    </Box>
  );
});
