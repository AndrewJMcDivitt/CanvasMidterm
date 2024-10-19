
import { useState, useCallback } from 'react';

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunc(...args);
      setData(result);
      return result;
    } catch (e) {
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, error, loading, execute };
};

export default useApi;