import { Header } from "../../layout/Header"
import { Logged } from "../Logged"
import { Login  as  Entrar } from "."

export const Login =()=>{
    return(
    <>
        <Logged/>
        <Header/>
        <Entrar/>
    </>
    
)
}