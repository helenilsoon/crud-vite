import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthProvider/useAuth";
import { useEffect } from "react";


export const Logged=()=>{
    const auth = useAuth();
    const navigate = useNavigate()

    useEffect(()=>{
        if(auth.token){
            navigate('/perfil')
        }

    },)
    
    return(<></>)
}