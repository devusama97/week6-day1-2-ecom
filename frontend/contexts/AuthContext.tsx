'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  loyaltyPoints: number;
  avatar?: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  refreshUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = authService.getToken();
  //   const savedUser = authService.getUser();
    
  //   console.log('AuthContext - Token:', token);
  //   console.log('AuthContext - Saved user:', savedUser);
    
  //   if (token && savedUser) {
  //     setUser(savedUser);
  //     setIsAuthenticated(true);
  //   } else {
  //     setUser(null);
  //     setIsAuthenticated(false);
  //   }
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    // Prevent hydration mismatch by running only on client
    if (typeof window === 'undefined') return;
    
    let isMounted = true; // Prevent state updates if component unmounts
    
    const initAuth = async () => {
      const token = authService.getToken();
      const savedUser = authService.getUser();
    
      if (token) {
        try {
          // If we have a token but no user data, fetch it
          if (!savedUser) {
            const response = await fetch('http://localhost:4000/api/auth/profile', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            
            if (response.ok && isMounted) {
              const responseData = await response.json();
              // Extract actual user data from wrapped response
              const userData = responseData.data || responseData;
              authService.setAuth(token, userData);
              setUser(userData);
              setIsAuthenticated(true);
            } else if (isMounted) {
              // Invalid token, clear it
              authService.logout();
              setUser(null);
              setIsAuthenticated(false);
            }
          } else if (isMounted) {
            // Handle wrapped user data
            const userData = savedUser.data || savedUser;
            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          if (isMounted) {
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } else if (isMounted) {
        setUser(null);
        setIsAuthenticated(false);
      }
    
      if (isMounted) {
        setLoading(false);
      }
    };

    initAuth();
    
    return () => {
      isMounted = false; // Cleanup
    };
  }, []);
  

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    
    // Handle wrapped response from backend
    const authData = (response as any).data || response;
    
    authService.setAuth(authData.access_token, authData.user);
    setUser(authData.user);
    setIsAuthenticated(true);
  };

  const refreshUser = async () => {
    const token = authService.getToken();
    
    if (token) {
      try {
        const response = await fetch('http://localhost:4000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const responseData = await response.json();
          // Extract actual user data from wrapped response
          const userData = responseData.data || responseData;
          authService.setAuth(token, userData);
          setUser(userData);
          setIsAuthenticated(true);
          return userData;
        }
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
    return null;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/auth/login';
  };
  

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      loading,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}