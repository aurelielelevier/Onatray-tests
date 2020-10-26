import React, {useState,Text} from 'react'
import 'antd/dist/antd.less';

import {Col,Card,Modal, Image, Row } from 'antd';
import {ExpandAltOutlined,SendOutlined,HeartOutlined,HeartFilled
  } from "@ant-design/icons"

function Cardtalent(props){

const { Meta } = Card
const [liketalent,setliketalent]=useState(false)
const [visible, setVisible] = useState(false)

    function onliketalent(){
        setliketalent(true)
    }
    function ondisliketalent(){
        setliketalent(false)
    }

return(

    <Col className="gutter-row" span={5}>
            <Card
                style={{
                    margin:'10px',
                }}
                cover={
                <img
                    alt="image"
                    src={props.src}
                    
                />
                }
                actions={[
                <SendOutlined key="sendOutlined"/>,
                liketalent === false ?<HeartOutlined onClick={() => onliketalent()} key="HeartOutlined" />  : <HeartFilled onClick={() => ondisliketalent()} key= "HeartFilled"/>,
                <ExpandAltOutlined  onClick={()=>setVisible(true)} key="ExpandAltOutlined" />
                ]} >
                <Meta/>
                <h2>{props.talentName}</h2>
                <p style={{fontWeight: "bold"}}>Formations</p>
                <p>{props.formationyear1} - {props.formationschool1} - {props.formationname1}</p>
                <p>{props.formationyear2} - {props.formationschool2} - {props.formationname2}</p>

                <p style={{fontWeight: "bold"}}>Expérience</p>
                <p>{props.experienceyear1} - {props.experiencename1}</p>
                <p>{props.experienceyear2} - {props.experiencename2}</p>
                
                
            </Card>
        <Modal
            title={props.talentName}
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={'80%'}
            style={{
              justifyContent:'center',
              textAlign:'center'
            }
            }
          >
              <Row>
                <Col style={{width:'40%'}}>
                    <Image src={props.src} />
                </Col>
                <Col style={{display:"flex", justifyContent:"center"}}>
                    <h1 style={{margin:'15px'}}>Nom:  {props.talentLastName}</h1>
                    <h1 style={{margin:'15px'}}>Prenom:  {props.talentFirstName}</h1>
                    <h2>Formation </h2>
                    <h2> </h2>


                </Col>
              </Row>
          </Modal>
        </Col>

    )
  }

  export default Cardtalent;