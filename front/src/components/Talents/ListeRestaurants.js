import React, {useState, useEffect} from 'react'
import '../../App.less';
import 'antd/dist/antd.less';
import ListeCardsRestaurants from './ListeCardsRestaurants'
import { Layout, Card, Row, Button, Checkbox, Col, Select, Form, Modal, Rate} from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, LinkOutlined } from '@ant-design/icons';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import HeaderTalent from '../HeaderTalent'
import {connect} from 'react-redux';
const { Meta } = Card;
const { Option } = Select
const listePrix = [0, 1, 2]
const listeCuisines = ['francaise', 'italienne', 'japonaise', 'healthy' ]
const listeTypes = ['touristique', 'quartier', 'jeune', 'agée']
const listeAmbiances = ['calme', 'animé', 'branché', 'sobre']

const token = 'XjNRAvwcFWfdLhtF8GCViUMoba4W3bTZ'

const zoneFrance= [
    [ -5.3173828125, 48.458124202908934 ],
    [ 2.1313476562500004, 51.26170001449684 ],
    [ 8.811035156250002, 48.90783374365477 ],
    [ 7.998046875000001, 43.70709714273101 ],
    [ 3.2080078125000004, 42.228008913641865 ],
    [ 1.4941406250000002, 42.293056273848215 ],
    [ -2.0214843750000004, 43.06838615478111 ],
    [ -5.3173828125, 48.458124202908934 ]
  ]

function ListeRestaurants(props){
    const [zone, setZone] = useState(zoneFrance)
    const [listedesRestaurants, setListedesRestaurants] = useState([])
    const [ambianceCochee, setAmbiancecochee] = useState(listeAmbiances)
    const [prixCoche, setPrixcoche] = useState(listePrix)
    const [typeCuisinecochee, setTypeCuisinecochee] = useState(listeCuisines)
    const [typeRestaurantcochee, setTypeRestaurantcochee] = useState(listeTypes)
    const[restoAAfficher, setRestoAAfficher] = useState({})
    const[visible, setVisible] = useState(false)
    
    function colorationCoeur(liste, whishlist){
        for(var i=0; i<liste.length; i++){
            if(whishlist.includes(liste[i]._id)){
                liste[i].coeur = '#4B6584'
            } else {
                liste[i].coeur = '#a5b1c2'
            }
        }
    }

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

     useEffect(() => {
        async function cherche(){
            if(ambianceCochee==[]){
                setAmbiancecochee(listeAmbiances)
            }
            if(prixCoche ==[]){
                setPrixcoche(listePrix)
            }
            if(listeCuisines == []){
                setTypeCuisinecochee(listeCuisines)
            }
            if(typeRestaurantcochee == []){
                setTypeRestaurantcochee(listeTypes)
            }
            var criteres = JSON.stringify({ambiance: ambianceCochee, cuisine: typeCuisinecochee, prix: prixCoche, type:typeRestaurantcochee, zone:zone})
            var rechercheListe = await fetch(`/talents/recherche-liste-restaurants`, {
                method:'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `token=${token}&restaurant=${criteres}`
            })
            var response = await rechercheListe.json()
            colorationCoeur(response.liste, response.whishlist)
            console.log(response.liste)
            props.onSubmitformulaire(response.liste)
            setListedesRestaurants(response.liste)
        }
        cherche()
    }, [ambianceCochee,typeCuisinecochee,typeRestaurantcochee, prixCoche, zone])
    
    const onclick = (resto) => {
        setRestoAAfficher(resto);
        setVisible(true);
    }

    function onChange(e) {
    console.log(`checked = ${e.target.checked}`)
    
    if(!e.target.cheked){
        // setZone à changer pour prendre infos du store concernant zone de recherche du talent
        setZone([
            [ 2.306442260742188, 48.8538656722782 ],
            [ 2.346267700195313, 48.89315686419009 ],
            [ 2.4183654785156254, 48.86832119264031 ],
            [ 2.401199340820313, 48.82675031807337 ],
            [ 2.324295043945313, 48.82494210585485 ],
            [ 2.306442260742188, 48.8538656722782 ]
            ])
        } else {
            setZone(zoneFrance)
        };
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
      
    return(
    <div >
        
        <HeaderTalent/>
        { <Modal
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
            
          </Modal> }

        <Row style={style.row2}>
            <Col span={6}>
                Type d'ambiance :
                <Form.Item >
                    <Select 
                        onChange={(e)=>{setAmbiancecochee(e)}}
                        style={{width:'80%'}}
                        mode='multiple'
                        name={'ambiance'}
                        className="basic-multi-select"
                        classNamePrefix="select">
                    {listeAmbiances.map((e, i)=>{
                        return (<Option key={e + i} value={e}>{e}</Option>)
                    })}
                
                    </Select>
                </Form.Item>
            </Col>

            <Col span={6}>
                Gamme de prix :
                <Form.Item >
                        <Select 
                            onChange={(e)=>setPrixcoche(e)}
                            style={{width:'80%'}}
                            mode='multiple'
                            name={'prix'}
                            className="basic-multi-select"
                            classNamePrefix="select">
                            <Option value={0}>€</Option>
                            <Option value={1}>€€</Option>
                            <Option value={2}>€€€</Option>
                    
                        </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                Type de cuisine :
                <Form.Item >
                    <Select 
                        onChange={(e)=>setTypeCuisinecochee(e)}
                        style={{width:'80%'}}
                        mode='multiple'
                        name={'cuisine'}
                        className="basic-multi-select"
                        classNamePrefix="select">
                    {listeCuisines.map((e, i)=>{
                        return (<Option key={e + i} value={e}>{e}</Option>)
                    })}
                
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                Type de restaurant :
                <Form.Item >
                    <Select 
                        onChange={(e)=>setTypeRestaurantcochee(e)}
                        style={{width:'80%'}}
                        mode='multiple'
                        name={'clientele'}
                        className="basic-multi-select"
                        classNamePrefix="select">
                    {listeTypes.map((e, i)=>{
                        return (<Option key={e + i} value={e}>{e}</Option>)
                    })}
                
                    </Select>
                </Form.Item>
            </Col>
        </Row> 

        <Row style={style.row} >
            
            <Button onClick={()=>{{ 
                                    setTypeRestaurantcochee(listeTypes); 
                                    setAmbiancecochee(listeAmbiances); 
                                    setPrixcoche(listePrix);
                                    setTypeCuisinecochee(listeCuisines);
                                    setZone(zoneFrance);
                                }}
                            } 
                            type="primary"
                            style={{marginLeft:'30px'}}> Afficher tous les restaurants </Button>
        </Row>
         
        <Row style={style.row}>
            <Checkbox style={{color:'white'}} onChange={onChange}>Afficher seulement les restaurants dans ma zone de recherche</Checkbox>
        </Row>

        <Layout style={{ backgroundColor:'white', padding: '0 24px', minHeight: 280}}>
            <Row >
                <Col span={12} >
                    <Card style={{ border:'none', width: '100%', textAlign:'center', backgroundColor:'#fed330', marginTop:'30px' }}>
                        <div>
                        <Map center={[48.88, 2.33]} zoom={12} onClick={(e) => { console.log(e)}}>
                            {/* remplacer par latlng user via props/store */}
                            <TileLayer
                                url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z} "
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                
                                 {listedesRestaurants.map((restaurant,i)=>{ 
                                return (<Marker position={[restaurant.adresselgtlat[1], restaurant.adresselgtlat[0]]}>
                                    <Popup ><div onClick={()=> onclick(restaurant)}>
                                            <strong>{restaurant.name}</strong> <br/>
                                                {restaurant.adress}<br/>
                                                {restaurant.phone} / {restaurant.email} <br/>
                                                {restaurant.email}<br/>
                                            </div> 
                                    </Popup>
                                </Marker>)
                                })}

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
}

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
  
  export default connect(
      null, 
      mapDispatchToProps
  )(ListeRestaurants);