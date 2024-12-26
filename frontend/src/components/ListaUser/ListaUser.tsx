 import { getAllUser } from "../../../context/AuthProvider/utils";
 import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
 import { Table,Space,Tag, Col,Row } from "antd";
 import { TableProps } from "antd";
 import './listaUser.css';
import { IRegisterUser } from "../../../context/AuthProvider/types";


interface User {
    _id :string;
    name:string;
    email: String;
    password: String;
    token: String;
}
type AddUserProps ={
    listusers:IRegisterUser[];
}


 export const ListaUser=(listusers:AddUserProps)=>{
     
    const [ loading, setLoading ] = useState(true);
    const [users , setUsers] = useState<User[]>([])
         
    useEffect(()=>{
       
        const fetchData = async()=>{
            try{
                const response = await getAllUser();
                
                const userList = Array.isArray(response) ? response : response.usuarios || [];
                
                setUsers(()=>[...userList,listusers]);
                setLoading(false);

            }catch(error){
                setLoading(false);
                
            }
        }
              
        fetchData();
    },[])

    if(loading){
        return <p>Carregando...</p>
    }
    if(users.length === 0){
        
        return <p>Não há usuários cadastrados</p>
    }

    const columns : TableProps<User>['columns'] =[
          {
            title:'Name',
            dataIndex:'name',
            key:'name',
            render:(text) => <a>{text}</a>,
          },
          {
            title:'Email',
            dataIndex:'email',
            key:'email',
            
          },
          {
            title:'Password',
            dataIndex:'password',
            key:'password',
            
          },{
            title:'Ação',
            key:'action',
            render:(_,record)=>(
                <Space size="middle">
                <a>atualizar</a>
                <a>Delete</a>

                </Space>
            ),
          }
        //   {
        //     title:'Token',
        //     dataIndex:'token',
        //     key:'password',
           
        //   }

    ]
    
   

        

    return(
        <>
        <Row gutter={[16,16]}>
            <h1>Lista de usuarios</h1>
            <Col span={24} style={{padding:'16px'}}>
            <Table<User> columns={columns} dataSource={users} />;
            </Col>
        </Row>


         
        
            


            
        </>
    )
 }