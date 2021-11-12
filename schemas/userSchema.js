import joi from 'joi';


const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const signUpSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { signInSchema, signUpSchema };

