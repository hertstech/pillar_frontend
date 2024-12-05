import React from "react";
import { useGetUserConsent } from "../../api/HealthServiceUser/consent";
import { EditIcon } from "../../assets/Icons";
import { Box, Button, Checkbox } from "@mui/material";

interface ConsentViewProps {
  writeAccess: boolean;
  NHRID: number | null;
  goTo: () => void;
}

export const ConsentStatus: React.FC<ConsentViewProps> = ({
  NHRID,
  goTo,
  writeAccess,
}) => {
  const { data } = useGetUserConsent(NHRID as number);

  if (!data) {
    return <p className="text-center text-2xl italic">Loading consent...</p>;
  }

  const consentData = [
    {
      title: "General treatment and medical procedures",
      items: [
        {
          label: "General consent to treatment",
          value: data?.data.treatment_consent,
        },
        {
          label: "Cardiopulmonary Resuscitation (CPR)",
          value: data?.data.alternate_treatment_consent,
        },
        { label: "Blood transfusion", value: data?.data.transfusion_consent },
      ],
    },
    {
      vaccines: data?.data.vaccine_consent,
      title: "Vaccinations and Genetic testing",
      items: [
        {
          label: "Genetic testing",
          value: data?.data.genetic_testing_consent,
        },
      ],
    },
    {
      title: "Data sharing and Information disclosure",
      items: [
        {
          label: "Data sharing with healthcare providers",
          value: data?.data.provider_sharing,
        },
        {
          label: "Consent to share medical information with other providers",
          value: data?.data.medical_record_sharing,
        },
        {
          label:
            "Mental health and sensitive data sharing (e.g. substance abuse)",
          value: data?.data.mental_health_record_sharing,
        },
        {
          label: "Sharing health information with family members or caregivers",
          value: data?.data.family_sharing?.some(
            (member: any) => member.first_name || member.last_name
          )
            ? true
            : false,
        },
      ],
      familySharing: data?.data.family_sharing || [],
    },
    {
      title: "Research and organ donation",
      items: [
        { label: "Research participation", value: data?.data.research_consent },
        {
          label: "Organ donation for transplantation",
          value: data?.data.organ_donation,
        },
        {
          label: "Organ donation for research",
          value: data?.data.research_organ_donation,
        },
      ],
    },
    {
      title: "Marketing and commercial use",
      items: [
        {
          label: "Marketing or commercial use of data",
          value: data?.data.marketing_consent,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-3 mb-3">
      <div className="flex flex-col p-6 w-full bg-white rounded-lg gap-8 border relative">
        <h2 className="text-lg font-semibold text-[#090816] flex items-center gap-1.5">
          Consent Preferences
        </h2>
        {writeAccess && (
          <Button
            variant="contained"
            className="!rounded-full !font-semibold !bg-[#fff] px-2 !gap-2
             !capitalize !outline !text-[#099250] !text-sm !absolute !top-4 !right-4"
            onClick={goTo}
          >
            Edit
            <EditIcon />
          </Button>
        )}

        {consentData.map((section, sectionIndex) => (
          <ConsentSection
            key={sectionIndex}
            title={section.title}
            items={section.items.map((item) => ({
              label: item.label,
              value: item.value ? "yes" : "no",
            }))}
            vaccines={section.vaccines}
            familySharing={section.familySharing?.map((member: any) => ({
              first_name: member.first_name,
              last_name: member.last_name,
            }))}
          />
        ))}
      </div>
    </div>
  );
};

interface ConsentSectionProps {
  title: string;
  items: { label: string; value: string }[];
  vaccines?: string[];
  familySharing?: {
    first_name: string;
    last_name: string;
  }[];
}

const ConsentSection: React.FC<ConsentSectionProps> = ({
  title,
  items,
  vaccines,
  familySharing,
}) => (
  <>
    <h3 className="text-neu-700 font-semibold text-base">{title}</h3>
    <Box className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-neu-700"
        >
          <h5 className="text-sm font-normal">{item.label}</h5>
          <b className="capitalize text-sm">{item.value}</b>
        </div>
      ))}
      {vaccines && (
        <Box className="flex flex-col gap-2">
          <Box className="flex justify-between items-center">
            <h5 className="text-sm font-normal">Vaccinations</h5>
            <b className="capitalize text-sm">
              {vaccines.length !== 0 ? "Yes" : "No"}
            </b>
          </Box>
          {vaccines.map((vaccine, index) => (
            <div key={index} className="flex items-center">
              <Checkbox
                className="!-my-2"
                size="small"
                color="success"
                checked
                readOnly
              />
              <span className="capitalize text-sm">{vaccine}</span>
            </div>
          ))}
        </Box>
      )}
      {familySharing && familySharing.length > 0 && (
        <Box className="ml-10 text-neu-700">
          {familySharing.map((family, index) => (
            <div key={index} className="mb-2">
              <p className="text-sm font-normal mb-2">Family member name</p>
              <b className="capitalize text-sm ">{`${family.first_name} ${family.last_name}`}</b>
            </div>
          ))}
        </Box>
      )}
    </Box>
    <hr className="last:border-none border-t border-neu-50" />
  </>
);
