import crypto from 'crypto';

export const getNonceController = (req, res) => {
  const nonce = crypto.randomBytes(32).toString('hex');
  res.status(201).json({ nonce });
};