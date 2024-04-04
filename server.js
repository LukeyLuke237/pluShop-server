import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRouter from './routes/products.js';
import orderRouter from './routes/orders.js';
import userRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 5000;
const URL = 'mongodb+srv://temp:123@cluster0.kmqeywc.mongodb.net/';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRouter);
app.use(orderRouter);
app.use(userRouter);

mongoose.connect(URL)
        .then(async () => {
            console.log("Connect to MongoDB Atlas");
            app.listen(PORT, () => {
                console.log("Server is listening on port " + PORT)
            })
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        })
