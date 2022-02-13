import express from 'express';
import morgan from 'morgan';
import { connectDB } from './utils/database/db.js';
import { UserRouter } from './routes/User.js';
import { CarRouter } from './routes/Car.js';
import dotenv from 'dotenv';
dotenv.config();

// connect databse
connectDB();

// start express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET',
        'POST',
        'DELETE',
        'PATCH'
    );
    next();
});
app.use(morgan('dev'));
app.use('/api/users', UserRouter);
app.use('/api/cars', CarRouter);

// listen to incoming requests
(async () => {
    try {
        const port = process.env.PORT || 3007;
        app.listen(port, () =>
            console.log(`App running on port:${process.env.PORT}`)
        );
    } catch (err) {
        console.error(err);
    }
})();
