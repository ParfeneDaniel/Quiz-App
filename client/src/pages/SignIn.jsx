import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { SignUp } from "SignUp";

const SignIn = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSignIn = () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
  };

  return (
    <div id="signIn">
      <form>
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
        <input type="submit" onClick={handleSignIn} />
        <p>
          Don't have an acount?<Link to='/signup'>Sing Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
