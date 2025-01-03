import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const [loading, setLoading] = React.useState(true);


  console.log(isAuthenticated, "getisauth")
 

  return isAuthenticated === 'true' ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
