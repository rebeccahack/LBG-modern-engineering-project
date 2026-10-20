import joi from "joi";

const carSchema = joi.object({
    id: joi.string().required(),
    registration_number: joi.string().required(),
    owner: joi.string().required(),
    make: joi.string().required()
})

export default carSchema;