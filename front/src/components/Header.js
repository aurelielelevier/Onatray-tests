import React, {useState} from 'react';

import { Layout, Menu, Image, Button,  Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import '../App.less'

import {Link} from 'react-router-dom';

const { SubMenu } = Menu;
const { Header } = Layout;

function HeaderScreen(props) {
  const [visible, setVisible] = useState(false);

 
  return (
    <div style={{justifyContent:'center'}}>
      <Modal
        title="Connection réservée aux membres inscrits"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={500}
      >
      </Modal>   
      <Menu style={{padding:'20px'}} mode="horizontal" defaultSelectedKeys={['1']}> 
        <Link to='/'>
          <Image
            width={'50px'}
            src="./images/logo-onatray.png"
          />           
        </Link> 
        <div style={{float:'right'}}>
          <Link to='/signIn'> <Button type="primary" ><UserOutlined style={{color:'#4b6584'}}/>Se connecter</Button></Link> 
        </div>
      </Menu>
          <div style={{ textAlign:'center'}}></div>

    </div>
        
  );
}

export default HeaderScreen;
