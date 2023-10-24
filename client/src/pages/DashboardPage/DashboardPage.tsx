import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { selectFetchStatus, selectIsConnected } from '../../store/auth-selectors';
import { deleteTokenFromStorage, getTokenFromStorage } from '../../utils/storage';
import { setIsConnected } from '../../store/auth-slice';
import { verifyAccountAsync } from '../../store/auth-thunk';
import { FetchStatus } from '../../types/common';
import { InfinitySpin } from 'react-loader-spinner';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchStatus = useSelector(selectFetchStatus);

  useEffect(() => {
    const token = getTokenFromStorage();
    if (!token) {
      dispatch(setIsConnected(false));
      navigate('/');
    } else {
      dispatch(verifyAccountAsync(token)).then((result) => {
        if (result.payload !== 'ok') {
          navigate('/');
        }
      });
    }
  }, [navigate, dispatch]);

  const logout = () => {
    deleteTokenFromStorage();
    dispatch(setIsConnected(false));
    navigate('/');
  }

  return (
    <div className='btn-container'>
      {
        fetchStatus === FetchStatus.Fetching ? (
          <InfinitySpin width='200'color="#ED9AD7" />
        ) : (
          <button onClick={logout}>Logout</button>
        )
      }
    </div>
  )
}

export default DashboardPage;
