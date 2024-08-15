import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { SignIn } from "SignIn";

const SignUp = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignUp = () => {
    const data = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
  };

  return (
    <div id="signUp">
      <form>
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
        <input type="submit" onClick={handleSignUp} />
        <p>
          Already have an acount?<Link to='signin'>Sing In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
