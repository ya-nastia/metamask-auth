import axios from 'axios';

export const getNonce = async (): Promise<string> => {
  const { data } = await axios.get('/api/v1/auth/nonce');
  return data.nonce;
};

export const verifyAccount = async (token: string | null): Promise<{message: string}> => {
  const { data } = await axios.post('/api/v1/auth/verify', {}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return data;
};

export const login = async (signedMessage: string, message: string, address: string): Promise<string> => {
  const { data } = await axios.post('/api/v1/auth/login', { signedMessage, message, address }, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return data;
}