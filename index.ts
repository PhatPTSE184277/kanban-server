import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './src/routers';
import cors from 'cors';
dotenv.config();

const app = express();
const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

if (!mongoUrl) {
    throw new Error('MONGO_URL is not defined in environment variables');
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl);

        console.log('Connect to db successfully!');
    } catch (error) {
        console.log(`Cannot connect to db ${error}`)
    }
};

router(app);

connectDB()
    .then(() => {
        app.listen(port, () => {  
            console.log(`Server is starting at http://localhost:${port}`)
        });
    })
    .catch((error) => {
        console.log(error)
    })

