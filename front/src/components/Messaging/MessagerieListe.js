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


function MessagerieListe(props) {
    
    const [user, setUser] = useState('')
    const [recherche, setRecherche] = useState('')
    const [listeMessages, setListeMessages] = useState([]) // faire requête pour afficher tous les messages
    const [listeinterlocuteurs, setlisteinterlocuteurs] = useState([])

    const [isSignIn, setIsSignIn] = useState(props.connectToDisplay.isSignIn)
    const [isTalent, setIsTalent] = useState(props.connectToDisplay.isTalent)
    const [isRestau, setIsRestau] = useState(props.connectToDisplay.isRestau)
 // const[color, setColor] = useState('#ffffff')
    
  if(!isSignIn){
    var header = <HeaderScreen /> // redirect  plutôt ???
  } else if (isSignIn && isRestau){
    var header = <HeaderRestaurant keyheader='4'/>
  } else if (isSignIn && isTalent){
    var header = <HeaderTalent keyheader='4'/>
  }

  useEffect(() => {
    setListeMessages([{date: '23/10/2020 12:00', 
                        nom:'Aurélie L', 
                        contenu : `We supply a series of design principles, practical patterns and high 
                        quality design resources (Sketch and Axure), to help people create their product 
                        prototypes beautifully and efficiently.`, 
                        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" },
                        {date: '23/10/2020 12:00', 
                        nom:'La Capsule', 
                        contenu : `We supply a series of design principles, practical patterns and high 
                        quality design resources (Sketch and Axure), to help people create their product 
                        prototypes beautifully and efficiently.`, 
                        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" },
                        {date: '23/10/2020 12:00', 
                        nom:'La Capsule', 
                        contenu : `We supply a series of design principles, practical patterns and high 
                        quality design resources (Sketch and Axure), to help people create their product 
                        prototypes beautifully and efficiently.`, 
                        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" },
                        {date: '23/10/2020 12:00', 
                        nom:'La Capsule', 
                        contenu : `We supply a series of design principles, practical patterns and high 
                        quality design resources (Sketch and Axure), to help people create their product 
                        prototypes beautifully and efficiently.`, 
                        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" },
                        {date: '23/10/2020 12:00', 
                        nom:'La Capsule', 
                        contenu : `We supply a series of design principles, practical patterns and high 
                        quality design resources (Sketch and Axure), to help people create their product 
                        prototypes beautifully and efficiently.`, 
                        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" }
                    ])
    var liste = listeMessages.map(message => ({value: message.nom}))
    setlisteinterlocuteurs(liste)
    }, [recherche])

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
            
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} style={{justifyContent:'center', marginTop:'50px', backgroundImage:`url("../images/ardoise.jpg")`, backgroundRepeat: 'no-repeat',
                              backgroundSize: "cover",}}>
                <Col className="gutter-row" span={16}>
                <div style={{overflowY: 'scroll', height:'400px',  padding:'15px 30px', borderRadius:5}}>
                      {listeMessages.map((message,i)=>{
                          if (message.contenu.length > 50){
                              var contenu=message.contenu.slice(0, 60) + '...'
                          } else {
                              var contenu=message.contenu
                          }
                        
                          return ( 
                             
                            <MessageCourt key={i} contenu={contenu} avatar={message.avatar} date={message.date} nom={message.nom}/>
                          )
                      })}
                    </div>
                </Col>
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
  )(MessagerieListe);

