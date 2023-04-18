import { useState } from "react";
import '../main/SignUp.css'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    // Handle form submission for sign-up
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    // Handle form submission for sign-in
  };

  return (
    <div className="signup">
      <div className="login">
      <h1>Don't have an account?</h1>
      <h2>Sign up with your email and password</h2>
      <div >
        <form onSubmit={handleSignUpSubmit}>
          <div className="group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn" type="submit">Sign Up</button>
        </form>
        </div>
        </div>

        <div className="sign-In">
          <h3>Already have an account?</h3>
          <h4>Sign in with your email and password</h4>
          <form onSubmit={handleSignInSubmit}>
            <div className="group">
              <label htmlFor="signInEmail">Email:</label>
              <input
                type="email"
                id="signInEmail"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
              />
            </div>

            <div className="group">
              <label htmlFor="signInPassword">Password:</label>
              <input
                type="password"
                id="signInPassword"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
            </div>

            <button className="btnn" type="submit">Sign In</button>
            <button className="bt" type="submit">Reset Password</button>
          </form>
        </div>
    </div>
  );
};

export default SignUp;
