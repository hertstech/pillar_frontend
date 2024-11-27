import { MdBloodtype } from "react-icons/md";
import { GiHeartOrgan } from "react-icons/gi";
import { Box } from "@mui/material";

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

type ConsentData = Record<string, boolean>;

const transformConsentData = (data: ConsentData = {}) => {
  return Object.entries(data)
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
      abbreviation: newKeyAbbreviationMap[key].abbreviation,
      icon: newKeyAbbreviationMap[key].icon,
    }));
};

export const ConsentBoxes = ({ data }: { data?: ConsentData }) => {
  const transformedData = transformConsentData(data);

  return (
    <>
      {transformedData.map(({ abbreviation, icon }, index) => (
        <Box
          key={index}
          className="flex rounded-full px-3 py-1 items-center gap-1 bg-err2-50
           text-err2-100 font-semibold text-xs uppercase"
        >
          {icon && <span>{icon}</span>}
          <span>{abbreviation}</span>
        </Box>
      ))}
    </>
  );
};
