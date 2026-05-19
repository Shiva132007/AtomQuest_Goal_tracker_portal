import { useState, useCallback } from "react";
import API from "../services/api";

/**
 * Generic fetch hook for API calls
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(url, {
        headers: { Authorization: `Bearer ${token}`, ...options.headers },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { data, loading, error, fetch, setData };
};
