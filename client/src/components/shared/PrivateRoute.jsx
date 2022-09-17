import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthState } from '../../recoilAtoms/userAtoms';

const PrivateRoute = ({ children }) => {
  const isAuth = useRecoilValue(isAuthState);

  return !isAuth ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
