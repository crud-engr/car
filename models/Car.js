import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        year: {
            type: Number,
            required: true,
            trim: true,
            lowercase: true,
        },
        image: {
            type: String,
            default:
                'https://cdn3.vectorstock.com/i/thumb-large/92/62/car-icon-flat-style-vector-21349262.jpg',
        },
        availability: {
            type: Boolean,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);


CarSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'owner',
        select: '-__v -createdAt -updatedAt',
    });
    next();
});

export default mongoose.model('Car', CarSchema);
