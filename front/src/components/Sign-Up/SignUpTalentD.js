import React, {useState, useEffect} from 'react'

import Header from '../Header'

import {Row, Col, Card} from 'antd'
import {EditOutlined} from "@ant-design/icons"

function SignUpTalentD () {

    

    return(
        <div>
            <Header/>
            <Row style={{paddingTop:50}}>
                <Col offset={2} span={7} >
                    <Card title="Vos formations" extra={<EditOutlined onClick={()=>console.log('click on edit')} />} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col  span={7} >
                    <Card title="Vos experiences" extra={<EditOutlined onClick={()=>console.log('click on edit')} />} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col span={7} >
                    <Card title="Langues parlées" extra={<EditOutlined onClick={()=>console.log('click on edit')} />} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
            <Row style={{paddingTop:50}}>
                <Col offset={2} span={7} >
                    <Card title="Actuellement" extra={<EditOutlined onClick={()=>console.log('click on edit')} />} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col  span={7} >
                    <Card title="Perimetre de recherche" extra={<EditOutlined onClick={()=>console.log('click on edit')} />} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>

            </Row>
        </div>
    )
   
}
export default SignUpTalentD;