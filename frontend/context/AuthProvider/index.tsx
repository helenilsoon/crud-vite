import React , { createContext, useState, useEffect } from 'react';	
import { IContext, IAuthProvider, IUser } from './types';
import { LoginRequest } from './utils';
import { setUserLocalStorage,getUserLocalStorage } from './utils';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<IContext>({} as IContext) 


export const AuthProvider =({children} : IAuthProvider) =>{
  
    const[user , setUser] = useState<IUser | null>(null)
    useEffect(()=>{
        const user =getUserLocalStorage()

        if(user){
            setUser(user)
        }
    },[])

    async function  authenticate(email:string, password:string) {
        const response = await LoginRequest(email,password)
        
        const payload = { token:response.token,email:email}

       
        setUser( payload);
        setUserLocalStorage(payload)
    }
    function logout(){
       
        setUser(null)
        setUserLocalStorage(null)
       
        
    }

    return(
        <AuthContext.Provider value={{...user,authenticate,logout}}>
         {children}
        </AuthContext.Provider>
    )
}