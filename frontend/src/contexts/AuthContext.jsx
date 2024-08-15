import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); 
  }, []);

  const signOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  const API = import.meta.env.VITE_URL;


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, signOut, API }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
