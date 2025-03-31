import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from "../utils";

function Login() {

    const [loginInfo, setloginInfo] = useState({
        email: '',
        password:''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        console.log(name, value);
        const copyloginInfo = { ...loginInfo };
        copyloginInfo[name] = value;
        setloginInfo(copyloginInfo);
    }
    console.log('loginInfo -> ' , loginInfo);
    
    const handleLogin = async (e)=>{
        e.preventDefault();
        //client side valiation
        const {email, password} = loginInfo;
        if(!email || !password){
            return handleError('email and password is required')
        }
        //start call API
        try {
            const url = "https://expense-tracker-marn-backend.vercel.app/auth/login";
            const response = await fetch(url, {
                method : "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const {success, message, jwtToken, name, error} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(()=>{
                    navigate('/home');
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        } catch (error) {
            handleError(error);
        }
    }
    
    
    
    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
               
                <div>
                    <label>Email</label>
                    <input 
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder="Enter your email..."
                    value={loginInfo.email}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder="Enter your password..."
                    value={loginInfo.password}
                    />
                </div>

                <button type="submit">Login</button>
                <spen>Don't have an account ?
                    <Link to="/login">Login</Link>
                </spen>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login;
