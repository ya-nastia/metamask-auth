import express from 'express';
import {
  getNonceController, 
} from '../controllers/authControllers.js';

const router = express.Router();

router.get('/nonce', getNonceController);

export default router;