import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const checkAuth = async () => {
      if (token !== null) {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [token]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return token ? <>{children}</> : <Redirect to="/login" />;
};

export default PrivateRoute;
