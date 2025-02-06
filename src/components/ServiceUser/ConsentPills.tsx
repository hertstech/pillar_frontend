import { MdBloodtype } from "react-icons/md";
import { GiHeartOrgan } from "react-icons/gi";
import { Box } from "@mui/material";
import { PlTooltip } from "../Tooltip";

const newKeyAbbreviationMap: Record<
  string,
  { abbreviation: string; icon: JSX.Element | null }
> = {
  alternate_treatment_consent: {
    abbreviation: "AlT",
    icon: <MdBloodtype size={18} />,
  },
  family_sharing: { abbreviation: "FAM", icon: <GiHeartOrgan size={16} /> },
  genetic_testing_consent: {
    abbreviation: "GT",
    icon: <MdBloodtype size={18} />,
  },
  marketing_consent: { abbreviation: "N/A", icon: null },
  medical_record_sharing: { abbreviation: "N/A", icon: null },
  mental_health_record_sharing: {
    abbreviation: "MH",
    icon: <GiHeartOrgan size={16} />,
  },
  organ_donation: { abbreviation: "ODT", icon: <MdBloodtype size={18} /> },
  provider_sharing: { abbreviation: "N/A", icon: null },
  research_consent: { abbreviation: "RSH", icon: <MdBloodtype size={18} /> },
  research_organ_donation: {
    abbreviation: "ODR",
    icon: <GiHeartOrgan size={16} />,
  },
  transfusion_consent: { abbreviation: "BT", icon: <MdBloodtype size={18} /> },
  treatment_consent: { abbreviation: "T", icon: <GiHeartOrgan size={16} /> },
  vaccine_consent: { abbreviation: "VAX", icon: <MdBloodtype size={18} /> },
};

const humanReadableMap: Record<string, string> = {
  treatment_consent: "Treatment Consent",
  alternate_treatment_consent: "Alternate Treatment Consent",
  vaccine_consent: "Vaccine Consent",
  provider_sharing: "Provider Sharing",
  mental_health_record_sharing: "Mental Health Record Sharing",
  family_sharing: "Family Sharing",
  genetic_testing_consent: "Genetic Testing Consent",
  medical_record_sharing: "Medical Record Sharing",
  organ_donation: "Organ Donation",
  marketing_consent: "Marketing Consent",
  research_organ_donation: "Research Organ Donation",
  research_consent: "Research Consent",
  transfusion_consent: "Transfusion Consent",
};

type ConsentData = Record<string, boolean>;

export const ConsentBoxes = ({ data }: { data?: ConsentData }) => {
  const transformConsentData = Object.entries(data || {})
    .filter(([key, value]) => {
      const isExcludedKey =
        (key === "vaccine_consent" || key === "family_sharing") &&
        Array.isArray(value) &&
        value.length === 0;
      return (
        !isExcludedKey &&
        value &&
        newKeyAbbreviationMap[key]?.abbreviation !== "N/A"
      );
    })
    .map(([key]) => ({
      name: humanReadableMap[key] || key,
      abbreviation: newKeyAbbreviationMap[key]?.abbreviation,
      icon: newKeyAbbreviationMap[key]?.icon,
    }));

  return (
    <>
      {transformConsentData.map(({ name, abbreviation, icon }, index) => (
        <PlTooltip title={name} placement="top" >
          <Box
            key={index}
            className="flex rounded-full px-3 py-1 items-center gap-1 bg-err2-50
        text-err2-100 font-semibold text-xs uppercase"
          >
            {icon && <span>{icon}</span>}
            <span>{abbreviation}</span>
          </Box>
        </PlTooltip>
      ))}
    </>
  );
};
