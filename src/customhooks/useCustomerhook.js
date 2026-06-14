import { useState, useEffect } from "react";

export function useCustomerhook() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch(
          "https://dummyjson.com/users?limit=0&skip=0",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const result = await response.json();
        setData(result.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  return { loading, data, error };
}
