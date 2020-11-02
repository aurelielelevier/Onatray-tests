import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import 'antd/dist/antd.less';
import '../App.less'

import Header from './Header'
import HeaderRestaurant from './HeaderRestaurant'
import HeaderTalent from './HeaderTalent'

import { Button, Select, Form, Col, Row,Card } from 'antd';
import Cardtalent from './Cardtalent'

const { Option } = Select
const { Meta } = Card

function RecherchetalentA(props) {

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


    const Submitform = values => {
        console.log('Received values of form:', values);
        console.log(posterecherché)
        console.log(typedecontrat)
    };


const [posterecherché,setposterecherché]= useState('')
const [typedecontrat,settypedecontrat]= useState('')
const [liketalent,setliketalent]=useState(false)
const [talents,settalents]=useState([])
const [wishlistRestaurantID,setwishlistRestaurantID]=useState([])
<<<<<<< HEAD
=======

>>>>>>> 5eefb680bdcd78984dc6b320103f777fcbaa9b36

useEffect(() => {
var getTalentdata = async ()=> {
    const dataTalent = await fetch(`/restaurants/getinformation`)
      const JSdataTalent = await dataTalent.json()
      settalents(JSdataTalent.talentlist)
    }
    getTalentdata()

var getwishlist = async ()=>{
    const datawishlistRestaurant = await fetch(`/restaurants/getwishlist`)
    const JSdatawishlistRestaurant = await datawishlistRestaurant.json()
    setwishlistRestaurantID(JSdatawishlistRestaurant.restaurantwishlistid)}
    getwishlist()
},[])

var token="Kz2Y0noPWgcRu7N8NRoA7gGaPvZnocxR"

var talentslist = talents.map((talents,i) => {
    return (
       <Cardtalent key={i} src={talents.src} talent={talents} wishlistRestaurantID={wishlistRestaurantID}/>
    )
  })

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
                        <Option value='Serveur'>Serveur</Option>
                        <Option value='Cuisiner'>Cuisinier</Option>
                        <Option value='Comis'>Comis</Option>
                
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

    {talentslist}
    
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
  )(RecherchetalentA);
