import React, {useState, useEffect} from 'react'
import '../../App.less';
import 'antd/dist/antd.less';
import { Layout, Card, Row, Button, Checkbox, Col, Select, Form } from 'antd';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import HeaderScreen from '../Header';
import HeaderTalent from '../HeaderTalent'
import L from 'leaflet';

const { Content } = Layout;
const { Option } = Select




function ListeRestaurants(){
    
    // il faudra faire une requette en BDD au chargement pour savoir si déjà défini par le Talent et que le 
    // périmètre soir dessiné au chargement et puisse être modifié
    const [polygoneinverse, setPolygoneinverse] = useState([])
    const[markers, setMarkers] = useState([])
    const[adresse, setAdresse] = useState('')
    const[adressesProposees, setAdressesProposees] = useState('')
    const [latlngDomicile, setLatlngDomicile] = useState([48.8534, 2.3488])
    const [typePrix, setTypePrix] = useState([])
    const [typeCuisine, setTypeCuisine] = useState([])
    const [typeAmbiance, setAmbiance] = useState([])

    const Submitform = values => {
        console.log('Received values of form:', values);
        console.log(typeAmbiance)
        console.log(typeCuisine)
        };
    
    useEffect(() => {
       // fecth get pour obtenir le latlng de l'adresse et le polygone défini par l'utilisateur
       // gérer l'absence de périmètre défini

      }, [])

      async function envoiPolygone(){
        var listePoints = await JSON.stringify(polygoneinverse)
        var rawResponse = await fetch('/envoi-secteur', {
          method:'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`id=1&liste=${listePoints}`
          // Ajouter id du talent à la requête POST
        })
        var response = await rawResponse.json();
        var responsecorrigee = response.map(point => [point.adresseLatLng[1], point.adresseLatLng[0]])
        setMarkers(responsecorrigee)
      }

     
      
    return(
        <div >
        
        <HeaderTalent/>

            <Row style={{backgroundColor:"#4B6584", height:"150px", display:"flex", justifyContent:"center", alignItems:'center', marginBottom:"15px"}}>
                
                <Col span={18} >
                    <Form.Item label="Type de clientele : ">
                        <Select 
                            onChange={(e)=>setAmbiance(e)}
                            style={{width:'80%'}}
                            mode='multiple'
                            name={'clientele'}
                            className="basic-multi-select"
                            classNamePrefix="select">
                        <Option value='touristique'>Touristique</Option>
                        <Option value='quartier'>De Quartier</Option>
                        <Option value='jeune'>Jeune</Option>
                        <Option value='agée'>Agée</Option>
                    
                        </Select>
                    </Form.Item>

                    <Form.Item label="Type de clientele : ">
                        <Select 
                            onChange={(e)=>setTypeCuisine(e)}
                            style={{width:'80%'}}
                            mode='multiple'
                            name={'clientele'}
                            className="basic-multi-select"
                            classNamePrefix="select">
                        <Option value='touristique'>Touristique</Option>
                        <Option value='quartier'>De Quartier</Option>
                        <Option value='jeune'>Jeune</Option>
                        <Option value='agée'>Agée</Option>
                    
                        </Select>
                    </Form.Item>

                <Button onClick={Submitform()} type="primary" > Rechercher</Button>
                </Col>
            </Row>


        <Row>
           
            <Content style={{ padding: '0 24px', minHeight: 280}}>

                <Card style={{ width: '100%', textAlign:'center', backgroundColor:'#fed330', marginTop:'30px' }}>
                <div>
                    <Map center={latlngDomicile} zoom={12} onClick={(e) => { console.log(e)}}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            
                            {/* {markers.map((user,i)=>{ 
                            return (<Marker position={user}></Marker>)
                            })} */}

                        <Marker position={latlngDomicile}>
                            <Popup> Mon domicile <br/></Popup>
                        </Marker>
                    </Map>
                    </div>
                </Card>
            </Content>
        </Row>
        </div>
    )
}

export default ListeRestaurants;