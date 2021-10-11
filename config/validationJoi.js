const Joi = require("joi");

const registerSchemaAdmin = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchemaAdmin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const registerSchemaStudent = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  sex: Joi.string(),
  age: Joi.number().required(),
  workshops: Joi.array().required(),
  questions: Joi.array().required()
});

const editSchemaStudent = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  sex: Joi.string().required(),
  age: Joi.number().required(),
  workshops: Joi.array().required()
});

const registerSchemaQuestion = Joi.object({
  text: Joi.string().required(),
  area: Joi.string().required()
});

const registerSchemaWorkshop = Joi.object({
  description: Joi.string().required()
});

const registerSchemaArea = Joi.object({
  description: Joi.string().required(),
  averages: Joi.array()
});

module.exports = {
  registerSchemaAdmin,
  loginSchemaAdmin,
  registerSchemaStudent,
  editSchemaStudent,
  registerSchemaQuestion,
  registerSchemaWorkshop,
  registerSchemaArea
};