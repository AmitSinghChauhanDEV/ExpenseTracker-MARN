import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from "../utils";

function Signup() {

    const [signupInfo, setsignupInfo] = useState({
        name: '',
        email: '',
        password:''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        console.log(name, value);
        const copysignupInfo = { ...signupInfo };
        copysignupInfo[name] = value;
        setsignupInfo(copysignupInfo);
    }
    console.log('signupInfo -> ' , signupInfo);
    const handleSingup = async (e)=>{
        e.preventDefault();
        //client side valiation
        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
            return handleError('name , email and password is required')
        }
        //start call API
        try {
            const url = "https://expense-tracker-marn-backend.vercel.app/auth/signup";
            const response = await fetch(url, {
                method : "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login');
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
            <h1>Signup</h1>
            <form onSubmit={handleSingup}>
                <div>
                    <label>Name</label>
                    <input 
                    onChange={handleChange}
                    type='text'
                    name='name'
                    autoFocus
                    placeholder="Enter your name..."
                    value={signupInfo.name}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder="Enter your email..."
                    value={signupInfo.email}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder="Enter your password..."
                    value={signupInfo.password}
                    />
                </div>

                <button type="submit">Signup</button>
                <spen>Already have an account ?
                    <Link to="/login">Login</Link>
                </spen>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup;
