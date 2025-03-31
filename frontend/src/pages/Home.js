import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import {ToastContainer} from 'react-toastify'


function Home() {
    const [loggedInUser, setloggedInUser] = useState('');
    const [products, setProducts] = useState('');

    useEffect(()=>{
       setloggedInUser(localStorage.getItem('loggedInUser'));//get user name from local brawoser storage
    })
    const nevigate = useNavigate();

    const handleLogout = (e) =>{
        localStorage.removeItem('token');//remove token  from local storage once user click on logout button
        localStorage.removeItem('loggedInUser'); //
        handleSuccess('User logged out');
        setTimeout(() => {
            nevigate('/login');
        }, 1000);
    }

    const fetchProducts = async () => {
        try {
            const url = "https://expense-tracker-marn-backend.vercel.app/auth/signup";
            const headers = {
                headers : {
                    'Authorization' : localStorage.getItem('token') //get token from local storage
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (error) {
            handleError(error)
        }
    }


    useEffect(()=>{
        fetchProducts()
    }, [])
    return(
        <div> 
            <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                  products && products?.map((item, index)=>(
                     <ul key={index}>
                        <span>{item.name} : {item.price}</span>
                     </ul>       

                   ))
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home;
