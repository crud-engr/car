import Car from '../models/Car.js';
import RequestedCar from '../models/RequestedCar.js';

export class CarService {
    /**
     * @route POST api/cars
     * @desc Create a car
     * @access public
     */
    async create(req, res) {
        try {
            const { brand, model, year, availability, owner } = req.body;
            if (!('brand' in req.body)) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'brand is required',
                    code: 400,
                });
            }
            if (!brand) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'brand is required',
                    code: 400,
                });
            }
            if (!('year' in req.body)) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'year is required',
                    code: 400,
                });
            }
            if (!year) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'year is required',
                    code: 400,
                });
            }
            if (!('availability' in req.body)) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'availability is required',
                    code: 400,
                });
            }
            if (!owner) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'owner is required',
                    code: 400,
                });
            }
            if (!('owner' in req.body)) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'owner is required',
                    code: 400,
                });
            }

            const car = await Car.create({
                brand,
                model,
                year,
                availability,
                owner,
            });
            return res.status(201).json({
                status: 'success',
                message: 'car successfully created',
                data: { car },
                code: 201,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'an error occured',
                code: 500,
            });
        }
    }

    /**
     * @route GET api/cars
     * @desc Get all cars
     * @access public
     */
    async getAll(req, res) {
        try {
            let filterObj = {};
            // extract parameter from query string
            let { availability } = req.query;
            if (availability) filterObj.availability = availability;
            const cars = await Car.find(filterObj);
            return res.status(200).json({
                status: 'success',
                record: cars.length,
                data: { cars },
                code: 200,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'an error occured',
                code: 500,
            });
        }
    }

    /**
     * @route GET api/cars
     * @desc Create a car by its ID
     * @access public
     */
    async getOne(req, res) {
        try {
            const id = req.params.id;
            const car = await Car.findOne({ _id: id }).exec();
            if (!car) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'car not found',
                    code: 404,
                });
            }
            return res.status(200).json({
                status: 'success',
                data: { car },
                code: 200,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'an error occured',
                code: 500,
            });
        }
    }

    /**
     * @route PATCH api/cars/:id
     * @desc Update a car by its ID
     * @access public
     */
    async update(req, res) {
        try {
            const id = req.params.id;
            const car = await Car.findOne({ _id: id }).exec();
            if (!car) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'car not found',
                    code: 404,
                });
            }
            const updatedCar = await Car.findByIdAndUpdate(id, req.body, {
                runValidators: true,
                new: true,
            });
            return res.status(200).json({
                status: 'success',
                data: { updatedCar },
                code: 200,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'an error occured',
                code: 500,
            });
        }
    }

    /**
     * @route DELETE api/cars/:id
     * @desc Delete a car by its ID
     * @access public
     */
    async delete(req, res) {
        try {
            const id = req.params.id;
            const car = await Car.findOne({ _id: id }).exec();
            if (!car) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'car not found',
                    code: 404,
                });
            }
            await Car.findByIdAndDelete(id);
            return res.status(204).json({
                status: 'success',
                data: null,
                code: 204,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'an error occured',
                code: 500,
            });
        }
    }

    /**
     * @route POST api/cars/:id/request
     * @desc Request a car by its ID
     * @access public
     */
    async requestCar(req, res) {
        try {
            const { user } = req.body;
            const id = req.params.id;
            const car = await Car.findOne({ _id: id }).exec();
            if (!car) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'car not found',
                    code: 404,
                });
            }
            const requestedCar = await RequestedCar.create({
                car: car._id,
                user,
            });
            return res.status(200).json({
                status: 'success',
                message: 'car requested',
                data: { requestedCar },
                code: 200,
            });
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({
                status: 'error',
                message: 'an error occured',
                code: 500,
            });
        }
    }
}
