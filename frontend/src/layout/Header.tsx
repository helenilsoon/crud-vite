import React, { useEffect, useState } from 'react'
import './header.css'
import '../assets/font-awesome-4.7.0/css/font-awesome.min.css'
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
export const Header =()=>{
     const navigate = useNavigate();
     const auth = useAuth();
     const [isOpen,setIsOpen] = useState(false);
     const toggleMenu=()=>{
        setIsOpen(!isOpen);
     }
     useEffect(() => {
         if(!auth){
            navigate('/login')
         }
     },[auth,navigate])
    return(
        <ul style={{display:'flex',gap:'10px'}}>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/perfil">Perfil</a></li>         
            {auth.token && 
                <li> {auth.email}
                <button onClick={toggleMenu} className='seta'>
                <i className={`fa fa-caret-down seta-icon ${isOpen ? 'open': ''}`} aria-hidden="true"></i>
                  
                </button>
                {isOpen &&
                    <ul>
                        <li><a href="/perfil">Perfil</a></li>
                        <li onClick={auth.logout}>Sair </li>
                    </ul>
                }
                </li>
                }
        </ul>    
    )
}