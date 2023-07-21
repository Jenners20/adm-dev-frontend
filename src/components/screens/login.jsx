import React, { useState } from "react";
import '../styles/login.css';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div class='ripple-background'>
            <div className="login_back">
                <div class='circle xxlarge shade1'></div>
                <div class='circle xlarge shade2'></div>
                <div class='circle large shade3'></div>
                <div class='circle mediun shade4'></div>
                <div class='circle small shade5'></div>
                <div className="auth-form-container">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">Username</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="username" id="email" name="email" />
                        <label htmlFor="password">Password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        <button className="btn btn-login" type="submit">Log In</button>
                    </form>
                    <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Olvidaste tu contraseña?</button>
                </div>
            </div>
        </div>
    )
}