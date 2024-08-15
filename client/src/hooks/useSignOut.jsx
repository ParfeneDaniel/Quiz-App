import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useAxiosInstance from "./useAxiosInstance";

const useSignOut = () => {
  const axiosInstance = useAxiosInstance();
  const {
    refreshToken,
    accessToken,
    setRefreshToken,
    setAccessToken,
    setUserId,
    setIsAuth,
  } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    axiosInstance
      .post(
        "/auth/signout",
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        localStorage.clear();
        setRefreshToken(null);
        setAccessToken(null);
        setUserId(null);
        setIsAuth(null);
        navigate("/signin");
      })
      .catch((error) => console.log(error));
  };

  return logout;
};

export default useSignOut;
