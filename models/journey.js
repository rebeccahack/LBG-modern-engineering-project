import joi from "joi";

const journeySchema = joi.object({
    id: joi.string().required(),
    date: joi.date().required(),
    car: joi.string().required(),
    passenger_capacity: joi.number().required(),
})

export default journeySchema;