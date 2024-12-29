import { deleteUser, recoverUser } from "../../../context/AuthProvider/utils"

type LinkProps={
    id: string,
    url?:string,
    name?:string,
    alterarUser:()=>void
}

export const Link = (props:LinkProps)=>{
   
    function obterUSer(){
        const user = recoverUser(props.id)
        console.log(user)
    }
     function delUser(){
        const delUser = deleteUser(props.id)
        props.alterarUser();
        console.log(delUser)
    }
    return(
        <>
        <a href="#" onClick={obterUSer}>update </a>
        
        
        <a href="#" onClick={delUser}>delete</a>
        </>
    )
}