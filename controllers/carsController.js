import database from "../services/database.js";
import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import carSchema from "../models/car.js";

async function getAllCars(req, res, next){
    try {
        const params = {
            TableName: "Cars",
        };
        const command = new ScanCommand(params);
        const result = await database.send(command);
        res.status(200).json(result.Items);
    } catch (err) {
        next(err);
    }
}

async function addCar(req, res, next){
    try {
        const uuid = uuidv4();
        req.body.id = uuid;
        const { error, value } = carSchema.validate(req.body);
    
        if (error) {
          res.status(400).json({ error: error.details[0].message });
          return;
        }

        const { id, registration_number, owner, make } = value;
    
        const params = {
          TableName: "Cars",
          Item: {
            id,
            registration_number,
            owner,
            make
          },
        };
    
        const command = new PutCommand(params);
    
        await database.send(command);
    
        res
          .status(201)
          .json({ message: "Successfully added car", data: params.Item });
      } catch (error) {
        next(error);
      }
}

async function getCarById(req, res, next) {
    const carId = req.params.id;
    try {
      const params = {
        TableName: "Cars",
        Key: { id: carId },
      };
      const command = new GetCommand(params);
      const result = await database.send(command);
      if (!result.Item) {
        return res.status(404).json({ message: "No car found" });
      }
      res.status(200).json(result.Item);
    } catch (err) {
      next(err);
    }
  }
  
  async function updateCarById(req, res, next) {
    try {
        const carId = req.params.id;
        req.body.id = carId;
        const { error, value } = carSchema.validate(req.body);
    
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
    
        const { id, registration_number, owner, make } = value;
    
        const getParams = {
          TableName: "Cars",
          Key: { id: carId },
        };
    
        const getCommand = new GetCommand(getParams);
    
        const result = await database.send(getCommand);
    
        const car = result.Item;
    
        if (!car) {
          return res.status(404).json({ message: "No car found" });
        }

        const updateParams = {
          TableName: "Cars",
          Key: { id: carId },
          UpdateExpression:
            "set #registration_number = :registration_number, #owner = :owner, #make = :make",
          ExpressionAttributeNames: {
            "#registration_number": "registration_number",
            "#owner": "owner",
            "#make": "make"
          },
          ExpressionAttributeValues: {
            ":registration_number": registration_number,
            ":owner": owner,
            ":make": make
          },
          ReturnValues: "ALL_NEW",
        };
        const updateCommand = new UpdateCommand(updateParams);
        const updatedCar = await database.send(updateCommand);
    
        res.status(200).json(updatedCar.Attributes);
      } catch (err) {
        next(err);
      }
  }
  
  async function deleteCarById(req, res, next) {
    const carId = req.params.id;
    try {
      const params = {
        TableName: "Cars",
        Key: { id: carId },
      };
      const command = new DeleteCommand(params);
      await database.send(command);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

export default {
    getAllCars,
    addCar,
    getCarById,
    updateCarById,
    deleteCarById,
};