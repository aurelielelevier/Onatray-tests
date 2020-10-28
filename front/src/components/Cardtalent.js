import React, {useState} from 'react'
import 'antd/dist/antd.less';
import '../App.less'
import {Col,Card } from 'antd';
import {ExpandAltOutlined,SendOutlined,HeartOutlined,HeartFilled
  } from "@ant-design/icons"

function Cardtalent(props){

const { Meta } = Card
const [liketalent,setliketalent]=useState(false)

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
                <ExpandAltOutlined key="ExpandAltOutlined" />
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
        </Col>
    )
  }

  export default Cardtalent;