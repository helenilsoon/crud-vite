import { message } from 'antd';
import {Api} from '../services/api'
import { IUser,IRegisterUser } from './types';

export function setUserLocalStorage(user:IUser | null){
    localStorage.setItem('u',JSON.stringify(user));
}

export function getUserLocalStorage(){
    const json = localStorage.getItem('u');

    if(!json){
        return null
    }

    const user = JSON.parse(json);
    
    return user ?? null;
}
export async function LoginRequest(email:string, password:string){
    try{
        const request = await Api.post('login',{email,password})
        console.log(request)
        return request.data;
    }catch(error){
        console.log(error);
        return null
    }
}
export async function getAllUser(){
    try{
        const request = await Api.get('users');
      
       return request.data
    }catch(error){
        console.log("Error em obter usuarios da api",error);
    }
}


export async function registerUser(data:IRegisterUser){
    try{    
        const response = await Api.post('register',data);
        return response.data
    }catch(error:any){
        return{
            message:"Erro em cadastrar usuario",
             Error: error.response.data
        }
    }
}