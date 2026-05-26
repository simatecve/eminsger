import React, { createContext, useContext, useEffect, useState } from 'react';
import { insforge } from '../lib/insforge';

interface AuthContextType {
  user: any;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const { data, error } = await insforge.auth.getCurrentUser();
      if (!error && data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signOut = async () => {
    await insforge.auth.signOut();
    try {
      window.localStorage.removeItem('insforge_session');
    } catch {
    }
    insforge.setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
