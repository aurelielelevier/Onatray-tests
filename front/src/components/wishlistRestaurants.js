import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.less';
import '../App.less'
import Header from './Header'
import { Button, Select, Form, Col, Row,Card } from 'antd';
import Cardtalent from './Cardtalent'
import {connect} from 'react-redux'

const { Option } = Select
const { Meta } = Card

function WishlistRestaurants(props) {


const Submitform = values => {
        console.log('Received values of form:', values);
        console.log(posterecherché)
        console.log(typedecontrat)
        };

    
const token=props.tokenToDisplay
console.log('token:',token)
const [posterecherché,setposterecherché]= useState('')
const [typedecontrat,settypedecontrat]= useState('')
const [talent,settalent]=useState([])
const [wishlistRestaurantID,setwishlistRestaurantID]=useState([])


useEffect(() => {

var getwishlistRestaurant= async ()=> {
    const datawishlistRestaurant = await fetch(`/restaurants/getwishlist`)
      const JSdatawishlistRestaurant = await datawishlistRestaurant.json()
      settalent(JSdatawishlistRestaurant.restaurantwishlist.wishlistRestaurant)

      const wishlistID = await fetch(`/restaurants/getwishlist`)
      const JSwishlistID = await wishlistID.json()
      setwishlistRestaurantID(JSwishlistID.restaurantwishlistid)}
getwishlistRestaurant()

},[])




var wishlistlist = talent.map((talent,i) => {
    return (
       <Cardtalent key={i} src={talent.src} talent={talent} wishlistRestaurantID={wishlistRestaurantID} token={token}/>
    )
  })

return(
                     
<div>
<Header/>

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