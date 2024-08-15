import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Validate = () => {
  const [error, setError] = useState(null);
  const { emailToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/auth/validEmail/${emailToken}`)
      .then(() => navigate("/signin"))
      .catch((error) => setError(error.response.data.message));
  }, []);
  return <div>{error && <p>{error}</p>}</div>;
};

export default Validate;
