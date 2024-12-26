import { Button, Form, Input,Flex, Row, Col, List,Alert } from "antd"
import { registerUser } from "../../../context/AuthProvider/utils"
import { useState } from "react"

// import { ListaUser } from "../ListaUser/ListaUser"
import { IRegisterUser } from "../../../context/AuthProvider/types"



type FieldType ={
    name?:string,
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?:string

}
type ListaUserProps={
    addListUser:(param:IRegisterUser)=>void
}
export const CadastrarUser=({addListUser}:ListaUserProps   ) => {
            const [user,setUSer]=useState<IRegisterUser>({})
            const [alert ,setAlert] = useState({
              
                mensagem:"",
                type: ""
                
            })
            const [form] = Form.useForm(); 
  
    const  onFinish = async (values:FieldType)=>{
        try{
            const response = await registerUser(user);
            
           setAlert({
            mensagem:response.msg,
            type:"sucess"
           });
           return response

        }catch(error:any){
            console.error('Não foi possivel cadastrar.',error)
            setAlert({
                mensagem: `Não foi possivel cadastrar"${error.response.data}`,
                type:"error"
               });
        }
        console.log('USeState',user)
        // setUSer([]);
        // form.resetFields();
        // addListUser(values);
        
    }
    const onValuesChange=(changeValues:IRegisterUser , allValues:IRegisterUser)=>{
        setUSer(allValues)
       
       
    }
    return (
        <>
        {alert.type === "sucess" && <Alert message={alert.mensagem} type="success"  />}
        { alert.type ==="error" && <Alert message={alert.mensagem} type="error"  /> }
        
            <Row>
            <Col offset={8}>
               <h1> Cadastro de usuario</h1>
            </Col>
            </Row>
        <Row>
         <Col span={24} offset={8} sm={24}>
         
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                labelCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                layout="vertical"
                onValuesChange ={onValuesChange}
                clearOnDestroy={true}
                
                // validateMessages={}

            >
                <Row gutter={13}>
                    <Col span={12}>
                <Form.Item<FieldType>  label="Name" name="name" rules={[{required:true,message:'Plase input your nome!'}]}>
                    <Input/>
                </Form.Item>
                    
                    </Col>

                    <Col span={12}>
                <Form.Item<FieldType> label="E-mail" name="email" rules ={[{required:true,message:'please input your E-mail'}]}>
                    <Input />
                </Form.Item>
                    
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                <Form.Item<FieldType> label="Password" name="password" rules ={[{required:true,message:'please input your password'}]}>
                    <Input.Password />
                </Form.Item>
                    
                    </Col>
                    <Col span={12}>
                <Form.Item<FieldType> label="Password repeat" name="confirmPassword" rules ={[{required:true,message:'please input your Repeat password'}]}>
                    <Input.Password />
                </Form.Item>
                    
                    </Col>

                </Row>
                
                

                <Row>
                    <Col  offset={6}>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Cadastrar
                        </Button>
                    </Form.Item>
                    </Col>
                </Row>
               

            </Form>
         </Col>
        </Row>
        </>
    )
}

