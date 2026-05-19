import { useState, useCallback } from "react";
import API from "../services/api";

/**
 * Custom hook for authentication
 */
export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.post("/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userRole", user.role);

      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    setUser(null);
  }, []);

  const isAuthenticated = !!user;
  const userRole = user?.role;

  return {
    user,
    isAuthenticated,
    userRole,
    loading,
    error,
    login,
    logout,
  };
};
