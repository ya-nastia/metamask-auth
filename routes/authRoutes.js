import express from 'express';
import {
  getNonceController, 
  loginPostController,
} from '../controllers/authControllers.js';

const router = express.Router();

router.get('/nonce', getNonceController);

router.post('/login', loginPostController);

export default router;