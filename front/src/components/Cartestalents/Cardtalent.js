import React, {useState,Text} from 'react'
import 'antd/dist/antd.less';


import {Col,Card,Modal, Image, Row,Rate, List } from 'antd';
import {ExpandAltOutlined,SendOutlined,HeartOutlined,HeartFilled,StarOutlined,StarFilled
  } from "@ant-design/icons"

function Cardtalent(props){

const { Meta } = Card
const [liketalent,setliketalent]=useState(false)
const [visible, setVisible] = useState(false)



/// Moyenne pour chaque critère:


    function onliketalent(){
        setliketalent(true)
    }
    function ondisliketalent(){
        setliketalent(false)
    }

    
var talent=(props.talent)
console.log('talent',talent)
var nom=(talent.lastName).toUpperCase()
  
var sortedexperience=props.sortedexperience
console.log(sortedexperience);
var listexperience= sortedexperience.map((experience,i) => {
    return(<p>{experience.startingDate} - {experience.endingDate} - {experience.firm}- {experience.job} - {experience.city}</p>)
})


var sortedformation=props.sortedformation
var listformation= sortedformation.map((formation,i) => {
    return(<p>{formation.year} - {formation.city} - {formation.school}</p>)
})



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
            title={talent.firstName}
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
                <Col style={{width:'40%'}} span={10}>
                    <Image src={talent.src} />
                </Col>
                <Col style={{display:"flex", flexDirection:'column',alignItems:"start"}} span={14}>
                    <Row style={{display:"flex", flexDirection:'column',alignItems:"start"}}>
                        <h1 style={{marginLeft:'15px', marginBottom:'2px'}}>Nom: {nom}</h1>
                        <h1 style={{marginLeft:'15px',marginBottom:'2px'}}>Prenom:  {talent.firstName}</h1>
                        <h2 style={{marginLeft:'15px'}}>Adresse:  {talent.adresse}</h2>
                    </Row>
                        <h2 style={{marginLeft:'15px'}}>Formation: </h2>
                        
                    <Row style={{display:"flex", flexDirection:'column',alignItems:"start", marginLeft:'15px'}}>
                    {listformation}
                    </Row> 

                        <h2 style={{marginLeft:'15px'}}>Experience: </h2>
                   <Row style={{display:"flex", flexDirection:'column',alignItems:"start", marginLeft:'15px'}}>
                       {listexperience}
                   
                    </Row> 
                    <Row>
                        <h2 style={{marginLeft:'15px'}}>Note des précédents employeurs: </h2>
                    </Row>
                    <Row tyle={{display:"flex", flexDirection:'row',alignItems:"start"}}>
                    <Col style={{display:"flex", flexDirection:'column',alignItems:"start"}}>
                        <h3 style={{marginLeft:'20px'}}>Ponctualité : </h3>
                        <h3 style={{marginLeft:'20px'}}>Rigueur : </h3>
                        <h3 style={{marginLeft:'20px'}}>Gestion du stress : </h3>
                        <h3 style={{marginLeft:'20px'}}>Amabilité : </h3>
                        <h3 style={{marginLeft:'20px'}}>Efficacité : </h3>
                    </Col>
                    <Col style={{display:"flex", flexDirection:'column',alignItems:"start"}}>
                        <Rate disabled defaultValue={2} />
                        <Rate disabled defaultValue={2} />
                        <Rate disabled defaultValue={2} />
                        <Rate disabled defaultValue={2} />
                        <Rate disabled defaultValue={2} />
                    </Col>
                    </Row>

                
                        <Col style={{display:"flex", flexDirection:'row', alignItems:"start", justifyContent:"center"}}>
                        <h4 style={{marginLeft:'15px'}}>Téléphone: {talent.phone} </h4>
                      
                        <h4 style={{marginLeft:'15px'}}>E-mail: {talent.email} </h4>
                        </Col>

                </Col>
            </Row>
          </Modal>
        </Col>

    )
  }

  export default Cardtalent;