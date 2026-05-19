import { useState, useCallback, useEffect } from "react";
import API from "../services/api";

/**
 * Custom hook for fetching and managing goals
 */
export const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/goals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch goals:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return { goals, loading, error, fetchGoals, setGoals };
};
