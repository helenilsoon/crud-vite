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
        console.error("Error em obter usuarios da api",error);
    }
}


export async function registerUser(data:IRegisterUser){
    try{    
        const response = await Api.post('register',data);
        return{
            message:response ? response.data:"Erro Desconhecido",
             
             status: response.status,
             type:"success"

        }
    }catch(error:any){
        
        console.error("Erro ao cadastrar usuario:",error)

        return{
            message:error.response ? error.response.data:"Erro Desconhecido",
             errorMessage: error.message,
             errorStatus: error.status,
             type:"error"

        }
    }
}

export async function recoverUser(id:string){
    try{
        const response = await Api.get(`user/${id}`)
        console.log(response.data);

    }catch(error){
        console.log("Error em obter usuarios da api",error);
    }
}
export async function deleteUser(id:string){
    try{
        const response = await Api.delete(`user/${id}`)
         

    }catch(error:any){
        console.error("func deleteUser: Error ao deletar usuario",{
            error:error.response.data,
            status:error.response.status}
        );
    }
}