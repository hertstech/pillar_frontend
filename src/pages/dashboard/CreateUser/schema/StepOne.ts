import Joi from "joi";

export const stepOneSchema = Joi.object({
  title: Joi.string().required(),
  firstName: Joi.string().required(),
  middleName: Joi.string().allow("").optional(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  gender: Joi.string().valid("male", "female").required(),

  dateOfBirth: Joi.date().iso().required().messages({
    "any.required": "Date of birth is required.",
  }),
  religion: Joi.string()
    .valid("christian", "muslim", "traditional", "others")
    .optional(),
  phoneNumber: Joi.string().allow("").optional(),
  height: Joi.number().min(0).max(999).required(),
  weight: Joi.number().min(0).max(999).required(),
  tribalMarks: Joi.string().valid("Yes", "No").allow("").optional(),
  address: Joi.string().required(),
  state: Joi.string().required(),
  lga: Joi.string().required(),
  parentOneNHR_ID: Joi.string().allow("").optional(),
  parentTwoNHR_ID: Joi.string().allow("").optional(),
  parentOne: Joi.string().allow("").optional(),
  parentOneNumber: Joi.string().allow("").optional(),
  parentOneRelationship: Joi.string().allow("").optional(),
  parentTwo: Joi.string().allow("").optional(),
  parentTwoNumber: Joi.string().allow("").optional(),
  parentTwoRelationship: Joi.string().allow("").optional(),
  nominatedPharmarcy: Joi.string().allow("").optional(),
  nominatedPharmarcyAddress: Joi.string().allow("").optional(),
  registeredDoctor: Joi.string().allow("").optional(),
  registeredHospital: Joi.string().allow("").optional(),
  HMOPlan: Joi.string().allow("").optional(),
  nokFullName: Joi.string().allow("").optional(),
  nokNHR_ID: Joi.string().allow("").optional(),
  nokPhoneNumber: Joi.string().allow("").optional(),
  NIN: Joi.string().allow("").optional(),
  driversLicense: Joi.string().allow("").optional(),
  day: Joi.number().integer().min(1).max(31).allow("").optional(),
  month: Joi.number().integer().min(1).max(12).allow("").optional(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .allow("")
    .optional(),
  nokRelationship: Joi.string().allow("").optional(),
  passportNumber: Joi.string().allow("").optional(),
  facilityName: Joi.string().required(),
  facilityType: Joi.string().required(),
  facilityOwnership: Joi.string().required(),
  facilityContact: Joi.alternatives()
    .try(Joi.string().allow(""), Joi.array().items(Joi.string().allow("")))
    .optional(),
  facilityAddress: Joi.string().required(),
  doctorsLicense: Joi.string().allow("").optional(),
  doctorsContact: Joi.string().allow("").optional(),
  HMONumber: Joi.string().allow("").optional(),
});
