import express from 'express';
import dotenv from 'dotenv';
import  connectDB  from './config/connectDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())


connectDB();




app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});