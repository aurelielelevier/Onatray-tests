import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import queryString from 'query-string'
import socketIOClient from "socket.io-client";

import Header from '../Header'
import HeaderTalent from '../HeaderTalent'
import HeaderRestaurant from '../HeaderRestaurant'

import {Row, Col, Button, Input, Card, Badge } from 'antd'





const {TextArea} = Input;
const { Meta } = Card;

const socket = socketIOClient("http://localhost:3000");

function MessageRoom({location, connectToDisplay, tokenToDisplay}){
    const [myToken, setMyToken] = useState('')
    const [sender, setSender] = useState('')
    const [desti, setDesti] = useState('')
    //var talentInfo
    
    const [messageList, setMessageList] = useState([])
    const [messageToSend, setMessageToSend] = useState('')
    const [chatroom, setchatroom] = useState('')
    var chatRoomId ;
    var tokenDesti ;
    
    const [avatar, setAvatar] = useState('')
    const [firstNameTalent, setFirstNameTalent] = useState('')
    const [lastNameTalent, setLastNameTalent] = useState('')
    const [isWorking, setIsWorking] = useState('')
    const [isLookingFor, setIsLookingFor] = useState('')
    const [jobLookingFor, setJobLookingFor] = useState([])

    const [isSignIn, setIsSignIn] = useState(connectToDisplay.isSignIn)
    const [isTalent, setIsTalent] = useState(connectToDisplay.isTalent)
    const [isRestau, setIsRestau] = useState(connectToDisplay.isRestau)
    console.log(tokenToDisplay)
    console.log(connectToDisplay)

    if(!isSignIn){
        var header = <Header/>
      } else if (isSignIn && isRestau){
        var header = <HeaderRestaurant/>
      } else if (isSignIn && isTalent){
        var header = <HeaderTalent/>
      }

      useEffect(()=>{
        const {name, desti , room} = queryString.parse(location.search)
       
        chatRoomId = room
        setchatroom(room)
        setSender(name)
        setDesti(desti)
        tokenDesti = desti
        setMyToken(name)


        socket.emit('join', {name, room}, ({})=>{
            
        })
        
        return ()=> {
            socket.emit('disconnect')
            socket.off();
        }
     }, [socket, location.search] )

     useEffect(()=>{
         
         socket.on('message',(message)=>{
             setMessageList([...messageList,{message : message.message,token : message.tokenExpe} ])
            })
        }, [messageList])
        
        
        useEffect(async()=>{
            
            let rawResponse = await fetch('/getOldMessage', {
                method:'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body : `chatRoomId=${chatRoomId}&token=${tokenDesti}`
            })
            
            let response = await rawResponse.json()
            
            var messageTab = response.result
            var tempMessageTab = []
            for(let i=0; i<messageTab.length; i++){
                tempMessageTab.push({message : messageTab[i].content, token : messageTab[i].tokenExpe})
            }
            setMessageList(tempMessageTab)
            console.log(response.card)
            setAvatar(response.card.avatar)
            setFirstNameTalent(response.card.firstName)
            setLastNameTalent(response.card.lastName)

            if(response.card.working == true){
                setIsWorking('En poste')
            }else{
                setIsWorking("N'as pas de poste")
            }
            if(response.card.lookingForJob == true){
                setIsLookingFor("en recherche d'emploie")
                //setLookingFor(response.card.lookingJob)
                    var tempTab = []
                for(let i=0;i<response.card.lookingJob.length;i++) {
                    tempTab.push(<li>- {response.card.lookingJob[i]}</li>)
                }
                setJobLookingFor(tempTab)
            }else {
                setIsLookingFor("ne recherche pas d'emploie pour le moment")
            }
            
        }, [])
        
  if(connectToDisplay.isTalent == true){
        var cardTalentToDisplay;
  }else{

  var cardTalentToDisplay = <Col style={{border:'1px solid black'}} offset={2} span={6}>
  <Card  
      cover={
      <img
        style={{height:'45vh'}}
        alt="example"
        src={avatar}
      />
      }
      // actions={[
      // <HeartOutlined key="setting" />,
      // <ExpandAltOutlined key="ellipsis" />
      // ]}
      >   
      <Meta
      //style={{height:'200px'}}
      title={<h3>{firstNameTalent} {lastNameTalent}</h3>}
      />
      
      <p>Acutellement : {isWorking}, {isLookingFor} pour être : 
        {jobLookingFor}  
       </p>
      
     
  </Card>
</Col>
  }
    

    var sendMessage = async (message) =>  {
        //console.log(desti)
        socket.emit("sendMessage", {message, name: sender, desti:desti , room : chatroom }, ()=>{
            })
            setMessageList([...messageList, {message : message, token : myToken}])
            setMessageToSend('')
        }
        

    var dataRecentMessage = messageList.map(function(message, i){
            if(message.token == myToken){
                return (
                 <div>
                     
                    <Row style={{display:'flex', justifyContent:'flex-end',}}>
                        <Col span={8} style={{paddingRight:5, display:'flex' ,flexDirection:'column'}} >
                            <Row style={{paddingBottom:5}}>
                                {/* <span style={{paddingLeft:5, fontSize:10}}>{message.name} </span> */}
                                <Col span={24} style={{ backgroundColor:'#d1d8e0',minHeight:'40px', color:'#778ca3', borderRadius:10, display:'flex', justifyContent:'flex-end', alignItems:'center', paddingRight:10, paddingLeft:10}} >  
                                    <span>{message.message}</span>  
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                 </div>   
                )
            }else {
                return (
                <div>
                    <Row style={{display:'flex', justifyContent:'flex-end',}}>
                        <Col span={8} style={{paddingRight:5, display:'flex' ,flexDirection:'column'}} >
                            <Row style={{paddingBottom:5}}>
                                {/* <span style={{paddingLeft:5, fontSize:10}}>{message.name} </span> */}
                                <Col span={24} style={{ backgroundColor:'#F7D555',minHeight:'40px', color:'#778ca3', borderRadius:10, display:'flex', justifyContent:'flex-start', alignItems:'center', paddingRight:10, paddingLeft:10}} >  
                                    <span>{message.message}</span>  
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{display:'flex',overflowY: 'scroll', justifyContent:'flex-start',}}>
                        <Col span={8} style={{paddingRight:5, display:'flex' ,flexDirection:'column'}} >
                            <Row style={{paddingBottom:5}}>
                                {/* <span style={{paddingLeft:5, fontSize:10}}>{message.name}</span> */}
                                <Col span={24} style={{ backgroundColor:'#F7D555',minHeight:'40px', borderRadius:10, display:'flex', justifyContent:'flex-start', alignItems:'center', paddingRight:10, paddingLeft:10}} >  
                                    <span >{message.message}</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                   )
            }
    })
if(!isSignIn){
    return (<Redirect to='/'/>)
    }else{

    return(
        <div>
        
        <Row>
            <Col span={24}>
                {header}
    <Row style={{justifyContent:'center', backgroundColor:'#4b6584', color:'white', fontWeight:'bold', fontSize:'30px'}}>Discussion entre {firstNameTalent} et </Row>
            
                <Row style={{paddingTop:20, paddingBottom:20}}>
                    <Col offset={2} span={2}>
                    <Link to='/messagerie'>
                        <Button type='primary'>
                            Retour
                        </Button>
                    </Link>
                    </Col>
                </Row>
                <Row >
                    <Col style={{border:'1px solid black', borderRadius:5,padding:10, display:'flex',height:'70vh', flexDirection:'column-reverse', backgroundColor:'#4b6584'}} offset={2} span={13}>
                        <Row>
                            <Col offset={4} span={12}>
                            <TextArea onChange={(e)=>setMessageToSend(e.target.value)} value={messageToSend} placeholder="Votre message" autoSize />
                            <div style={{ margin: '24px 0' }} />
                            </Col>
                            <Col offset={1} span={4}>
                                <Button onClick={()=>sendMessage(messageToSend)} type="primary">Envoyer</Button>
                            </Col>
                        </Row>
                            
                        <div style={{overflowY: 'scroll', padding:30}}>
                            {dataRecentMessage}
                        </div>
                            
                    </Col>
                        {cardTalentToDisplay}    
                    
                </Row>
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
  )(MessageRoom);
