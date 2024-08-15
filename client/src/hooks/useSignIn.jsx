import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setAccessToken, setRefreshToken, setUserId, setIsAuth } =
    useAuthContext();
  const navigate = useNavigate();

  const login = (formData) => {
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:8080/api/auth/signin", formData)
      .then((response) => {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refreshToken)
        );
        localStorage.setItem("userId", JSON.stringify(response.data.userId));
        localStorage.setItem("isAuth", true);
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setUserId(response.data.userId);
        setIsAuth(true);
        navigate("/home/");
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => setLoading(false));
  };

  return { loading, error, login };
};

export default useSignIn;
