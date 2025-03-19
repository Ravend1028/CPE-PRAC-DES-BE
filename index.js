import express from 'express';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import connectDB from './configs/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import initializeWebSockets from './configs/sockets.js';
import http from "http";

dotenv.config();
connectDB();
const port = process.env.PORT;
const app = express();
const server = http.createServer(app); // Create HTTP server

// Req Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Auth Routes
app.use('/api/users', router);

initializeWebSockets(server);

// For Production Setup
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve(); // returns current working directory
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Server is ready');
  });
}

// Error Handlers
app.use(notFound);
app.use(errorHandler);

server.listen(port, () => {
 console.log(`Server is running on port ${ port }`);
});