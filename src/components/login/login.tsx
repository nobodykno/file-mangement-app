
import React, { useState } from "react";
import './login.scss'
import { LoginModel } from "./login.model";

const Login = () => {

    const [loginForm, setLoginForm] = useState<LoginModel>({
        email: '',
        password: ''
    })

    /** To accept submit login information 
     * @param void 
    */

    const submit = () => {

        clearErrorMessage();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Set loading state
        setIsLoading(true);
    }

    /** To accept the change in input field and setDate to login form
     * @param  inputevent  
     * */

    const handleChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }



    // Loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    /** Set error message
     * @param message - error message to display
     */
    const setErrorMessage = (message: string) => {
        setError(message);
    };

    /** Clear error message */
    const clearErrorMessage = () => {
        setError('');
    };
    /** Validate form fields
 * @returns boolean - true if valid, false otherwise
 */
    const validateForm = (): boolean => {
        // Clear previous error
        clearErrorMessage();

        // Email validation - required and valid format
        if (!loginForm.email.trim()) {
            setErrorMessage('Email is required');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
            setErrorMessage('Please enter a valid email address');
            return false;
        }

        // Password validation - only check if empty
        if (!loginForm.password.trim()) {
            setErrorMessage('Password is required');
            return false;
        }

        if (loginForm.email != "paramjit@gmail.com" && loginForm.password != "1234") {
            setErrorMessage('Wrong Credentials');
            return false;
        }

        return true;
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
                    <button className="btn btn-primary btn-login" onClick={submit} >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>


                </div>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </div>


        </div>
    )

}

export default Login