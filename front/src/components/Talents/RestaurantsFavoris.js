import React, {useState, useEffect} from 'react'
import '../../App.less';
import '../../index.less'
import 'antd/dist/antd.less';
import { Layout, Card, Row, Col, Modal, Rate} from 'antd';

import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, LinkOutlined } from '@ant-design/icons';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

import ListeCardsRestaurants from './ListeCardsRestaurants'
import HeaderTalent from '../HeaderTalent'

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

const { Meta } = Card;


function RestaurantsFavoris(props){

    const token = props.tokenToDisplay
    const [isSignIn, setIsSignIn] = useState(props.connectToDisplay.isSignIn)
    const [isTalent, setIsTalent] = useState(props.connectToDisplay.isTalent)
    const [isRestau, setIsRestau] = useState(props.connectToDisplay.isRestau)

    const [listedesRestaurants, setListedesRestaurants] = useState([])
    const [restoAAfficher, setRestoAAfficher] = useState({})
    const [visible, setVisible] = useState(false)
    
    function colorationCoeur(liste, whishlist){
        for(var i=0; i<liste.length; i++){
            if(whishlist.includes(liste[i])){
                liste[i].coeur = '#4B6584'
            } else {
                liste[i].coeur = '#a5b1c2'
            }
        }
    }

    useEffect(async () => {
        console.log(token)
        var rechercheListe = await fetch(`/talents/affiche-whishlist/${token}`)
        var response = await rechercheListe.json()
        colorationCoeur(response, response)
        console.log(props.adresseToDisplay)
        props.onSubmitformulaire(response)
        setListedesRestaurants(response)
        
    }, [])

    async function whishlist (id){
        var rawResponse = await fetch(`/talents/whishlist`, {
             method:'POST',
             headers: {'Content-Type':'application/x-www-form-urlencoded'},
             body: `token=${token}&restaurant=${id}`
         })
         
         var response = await rawResponse.json()
         console.log(response)
         colorationCoeur(response.liste, response.whishlist)
         setListedesRestaurants(response.liste)   
     }

     
    
    const onclick = (resto) => {
        setRestoAAfficher(resto);
        setVisible(true);
    }

    var cuisine = ' '
    if(restoAAfficher.typeOfFood){
        for(var i=0; i<restoAAfficher.typeOfFood.length; i++){
            if(i==restoAAfficher.typeOfFood.length-1){
                cuisine+= restoAAfficher.typeOfFood[i]
            } else {
                cuisine+=restoAAfficher.typeOfFood[i] + ', '
            }
        }
    }
    var clientele = ' '
    if(restoAAfficher.clientele){
        for(var i=0; i<restoAAfficher.clientele.length; i++){
            if(i==restoAAfficher.clientele.length-1){
                clientele+= restoAAfficher.clientele[i]
            } else {
                clientele+=restoAAfficher.clientele[i] + ', '
            }
        }
    }
    var ambiance = ' '
    if(restoAAfficher.typeOfRestaurant){
        for(var i=0; i<restoAAfficher.typeOfRestaurant.length; i++){
            if(i==restoAAfficher.typeOfRestaurant.length-1){
                ambiance+= restoAAfficher.typeOfRestaurant[i]
            } else {
                ambiance+=restoAAfficher.typeOfRestaurant[i] + ', '
            }
        }
    }
    if(restoAAfficher.pricing == 0){
        var prix = ' €'
    } else if(restoAAfficher.pricing == 1){
        var prix = ' €€'
    } else if(restoAAfficher.pricing == 1){
        var prix = ' €€€'
    } else {
        var prix = '--'
    }

      if(!isSignIn){
      return <Redirect to="/"/>
    }else{
    return(
    <div >
        
        <HeaderTalent keyheader='3'/>
        <Row style={{justifyContent:'center', color:'white', fontWeight:'bold', fontSize:'30px', backgroundColor:'#4B6584'}}>Mes restaurants favoris</Row>
        <Modal
            title={<p style={{color:'#4B6584', fontSize:'20px', fontWeight:'bold', margin:'0px'}}>{restoAAfficher.name}</p>}
            centered
            cancelText='Revenir à la liste'
            visible={visible}
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
                                        backgroundImage:`url(${restoAAfficher.photo})`, 
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: "cover"}}>          
                            </div>
                        } 
                        />
            </Card>
            <Card
                hoverable
                style={{ width: '100%' }}
            >
                
                <Meta   
                        //title= 
                        description={  
                            <div>
                                <Row style={{marginTop:'20px'}}>
                                    <Col span={12}>
                                        <div>
                                            <p>{restoAAfficher.adress}</p>
                                            <p style={style.textCard}><PhoneOutlined style={{marginRight:'10px'}}/>{restoAAfficher.phone}</p>
                                            <p style={style.textCard}><MailOutlined style={{marginRight:'10px'}}/> {restoAAfficher.email}</p>
                                            <p style={style.textCard}><LinkOutlined  style={{marginRight:'10px'}}/> {restoAAfficher.website}</p>
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
            
        </Modal> 

       
        <Layout style={{ backgroundColor:'white', padding: '0 24px', minHeight: 280}}>
            <Row >
                <Col span={12} >
                    <Card style={{ border:'none', width: '100%', textAlign:'center', backgroundColor:'#fed330', marginTop:'30px' }}>
                        <div>
                        <Map center={[props.adresseToDisplay.coordinates[1], props.adresseToDisplay.coordinates[0]]} zoom={12}>
                            <TileLayer
                                url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z} "
                                attribution='&copy; <a href="http://osm.org/copyright">"OpenStreet"Map</a> contributors'
                                />
                                
                                 {listedesRestaurants.map((restaurant,i)=>{ 
                                return (<Marker position={[restaurant.adresselgtlat.coordinates[1], restaurant.adresselgtlat.coordinates[0]]}>
                                    <Popup ><div onClick={()=> onclick(restaurant)}>
                                            <strong>{restaurant.name}</strong> <br/>
                                                {restaurant.adress}<br/>
                                                {restaurant.phone} / {restaurant.email} <br/>
                                                {restaurant.email}<br/>
                                            </div> 
                                    </Popup>
                                </Marker>)
                                })}
                                <Circle 
                                    center={[props.adresseToDisplay.coordinates[1], props.adresseToDisplay.coordinates[0]]}
                                    color="red" 
                                    fillcolor='red'
                                    radius={200}><Popup>Mon domicile</Popup></Circle>
                        </Map>
                        </div>
                    </Card>
                </Col>

                <Col span={12} style={{margin:'30px 0px'}}>
                    <ListeCardsRestaurants liste={listedesRestaurants} onclick={onclick} whishlist={whishlist}/>
                </Col>
            </Row>
        </Layout>
    </div>
    )
}}

const style= {
    row: {
        backgroundColor:"#4B6584", 
        justifyContent:"center", 
        textAlign:'center', 
        padding:'10px',
        color:'white',
        width:'100%',
    },
    row2:{
        paddingTop: '30px',
        backgroundColor:"#4B6584", 
        justifyContent:"center", 
        textAlign:'center', 
        color:'white',
        width:'100%',
    },
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


function mapDispatchToProps(dispatch) {
    return {
      onSubmitformulaire: function(liste) { 
          dispatch( {type: 'listerestoaafficher', liste} ) 
      }
    }
  }
  
  function mapStateToProps(state) {
    return {tokenToDisplay: state.token,connectToDisplay: state.isConnect, adresseToDisplay: state.adresse}
  }
  export default connect(
      mapStateToProps, 
      mapDispatchToProps
  )(RestaurantsFavoris);