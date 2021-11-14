import joi from 'joi';

const productSchema = joi.object({
  name: joi.string().min(2).max(60).required(),
  price: joi.number().min(2).required(),
  imgeUrl: joi.string().uri().required(),
  descrition: joi.string().min(3).required(),
});

export { productSchema };
