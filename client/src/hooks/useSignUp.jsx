import axios from "axios";
import { useState } from "react";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const register = (formData) => {
    setLoading(true);
    setError(null);
    setData(null);
    axios
      .post("http://localhost:8080/api/auth/signup", formData)
      .then((response) => setData(response.data.message))
      .catch((error) => setError(error.response.data.message))
      .finally(() => setLoading(false));
  };

  return { loading, error, data, register };
};

export default useSignUp;
