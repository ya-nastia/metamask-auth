import crypto from 'crypto';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

export const getNonceController = (req, res) => {
  const nonce = crypto.randomBytes(32).toString('hex');
  res.status(201).json({ nonce });
};

export const loginPostController = (req, res) => {
  const { signedMessage, message, address } = req.body;

  const recoveredAddress = ethers.utils.verifyMessage(message, signedMessage);

  if (recoveredAddress !== address) {
    return res.status(401).json({ error: { message: 'Invalid signature', status: 401 } });
  }

  const token = jwt.sign({ address }, process.env.JWT_SECRET, { expiresIn: '10m' });
  res.status(200).json(token);
};