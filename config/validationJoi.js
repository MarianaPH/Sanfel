const Joi = require('joi-oid');

const registerSchemaUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required()
});

const loginSchemaUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const registerSchemaRegistrant = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number()/*.required()*/,
  sex: Joi.string()/*.required()*/,
  workshops: Joi.array(),
  questionsByArea: Joi.array(),
  averagesByArea: Joi.array()
});

const editSchemaStudent = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  sex: Joi.string()/*.required()*/,
  age: Joi.number()/*.required()*/,
  workshops: Joi.array().required()
});

const registerSchemaQuestion = Joi.object({
  text: Joi.string().required(),
  subarea: Joi.string(),
  area: Joi.required(),
  factorResiliente: Joi.objectId(),
  competenciasAsociadas: Joi.objectId(),
  dominiosInteligencias: Joi.objectId()
});

const registerSchemaWorkshop = Joi.object({
  description: Joi.string().required(),
  online: Joi.boolean().required()
});

const registerSchemaSubarea = Joi.object({
  description: Joi.string().required(),
  averages: Joi.array().items(
    Joi.object({
      age1: Joi.number(),
      age2: Joi.number()
    })
  )
});

const registerSchemaArea = Joi.object({
  description: Joi.string().required(),
  timesAnswered: Joi.number()
});

module.exports = {
  registerSchemaUser,
  loginSchemaUser,
  registerSchemaRegistrant,
  editSchemaStudent,
  registerSchemaQuestion,
  registerSchemaWorkshop,
  registerSchemaSubarea,
  registerSchemaArea
};