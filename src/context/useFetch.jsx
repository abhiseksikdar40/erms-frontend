import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!url || !url.startsWith("http")) return;

    const token = localStorage.getItem("Login-Token");

    if (!token) {
      console.warn("No token found in localStorage");
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Fetch error");
      }

      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]); 

  return { data, loading, error, refetch: fetchData };
};
