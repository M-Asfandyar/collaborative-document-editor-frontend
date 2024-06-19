import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const fetchUser = async () => {
        try {
          const response = await axios.get('/api/auth/user');
          setUser({ ...response.data, token });
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      };
      fetchUser();
    }
  }, []);

  const login = async (username, password) => {
    const response = await axios.post('/api/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    setUser({ ...response.data, token: response.data.token });
    navigate('/'); // Redirect to home page after login
  };

  const register = async (username, password) => {
    const response = await axios.post('/api/auth/register', { username, password });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    setUser({ ...response.data, token: response.data.token });
    navigate('/'); // Redirect to home page after registration
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
