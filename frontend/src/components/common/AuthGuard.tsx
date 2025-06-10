import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AuthGuard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }}
        replace 
      />
    );
  }

  return <Outlet />;
};

export default AuthGuard;