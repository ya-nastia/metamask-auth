import express from 'express';
import dotenv from 'dotenv';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});