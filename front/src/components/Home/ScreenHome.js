import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.less';
import '../../App.less';
import HeaderScreen from '../Header';
import HeaderRestaurant from '../HeaderRestaurant';
import HeaderTalent from '../HeaderTalent'
import {Button, Carousel, Modal} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

// ajouter condition pour affichage du bon composant si utilisateur non connecté/restaurant/talent

            
function ScreenHome(props) {
  const [visible, setVisible] = useState(false)

  var  isSignIn = props.connectToDisplay.isSignIn
  var  isTalent = props.connectToDisplay.isTalent
  var  isRestau = props.connectToDisplay.isRestau

 

  
    
  

    if(!isSignIn){
      return (
        <div style={{textAlign:'center'}}>
            <HeaderScreen/>
          
          <div>
            <div style={{color:'#4b6584', fontWeight:'bold', fontSize:'30px'}}>On a Tray</div>
            <div style={{color:'#4b6584', fontSize:'25px'}}>Une communauté pour les restaurants et leurs personnels</div>
          </div>
          

          <Carousel autoplay>
            <div>
              <h3 style={stylesheets.contentStyle}>
                <p style={stylesheets.styleCarousel}>Restaurants, vous cherchez des employés fiables ?</p>
              </h3>
            </div>
            <div>
              <h3 style={stylesheets.contentStyle2}>
              <div style={stylesheets.styleCarousel}>Vous êtes à la recherche d'un emploi dans la restauration ?</div>
              </h3>
            </div>
          </Carousel>
          <p style={stylesheets.styleCarousel2}>Restaurants : Recrutez du personnel fiable et adapté à votre établissement</p>
          <p style={stylesheets.styleCarousel2}>Talents : Mettez en valeur vos diplômes et votre expérience pour trouver un emploi à votre juste valeur</p>

          <Link to='/signUpTalentA'><Button style={stylesheets.styleButton2} type="primary">Talents</Button></Link>
          <Link to='/signUpRestauA'><Button style={stylesheets.styleButton2}  type="primary">Restaurants</Button></Link>

        </div>
    )
    }
    else if( isSignIn && isTalent){
      return(
        <Redirect to="/restaurants"/>
     )
     }else if( isSignIn  && isRestau ){
       return(
         <Redirect to="/recherchetalentA"/>
      )
     }
  
 }
const stylesheets = {
  menu: {
    backgroundColor: '#fed330',
    color : '#4b6584'
  },
  contentStyle:{
    height: "400px",
    color: "#00000",
    lineHeight: "600px",
    textAlign: "center",
    backgroundImage:`url("../images/image-carousel-1.jpg")`, backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
  },
  contentStyle2:{
    height: "400px",
    color: "#00000",
    lineHeight: "600px",
    textAlign: "center",
    alignItems:'end',
    backgroundImage:`url("../images/image-carousel-2.png")`, backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
  },
  styleCarousel:{
    justifyContent:'bottom',
    color:'black', 
    backgroundColor:'#11ffee00',
    fontSize:'3vw',
    fontWeight:'bold'
  },
  styleCarousel2: {
    justifyContent:'bottom',
    color:'black', 
    backgroundColor:'#11ffee00',
    fontSize:'1vw',
    fontWeight:'bold'
  },
  styleButton2: {
    height: '60px',
    width : '120px',
    margin:'30px', 
    

  }
}

function mapStateToProps(state) {
  return { connectToDisplay : state.isConnect, tokenToDisplay: state.token}
}
  
export default connect(
  mapStateToProps, 
  null
)(ScreenHome);

