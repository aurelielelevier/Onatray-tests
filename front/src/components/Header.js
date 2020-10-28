import React, {useState} from 'react';

import { Layout, Menu, Image, Button, Form, Checkbox, Input, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import '../App.less'


import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const { SubMenu } = Menu;
const { Header } = Layout;



function HeaderScreen(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  


  const [visible, setVisible] = useState(false);
  
  var sendFormValues = async () => {
   
    let rawResponse = await fetch('/sign_in', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${email}&password=${password}`
    
    })
    let response = await rawResponse.json()
    console.log('reponse',response)

    if ( response.result == 'Error'){
       setErrorMessage('Email ou mot de passe incorrect')
    }
    else if(response.result === true && response.type=='talent'){
      props.onSendSignIn({isSignIn:true, isTalent:true, isRestau:false})

    }else if (response.result == true && response.type=='restaurant'){
      props.onSendSignIn({isSignIn:true, isTalent:false, isRestau:true})
     
    }
  }

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
              
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur !' }]}
              >
                <Input onChange={(e)=>setEmail(e.target.value)} value={email}
                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
              >
                <Input.Password
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mot de passe"
                />
              </Form.Item>
              {errorMessage}
              <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Se souvenir de moi</Checkbox>
              </Form.Item>

                {/* <Link className="login-form-forgot" >
                  J'ai oublié mon mot de passe
                </Link> */}
              </Form.Item>

              <Form.Item>
                <Button onClick={()=>sendFormValues()} type="primary" htmlType="submit" className="login-form-button">
                  Se connecter
                </Button>      
              </Form.Item>
            </Form>
          </Modal>
          
          <Menu style={{padding:'20px'}} mode="horizontal" defaultSelectedKeys={['1']}>
            
          <Link to={'/'}><Image
                        width={'50px'}
                        src="./images/logo-onatray.png"
                      /> </Link>

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

function mapDispatchToProps(dispatch) {
  return {
    onSendSignIn: function(isConnect) { 
        dispatch({type: 'AddConnect', isConnect}) 
    }
    
  }
}



export default connect(
    null, 
    mapDispatchToProps
)(HeaderScreen);


