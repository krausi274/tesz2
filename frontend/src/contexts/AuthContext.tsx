import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUserId: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUserId: null,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('auth_session');
    const userId = localStorage.getItem('current_user_id');
    if (session && userId) {
      setIsAuthenticated(true);
      setCurrentUserId(userId);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get all users and find matching email/password
      const users = await apiService.getAllPersons();
      const user = users.find(u => u.email === email && u.passwort === password);
      
      if (user) {
        setIsAuthenticated(true);
        setCurrentUserId(user.id);
        // Store session
        localStorage.setItem('auth_session', 'authenticated');
        localStorage.setItem('current_user_id', user.id);
        return true;
      }
      
      // Fallback to demo credentials
      if (email === 'demo@example.com' && password === 'password123') {
        setIsAuthenticated(true);
        setCurrentUserId('demo_user');
        localStorage.setItem('auth_session', 'demo_user');
        localStorage.setItem('current_user_id', 'demo_user');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUserId(null);
    localStorage.removeItem('auth_session');
    localStorage.removeItem('current_user_id');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};