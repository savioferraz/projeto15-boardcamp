import joi from "joi";

const categorieSchema = joi.object({
  name: joi.string().trim().required(),
});

export { categorieSchema };
