import joi from "joi";

const employeeSchema = joi.object({
    id: joi.string().required(),
    firstName: joi.string().required(),
    familyName: joi.string().required()
})

export default employeeSchema;