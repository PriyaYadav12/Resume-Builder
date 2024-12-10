import React, { useState } from 'react';
import loginImage from '../assets/LoginImage.jpg'
import Icon from './icon';
import bcrypt from 'bcryptjs';
import axios from 'axios';

interface LoginForm {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    // State for the login form
    const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
    // State for form submission feedback
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const saltRounds = 10;

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!form.email || !form.password) {
            setError('Please fill in both fields.');
            setSuccess(null);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError('Please enter a valid email address.');
            setSuccess(null);
            return;
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        form.password = bcrypt.hashSync(form.password, salt);
        // Simulate successful login
        setError(null);
        setSuccess('Login successful!');
        try {
            const response = await axios.post('http://localhost:3000/api/login', form);
            setSuccess(response.data.message);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="flex-container">
            <div>
                <img
                    src={loginImage}
                    alt='LoginImage'
                    className='LoginImage'
                ></img>
            </div>
            <div className='loginContainer'>
                <h3 className='loginHeader'>{isLogin ? "LOGIN":"SIGNUP"}</h3>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <div className='loginDiv'>
                        <div className="input-wrapper">
                            <span className="icon"><Icon name="user" /></span>
                            <input type="text" name="email" placeholder="Email" required onChange={handleInputChange} />
                        </div>
                        <div className="input-wrapper">
                            <span className="icon"><Icon name="password" /></span>
                            <input type="password" name="password" placeholder="password" required onChange={handleInputChange}/>
                        </div>
                        {error && <p className='errorMessage'>{error}</p>}
                        <button className='loginButton' type="submit">{isLogin ? "Login":"Signup"}</button>


                    </div>
                </form>
                <p className='signupPara'>
                    {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    <a href="#" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign up' : 'Login'}
                    </a>
                </p>
                <button className='oauthButton'><Icon name="google" /> Google</button>
                <button className='oauthButton'><Icon name="linkedIn" /> LinkedIn</button>
                <button className='oauthButton'><Icon name="sso" /> (Single Sign-on) SSO</button>
            </div>
        </div>
    );
};


export default Login;
