import Joi from "joi";

export const recordSchema = Joi.object({
  severity: Joi.string().required().label("Severity"),
  treatmentStatus: Joi.string().required().label("Treatment Status"),
  treatmentType: Joi.string().required().label("Treatment Type"),
  followUpPlans: Joi.string().required().label("Follow-Up Plan"),
  notes: Joi.string().optional().allow("").label("Additional Notes"),
});
