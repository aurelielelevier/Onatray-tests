import React, {useState, useEffect} from 'react'
import '../../App.less';
import 'antd/dist/antd.less';
import ListeCardsRestaurants from './ListeCardsRestaurants'
import MapRestaurant from './MapRestaurants'
import { Layout, Card, Row, Button, Checkbox, Col, Select, Form } from 'antd';
import HeaderTalent from '../HeaderTalent'


const { Option } = Select
const listePrix = ['€', '€€', '€€€']
const listeCuisines = ['Française', 'Italienne', 'Japonaise', 'Healthy' ]
const listeTypes = ['Touristique', 'De Quartier', 'Jeune', 'Agée']
const listeAmbiances = ['Calme', 'Animé', 'Branché', 'Sobre']


function ListeRestaurants(){
    
    // il faudra faire une requette en BDD au chargement pour savoir si déjà défini par le Talent et que le 
    // périmètre soir dessiné au chargement et puisse être modifié
    const [polygoneinverse, setPolygoneinverse] = useState([])
    const[markers, setMarkers] = useState([])
    const[adresse, setAdresse] = useState('')
    const[adressesProposees, setAdressesProposees] = useState('')
    const [latlngDomicile, setLatlngDomicile] = useState([48.8534, 2.3488])
    const [typePrix, setPrix] = useState(listePrix)
    const [typeCuisine, setTypeCuisine] = useState(listeCuisines)
    const [typeAmbiance, setAmbiance] = useState(listeAmbiances)
    const [typeRestaurant, setTypeRestaurant] = useState(listeTypes)

    const Submitform = values => {
        console.log('Received values of form:', values);
        console.log(typeAmbiance)
        console.log(typeCuisine)
        console.log(typePrix)
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

      function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }

    return(
    <div >
        
        <HeaderTalent/>

        <Row style={style.row2}>
            <Col span={6}>
                Type d'ambiance :
                <Form.Item >
                    <Select 
                        onChange={(e)=>setAmbiance(e)}
                        style={{width:'80%'}}
                        mode='multiple'
                        name={'ambiance'}
                        className="basic-multi-select"
                        classNamePrefix="select">
                    {listeAmbiances.map((e, i)=>{
                        return (<Option value={e}>{e}</Option>)
                    })}
                
                    </Select>
                </Form.Item>
            </Col>

            <Col span={6}>
                Gamme de prix :
                <Form.Item >
                        <Select 
                            onChange={(e)=>setPrix(e)}
                            style={{width:'80%'}}
                            mode='multiple'
                            name={'prix'}
                            className="basic-multi-select"
                            classNamePrefix="select">
                        {listePrix.map((e, i)=>{
                            return (<Option value={e}>{e}</Option>)
                        })}
                    
                        </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                Type de cuisine :
                <Form.Item >
                    <Select 
                        onChange={(e)=>setTypeCuisine(e)}
                        style={{width:'80%'}}
                        mode='multiple'
                        name={'cuisine'}
                        className="basic-multi-select"
                        classNamePrefix="select">
                    {listeCuisines.map((e, i)=>{
                        return (<Option value={e}>{e}</Option>)
                    })}
                
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                Type de restaurant :
                <Form.Item >
                    <Select 
                        onChange={(e)=>setTypeRestaurant(e)}
                        style={{width:'80%'}}
                        mode='multiple'
                        name={'clientele'}
                        className="basic-multi-select"
                        classNamePrefix="select">
                    {listeTypes.map((e, i)=>{
                        return (<Option value={e}>{e}</Option>)
                    })}
                
                    </Select>
                </Form.Item>
            </Col>
        </Row> 

        <Row style={style.row} >
            <Button onClick={()=> Submitform()} type="primary" style={{marginRight:'30px'}}> Rechercher</Button>
            ou
            <Button onClick={()=>{{ setTypeRestaurant(listeTypes); 
                                    setAmbiance(listeAmbiances); 
                                    setPrix(listePrix)
                                    setTypeCuisine(listeTypes)}}
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
                        <MapRestaurant/>
                        </div>
                    </Card>
                </Col>

                <Col span={12} style={{margin:'30px 0px'}}>
                    <ListeCardsRestaurants/>
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
    }
}

export default ListeRestaurants;