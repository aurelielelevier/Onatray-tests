import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.less';
import '../../App.less';
import HeaderRestaurant from '../HeaderRestaurant';
import HeaderScreen from '../Header';
import HeaderTalent from '../HeaderTalent';
import {Button, Avatar, AutoComplete, Row, Col, Comment, Tooltip} from 'antd';
import moment from 'moment';
import Message from './MessageCourt'


function MessagerieListe() {
  const [user, setUser] = useState('')
  const [recherche, setRecherche] = useState('')
  const [listeMessages, setListeMessages] = useState([]) // faire requête pour afficher tous les messages
  const [listeinterlocuteurs, setlisteinterlocuteurs] = useState([])
 // const[color, setColor] = useState('#ffffff')
  
  if(!user){
    var header = <HeaderScreen/>
  } else if (user == 'restaurant'){
    var header = <HeaderRestaurant/>
  } else if (user == 'talent'){
    var header = <HeaderTalent/>
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
                        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" }
                    ])
    var liste = listeMessages.map(message => ({value: message.nom}))
    setlisteinterlocuteurs(liste)
    }, [recherche])

  return (
        <div style={{textAlign:'center'}}>
            {header}
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
            
            <Row gutter={{ xs: 8, sm: 16, md: 18, lg: 24 }} style={{justifyContent:'center', marginTop:'50px'}}>
                <Col className="gutter-row" span={18}>
                    
                    {listeMessages.map((message,i)=>{
                        if (message.contenu.length > 50){
                            var contenu=message.contenu.slice(0, 60) + '...'
                        } else {
                            var contenu=message.contenu
                        }
                       
                        return ( 
                            <div style={{backgroundColor:'#fed330', padding:'15px 30px'}}>
                                {Message }
                            </div>
                        )
                    })}
                </Col>
    </Row>
            

        </div>
    )
}


export default MessagerieListe;