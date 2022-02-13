import { UserService } from '../services/User.js';
import { CarService } from '../services/Car.js';

export class UserController {
    async create(req, res) {
        return new UserService().create(req, res);
    }

    async getOne(req, res) {
        return new UserService().getOne(req, res);
    }

    async getAll(req, res) {
        return new UserService().getAll(req, res);
    }

    async update(req, res) {
        return new UserService().update(req, res);
    }

    async delete(req, res) {
        return new UserService().delete(req, res);
    }

    async requestedCars(req, res) {
        return new UserService().requestedCars(req, res);
    }
}
