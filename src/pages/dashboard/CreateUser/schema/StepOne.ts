import Joi from "joi";

export const stepOneSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required.",
  }),
  firstName: Joi.string().required().messages({
    "any.required": "First name is required.",
    "string.empty": "First name is required.",
  }),

  middleName: Joi.string().allow("").optional(),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required.",
    "string.empty": "Last name is required.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required.",
      "string.empty": "Email is required.",
    }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "Gender must be either 'male' or 'female'.",
    "any.required": "Gender is required.",
    "string.empty": "Gender is required.",
  }),
  dateOfBirth: Joi.date().required().messages({
    "date.base": "Invalid date format.",
    "any.required": "Date of birth is required.",
    "string.empty": "Date of birth is required.",
  }),
  religion: Joi.string()
    .valid("christian", "muslim", "traditional", "others")
    .optional(),
  phoneNumber: Joi.string().allow("").optional(),
  height: Joi.number().min(0).max(999).required().messages({
    "number.base": "Height must be a number.",
    "number.min": "Height cannot be negative.",
    "number.max": "Height must be below 999.",
    "any.required": "Height is required.",
    "string.empty": "Height is required.",
  }),
  weight: Joi.number().min(0).max(999).required().messages({
    "number.base": "Weight must be a number.",
    "number.min": "Weight cannot be negative.",
    "number.max": "Weight must be below 999.",
    "any.required": "Weight is required.",
    "string.empty": "Weight is required.",
  }),
  tribalMarks: Joi.string().valid("Yes", "No").allow("").optional(),
  address: Joi.string().required().messages({
    "any.required": "Address is required.",
    "string.empty": "Address is required.",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required.",
    "string.empty": "State is required.",
  }),
  lga: Joi.string().required().messages({
    "any.required": "LGA is required.",
    "string.empty": "LGA is required.",
  }),
  facilityName: Joi.string().required().messages({
    "any.required": "Facility name is required.",
    "string.empty": "Facility name is required.",
  }),
  facilityType: Joi.string().required().messages({
    "any.required": "Facility type is required.",
    "string.empty": "Facility type is required.",
  }),
  facilityOwnership: Joi.string().required().messages({
    "any.required": "Facility ownership is required.",
    "string.empty": "Facility ownership is required.",
  }),
  facilityDoor: Joi.string().required().messages({
    "any.required": "Facility door number is required.",
    "string.empty": "Facility door number is required.",
  }),
  facilityStreet: Joi.string().required().messages({
    "any.required": "Facility street is required.",
    "string.empty": "Facility street is required.",
  }),
  facilityTown: Joi.string().required().messages({
    "any.required": "Facility town is required.",
    "string.empty": "Facility town is required.",
  }),
  facilityLGA: Joi.string().required().messages({
    "any.required": "Facility LGA is required.",
    "string.empty": "Facility LGA is required.",
  }),
  facilityState: Joi.string().required().messages({
    "any.required": "Facility state is required.",
    "string.empty": "Facility state is required.",
  }),

  parentOneNHR_ID: Joi.string().allow("").optional(),
  parentTwoNHR_ID: Joi.string().allow("").optional(),
  parentOne: Joi.string().allow("").optional(),
  parentOneNumber: Joi.string().allow("").optional(),
  parentOneRelationship: Joi.string().allow("").optional(),
  parentTwo: Joi.string().allow("").optional(),
  parentTwoNumber: Joi.string().allow("").optional(),
  parentTwoRelationship: Joi.string().allow("").optional(),

  nominatedPharmacy: Joi.string().allow("").optional(),
  nominatedPharmacyDoor: Joi.string().allow("").optional(),
  nominatedPharmacyStreet: Joi.string().allow("").optional(),
  nominatedPharmacyTown: Joi.string().allow("").optional(),
  nominatedPharmacyLGA: Joi.string().allow("").optional(),
  nominatedPharmacyState: Joi.string().allow("").optional(),
  registeredDoctor: Joi.string().allow("").optional(),
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
  facilityPhone1: Joi.alternatives()
    .try(Joi.string().allow(""), Joi.array().items(Joi.string().allow("")))
    .optional(),
  facilityPhone2: Joi.alternatives()
    .try(Joi.string().allow(""), Joi.array().items(Joi.string().allow("")))
    .optional(),
  doctorsLicense: Joi.string().allow("").optional(),
  doctorsContact: Joi.string().allow("").optional(),
  HMONumber: Joi.string().allow("").optional(),
});
