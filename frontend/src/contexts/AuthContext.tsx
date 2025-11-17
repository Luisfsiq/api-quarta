import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { User } from "../types/User";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    const loadUser = async () => {
      if (token && userData) {
        try {
          const savedUser = JSON.parse(userData);
          setUser(savedUser);
        } catch (error) {
          try {
            const userProfile = await authService.getProfile();
            setUser(userProfile);
            localStorage.setItem("user", JSON.stringify(userProfile));
          } catch (profileError) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []); // ✅ Array vazio - executa apenas uma vez

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    setUser(response.user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
