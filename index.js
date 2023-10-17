import express from 'express';
import dotenv from 'dotenv';
import testRoutes from './routes/testRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/test', testRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});