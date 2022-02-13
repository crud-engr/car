import User from '../models/User.js';
import RequestedCar from '../models/RequestedCar.js';

export class UserService {
    async create(req, res) {
        try {
            const { name } = req.body;
            if (!('name' in req.body)) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'name is required',
                    code: 400,
                });
            }
            if (!name) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'name is required',
                    code: 400,
                });
            }
            const user = await User.create({ name });
            return res.status(201).json({
                status: 'success',
                message: 'user successfully created',
                data: { user },
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

    async getAll(req, res) {
        try {
            const users = await User.find().exec();
            return res.status(200).json({
                status: 'success',
                record: users.length,
                data: { users },
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

    async getOne(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findOne({ _id: id }).exec();
            if (!user) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'user not found',
                    code: 404,
                });
            }
            return res.status(200).json({
                status: 'success',
                data: { user },
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

    async update(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findOne({ _id: id }).exec();
            if (!user) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'user not found',
                    code: 404,
                });
            }
            const updatedUser = await User.findByIdAndUpdate(id, req.body, {
                runValidators: true,
                new: true,
            });
            return res.status(200).json({
                status: 'success',
                data: { updatedUser },
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

    async delete(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findOne({ _id: id }).exec();
            if (!user) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'user not found',
                    code: 404,
                });
            }
            await User.findByIdAndDelete(id);
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
     * @route GET api/requested
     * @desc Get all requested cars
     * @access public
     */
    async requestedCars(req, res) {
        try {
            let filterObject = {};
            let { dateCreated } = req.query;
            if (dateCreated) filterObject.dateCreated = dateCreated;
            const requestedCars = await RequestedCar.find(filterObject);
            console.log(filterObject);
            return res.status(200).json({
                status: 'success',
                records: requestedCars.length,
                data: { requestedCars },
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
