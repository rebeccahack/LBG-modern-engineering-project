import joi from "joi";

const journeyPassengerSchema = joi.object({
    id: joi.string().required(),
    employee_id: joi.date().required()
})

export default journeyPassengerSchema;