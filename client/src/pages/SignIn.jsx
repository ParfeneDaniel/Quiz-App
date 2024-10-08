import React, { useRef } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useSignIn from "../hooks/useSignIn";
import { useAuthContext } from "../context/AuthContext";

const SignIn = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { loading, error, login } = useSignIn();
  const { isAuth } = useAuthContext();
  const location = useLocation();

  const handleSignIn = () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    login(data);
  };

  return isAuth ? (
    <Navigate to="/home/" state={{ from: location }} replace />
  ) : (
    <div>
      <form id="signIn">
        <input
          type="text"
          placeholder="username"
          id="username"
          ref={usernameRef}
        />
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
          onClick={handleSignIn}
        />
        <p>
          Don't have an account?{" "}
          <Link className="link" to="/signup">
            Sing Up
          </Link>
        </p>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
