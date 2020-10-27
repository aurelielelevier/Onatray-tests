import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import '../../App.less';
import 'antd/dist/antd.less';
import '../../index.less';

import { Layout, Card, Row, Col, Button, AutoComplete, Steps} from 'antd';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

import HeaderScreen from '../Header';
import L from 'leaflet';
const token = 'Gi2AoHScmfEI2wIiAnDdsCK6plqfww1c'
// mettre à jour le token quand sera envoyé au store au moment du signin et signup

const { Step } = Steps;
const { Content } = Layout;

function SignUpTalentC(props){
  console.log(props.tokenToDisplay)
    const [polygone, setPolygone] = useState([])
    const [polygoneinverse, setPolygoneinverse] = useState([])
    const[markers, setMarkers] = useState([])
    const[adresse, setAdresse] = useState('')
    const[adressesProposees, setAdressesProposees] = useState('')
    const [latlngDomicile, setLatlngDomicile] = useState([48.8534, 2.3488])

    useEffect(() => {
        let tableauAdresse = adresse.split(' ')
        let requete = ''
        for(var i=0; i<tableauAdresse.length; i++){
          if(i===tableauAdresse.length-1){
            requete += tableauAdresse[i]
          } else {
            requete += tableauAdresse[i] + '+'
          }
        }
        async function autocompletion(){
          var rawResponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${requete}`)
          var response = await rawResponse.json()
          console.log(response, 'response')
          var liste = []
          for(var i=0; i<response.features.length; i++){
            liste.push({value : response.features[i].properties.label})
          }
          setAdressesProposees(liste)
          if(response.features[0]){
            setLatlngDomicile([response.features[0].geometry.coordinates[1], response.features[0].geometry.coordinates[0]])
          }
        } 
        autocompletion()
      }, [adresse])

      async function envoiPolygone(){
        var listePoints = JSON.stringify(polygoneinverse)
        var rawResponse = await fetch('/talents/envoi-secteur', {
          method:'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`token=${token}&liste=${listePoints}`
        })
        // var response = await rawResponse.json();
        // var responsecorrigee = response.map(point => [point.adresseLatLng[1], point.adresseLatLng[0]])
        // setMarkers(responsecorrigee)
      }

      var redIcon = L.icon({
        iconUrl: '../../../images/point-carte-rouge.png',
        iconSize: [30, 50],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      }); 
      
    return(
        <div >
        
        <HeaderScreen/>
        <Row>
                
                <Col offset={3} span={18}>
                    <Steps current={2} style={{paddingTop:40}}>
                        <Step title="Créer un compte" />
                        <Step title="Renseigner vos informations" />
                        <Step title="Où voulez vous travailler ?" />
                        <Step title="Récapitulatif"/>
                    </Steps>
                </Col>
                <Col span={4}></Col>
            </Row>
        <Row style={{ marginTop: '50px', textAlign:'center', justifyContent:'center'}}>
            <h3>Afin de définir vos critères de recherche, commencez par renseigner votre adresse :</h3>
        </Row>

        <Row style={{justifyContent:'center'}}>
            <AutoComplete
                        style={{ width: 400 }}
                        options={adressesProposees}
                        placeholder="Entrez votre adresse"
                        filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onChange={(e)=>{setAdresse(e)}}
                        value={adresse}
                    />
        </Row>

        <Row style={{justifyContent:'center', marginTop:'30px'}}>
            <h3>
            Ensuite, dessinez sur la carte le périmètre dans lequel vous seriez intéressé 
            pour recevoir des offres de travail, n'oubliez pas de valider !</h3>
            <p>(cliquez plusieurs fois pour dessiner les points de contours de votre choix)</p>
        
        </Row>

        <Row style={{justifyContent:'center'}}>
            <Button type='primary' onClick={(e) => {setPolygone([]); setPolygoneinverse([])}}> Recommencer</Button>
                    ou 
             <Button type='primary' onClick={(e) => envoiPolygone()}> Valider le périmètre</Button>
        </Row>
        
        <Row>
           
            <Content style={{ padding: '0 24px', minHeight: 280}}>

                <Card style={{ width: '100%', textAlign:'center', backgroundColor:'#fed330', marginTop:'30px' }}>
                <div>
                    <Map center={latlngDomicile} zoom={12} onClick={(e) => {setPolygone([...polygone, [e.latlng.lat, e.latlng.lng]]); setPolygoneinverse([...polygoneinverse, [e.latlng.lng, e.latlng.lat]]); console.log(adresse)}}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            
                            {/* {markers.map((user,i)=>{ 
                            return (<Marker position={user}></Marker>)
                            })} */}
                        <Polygon positions={polygone} color="red" />
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
function mapStateToProps(state) {
  return { tokenToDisplay: state.token }
}
  
export default connect(
  mapStateToProps, 
  null
)(SignUpTalentC);