import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.send("Test");
});

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});

// Much better if i study how to connect to mongoose in better way rathen using the .then()