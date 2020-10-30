import React, {useState, useEffect} from 'react'

import { Row, Col, Steps,Form, Input, Button, Checkbox, AutoComplete} from 'antd';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom'


const { Step } = Steps;

function SignUpRestauA(props){
    const[adresse, setAdresse] = useState('')
    const[adressesProposees, setAdressesProposees] = useState('')
    const [lnglat, setlnglat] = useState([])

    useEffect(() => {
        let tableauAdresse = adresse.split(' ')
        let requete = ''
        for(var i=0; i<tableauAdresse.length; i++){
          if(i===tableauAdresse.length-1){
            requete += tableauAdresse[i]
          } else {
            requete += tableauAdresse[i] + '+'
          }
        }
        async function autocompletion(){
          var rawResponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${requete}`)
          var response = await rawResponse.json()
          var liste = []
          for(var i=0; i<response.features.length; i++){
            liste.push({value : response.features[i].properties.label})
          }
          setAdressesProposees(liste)
          if(response.features[0]){
            setlnglat([response.features[0].geometry.coordinates[0], response.features[0].geometry.coordinates[1]])
            
          }
        } 
        autocompletion()
      }, [adresse])

    const [restaurantName, setRestaurantName] = useState('')
    //const [restaurantAdress, setRestaurantAdress] = useState('')
    const [restaurantSiret, setRestaurantSiret] = useState('')
    const [restaurantWebsite, setRestaurantWebsite] = useState('')
    const [phoneRestaurant, setPhoneRestaurant] = useState('')
    
    const [restaurantEmail, setRestaurantEmail] = useState('')
    const [verifyRestaurantEmail, setVerifyRestaurantEmail] = useState('')
    
    const [restaurantPassword, setRestaurantPassword] = useState('')
    const [verifyRestaurantPassword, setVerifyRestaurantPassword] = useState('')
    
    

    var sendFormValues = async () => {
        console.log(JSON.stringify(lnglat))
        
         var rawResponse =  await  fetch('restaurants/createAccount', {
            method:'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : `restaurantName=${restaurantName}&restaurantEmail=${restaurantEmail}&restaurantAdress=${adresse}&restaurantSiret=${restaurantSiret}&restaurantWebsite=${restaurantWebsite}&phoneRestaurant=${phoneRestaurant}&restaurantPassword=${restaurantPassword}&lnglat=${JSON.stringify(lnglat)}`
        })
        var response = await rawResponse.json()
        props.onSendToken(response.token)
    }

    const onFinish = (values) => {
        console.log('Success:', values);
      };

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const validateMessages = {
        required: 'Champ vide',
        types: {
          email: 'Email invalide !',
          number: '${label} is not a validate number!',
          
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };

      
     

    return(
        <div>

            <Row style={{height:'80px'}}>
                <Col style={{
                    backgroundColor: '#FED330',
                    }} span={24}>navbar
                </Col>
            </Row>

            <Row style={{paddingLeft:20, paddingTop:10, display:'flex', flexDirection:'column', }}>
                <Col span={12} style={{color:'#4B6584', fontSize:24}}>Créer un compte gratuitement dès maintenant
                </Col>
                <Col span={12}> Déjà un compte ? Connectez vous</Col>
            </Row>
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <Steps current={0} style={{paddingTop:40}}>
                        <Step title="Créer un compte" />
                        <Step title="Renseigner vos informations" />
                        <Step title="Récapitulatif"/>
                    </Steps>
                </Col>
                <Col span={4}></Col>
            </Row>
            
            <Form
                validateMessages={validateMessages}
                style={{paddingTop:'60px'}}
                name="basic"
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Row style={{width:'100%'}}>
                    <Col offset={4} span={6}>
                        <Form.Item
                            label="Nom du restaurant"
                            name="restaurantName"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                        <Input onChange={(e) => setRestaurantName(e.target.value)} 
                        value={restaurantName}
                        />
                        </Form.Item>
                    </Col>
                    <Col offset={2} span={6}>
                        <Form.Item
                            colon={false}
                            label="Email"
                            name="restaurantEmail"
                            rules={[
                            {
                                required: true,
                                type:'email'
                            },
                            ]}
                        >
                        <Input onChange={(e) => setRestaurantEmail(e.target.value)} 
                        value={restaurantEmail}
                        />
                        </Form.Item>
                    </Col>
                </Row>  
                <Row style={{width:'100%'}}>
                    <Col offset={4} span={6}>
                        <Form.Item
                            label="Adresse"
                            name="restaurantAdress"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                        <AutoComplete 
                        style={{ width: 283 }}
                        options={adressesProposees}
                        placeholder="Entrez votre adresse"
                        filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onChange={(e)=>{setAdresse(e)}}
                        value={adresse}
                        />
                        </Form.Item>
                    </Col>
                    <Col offset={2} span={6}>
                        <Form.Item
                        label="Confirmez votre email"
                        dependencies={['restaurantEmail']}
                        name="verifyRestaurantEmail"
                        rules={[
                            {
                              required: true,
                              message: 'Confirmez votre Email !',
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (!value || getFieldValue('restaurantEmail') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject('Les emails ne correspondent pas !');
                              },
                            }),
                          ]}
                        >
                        <Input onChange={(e)=> setVerifyRestaurantEmail(e.target.value)}  
                        value={verifyRestaurantEmail} 
                        />
                        </Form.Item>
                    </Col>
                </Row>  
                <Row style={{width:'100%'}}>
                    <Col offset={4} span={6}>
                        <Form.Item
                                colon={false}
                                label="N° de siret"
                                name="restaurantSiret"
                        >
                        <Input onChange={(e) => setRestaurantSiret(e.target.value)} 
                        value={restaurantSiret}
                        />
                        </Form.Item>
                    </Col>
                    <Col offset={2} span={6}>
                        <Form.Item
                            colon={false}
                            label="Mot de passe"
                            name="restaurantPassword"
                            rules={[
                            {
                                required: true,
                               
                                
                            },
                            ]}
                        >
                        <Input.Password onChange={(e) => setRestaurantPassword(e.target.value)} 
                        value={restaurantPassword}
                        />
                        </Form.Item>
                    </Col>
                </Row>  
                <Row style={{width:'100%'}}>
                    <Col offset={4} span={6}>
                        <Form.Item
                            label="Website"
                            name="restaurantWebsite"
                            
                        >
                        <Input onChange={(e) => setRestaurantWebsite(e.target.value)} 
                        value={restaurantWebsite}
                        />
                        </Form.Item>
                    </Col>
                    <Col offset={2} span={6}>
                        <Form.Item
                            colon={false}
                            label="Confirmez votre mot de passe"
                            name="verifyRestaurantPassword"
                            rules={[
                                {
                                  required: true,
                                  message: 'Confirmez votre mot de passe !',
                                },
                                ({ getFieldValue }) => ({
                                  validator(rule, value) {
                                    if (!value || getFieldValue('restaurantPassword') === value) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject('Les mots de passe ne correspondent pas !');
                                  },
                                }),
                              ]}
                        >
                        <Input.Password onChange={(e) => setVerifyRestaurantPassword(e.target.value)} 
                        value={verifyRestaurantPassword}
                        />
                        </Form.Item>
                    </Col>
                </Row>  
                <Row>
                    <Col offset={4} span={6}>
                    <Form.Item
                            colon={false}
                            label="N° telephone"
                            name="phoneRestaurant"
                            rules={[
                            {
                                required: true,
                                
                            },
                            ]}
                        >
                        <Input onChange={(e) => setPhoneRestaurant(e.target.value)} 
                        value={phoneRestaurant}
                        />
                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                    <Col offset={14}  style={{display:'flex'}}>
                        <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Se souvenir de moi</Checkbox>
                        </Form.Item>

                        <Form.Item >
                            <Link to='signUpRestauB/'>
                            <Button  type="primary"  onClick={()=> sendFormValues()}>
                                Submit
                            </Button>
                            </Link>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
            
            
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
      onSendToken: function(token) { 
          dispatch( {type: 'addToken', token} ) 
      }
    }
  }
  
  export default connect(
      null, 
      mapDispatchToProps
  )(SignUpRestauA);
