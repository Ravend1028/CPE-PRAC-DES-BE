import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';

dotenv.config();
const port = process.env.PORT;
const app = express();

// Req Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth Routes
app.use('/api/users', authRoutes);

app.listen(port, () => {
 console.log(`Server is running on port ${ port }`);
});