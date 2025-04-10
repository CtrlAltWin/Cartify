
import React, { createContext, useState, useContext, useEffect } from "react";
import { api, LoginCredentials } from "../services/api";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("cartify-token");
    const storedUser = localStorage.getItem("cartify-user");
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.login(credentials);
      localStorage.setItem("cartify-token", response.token);
      localStorage.setItem("cartify-user", credentials.username);
      setIsAuthenticated(true);
      setUser(credentials.username);
      toast({
        title: "Login successful!",
        description: `Welcome back, ${credentials.username}`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("cartify-token");
    localStorage.removeItem("cartify-user");
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
