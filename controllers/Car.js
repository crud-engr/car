import { CarService } from '../services/Car.js';

export class CarController {
    async create(req, res) {
        return new CarService().create(req, res);
    }

    async getOne(req, res) {
        return new CarService().getOne(req, res);
    }

    async getAll(req, res) {
        return new CarService().getAll(req, res);
    }

    async update(req, res) {
        return new CarService().update(req, res);
    }

    async delete(req, res) {
        return new CarService().delete(req, res);
    }

    async requestCar(req, res) {
        return new CarService().requestCar(req, res);
    }
}
