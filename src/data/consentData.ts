export const allConsentData = [
  {
    title: "1. General Treatment and Medical Procedures",
    questions: [
      {
        text: "Do you consent to receive medical treatment as recommended by your healthcare provider?",
        key: "treatmentConsent",
      },
      {
        text: "Do you consent to receive cardiopulmonary resuscitation in the event that your heart or breathing stops?",
        key: "alternateTreatmentConsent",
      },
      {
        text: "Do you consent to undergo a blood transfusion during surgery?",
        key: "transfusionConsent",
      },
    ],
  },
  {
    title: "2. Vaccinations and Genetic Testing",
    questions: [
      {
        text: "Do you consent to receive recommended vaccines?",
        key: "vaccineConsent",
      },
      {
        text: "Do you consent to genetic testing and sharing of results with my healthcare team?",
        key: "geneticTestingConsent",
      },
    ],
  },
  {
    title: "3. Data Sharing and Information Disclosure",
    questions: [
      {
        text: "Do you consent to sharing your medical records with the healthcare team?",
        key: "medicalRecordSharing", 
      },
      {
        text: "Do you consent to share your medical information with other healthcare providers?",
        key: "providerSharing", 
      },
      {
        text: "Do you consent to share your mental health records?",
        key: "mentalHealthRecordSharing", 
      },
    //   {
    //     text: "Do you authorize your health information to be shared with your family member?",
    //     key: "familySharing", 
    //   },
      {
        text: "Do you authorize your health information to be shared with your family member below?",
        key: "familySharing", 
      },
    ],
  },
  {
    title: "4. Research and Organ Donation",
    questions: [
      {
        text: "Do you agree to participate in research studies with the use of your health data?",
        key: "researchConsent", 
      },
      {
        text: "Do you consent to donate your organs for transplantation?",
        key: "organDonation", 
      },
      {
        text: "Do you consent to donate your organs for research?",
        key: "researchOrganDonation", 
      },
    ],
  },
  {
    title: "5. Marketing and Commercial Use",
    questions: [
      {
        text: "Do you agree to receive marketing communications?",
        key: "marketingConsent", 
      },
    ],
  },
];
