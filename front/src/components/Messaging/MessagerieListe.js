import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'

import HeaderRestaurant from '../HeaderRestaurant';
import HeaderScreen from '../Header';
import HeaderTalent from '../HeaderTalent';

import 'antd/dist/antd.less';
import '../../App.less';
import {Button, AutoComplete, Row, Col, Comment, Tooltip} from 'antd';

import moment from 'moment';
import MessageCourt from './MessageCourt'

import {Redirect} from 'react-router-dom'


function MessagerieListe(props) {
    
    const [user, setUser] = useState('')
    const [recherche, setRecherche] = useState('')
    const [listeRoom, setListeRoom] = useState([]) // faire requête pour afficher tous les messages
    const [listeinterlocuteurs, setlisteinterlocuteurs] = useState([])

    const [isSignIn, setIsSignIn] = useState(props.connectToDisplay.isSignIn)
    const [isTalent, setIsTalent] = useState(props.connectToDisplay.isTalent)
    const [isRestau, setIsRestau] = useState(props.connectToDisplay.isRestau)

    const[token, setToken] = useState(props.tokenToDisplay)

  console.log(props.tokenToDisplay)
  console.log(props.connectToDisplay)
    
  if(!isSignIn){
    var header = <HeaderScreen /> // redirect  plutôt ???
  } else if (isSignIn && isRestau){
    var header = <HeaderRestaurant keyheader='4'/>
  } else if (isSignIn && isTalent){
    var header = <HeaderTalent keyheader='4'/>
  }

  useEffect( async () => {
    
    let rawResponse = await fetch('/getMyChatRoom', {
      method:'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body : `token=${props.tokenToDisplay}`
  })
  
   let response = await rawResponse.json()
   console.log(response)

    var tempList = [] 
   for (let i=0;i<response.result.length;i++){
      tempList.push({nom : response.result[i].message[0].destinataire, contenu :response.result[i].message[0].content , roomName :response.result[i]._id, myToken :props.tokenToDisplay, tokenDesti : response.result[i].message[0].tokenDesti })
   }

   setListeRoom(tempList)
   console.log(tempList)
    var liste = listeRoom.map(message => ({value: message.nom}))
    setlisteinterlocuteurs(liste)
    }, [])

    if(!isSignIn){
      return <Redirect to="/"/>
    }else{
      return (
            <div style={{textAlign:'center', backgroundColor:'#4b6584'}}>
                {header}
                <Row style={{justifyContent:'center', color:'white', fontWeight:'bold', fontSize:'30px'}}>Mes discussions</Row>
                <Row style={{marginTop:'30px', textAlign:'center', justifyContent:'center'}}>
                    <AutoComplete
                                style={{ width: 400, marginRight:'30px' }}
                                options={listeinterlocuteurs}
                                placeholder="Cherchez votre interlocuteur dans la liste"
                                filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onChange={(e)=>{setRecherche(e)}}
                                value={recherche}
                            />     
                <Button type="primary" >Chercher</Button>
                </Row>
                
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} style={{justifyContent:'center', marginTop:'50px', backgroundImage:`url("../images/resto-fond.jpg")`, backgroundRepeat: 'no-repeat',
                                  backgroundSize: "cover",}}>
                    <Col className="gutter-row" span={16}>
                    <div style={{overflowY: 'scroll', height:'400px',  padding:'15px 30px', borderRadius:5}}>
                          {listeRoom.map((message,i)=>{
                              if (message.contenu.length > 50){
                                  var contenu=message.contenu.slice(0, 60) + '...'
                              } else {
                                  var contenu=message.contenu
                              }
                            
                              return ( 
                                 
                                <MessageCourt key={i} roomName={message.roomName} myToken={message.myToken} tokenDesti={message.tokenDesti} contenu={contenu} nom={message.nom}/>
                              )
                          })}
                        </div>
                    </Col>
                </Row>
                
    
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { connectToDisplay : state.isConnect, tokenToDisplay: state.token}
  }
    
  export default connect(
    mapStateToProps, 
    null
  )(MessagerieListe);

