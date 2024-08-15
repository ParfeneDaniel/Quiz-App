import React, { useRef } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import { useAuthContext } from "../context/AuthContext";

const SignUp = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loading, error, data, register } = useSignUp();
  const { isAuth } = useAuthContext();
  const location = useLocation();

  const handleSignUp = () => {
    const data = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    register(data);
  };

  return isAuth ? (
    <Navigate to="/home/" state={{ from: location }} replace />
  ) : (
    <div>
      <form id="signUp">
        <input
          type="text"
          placeholder="username"
          id="username"
          ref={usernameRef}
        />
        <input type="email" placeholder="email" id="email" ref={emailRef} />
        <input
          type="password"
          placeholder="password"
          id="password"
          ref={passwordRef}
        />
        <input
          type="submit"
          value={loading ? "Loading..." : "Submit"}
          disabled={loading}
          onClick={handleSignUp}
        />
        <p>
          Already have an acount?<Link to="/signin">Sing In</Link>
        </p>
        {error && <p>{error}</p>}
        {data && <p>{data}</p>}
      </form>
    </div>
  );
};

export default SignUp;
