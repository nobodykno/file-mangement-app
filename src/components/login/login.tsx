
import React from "react";
import './login.scss'

const Login = () => {

    return (
        <div className="login_background">

            <div className="login_form">
                <div className="form_element">
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form_element">
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        name="Password"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="submitbutton">
                <button className="btn btn-primary btn-login">Login</button>
            </div>
            </div>


        </div>
    )

}

export default Login