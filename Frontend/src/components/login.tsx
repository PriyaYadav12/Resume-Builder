import React, { useState } from 'react';
import loginImage from '../assets/LoginImage.jpg'
import Icon from './icon';

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

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

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

        // Simulate successful login
        setError(null);
        setSuccess('Login successful!');
        console.log('Login data:', form);
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
                <h3 className='loginHeader'>LOGIN</h3>
                <div className='loginDiv'>
                    <div className="input-wrapper">
                        <span className="icon"><Icon name="user"/></span>
                        <input type="text" placeholder='username' />
                    </div>
                    <div className="input-wrapper">
                        <span className="icon"><Icon name="password"/></span>
                        <input type="password" placeholder='password' />
                    </div>
                    <button className='loginButton'>Login</button>
                    <p className='signupPara' >Dont have an account ? <a href="/signup">Sign up</a></p>
                </div>
                <button className='oauthButton'><Icon name="google" className="icon"/> Google</button>
                <button className='oauthButton'><Icon name="linkedIn" className="icon"/> LinkedIn</button>
                <button className='oauthButton'><Icon name="sso" className="icon"/> (Single Sign-on) SSO</button>
            </div>
        </div>
    );
};


export default Login;
