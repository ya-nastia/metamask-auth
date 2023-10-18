import express from 'express';
import {
  getNonceController, 
  loginPostController,
  verifyPostController,
} from '../controllers/authControllers.js';

const router = express.Router();

router.get('/nonce', getNonceController);

router.post('/login', loginPostController);

router.post('/verify', verifyPostController);

export default router;