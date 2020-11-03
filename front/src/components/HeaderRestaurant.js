import React, {useState} from 'react';
import { Layout, Menu, Image, Button, Dropdown} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import '../App.less'
import {connect} from 'react-redux'
import 'antd/dist/antd.less';

import {Link, Redirect} from 'react-router-dom';

const { SubMenu } = Menu;
const { Header } = Layout;

function HeaderRestaurant(props) {
  var  isSignIn = props.connectToDisplay.isSignIn
  
const menu = (
  <Menu style={{padding:10}}>
    <Menu.Item>
      <Link to='/restaurant-mon-profil'>Mon profil</Link>
    </Menu.Item>
    <Menu.Item>
    <Link to='/messagerie'>Mes messages</Link>
    </Menu.Item>
    <Menu.Item onClick={()=>{{props.onDisconnect()}}}>
      Déconnexion 
    </Menu.Item>
  </Menu>
)

if(!isSignIn){
  console.log(props.tokenToDisplay, 'props.tokentodisplay')
  return( <Redirect to='/'/>)
} else {

  return( 
    <div style={{justifyContent:'center'}}>
          
    {(props.tokenToDisplay === '')?<Redirect to='/' />:
      <Menu style={{padding:'20px'}} mode="horizontal" defaultSelectedKeys={['1']}>
        <Link to='/'>
          <Image
            width={'50px'}
            src="./images/logo-onatray.png"
          /> 
        </Link>
        <Menu.Item  key="1"><Link to='/'>Accueil</Link></Menu.Item>
        <Menu.Item  key="2"><Link to='/recherchetalent'>Rechercher des talents</Link></Menu.Item>
        <Menu.Item  key="3"><Link to='/wishlistRestaurant'>Mes favoris</Link></Menu.Item>
        <Menu.Item  key="4"><Link to='/messagerie'>Mes messages</Link></Menu.Item>
        
        <div style={{float:'right'}}>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button type="primary" ><UserOutlined style={{color:'#4b6584'}}/>{props.profilToDisplay.name}</Button>
          </Dropdown>
        </div>
      </Menu>
      }
      <div style={{ textAlign:'center'}}>
      </div>
    </div>
  )
}
}

function mapDispatchToProps(dispatch) {
  return {
    onDisconnect: function(valeur) { 
        dispatch( {type: 'disconnect', isConnect : false}) 
    }
  }
}
function mapStateToProps(state) {
  return {tokenToDisplay: state.token, connectToDisplay : state.isConnect, profilToDisplay : state.profil}
}
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(HeaderRestaurant);
