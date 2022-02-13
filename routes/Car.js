import express from 'express';
import { CarController } from '../controllers/Car.js';

export const CarRouter = express.Router();

CarRouter.route('/')
    .post(new CarController().create)
    .get(new CarController().getAll);

CarRouter.route('/:id')
    .get(new CarController().getOne)
    .patch(new CarController().update)
    .delete(new CarController().delete);

CarRouter.route('/:id/request').post(new CarController().requestCar);
