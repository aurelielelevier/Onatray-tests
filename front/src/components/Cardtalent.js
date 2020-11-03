import React, {useState,useEffect} from 'react'
import 'antd/dist/antd.less';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Col,Card,Modal, Image, Row,Rate} from 'antd';
import {ExpandAltOutlined,SendOutlined,HeartOutlined,HeartFilled,
  } from "@ant-design/icons"



function Cardtalent(props){

const { Meta } = Card
const [visible, setVisible] = useState(false)
var experiences = props.talent.experience
var formations =props.talent.formation
var token=props.token
var talent =props.talent
var talentNameUC=props.talent.lastName.toUpperCase()
const [isinWishlist,setisinWishlist]=useState(props.wishlistRestaurantID.includes(talent._id))

    const [chatRoomId, setCahtRoomId] = useState() 
    const [goToChatRoom, setGoToChatRoom] = useState(false) 
    const  currentUser = props.currentToken ;
    var idToSend ;

var onSendDm = async () => {
        //console.log(`envoyer un dm à ${talent.token}`)
       // console.log(currentUser)
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


async function onliketalent (){
        const saveReq = await fetch('restaurants/addToWishList', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `talent=${talent._id}&token=${token}&isinWishlist=${isinWishlist}` 
        })
        setisinWishlist(!isinWishlist)
    }

useEffect(()=>{
    console.log('isinWishlist',isinWishlist)
    console.log('talent',talent._id)
},[])

// if(props.wishlistRestaurantID.includes(talent._id) && isinWishlist===false){
// setisinWishlist(true)}


if(experiences!= undefined){
var listexperience=experiences.map((experience,i) => {
    return(`${experience.firm}- ${experience.job} - ${experience.startingDate} - ${experience.endingDate} - ${experience.city}\n`)
})

var listexperienceshorten= experiences.map((experience,i) =>{
    if(experience && i<2){
    return(`${experience.firm}- ${experience.job} - ${experience.city}\n`)}
    else{
        return(`  -  -  - \n`) 
    }
})
}


if(formations !=undefined){
var listformation= formations.map((formation,i) => {
    return(`${formation.endingDate} - ${formation.city} - ${formation.school}`)
})

var listformationshorten= formations.map((formation,i) =>{
    if(i<2 && formation){
    return(`${formation.endingDate} - ${formation.school}`)
}else{
    return(`  -  -  - \n`) }
})
}
// if (goToChatRoom == true){
//     return <Redirect to={`messageRoom?name=${currentUser}&desti=${talent.token}&room=${chatRoomId}`}/>
//  }else{




    return(

        <Col className="gutter-row" span={5}>
                <Card
                    style={{
                        margin:'10px',
                    }}
                    cover={
                    <img
                        alt="image"
                        src={props.src}
                        
                    />
                    }
                    actions={[
                    <SendOutlined onClick={()=> onSendDm()} key="sendOutlined"/>,
                    isinWishlist ===false?<HeartOutlined onClick={() => onliketalent()} key="HeartOutlined" />:<HeartFilled onClick={() => onliketalent()} key= "HeartFilled"/>,
                    <ExpandAltOutlined  onClick={()=>setVisible(true)} key="ExpandAltOutlined" />
                    ]} >
                    <Meta/>
                    <h2>{talent.firstName}-{talentNameUC}</h2>
                    <p style={{fontWeight: "bold"}}>Formations</p>
                    
                    {listformationshorten}
    
                    <p style={{fontWeight: "bold"}}>Expérience</p>
                    {listexperienceshorten}
                    
                    
                </Card>
            <Modal
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={'80%'}
                style={{
                  justifyContent:'center',
                  textAlign:'center'

                }
                }
              >
                  <Row>
                    <Col style={{width:'40%'}} span={10}>
                        <Image src={talent.src} />
                    </Col>
                    <Col style={{display:"flex", flexDirection:'column',alignItems:"start"}} span={14}>
                        <Row style={{display:"flex", flexDirection:'column',alignItems:"start"}}>
                            <h1 style={{marginLeft:'15px', marginBottom:'2px'}}>Nom: {talentNameUC}</h1>
                            <h1 style={{marginLeft:'15px',marginBottom:'2px'}}>Prenom:  {talent.firstName}</h1>
                            <h2 style={{marginLeft:'15px'}}>Adresse:  {talent.adress}</h2>
                        </Row>
                            <h2 style={{marginLeft:'15px'}}>Formation: </h2>
                            
                        <Row style={{display:"flex", flexDirection:'column',alignItems:"start", marginLeft:'15px'}}>
                        {listformation}
                        </Row> 
    
                            <h2 style={{marginLeft:'15px'}}>Experience: </h2>
                       <Row style={{display:"flex", flexDirection:'column',alignItems:"start", marginLeft:'15px'}}>
                           {listexperience}
                       
                        </Row> 
                        <Row>
                            <h2 style={{marginLeft:'15px'}}>Note des précédents employeurs: </h2>
                        </Row>
                        <Row tyle={{display:"flex", flexDirection:'row',alignItems:"start"}}>
                        <Col style={{display:"flex", flexDirection:'column',alignItems:"start"}}>
                            <h3 style={{marginLeft:'20px'}}>Ponctualité : </h3>
                            <h3 style={{marginLeft:'20px'}}>Rigueur : </h3>
                            <h3 style={{marginLeft:'20px'}}>Gestion du stress : </h3>
                            <h3 style={{marginLeft:'20px'}}>Amabilité : </h3>
                            <h3 style={{marginLeft:'20px'}}>Efficacité : </h3>
                        </Col>
                        <Col style={{display:"flex", flexDirection:'column',alignItems:"start"}}>
                            <Rate disabled defaultValue={2} />
                            <Rate disabled defaultValue={2} />
                            <Rate disabled defaultValue={2} />
                            <Rate disabled defaultValue={2} />
                            <Rate disabled defaultValue={2} />
                        </Col>
                        </Row>
                            <Col style={{display:"flex", flexDirection:'row', alignItems:"start", justifyContent:"center"}}>
                            <h4 style={{marginLeft:'15px'}}>Téléphone: {talent.phone} </h4>
                          
                            <h4 style={{marginLeft:'15px'}}>E-mail: {talent.email} </h4>
                            </Col>
    
                    </Col>
                </Row>
              </Modal>
            </Col>
    
        )
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