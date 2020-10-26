import React, {useState} from 'react';
import { Layout, Menu, Image, Button, Form, Checkbox, Input, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import '../App.less'

import 'antd/dist/antd.less';

import {Link} from 'react-router-dom';
const { SubMenu } = Menu;

const { Header } = Layout;

function HeaderScreen() {
  const [visible, setVisible] = useState(false);

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  
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
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur !' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Utilisateur" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mot de passe"
                />
              </Form.Item>
              <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Se souvenir de moi</Checkbox>
              </Form.Item>

                <Link className="login-form-forgot" >
                  J'ai oublié mon mot de passe
                </Link>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Se connecter
                </Button>
                      ou <Link >  S'enregistrer</Link>
              </Form.Item>
            </Form>
          </Modal>
          
          <Menu style={{padding:'20px'}} mode="horizontal" defaultSelectedKeys={['1']}>
            
              <Image
                        width={'50px'}
                        src="./images/logo-onatray.png"
                      /> 

              <Menu.Item  key="1"><Link to={'/'}>Accueil</Link></Menu.Item>

              <SubMenu key="2" title='Nos services'> 
                <Menu.Item key="setting:1"><Link to={'/'}>Menu1</Link></Menu.Item>
                <Menu.Item key="setting:2"><Link to={'/'}>Menu2</Link></Menu.Item>
              </SubMenu>
          
              <div style={{float:'right'}}>
                <Button type="primary" onClick={() => setVisible(true)} ><UserOutlined style={{color:'#4b6584'}}/>Se connecter</Button>
              </div>
          
          </Menu>

          <div style={{ textAlign:'center'}}>
          
          </div>

      </div>
        
  );
}

export default HeaderScreen;
