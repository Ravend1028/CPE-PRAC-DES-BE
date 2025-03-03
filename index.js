import express from 'express';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import connectDB from './configs/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();
const port = process.env.PORT;
const app = express();

// Req Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Auth Routes
app.use('/api/users', router);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
 console.log(`Server is running on port ${ port }`);
});