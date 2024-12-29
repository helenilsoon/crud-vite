import { Button, Form, Input, Flex, Row, Col, List, Alert } from "antd"
import { CloseSquareFilled } from '@ant-design/icons';
import { registerUser } from "../../../context/AuthProvider/utils"
import { useEffect, useState } from "react"

// import { ListaUser } from "../ListaUser/ListaUser"
import { IRegisterUser } from "../../../context/AuthProvider/types"



type FieldType = {
    name?: string,
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?: string

}
type ListaUserProps = {
    addListUser: (param: IRegisterUser) => void,
    verifyUsercreated: () => void

}
export const CadastrarUser = ({ addListUser, verifyUsercreated }: ListaUserProps) => {
    const [user, setUSer] = useState<IRegisterUser>({})
    const [alert, setAlert] = useState({

        mensagem: "",
        type: ""

    })
    const [form] = Form.useForm();

    const onFinish = async (values: FieldType) => {

        const response = await registerUser(user);
            console.log("func > onFinish : response  ",response)


        if(response.status ==   201 ){

            setAlert({
                mensagem: response.message.msg,
                type: response.type
            });
        }else{

            setAlert({
                mensagem: response.message.msg,
                type: response.type
            });
        }


        verifyUsercreated()
        setUSer({});
        form.resetFields();
        // addListUser(values);
        cleanAlert()
        return response

        
    }

    const cleanAlert = () => {
        setTimeout(() => {
            setAlert({
                mensagem: '',
                type: ''
            });
        }, 4000)
    }
    const onValuesChange = (changeValues: IRegisterUser, allValues: IRegisterUser) => {
        setUSer(allValues)


    }
    const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e, 'I was closed.');
    };


    return (
        <>
            {alert.type === "success" && <Alert message={alert.mensagem} type="success" showIcon closable onClose={onClose} />}
            {alert.type === "error" && <Alert message={alert.mensagem} type="error" showIcon closable onClose={onClose} />}
            

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
                        onValuesChange={onValuesChange}
                        clearOnDestroy={true}

                    // validateMessages={}

                    >
                        <Row gutter={13}>
                            <Col span={12}>
                                <Form.Item<FieldType> label="Name" name="name" rules={[{ required: false, message: 'Plase input your nome!' }]}>
                                    <Input />
                                </Form.Item>

                            </Col>

                            <Col span={12}>
                                <Form.Item<FieldType> label="E-mail" name="email" rules={[{ required: false, message: 'please input your E-mail' }]}>
                                    <Input />
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item<FieldType> label="Password" name="password" rules={[{ required: false, message: 'please input your password' }]}>
                                    <Input.Password />
                                </Form.Item>

                            </Col>
                            <Col span={12}>
                                <Form.Item<FieldType> label="Password repeat" name="confirmPassword" rules={[{ required: false, message: 'please input your Repeat password' }]}>
                                    <Input.Password />
                                </Form.Item>

                            </Col>

                        </Row>



                        <Row>
                            <Col offset={6}>
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

