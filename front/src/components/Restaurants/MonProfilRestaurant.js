import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import 'antd/dist/antd.less';
import '../../App.less';
import HeaderRestaurant from '../HeaderRestaurant';
import {Card, Rate, Row, Col} from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, LinkOutlined, EditOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'

function MonProfilRestaurant(props) {
    // var restaurant = props.profilToDisplay
    const[restaurant, setRestaurant]= useState({})


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
        },
        edit:{
            color:"#4B6584",
            margin:'0px',
            fontSize:'20px',
            margin:'0px 20px', 
            justifyContent:'center'
        }
    }

    useEffect(() => {
        console.log(props.tokenToDisplay)
        async function cherche() {
            var chercheProfil = await fetch(`/restaurants/profil/${props.tokenToDisplay}`);
            var profil = await chercheProfil.json()
            setRestaurant(profil)
        }
        cherche()
         //props.onChargeProfil(restaurant)
         console.log(restaurant, 'PROFIL PAGE PROFIL')
    },[])
    

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
        for(var i=0; i<restaurant.typeOfRestaurant.length; i++){
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
        <div>
          <HeaderRestaurant keyheader='5'/>

          <div style={{ textAlign:'center', justifyContents:'center'}}>
          <div style={{height:'300px', 
                        backgroundImage:`url(${restaurant.photo})`, 
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: "cover"}}>          
        </div>
           
            
            <Card
                hoverable
                style={{ width: '100%' }}
            >
                
                <Meta   
                        title= {<h1>{restaurant.name}</h1>}
                        description={  
                            <div>
                                <Row style={{marginTop:'20px'}}>
                                    
                                    <Col span={8}>
                                        <div>
                                            <p>Coordonnées :</p>
                                            <p style={style.textCard}>{restaurant.adress}</p>
                                            <p style={style.textCard}><PhoneOutlined style={{marginRight:'10px'}}/>{restaurant.phone}</p>
                                            <p style={style.textCard}><MailOutlined style={{marginRight:'10px'}}/> {restaurant.email}</p>
                                            <p style={style.textCard}><LinkOutlined  style={{marginRight:'10px'}}/> {restaurant.website}</p>
                                            <p style={style.textCard2}><FacebookOutlined /> <InstagramOutlined /></p>
                                            
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <p>Détails :</p>
                                        <p style={style.textCard}><strong>Cuisine : </strong>{cuisine}</p> 
                                        <p style={style.textCard}><strong>Gamme de prix : </strong>{prix}</p> 
                                        <p style={style.textCard}><strong>Clientèle : </strong>{clientele}</p> 
                                        <p style={style.textCard}><strong>Ambiance : </strong>{ambiance}</p> 
                                    </Col>
                                    <Col span={8}>
                                        <p style={{color:"#4B6584", marginTop:'20px', fontWeight:"bold"}}>Votre note moyenne attribuée par nos talents :</p> 
                                        <p style={style.textCard}><Rate disabled defaultValue={2} />2 (10 votes)</p>
                                    </Col>
                                </Row>
                                <Row style={style.edit}><Link to='/signUpRestauB'><EditOutlined/></Link></Row>
                                
                            </div>
                        } 
                        />
            </Card>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {tokenToDisplay: state.token}
    }

export default connect(
    mapStateToProps, 
    null
)(MonProfilRestaurant);