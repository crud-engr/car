import mongoose from 'mongoose';
import moment from 'moment';

const RequestedCarSchema = new mongoose.Schema(
    {
        car: {
            type: mongoose.Types.ObjectId,
            ref: 'Car',
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        dateCreated: {
            type: String,
            default: moment().format().split('T')[0],
        },
    },
    { timestamps: true }
);

RequestedCarSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'car',
        select: '-__v -createdAt -updatedAt',
    }).populate({ path: 'user', select: '-__v -createdAt -updatedAt' });
    next();
});

export default mongoose.model('RequestedCar', RequestedCarSchema);
