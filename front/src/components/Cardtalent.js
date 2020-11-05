import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.less';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Col,Card,Modal, Image, Row,Rate, Divider,Tag,Collapse, Badge} from 'antd';
import {ExpandAltOutlined,SendOutlined,HeartFilled,PhoneOutlined, MailOutlined, HomeOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

const { Panel } = Collapse

const style= {
    titres:{
        color:"#4B6584",
        fontWeight:'bold',
    },
    textCard:{
        color:"#4B6584",
        margin:'0px 20px'
    },
    textCard2:{
        color:"#4B6584",
        margin:'0px',
        fontSize:'20px',
        margin:'0px 20px'
    }
}

function Cardtalent(props){

const { Meta } = Card
const [visible, setVisible] = useState(false)

var experiences = props.talent.experience
var formations =props.talent.formation
var token=props.token
var talent =props.talent
var talentNameUC=props.talent.lastName.toUpperCase()

if(props.talent.polygone != undefined){
    var polygone=props.talent.perimetre.map(point => [point[1], point[0]])
}

if(props.talent.domicile != undefined){
var domicile=[props.talent.adresselgtlat.coordinates[1], props.talent.adresselgtlat.coordinates[0]]
}



    const [chatRoomId, setCahtRoomId] = useState() 
    const [goToChatRoom, setGoToChatRoom] = useState(false) 
    const  currentUser = props.currentToken ;
    var idToSend ;

var onSendDm = async () => {
     // fonction qui crée une chat room entre deux personnes 
        let rawResponse = await fetch('/createChatRoom', {
             method:'POST',
             headers: {'Content-Type':'application/x-www-form-urlencoded'},
             body : `expediteur=${currentUser}&desti=${talent.token}`
         })

         let response = await rawResponse.json()
         console.log(response.result)

         idToSend = response.chatRoomId

         setCahtRoomId(idToSend)
         console.log(chatRoomId)

         props.onSendChatRoomId({idToSend : idToSend, expediteur : currentUser, destinataire : props.name})
         setGoToChatRoom(true)
 }





// condition mappant sur experiences pour afficher les deux dernières expériences de chaque talent
console.log("experiences",experiences)
if(experiences!= undefined){
var listexperience=experiences.map((experience,i) => {
    return(<p>{experience.firm}- {experience.job} - {experience.startingDate} - {experience.endingDate} - {experience.city}</p>)
})

var listexperienceshorten= experiences.map((experience,i) =>{
    if(experience && i<1){
    return(<p>{experience.firm}- {experience.job} - {experience.city}</p>)}
})
}
console.log('formations',formations)

// condition mappant sur formation pour afficher les deux dernières formations de chaque talent
if(formations !=undefined){
    var listformation= formations.map((formation,i) => {
        return(<div> {formation.endingDate} - {formation.city} - {formation.school}</div>)
    })

    var listformationshorten= formations.map((formation,i) =>{
        if(i<1){
        return(<p>{formation.endingDate} - {formation.school}</p>)
            }          
        })
}

// conditions d'affichage de la modal talent

// existance de formation et création d'un tableau
if(talent.formation){
    var formation = talent.formation.map((formation, i)=>{
       return(
           <Row>
               <Col span={6} style={{padding:30}}> {formation.diploma}</Col>
               <Col span={6} style={{padding:30}}> {formation.school}</Col>
               <Col span={6} style={{padding:30}}> {formation.endingDate}</Col>
               {/* <Col span={6} style={{padding:30}}> {formation.city}</Col> */}
           </Row>
           
       )
   })
} else {
   var formation = <div>Aucune formation renseignée pour le moment</div>
}

// existance d'expérience et création d'un tableau

if(talent.experience){
   var experience = talent.experience.map((experience, i)=>{
      return(
          <Row>
              <Col span={6} style={{padding:30}}>Chez : {experience.firm}</Col>
              <Col span={6} style={{padding:30}}> A : {experience.city}</Col>
              <Col span={6} style={{padding:30}}> De {experience.startingDate} à {experience.endingDate}</Col>
          </Row>
          
      )
  })
} else {
  var experience = <div>Aucune expérience renseignée pour le moment</div>
}

// affichage de la situation professionnelle du talent
if(talent.working){
  var enposte = 'Actuellement en poste'
} else {
  var enposte = "Sans emploi pour le moment"
}

if(talent.lookingJob){
  var jobs = ' en tant que '
  for(var i=0; i<talent.lookingJob.length; i++){
      if(i==talent.lookingJob.length-1){
       jobs+= ' '+talent.lookingJob[i]+'.'
      } else {
       jobs+= ' '+talent.lookingJob[i]+','
      }
  }
} else {
  var jobs =''
}

//affichage des langues parlées par le talent
if(talent.speakLangage){
 var langues = ' '
 for(var i=0; i<talent.speakLangage.length; i++){
   if(i==talent.speakLangage.length-1){
       langues+= ' '+talent.speakLangage[i]+'.'
   } else {
       langues+= ' '+talent.speakLangage[i]+','
   }
 }   
} else {
  var langues =''
}

if(talent.lookingForJob){
  var chercheUnEmploi = <div>Je cherche un emploi en ce moment
                       </div>
} else {
  var chercheUnEmploi ="Je ne cherche pas d'emploi en ce moment"
}


// conditions Chatroom
if (goToChatRoom == true){
    return <Redirect to={`messageRoom?name=${currentUser}&desti=${talent.token}&room=${chatRoomId}`}/>
 }else{
 if (goToChatRoom == true){
     return <Redirect to={`messageRoom?name=${currentUser}&desti=${talent.token}&room=${chatRoomId}`}/>
  }else{

return(

    <Col className="gutter-row" span={4} style={{padding:'0px',display:'flex',flexDirection:'column',alignSelf:'stretch',margin:'5px',borderStyle:'solid',borderWidth:'1px',borderColor:'#95a5a6'}}>
           <Image
                width='100%'
                height='350px'
                src={talent.avatar}
                />
            <Row style={{padding:'5px',display:'flex',flexDirection:'column',alignSelf:'stretch',height:'100%',borderBottomStyle:'solid',borderColor:'#a5b1c2',  borderBottomWidth:'1px', alignItems:'center' }} >
                    <h2 style={{fontWeight:"bold", marginBottom:'2px'}}>{talent.firstName} {talentNameUC}</h2>
                    <Divider style={{fontWeight:"bold", marginBottom:'2px'}}>Formation </Divider>
                    {listformationshorten}
                    <Divider style={{fontWeight:"bold",marginBottom:'2px'}}>Expérience </Divider>
                    {listexperienceshorten}
                    {talent.countFave<=0?<span style={{marginBottom:'0px'}}>N'est dans aucune wishlist de restaurateurs</span>:
                    <span>Est dans {talent.countFave} wishlist de restaurateurs</span>}
            </Row>
            <Row style={{display:'flex', fontSize:'25px',flexDirection:'row', height:'50px', alignItems:"center", padding:'8px'}} >
                <Col flex={1}  style={{display:'flex',justifyContent:'center'}}>
                    <SendOutlined  onClick={()=> onSendDm()} key="sendOutlined"/>
                </Col>
                <Col flex={1} style={{display:'flex',justifyContent:'center',borderLeftStyle:'solid', borderLeftWidth:'1px',borderColor:'#a5b1c2'}}>
                    <HeartFilled  onClick={()=>{props.onliketalent(talent._id)}} style={{marginRight:'5px', color:props.couleur}}/>
                </Col>
                <Col flex={1} style={{display:'flex',justifyContent:'center',borderLeftStyle:'solid', borderLeftWidth:'1px',borderColor:'#a5b1c2'}}>
                    <ExpandAltOutlined onClick={()=>setVisible(true)} key="ExpandAltOutlined" />
                </Col>
            </Row>
           
            
        <Modal
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={'80%'}
            style={{
                justifyContent:'center',
                textAlign:'center'}}
            >
        <Row style={{justifyContent:'center', color:'white', fontWeight:'bold', fontSize:'30px', backgroundColor:'#4B6584'}}></Row>
          <Row>
            <Col span={8} style={{backgroundColor:'#d1d8e0', height:'100%', padding:20}}>
                <div style={{borderRadius:'50%',width:200, margin:'auto', height:200, border:'6px solid #4B6584', backgroundImage:`url(${talent.avatar})`, backgroundRepeat: 'no-repeat',
                     backgroundSize: "cover",}}>
                </div>
                    <div className="site-card-border-less-wrapper" style={{marginTop:30, textAlign:'center'}}>
                        <Card title={`${talent.firstName}   ${talent.lastName}`} bordered={false} style={{ width:'100%', fontWeight:'bold', color:'#4B6584' }}>
                            <p><HomeOutlined style={{marginRight:'10px'}}/>{talent.adress}</p>
                            <p><PhoneOutlined style={{marginRight:'10px'}}/>{talent.phone}</p>
                            <p><MailOutlined style={{marginRight:'10px'}}/>{talent.email}</p>
                            <p><Tag icon={<LinkedinOutlined />} color="#55acee">
                                    LinkedIn
                                </Tag></p>
                        {talent.countFave<=0?<span style={{marginBottom:'0px'}}>N'est dans aucune wishlist de restaurateurs</span>:
                        <span>Est dans {talent.countFave} wishlist de restaurateurs</span>}
                        </Card>
                        <p style={{color:"#4B6584", marginTop:'20px', fontWeight:"bold"}}>Ma note moyenne attribuée par les restaurants :</p> 
                        <p style={style.textCard}><Rate disabled defaultValue={2} />2 (10 votes)</p>
                    </div>
            </Col>

            <Col span={16} style={{padding:30}}>
            <Collapse accordion>
                <Panel header="Formations" key="2">
                {listformation}
                </Panel>
                <Panel header="Expériences" key="2">
                {listexperience}
                </Panel>
                <Panel header="Langues parlées" key="2">
                {langues}
                </Panel>
                <Panel header="Situation Professionnelle" key="2">
                <p>{enposte}</p>
                {chercheUnEmploi}{jobs}
                </Panel>
            </Collapse>
             
            <Row span={10}><h2 style={style.titres}>Zone de recherche :</h2> </Row> 
                <div>
                <Map center={domicile} zoom={12}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    <Polygon positions={polygone} color="red" />
                </Map>
                </div>
            </Col>
        </Row>
        </Modal>
    </Col>
    )
   }
}
}

  function mapStateToProps(state) {
    return { currentToken : state.token }
  }


function mapDispatchToProps(dispatch) {
    return {
      onSendChatRoomId: function(chatRoomId) { 
          dispatch( {type: 'sendId', chatRoomId } ) 
      }
    }
  }
  
  export default connect(
      mapStateToProps, 
      mapDispatchToProps
  )(Cardtalent);