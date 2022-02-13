import express from 'express';
import { UserController } from '../controllers/User.js';

export const UserRouter = express.Router();

UserRouter.route('/requested').get(new UserController().requestedCars);

UserRouter.route('/')
    .post(new UserController().create)
    .get(new UserController().getAll);

UserRouter.route('/:id')
    .get(new UserController().getOne)
    .patch(new UserController().update)
    .delete(new UserController().delete);
