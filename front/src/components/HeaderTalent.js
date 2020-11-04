import React, {useState} from 'react';
import { Layout, Menu, Image, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import '../App.less'
import {connect} from 'react-redux'
import 'antd/dist/antd.less';

import {Link, Redirect} from 'react-router-dom';
const { SubMenu } = Menu;

const { Header } = Layout;

function HeaderTalent(props) {
  var  isSignIn = props.connectToDisplay.isSignIn
  const[visible, setVisible] = useState(false)
  
  const menu = (
  <Menu style={{padding:10}}>
    <Menu.Item>
      <Link to='/talent-mon-profil'>Mon profil</Link>
    </Menu.Item>
    <Link to='/messagerie'>
      < Menu.Item>Mes messages</Menu.Item>
    </Link>
    <Link to='/'>
      <Menu.Item onClick={()=>{{props.onDisconnect()}}}> Déconnexion </Menu.Item> 
    </Link>
  </Menu>
  )
  
  return (
   
      <div style={{justifyContent:'center'}}>
         
        <Menu style={{padding:'20px'}} mode="horizontal" defaultSelectedKeys={[`${props.keyheader}`]}>
            
          <Link to='/'>
            <Image
              width={'50px'}
              src="./images/logo-onatray.png"
              /> 
          </Link>

          <Menu.Item  key="1"><Link to='/'>Accueil</Link></Menu.Item>
          <Menu.Item  key="2"><Link to='/restaurants'>Voir les restaurants</Link></Menu.Item>
          <Menu.Item  key="3"><Link to='/restaurants-favoris'>Mes favoris</Link></Menu.Item>
          <Menu.Item  key="4"><Link to='/messagerie'>Mes messages</Link></Menu.Item>
          
          <div style={{float:'right'}}>
            <Dropdown overlay={menu} placement="bottomCenter">
            <Button type="primary" onClick={() => setVisible(true)} ><UserOutlined style={{color:'#4b6584'}}/>{props.profilToDisplay.firstName}</Button>
            </Dropdown>
          </div>
        </Menu>

        <div style={{ textAlign:'center'}}>
          
        </div>

      </div>
        
  );
}


function mapDispatchToProps(dispatch) {
  return {
    onDisconnect: function() { 
        dispatch( {type: 'disconnect'}) 
    
    }
  }
}

function mapStateToProps(state) {
  return {tokenToDisplay: state.token, connectToDisplay : state.isConnect, profilToDisplay: state.profil}
}
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(HeaderTalent);
