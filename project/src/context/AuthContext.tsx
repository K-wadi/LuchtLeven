import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (from localStorage for MVP)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // For MVP: simple authentication using localStorage
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock login - in real app, this would call Supabase auth
      // For demo purposes only
      if (email && password) {
        const user = { id: `user-${Date.now()}`, email };
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
      } else {
        throw new Error('Email en wachtwoord zijn verplicht');
      }
    } catch (error) {
      setError('Inloggen mislukt. Controleer uw gegevens.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock registration - in real app, this would call Supabase auth
      if (email && password) {
        const user = { id: `user-${Date.now()}`, email, name };
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
      } else {
        throw new Error('Alle velden zijn verplicht');
      }
    } catch (error) {
      setError('Registratie mislukt. Probeer het opnieuw.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock password reset - in real app, this would call Supabase auth
      if (!email) {
        throw new Error('Email is verplicht');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      setError('Wachtwoord reset mislukt. Probeer het opnieuw.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    resetPassword,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};