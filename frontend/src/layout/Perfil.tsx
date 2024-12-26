 import React,{ useEffect} from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
export const Perfil=()=>{
   const navigate = useNavigate();
    const auth = useAuth()

    useEffect(()=>{
        if(!auth.token){
            navigate('/login')
        }
    },[auth.token,navigate])

    return(
        <>
        <Header/>
        <h1>Perfil aqui</h1>
        <h2> este e o email:
        {auth.email}
        </h2>
        <button onClick={auth.logout}>Logout</button>

        
        </>
        
    )
}