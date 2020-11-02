import React, { useState, useEffect} from 'react'
import 'antd/dist/antd.less';
import '../../App.less';
import {Button, Modal, Card, Rate, Row, Col, Image} from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, LinkOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

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
    
    const [restaurant, setRestaurant] = useState(props.resto)
    const [visible, setVisible] = useState(props.visible)

    var cuisine = ' '
    if(restaurant.typeOfFood){
        for(var i=0; i<restaurant.typeOfFood.length; i++){
            if(i==restaurant.typeOfFood.length-1){
                cuisine+= restaurant.typeOfFood[i]
            } else {
                cuisine+=restaurant.typeOfFood[i] + ', '
            }
        }
    }
    var clientele = ' '
    if(restaurant.clientele){
        for(var i=0; i<restaurant.clientele.length; i++){
            if(i==restaurant.clientele.length-1){
                clientele+= restaurant.clientele[i]
            } else {
                clientele+=restaurant.clientele[i] + ', '
            }
        }
    }
    var ambiance = ' '
    if(restaurant.typeOfRestaurant){
        for(var i=0; i<props.restaurant.typeOfRestaurant.length; i++){
            if(i==restaurant.typeOfRestaurant.length-1){
                ambiance+= restaurant.typeOfRestaurant[i]
            } else {
                ambiance+=restaurant.typeOfRestaurant[i] + ', '
            }
        }
    }
    if(restaurant.pricing == 0){
        var prix = ' €'
    } else if(restaurant.pricing == 1){
        var prix = ' €€'
    } else if(restaurant.pricing == 1){
        var prix = ' €€€'
    } else {
        var prix = '--'
    }
    
    
    return( 
        <Modal
            title={restaurant.name}
            centered
            cancelText='Revenir à la liste'
            visible={false}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
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
                                        backgroundImage:`url(${restaurant.siret})`, 
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
                                            <p>{restaurant.adress}</p>
                                            <p style={style.textCard}><PhoneOutlined style={{marginRight:'10px'}}/>{restaurant.phone}</p>
                                            <p style={style.textCard}><MailOutlined style={{marginRight:'10px'}}/> {restaurant.email}</p>
                                            <p style={style.textCard}><LinkOutlined  style={{marginRight:'10px'}}/> {restaurant.website}</p>
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


function mapStateToProps(state) {
    return { listeToDisplay : state.listerestoaafficher, restoaafficher: state.restoaafficher}
  }
  
export default connect(
    mapStateToProps, 
    null
)(ModalDetailRestaurant);
