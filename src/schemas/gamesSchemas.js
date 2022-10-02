import joi from "joi";

const gameSchema = joi.object({
  name: joi.string().min(2).required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().integer().min(0).required(),
  categoryId: joi.number().integer().min(0).required(),
  pricePerDay: joi.number().integer().min(1).required(),
});

export { gameSchema };
