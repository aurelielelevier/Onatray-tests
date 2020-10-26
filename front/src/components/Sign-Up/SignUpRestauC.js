import React from 'react'

import Header from '../Header'

import {Row, Col, Card} from 'antd'
import {EditOutlined} from "@ant-design/icons"

function SignUpRestauC(){
    return(
    <div>
        <Header/>
        <Row style={{paddingTop:50}}>
                <Col offset={5} span={8} >
                    <Card title="Votre compte" extra={<EditOutlined onClick={()=>console.log('click on edit')} />} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col  span={8} >
                    <Card title="Vos informations" extra={<EditOutlined onClick={()=>console.log('click on edit')} />} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
  
            </Row>
    </div>
    )
}
export default SignUpRestauC;