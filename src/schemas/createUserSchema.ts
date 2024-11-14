import Joi from "joi";

export const consentSchema = Joi.object({
  treatmentConsent: Joi.boolean().optional(),
  transfusionConsent: Joi.boolean().optional(),
  alternateTreatmentConsent: Joi.boolean().optional(),
  vaccineConsent: Joi.array().items(Joi.string()).optional(),
  geneticTestingConsent: Joi.boolean().optional(),
  medicalRecordSharing: Joi.boolean().optional(),
  providerSharing: Joi.boolean().optional(),
  mentalHealthRecordSharing: Joi.boolean().optional(),
  familySharing: Joi.array()
    .items(
      Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
      })
    )
    .optional(),
  researchConsent: Joi.boolean().optional(),
  organDonation: Joi.boolean().optional(),
  researchOrganDonation: Joi.boolean().optional(),
  marketingConsent: Joi.boolean().optional(),
});
