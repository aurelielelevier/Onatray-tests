import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.less';
import '../App.less'

import Header from './Header'
import HeaderRestaurant from './HeaderRestaurant'
import HeaderTalent from './HeaderTalent'

import { Button, Select, Form, Col, Row,Card } from 'antd';
import Cardtalent from './Cardtalent'
import {connect} from 'react-redux'

const { Option } = Select
const { Meta } = Card


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

const listeposterecherché=["Serveur","Cuisiner","Comis","Runner"]
const listetypedecontrat=["CDI","CDD","Extra","Mi Temps","Interim"]


function WishlistRestaurants(props) {

const Submitform = values => {
        console.log('Received values of form:', values);
        console.log(posterecherché)
        console.log(typedecontrat)
        };

// Etat et condition permettant de mettre à jour le header en fonction du status de l'utilisateur connecté:

const [isSignIn, setIsSignIn] = useState(props.connectToDisplay.isSignIn)
const [isTalent, setIsTalent] = useState(props.connectToDisplay.isTalent)
const [isRestau, setIsRestau] = useState(props.connectToDisplay.isRestau)

if(!isSignIn){
var header = <Header/>
} else if (isSignIn && isRestau){
var header = <HeaderRestaurant/>
} else if (isSignIn && isTalent){
var header = <HeaderTalent/>
}


const token = props.tokenToDisplay
const [posterecherché,setposterecherché]= useState('tous les postes')
const [typedecontrat,settypedecontrat]= useState('Tous type de contrat')
const [wishlistRestaurantID,setwishlistRestaurantID]=useState([])
const [talentaafficher,settalentaafficher]=useState([])
const [rechercheeffectuée,setrechercheeffectuée]=useState(false)
const [zone, setZone] = useState(zoneFrance)



// Recupération wishlist et liste des talents

// useEffect(() => {
// // var getwishlistRestaurant= async ()=> {
// //         var criteres = JSON.stringify({posterecherché: posterecherché, zone:zone})
// //         var rechercheListe =await fetch(`/restaurants/recherche-liste-talents`, {
// //             method:'POST',
// //             headers: {'Content-Type':'application/x-www-form-urlencoded'},
// //             body: `token=${token}&criteres=${criteres}`
// //         })
// //         var response = await rechercheListe.json()
// //         settalentaafficher(response.liste)
// //         setwishlistRestaurantID(response.restaurantwishlistid)
// // }
// // getwishlistRestaurant()
// // },[])


// Mise a jour de la liste des talents en fonction des filtres de recherche utilisés
useEffect(()=>{

    async function cherche(){
        if (posterecherché==[]){
            setposterecherché(listeposterecherché)
        }
        if(typedecontrat==[]){
            settypedecontrat(listetypedecontrat)
        }
    var criteres = JSON.stringify({posterecherché: posterecherché, zone:zone,typedecontrat:typedecontrat})
    var rechercheListe = await fetch(`/restaurants/recherche-liste-talents`, {
        method:'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${token}&criteres=${criteres}`
    })
    var response = await rechercheListe.json()
   
    setwishlistRestaurantID(response.restaurantwishlistid)
    settalentaafficher(response.liste)
    console.log('response',response)
     }
    cherche()
},[posterecherché,typedecontrat,rechercheeffectuée])

console.log('wishlistRestaurantID',wishlistRestaurantID,'talentaafficher',talentaafficher)

// fonction permettant d'ajouter ou supprimer de la wishlist
async function onliketalent (id){
    const saveReq = await fetch('restaurants/addToWishList', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `id=${id}&token=${token}` 
    })
    var response= await saveReq.json()

    settalentaafficher(response.liste)
    setwishlistRestaurantID(response.restaurantwishlistid)
}

// affichage de tous les talents sous forme de carte 
// et filtre sur les talents appartenant à la wishlist du restaurateur connecté
var wishlistlist = talentaafficher.map((e,i) => {
    if(wishlistRestaurantID.includes(e._id)){
        var couleur= '#4B6584'
    return (
            <Cardtalent key={i} src={e.src} talent={e} onliketalent={onliketalent} wishlistRestaurantID={wishlistRestaurantID} token={token} couleur={couleur}/>
            )}})
            
return(                 
<div>
{header}


<Row style={{backgroundColor:"#4B6584", height:"150px", display:"flex", justifyContent:"center", alignItems:'center', marginBottom:"15px"}}>
    <Col span={18} >
        <Form name="complex-form"  autoComplete="off" layout='inline'>
            <Col flex={2}>
                    <Form.Item label="Poste recherché" style={{color: '#ffffff'}}>
                        <Select 
                            showSearch
                            onChange={(e)=>setposterecherché(e)}
                        
                            name={'Poste recherché'}
                    
                            className="basic-multi-select"
                            classNamePrefix="select">
                            <Option value='Tous les postes'>Tous les postes</Option>
                            <Option value='Serveur'>Serveur</Option>
                            <Option value='Cuisiner'>Cuisinier</Option>
                            <Option value='Manager'>Manager</Option>
                            <Option value='Comis'>Comis</Option>
                            <Option value='Chef de rang'>Chef de rang</Option>
                            <Option value='runner'>Runner</Option>
                            <Option value='sommelier'>Sommelier</Option>
                            <Option value='chef'>Chef </Option>
                            <Option value='chefDePartie'>Chef de partie</Option>
                            <Option value='second'>Second</Option>
                            <Option value='plongeur'>Plongeur</Option>
                        </Select>
                    </Form.Item>
            </Col>
            <Col flex={3}>
                <Form.Item label="Type de contrat">
                    <Select 
                        showSearch
            
                        onChange={(e)=>settypedecontrat(e)}
                        name={'language'}
                        className="basic-multi-select"
                        classNamePrefix="select">
                            <Option value='Tous type de contrat'>Tous type de contrat</Option>
                            <Option value='CDI'>CDI</Option>
                            <Option value='CDD'>CDD</Option>
                            <Option value='Mi Temps'>Mi Temps</Option>
                            <Option value='Interim<'>Interim</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Form.Item>
                <Button onClick={Submitform()} type="primary" > Rechercher</Button>
            </Form.Item>
        </Form>
    </Col>
</Row>
<Row style={{display:"flex", justifyContent:"center", alignItems:'center'}}>
    {wishlistlist}   
</Row>

</div>
    )
}
function mapStateToProps(state) {
    return { connectToDisplay : state.isConnect, tokenToDisplay: state.token}
  }

  export default connect(
    mapStateToProps, 
    null
  )(WishlistRestaurants);