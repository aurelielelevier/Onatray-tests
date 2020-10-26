import React from 'react'
import 'antd/dist/antd.less';
import '../../App.less'
import HeaderScreen from '../Header'
import {Image, Button, Carousel } from 'antd';

const contentStyle = {
    height: "400px",
    color: "#00000",
    lineHeight: "600px",
    textAlign: "center",
    backgroundImage:`url("../images/image-carousel-1.jpg")`, backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
  }
  const contentStyle2 = {
    height: "400px",
    color: "#00000",
    lineHeight: "600px",
    textAlign: "center",
    alignItems:'end',
    backgroundImage:`url("../images/image-carousel-2.png")`, backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
  }
  const styleCarousel = {
    justifyContent:'bottom',
    color:'black', 
    backgroundColor:'#11ffee00',
    fontSize:'3vw',
    fontWeight:'bold'
  }
  const styleButton2 = {
    height: '60px',
    marginBottom:'30px', 
  }

function ScreenHome() {
    return (
        <div>
            <HeaderScreen/>
            <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>
              <p style={styleCarousel}>Restaurants, vous cherchez des employés fiables ?</p>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle2}>
            <div style={styleCarousel}>Vous êtes à la recherche d'un emploi dans la restauration ?</div>
            </h3>
          </div>
        </Carousel>

        <Button type="primary" style={styleButton2}> Rejoignez-nous !</Button>

        </div>
    )
}
export default ScreenHome;