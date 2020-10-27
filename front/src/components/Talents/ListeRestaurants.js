import React, {useState, useEffect} from 'react'
import '../../App.less';
import 'antd/dist/antd.less';
import ListeCardsRestaurants from './ListeCardsRestaurants'
import MapRestaurant from './MapRestaurants'
import { Layout, Card, Row, Button, Checkbox, Col, Select, Form } from 'antd';
import HeaderTalent from '../HeaderTalent'


const { Option } = Select
const listePrix = [0, 1, 2]
const listeCuisines = ['française', 'italienne', 'japonaise', 'healthy' ]
const listeTypes = ['touristique', 'de quartier', 'jeune', 'agée']
const listeAmbiances = ['calme', 'animé', 'branché', 'sobre']

const token = 'Gi2AoHScmfEI2wIiAnDdsCK6plqfww1c'
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

function ListeRestaurants(){
    const [zone, setZone] = useState(zoneFrance)
    const[markers, setMarkers] = useState([])
    const[adresse, setAdresse] = useState([48, 2.3])// props store  pour obtenir le latlng de l'adresse et le polygone défini par l'utilisateur
    const[adressesProposees, setAdressesProposees] = useState('')
    const [latlngDomicile, setLatlngDomicile] = useState([48.8534, 2.3488])
    const [Prix, setPrix] = useState(listePrix)
    const [typeCuisine, setTypeCuisine] = useState(listeCuisines)
    const [Ambiance, setAmbiance] = useState(listeAmbiances)
    const [typeRestaurant, setTypeRestaurant] = useState(listeTypes)
    const [ListeRestaurants, setListeRestaurants] = useState([])
    const [ambianceCochee, setAmbiancecochee] = useState([])
    const [prixCoche, setPrixcoche] = useState(listePrix)
    const [typeCuisinecochee, setTypeCuisinecochee] = useState(listeCuisines)
    const [typeRestaurantcochee, setTypeRestaurantcochee] = useState(listeTypes)

    useEffect(async () => {
        var rechercheListe =  await fetch('/talents/cherche-liste-restaurant');
        var liste = await rechercheListe.json();
        console.log(liste, 'liste retour requete')
        setListeRestaurants(liste)
    }, [listeAmbiances, listeCuisines, listePrix, listeAmbiances])
    
    const Submitform = async (values) => {
        console.log('Received values of form:', values);
        console.log(ambianceCochee)
        console.log(typeCuisinecochee)
        console.log(prixCoche)
        console.log(typeRestaurantcochee)
        var criteres = JSON.stringify({ambiance: ambianceCochee, cuisine: typeCuisinecochee, prix: prixCoche, type:typeRestaurantcochee})
        var rechercheListe = await fetch(`/talents/recherche-liste-restaurants`, {
            method:'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${token}&restaurant=${criteres}`
        })
        var liste = await rechercheListe.json()
        setListeRestaurants(liste)
        console.log(liste, 'console log liste après requête')
        };

      function onChange(e) {
        console.log(`checked = ${e.target.checked}`)
        if(e.target.cheked){
            // setZone à changer pour prendre infos de la bdd concernant zone de recherche du talent
            setZone([
                [ 2.306442260742188, 48.8538656722782 ],
                [ 2.346267700195313, 48.89315686419009 ],
                [ 2.4183654785156254, 48.86832119264031 ],
                [ 2.401199340820313, 48.82675031807337 ],
                [ 2.324295043945313, 48.82494210585485 ],
                [ 2.306442260742188, 48.8538656722782 ]
              ])
        };
      }

    return(
    <div >
        
        <HeaderTalent/>

        <Row style={style.row2}>
            <Col span={6}>
                Type d'ambiance :
                <Form.Item >
                    <Select 
                        onChange={(e)=>setAmbiancecochee(e)}
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
            <Checkbox style={{color:'white'}} onChange={()=>{onChange(); setZone(zoneFrance)}}>Afficher seulement les restaurants dans ma zone de recherche</Checkbox>
        </Row>

        <Layout style={{ backgroundColor:'white', padding: '0 24px', minHeight: 280}}>
            <Row >
                <Col span={12} >
                    <Card style={{ border:'none', width: '100%', textAlign:'center', backgroundColor:'#fed330', marginTop:'30px' }}>
                        <div>
                            <MapRestaurant markers={markers}/>
                        </div>
                    </Card>
                </Col>

                <Col span={12} style={{margin:'30px 0px'}}>
                    <ListeCardsRestaurants liste={ListeRestaurants}/>
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