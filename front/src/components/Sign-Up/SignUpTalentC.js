import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

import '../../App.less';
import 'antd/dist/antd.less';
import '../../index.less';

import { Layout, Card, Row, Col, Button, AutoComplete, Steps} from 'antd';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

import HeaderScreen from '../Header';


const { Step } = Steps;
const { Content } = Layout;

function SignUpTalentC(props){
    
    const [polygone, setPolygone] = useState([])
    const [polygoneinverse, setPolygoneinverse] = useState([])
    const[adresse, setAdresse] = useState('')
    const[adressesProposees, setAdressesProposees] = useState('')
    const [latlngDomicile, setLatlngDomicile] = useState({coordinates: [ 2.3488, 48.8534]})

    const token = props.tokenToDisplay

    useEffect(() => {
      // mise en forme du texte saisi pour pouvoir être utilisé avec l'API 
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
          // Recherche d'une adresse existante sur l'API data.gouv.fr et mise à jour des 
          // coordonnées lat lng pour le point sur la carte
          var rawResponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${requete}`)
          var response = await rawResponse.json()
          var liste = []
          for(var i=0; i<response.features.length; i++){
            liste.push({value : response.features[i].properties.label})
          }
          setAdressesProposees(liste)
          if(response.features[0]){
            setLatlngDomicile(response.features[0].geometry)
          }
        } 
        autocompletion()
      }, [adresse])

      async function envoiPolygone(){
        
        // Envoi du tableau des points du périmètre défini vers le backend pour un enregistrement en base de données 
        var listePoints = JSON.stringify(polygoneinverse)
        console.log(polygoneinverse)
         await fetch('/talents/envoi-secteur', {
          method:'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`token=${token}&liste=${listePoints}`
        })
        props.onSendZone(listePoints)
      }

      async function envoiAdresse(){
        // Envoi de l'adresse vers le backend pour un enregistrement en base de données 
        props.onSubmitAdress(latlngDomicile)
        console.log('TEST latlngDomicile', latlngDomicile)
        var lnglat = JSON.stringify(latlngDomicile)
        await fetch(`/talents/envoi-adresse`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`token=${token}&adresse=${adresse}&lnglat=${lnglat}`
        })
      }
      
    return(
        <div >
          <HeaderScreen/>

            <Row>
                <Col offset={3} span={18}>
                    <Steps current={2} style={{paddingTop:40}}>
                        <Step title="Créer un compte" />
                        <Step title="Renseigner vos informations" />
                        <Step title="Où voulez vous travailler ?" />
                        {/* <Step title="Récapitulatif"/> */}
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
                <Link to={'/talent-mon-profil'}><Button type='primary' onClick={() => {envoiPolygone(); envoiAdresse()} }> Valider et poursuivre</Button></Link>
            </Row>
            
            <Row>
              
                <Content style={{ padding: '0 24px', minHeight: 280}}>

                    <Card style={{ width: '100%', textAlign:'center', backgroundColor:'#fed330', marginTop:'30px' }}>
                      <div>
                        <Map center={[latlngDomicile.coordinates[1], latlngDomicile.coordinates[0]]} zoom={12} onClick={(e) => {setPolygone([...polygone, [e.latlng.lat, e.latlng.lng]]); setPolygoneinverse([...polygoneinverse, [e.latlng.lng, e.latlng.lat]])}}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                
                            <Polygon positions={polygone} color="red" />
                            <Marker position={[latlngDomicile.coordinates[1], latlngDomicile.coordinates[0]]}>
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
  
function mapDispatchToProps(dispatch) {
  return {
  onSubmitAdress: function(pointAdresse){
    dispatch({type:'AddAdress', adresse:pointAdresse})
  },
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SignUpTalentC);