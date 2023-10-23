import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectErrorMessage, selectFetchStatus, selectIsConnected } from '../../store/auth-selectors';
import { getTokenFromStorage } from '../../utils/storage';
import { loginThunk, verifyAccountAsync } from '../../store/auth-thunk';
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import { FetchStatus } from '../../types/common';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector(selectErrorMessage);
  const isConnected = useSelector(selectIsConnected);
  const fetchStatus = useSelector(selectFetchStatus);

  useEffect(() => {
    (async () => {
      const token = getTokenFromStorage();
      if (token) {
        dispatch(verifyAccountAsync(token));
      }
    })();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (errorMessage) {
      let error = errorMessage === 'Rejected' ? 'Error' : errorMessage;
      toast.error(error);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  const login = async () => {
    await dispatch(loginThunk());
  }

  return (
    <div className='btn-container'>
      {
        fetchStatus === FetchStatus.Fetching ? (
          <InfinitySpin width='200'color="#ED9AD7" />
        ) : (
          <button onClick={login}>Login</button>
        )
      }
    </div>
  )
}

export default LoginPage;
