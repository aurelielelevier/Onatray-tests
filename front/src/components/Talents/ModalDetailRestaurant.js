import React, { useState } from 'react'
import 'antd/dist/antd.less';
import '../../App.less';
import {Button, Modal, Card, Rate, Row, Col, Image} from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, LinkOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import {Link} from 'react-router-dom';

const { Meta } = Card;
const style= {
    textCard:{
        color:"#4B6584",
        margin:'0px 20px'
    },
    textCard2:{
        color:"#4B6584",
        margin:'0px',
        fontSize:'20px',
        margin:'0px 20px'
    }
}
function ModalDetailRestaurant(props){
    var cuisine = ' '
    if(props.restaurant.typeOfFood){
        for(var i=0; i<props.restaurant.typeOfFood.length; i++){
            if(i==props.restaurant.typeOfFood.length-1){
                cuisine+= props.restaurant.typeOfFood[i]
            } else {
                cuisine+=props.restaurant.typeOfFood[i] + ', '
            }
        }
    }
    var clientele = ' '
    if(props.restaurant.clientele){
        for(var i=0; i<props.restaurant.clientele.length; i++){
            if(i==props.restaurant.clientele.length-1){
                clientele+= props.restaurant.clientele[i]
            } else {
                clientele+=props.restaurant.clientele[i] + ', '
            }
        }
    }
    var ambiance = ' '
    if(props.restaurant.typeOfRestaurant){
        for(var i=0; i<props.restaurant.typeOfRestaurant.length; i++){
            if(i==props.restaurant.typeOfRestaurant.length-1){
                ambiance+= props.restaurant.typeOfRestaurant[i]
            } else {
                ambiance+=props.restaurant.typeOfRestaurant[i] + ', '
            }
        }
    }
    if(props.restaurant.pricing == 0){
        var prix = ' €'
    } else if(props.restaurant.pricing == 1){
        var prix = ' €€'
    } else if(props.restaurant.pricing == 1){
        var prix = ' €€€'
    } else {
        var prix = '--'
    }
    
    return(
        <Modal
            title={props.restaurant.name}
            centered
            cancelText='Revenir à la liste'
            visible={true}
            onOk={() => props.handleClickParent(false)}
            onCancel={() => props.handleClickParent(false)}
            width={800}
            style={{
              justifyContent:'center',
              textAlign:'center',
              display: 'inline-flex'
            }
            }
          >
                
              <Card
                hoverable
                style={{ width: '80vw' }}
                // cover={<img alt="example" src="https://cdn.pixabay.com/photo/2016/11/29/12/54/bar-1869656_1280.jpg" />}
            >
                
                <Meta   
                        description={  
                            <div style={{height:'300px', 
                                        backgroundImage:`url("https://cdn.pixabay.com/photo/2016/11/29/12/54/bar-1869656_1280.jpg")`, 
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: "cover"}}>          
                            </div>
                        } 
                        />
            </Card>
            <Card
                hoverable
                style={{ width: '100%' }}
                // cover={<img alt="example" src="https://cdn.pixabay.com/photo/2016/11/29/12/54/bar-1869656_1280.jpg" />}
            >
                
                <Meta   
                        //title= 
                        description={  
                            <div>
                                <Row style={{marginTop:'20px'}}>
                                    <Col span={12}>
                                        <div>
                                            <p>{props.restaurant.adress}</p>
                                            <p style={style.textCard}><PhoneOutlined style={{marginRight:'10px'}}/>{props.restaurant.phone}</p>
                                            <p style={style.textCard}><MailOutlined style={{marginRight:'10px'}}/> {props.restaurant.email}</p>
                                            <p style={style.textCard}><LinkOutlined  style={{marginRight:'10px'}}/> {props.restaurant.website}</p>
                                            <p style={style.textCard2}><FacebookOutlined /> <InstagramOutlined /></p>
                                            
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        
                                        <p style={style.textCard}><strong>Cuisine : </strong>{cuisine}</p> 
                                        <p style={style.textCard}><strong>Gamme de prix : </strong>{prix}</p> 
                                        <p style={style.textCard}><strong>Clientèle : </strong>{clientele}</p> 
                                        <p style={style.textCard}><strong>Ambiance : </strong>{ambiance}</p> 
                                        <p style={{color:"#4B6584", marginTop:'20px', fontWeight:"bold"}}>Note moyenne attribuée par nos talents :</p> 
                                        <p style={style.textCard}><Rate disabled defaultValue={2} />2 (10 votes)</p>
                                    </Col>
                                </Row>
                            </div>
                        } 
                        />
            </Card>
            
            
            <Row style={{justifyContent:'center', marginTop:'20px'}}>
                <p style={style.textCard2}><HeartOutlined style={{color:'red', fontSize:'30px', marginRight:'20px'}}/>J'ajoute ce restaurant en favori !</p>
            </Row>
            
          </Modal>
    )
}

export default ModalDetailRestaurant