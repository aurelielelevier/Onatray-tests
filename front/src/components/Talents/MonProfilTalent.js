import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import 'antd/dist/antd.less';
import '../../App.less';
import HeaderTalent from '../HeaderTalent';
import { Card, Rate, Row, Col, Tag} from 'antd';
import { PhoneOutlined, MailOutlined, HomeOutlined, EditOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

function MonProfilTalentt(props) {
    var user = props.profilToDisplay
    console.log(user)
    const[profil, setProfil]= useState({})
    const[domicile, setDomicile]= useState([48.85,2.33])
    const[polygone, setPolygone]= useState([])
    const { Meta } = Card;
    
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
    useEffect(() => {
        async function cherche() {
            var chercheProfil = await fetch(`/talents/profil/${props.tokenToDisplay}`);
            var profil = await chercheProfil.json()
            setProfil(profil)
            setPolygone(profil.perimetre.map(point => [point[1], point[0]]))
            setDomicile([profil.adresselgtlat.coordinates[1], profil.adresselgtlat.coordinates[0]])
        }
        cherche()
         props.onChargeProfil(profil)
         console.log(profil, 'PROFIL PAGE PROFIL')
         
    },[])
    
    if(profil.formation){
         var formation = profil.formation.map((formation, i)=>{
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
    if(profil.experience){
        var experience = profil.experience.map((experience, i)=>{
           return(
               <Row>
                   <Col span={6} style={{padding:30}}> {experience.firm}</Col>
                   <Col span={6} style={{padding:30}}> {experience.city}</Col>
                   <Col span={6} style={{padding:30}}> De {experience.startingDate} à {experience.endingDate}</Col>
               </Row>
               
           )
       })
   } else {
       var experience = <div>Aucune expérience renseignée pour le moment</div>
   }
   if(profil.working){
       var enposte = 'Je suis actuellement en poste'
   } else {
       var enposte = "Je n'ai pas d'emploi pour le moment"
   }
   if(profil.lookingJob){
       var jobs = 'en tant que '
       for(var i=0; i<profil.lookingJob.length; i++){
           if(i==profil.lookingJob.length-1){
            jobs+= ' '+profil.lookingJob[i]+'.'
           } else {
            jobs+= ' '+profil.lookingJob[i]+','
           }
       }
   } else {
       var jobs =''
   }
   if(profil.speakLangage){
      var langues = ' '
      for(var i=0; i<profil.speakLangage.length; i++){
        if(i==profil.speakLangage.length-1){
            langues+= ' '+profil.speakLangage[i]+'.'
        } else {
            langues+= ' '+profil.speakLangage[i]+','
        }
      }   
   } else {
       var langues =''
   }

   if(profil.lookingForJob){
       var chercheUnEmploi = <div>Je cherche un emploi en ce moment

                            </div>
   } else {
       var chercheUnEmploi ="Je ne cherche pas d'emploi en ce moment"
   }
  
    return(
        <div>
          <HeaderTalent keyheader='5'/>
          <Row style={{justifyContent:'center', color:'white', fontWeight:'bold', fontSize:'30px', backgroundColor:'#4B6584'}}>Mon profil</Row>
          <Row>
            <Col span={8} style={{backgroundColor:'#d1d8e0', height:'100%', padding:20}}>
                <div style={{borderRadius:'50%',width:200, margin:'auto', height:200, border:'6px solid #4B6584', backgroundImage:`url(${props.profilToDisplay.avatar})`, backgroundRepeat: 'no-repeat',
                    backgroundSize: "cover",}}></div>
                <div className="site-card-border-less-wrapper" style={{marginTop:30, textAlign:'center'}}>
                    <Card title={`${profil.firstName} ${profil.lastName}`} bordered={false} style={{ width:'100%', fontWeight:'bold', color:'#4B6584' }}>
                    <p><HomeOutlined style={{marginRight:'10px'}}/>{profil.adress}</p>
                    <p><PhoneOutlined style={{marginRight:'10px'}}/>{profil.phone}</p>
                    <p><MailOutlined style={{marginRight:'10px'}}/>{profil.email}</p>
                    <p><Tag icon={<LinkedinOutlined />} color="#55acee">
                            LinkedIn
                        </Tag></p>
                    <EditOutlined />
                    
                    </Card>
                    <p style={{color:"#4B6584", marginTop:'20px', fontWeight:"bold"}}>Ma note moyenne attribuée par les restaurants :</p> 
                    <p style={style.textCard}><Rate disabled defaultValue={2} />2 (10 votes)</p>
                </div>

            </Col>
            <Col span={16} style={{padding:30}}>
                <h2 style={style.titres}>Mes formations</h2>
                    {formation}
                    <Col span={2} offset={22}><EditOutlined /></Col>
                    <hr></hr>
                <h2 style={style.titres}>Mon expérience</h2>
                {experience}
                <Col span={2} offset={22}><EditOutlined /></Col>
                <hr></hr>

                <h2 style={style.titres}>{enposte}</h2>
                <h2 style={style.titres}>{chercheUnEmploi}{jobs}</h2> 
                <Col span={2} offset={22}><EditOutlined /></Col>
                <hr></hr>

                <h2 style={style.titres}>Je parle : {langues}</h2>
                    <Col span={2} offset={22}><EditOutlined /></Col>
                    <hr></hr>
                    <Col span={10}><h2 style={style.titres}>Ma zone de recherche :<EditOutlined style={{marginLeft:40}}/></h2> </Col>
                    
                    <div>
                    <Map center={domicile} zoom={12}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                        <Polygon positions={polygone} color="red" />
                        <Marker position={domicile}>
                            <Popup> Mon domicile <br/></Popup>
                        </Marker>
                    </Map>
                    </div>
            </Col>
          </Row>
         
        </div>
    )
}

function mapStateToProps(state) {
    return {profilToDisplay: state.profil, tokenToDisplay: state.token}
    }

function mapDispatchToProps (dispatch) {
return {
    onChargeProfil: function(profil){
        dispatch({type:'addProfil', profil:profil})
    }
    }
}
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(MonProfilTalentt);