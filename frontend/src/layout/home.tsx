import { useState } from "react"
import { CadastrarUser } from "../components/CadastrarUser/CadastrarUSer"
import { ListaUser } from "../components/ListaUser/ListaUser"
import { Header as Hea } from "./Header"
import "./home.css"
import { IRegisterUser } from "../../context/AuthProvider/types"


export const Home = () => {
    const [listusers, setListUsers] = useState<IRegisterUser[]>([])
    const [userCreated, setUserCreated] = useState(false)

    console.log("func > home : userCreated",userCreated)
    const verifyUsercreated = () => {
        setUserCreated(true)
    }
    const updateUserCreated = ()=>{
        setUserCreated(false)
    }


    const addListUser = (newListUser: IRegisterUser) => {
        setListUsers((prevListUser) => [...prevListUser, newListUser])
    }

    return (
        <>
            <Hea />
            <div className="layout">
                <CadastrarUser addListUser={addListUser} verifyUsercreated={verifyUsercreated} />
            </div>
            <ListaUser listusers={listusers} userCreated={userCreated} updateUserCreated={updateUserCreated} />

        </>
    )
}