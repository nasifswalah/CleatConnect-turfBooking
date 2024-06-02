import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB  from './config/connectDB.js';
import authRoute from "./routes/auth.routes.js";
import adminRoute from "./routes/admin.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use(cors());


app.use('/api/auth',authRoute);
app.use('/api/admin',adminRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});



app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});