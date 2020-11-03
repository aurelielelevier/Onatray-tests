import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'

import HeaderRestaurant from '../HeaderRestaurant'

import {Row, Col, Card} from 'antd'
import {EditOutlined} from "@ant-design/icons"

function SignUpRestauC(props){

    var dataClientele = "Vous n'avez pas renseigné votre type de clientèle"
    var dataRestaurant = "Vous n'avez pas renseigné votre type de restaurant"
    var dataFood = "Vous n'avez pas rensigné votre type de nourriture"

    const [clientele, setClientele] = useState([])
    const [restaurant, setRestaurant] = useState([])
    const [food, setFood] = useState([])

    useEffect(()=>{
    if(!props.restauCompletInfoToDisplay.clientele){
    }else {
        setClientele(props.restauCompletInfoToDisplay.clientele)
    }
    if(!props.restauCompletInfoToDisplay.restaurant){
    }else {
     setRestaurant(props.restauCompletInfoToDisplay.restaurant)
    }
    if(!props.restauCompletInfoToDisplay.food){
    }else {
     setFood(props.restauCompletInfoToDisplay.food)
    }
    }, [])

    if(clientele.length != 0 ){
        var dataClientele = clientele.map((clientele, i)=>{
            <p>{clientele}</p>
        })
    }
    if(restaurant.length != 0 ){
        var dataRestaurant = restaurant.map((restaurant, i)=>{
            <p>{restaurant}</p>
        })
    }
    if(food.length != 0 ){
        var dataFood = clientele.map((food, i)=>{
            <p>{food}</p>
        })
    }


    return(
    <div>
        <HeaderRestaurant/>
        <Row style={{paddingTop:50}}>
                <Col offset={5} span={8} >
                    <Card title="Votre compte" extra={<EditOutlined onClick={()=>console.log('click on edit')} />} style={{ width: 300 }}>
                        <p>Nom du restaurant : {props.restauInfoToDisplay.restaurantEmail} </p>
                        <p>Email : {props.restauInfoToDisplay.restaurantEmail} </p>
                        <p>Adresse : {props.restauInfoToDisplay.restaurantEmail} </p>
                        <p>N° de siret : {props.restauInfoToDisplay.restaurantEmail} </p>
                        <p>Website : {props.restauInfoToDisplay.restaurantEmail} </p>
                        <p>N° de telephone : {props.restauInfoToDisplay.restaurantEmail} </p>
                    </Card>
                </Col>
                <Col  span={8} >
                    <Card title="Vos informations" extra={<EditOutlined onClick={()=>console.log('click on edit')} />} style={{ width: 300 }}>
                        <p>Type de clientèle : {dataClientele}</p>
                        <p>Type de restaurant : {dataRestaurant}</p>
                        <p>Type de nourriture : {dataFood} </p>
                    </Card>
                </Col>
  
            </Row>
    </div>
    )
}

function mapStateToProps(state) {
    return {  restauInfoToDisplay : state.restauInfo, restauCompletInfoToDisplay: state.restauCompletInfo}
}
  export default connect(
    mapStateToProps, 
    null
  )(SignUpRestauC);

