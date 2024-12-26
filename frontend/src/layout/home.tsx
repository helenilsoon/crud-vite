import { useState } from "react"
import { CadastrarUser } from "../components/CadastrarUser/CadastrarUSer"
import { ListaUser } from "../components/ListaUser/ListaUser"
import { Header as Hea} from "./Header"
import "./home.css"
import { IRegisterUser } from "../../context/AuthProvider/types"


export const Home =()=>{
    const[listusers , setListUsers] = useState<IRegisterUser[]>([])

    const addListUser=(newListUser:IRegisterUser)=>{
        setListUsers((prevListUser)=>[...prevListUser, newListUser])
    }

    return(
        <>
        <Hea/>
        <div className="layout">
        <CadastrarUser addListUser={addListUser}/>
        </div>
        <ListaUser listusers = {listusers}/>
        
        </>
    )
}