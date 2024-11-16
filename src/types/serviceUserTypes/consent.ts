export type ConsentData = {
  treatmentConsent: boolean;
  transfusionConsent: boolean;
  alternateTreatmentConsent: boolean;
  vaccineConsent: string[];
  geneticTestingConsent?: boolean;
  medicalRecordSharing?: boolean;
  providerSharing?: boolean;
  mentalHealthRecordSharing?: boolean;
  familySharing: { firstName: string | null; lastName: string | null }[];
  researchConsent?: boolean;
  organDonation?: boolean;
  researchOrganDonation?: boolean;
  marketingConsent?: boolean;
};