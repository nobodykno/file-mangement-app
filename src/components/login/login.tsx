import React, { useState } from "react";
import "./login.scss";
import { ILoginModel } from "./login.model";
import { useNavigate } from "react-router-dom";

import { Login, SaveAuth } from "../../services/auth-service";

const LoginInfo = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState<ILoginModel>({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /** Set error message
   * @param message - error message to display
   */
  const setErrorMessage = (message: string) => {
    setError(message);
  };

  /** Clear error message */
  const clearErrorMessage = () => {
    setError("");
  };

  /** Validate form fields
   * @returns boolean - true if valid, false otherwise
   */
  const submit = async () => {

    setIsLoading(true);

    if (!loginForm.email.trim()) {
      setErrorMessage("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

   
    if (!loginForm.password.trim()) {
      setErrorMessage("Password is required");
      return false;
    }

    try {
      
      const response = await Login({
        email: loginForm.email,
        password: loginForm.password,
      });

    
      SaveAuth(response.token);

     
      navigate("/projects");
    } catch (err: any) {
      setErrorMessage(err.message || "Login failed!");
    } finally {
      clearErrorMessage();
      setIsLoading(false);
    }
  };

  return (
    <div className="login_background">
      <div className="login_form">
        <h1>Login </h1>
        <div className="form_element">
          <div className="form_field">
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="form_element">
          <div className="form_field">
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="submitbutton">
          <button className="btn btn-primary btn-login" onClick={submit}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginInfo;
