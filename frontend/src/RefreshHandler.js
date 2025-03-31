import React, { useEffect } from "react";
import {useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({setIsAuthenticated}) {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token")){
                setIsAuthenticated(true);
                if(location.pathname === '/' ||
                    location.pathname === '/login' ||
                    location.pathname === '/signup'  ///if user in paht pe jana hi and token local storage me hi to vo redirect hoga /home pe 
                ){
                    navigate("/home", {replace: false});
                }
        }
    }, [location, navigate , setIsAuthenticated])
    return(
        null
    )
}

export default RefreshHandler