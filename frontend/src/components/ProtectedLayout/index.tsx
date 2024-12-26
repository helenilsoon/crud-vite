import React, { useEffect, useState } from "react";
import { useAuth } from '../../../context/AuthProvider/useAuth';
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { IUser } from "../../../context/AuthProvider/types";
import { getUserLocalStorage } from "../../../context/AuthProvider/utils";


export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {

     const auth = useAuth();

    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
            if(auth === undefined){
                return;
            }
            if(!auth?.token){
                navigate('/login');
            }else{
                setLoading(false);
            }
         console.log(auth?.token);
             
      
    }, [auth,navigate]);

    if(loading){
       return null;
    }
    return children;
    

}

