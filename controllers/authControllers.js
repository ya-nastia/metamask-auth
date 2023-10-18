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

export const verifyPostController = (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: { message: 'Invalid token', status: 401 } });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      res.status(401).json({ error: { message: 'Token expired', status: 401 } });
    } else {
      res.status(200).json({ message: 'ok' });
    }
  } catch (err) {
    res.status(401).json({ error: { message: 'Invalid token', status: 401 } });
  }
};