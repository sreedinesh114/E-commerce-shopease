import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for user token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get('http://localhost:5000/api/users/profile', config);
      setCurrentUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      setCurrentUser(null);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name, 
        email, 
        password
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};