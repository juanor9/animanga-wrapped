/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topnav from '../Topnav/Topnav';
import { getUserProfile, getUserData } from '../../services/userPage';
import UserLists from '../UserLists/UserLists';
import StatsDisplay from '../../../animeStats/components/StatsDisplay/StatsDisplay';

const UserDisplay = () => {
  const [tabValue, setTabValue] = useState('lists');
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const { lists } = useSelector((state) => state.UserReducer.user);
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window !== undefined) {
      const token = window.localStorage.getItem('userToken');
      setUserToken(token);
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      try {
        dispatch(getUserProfile(userToken));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [userToken]);

  useEffect(() => {
    const userIdData = user._id;
    setUserId(userIdData);
  }, [user]);

  useEffect(() => {
    if (userToken && userId) {
      try {
        dispatch(getUserData({ userToken, userId }));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [userToken, userId]);

  return (
    <>
      <Topnav update={setTabValue} />
      {tabValue === 'lists'
        ? <UserLists lists={lists} />
        : null}
      {tabValue === 'stats'
        ? <StatsDisplay lists={lists} />
        : null}
    </>
  );
};
export default UserDisplay;
