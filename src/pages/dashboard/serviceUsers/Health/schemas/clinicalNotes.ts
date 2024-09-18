import Joi from "joi";

export const schema = Joi.object({
  subject: Joi.string().required().messages({
    "string.empty": "Subject is required",
  }),
  notes: Joi.string().optional(),
});