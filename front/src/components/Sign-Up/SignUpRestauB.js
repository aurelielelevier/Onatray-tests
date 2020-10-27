import React, {useState} from 'react'

import { Row, Col, Steps , Button, Input, Select, Divider, Radio, Form} from 'antd';

import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

const { Step } = Steps;
const { Option } = Select;

function SignUpRestauB(props){

    

    const [pricing, SetPricing] = useState()

    const [clienteleOptionChoosen, setClienteleOptionChoosen] = useState([])
    const [clienteleOptionToAdd, setClienteleOptionToAdd]= useState('')
    const [clienteleOption, setClienteleOptions] = useState([])

    const [restaurantOptionChoosen, setRestaurantOptionChoosen] = useState([])
    const [restaurantOptionToAdd, setRestaurantOptionToAdd]= useState('');
    const [restaurantOption, setRestaurantOption] = useState([])
       
    const [foodOptionChoosen, setFoodOptionChoosen] = useState([])
    const [foodOptionToAdd, setFoodOptionToAdd]= useState('');
    const [foodOption, setFoodOption] = useState([])

                
    var  addClienteleItem=(optionToAdd)=>{
        let newOption = {value:optionToAdd, label:optionToAdd}
        setClienteleOptions([...clienteleOption, newOption])
        setClienteleOptionToAdd('')
      }
      var dataClienteleOptionToAdd = clienteleOption.map(function(option,i){
          return <Option value = {option.value}>{option.label}</Option>
      })


      var  addRestaurantItem=(optionToAdd)=>{
        let newOption = {value:optionToAdd, label:optionToAdd}
        setRestaurantOption([...restaurantOption, newOption])
        setRestaurantOptionToAdd('')
      }
      var dataRestaurantOptionToAdd = restaurantOption.map(function(option,i){
        return <Option value = {option.value}>{option.label}</Option>
    })

      var  addFoodItem=(optionToAdd)=>{
    let newOption = {value:optionToAdd, label:optionToAdd}
    setFoodOption([...foodOption, newOption])
    setFoodOptionToAdd('')
    }   
    var dataFoodOptionToAdd = foodOption.map(function(option,i){
        return <Option value = {option.value}>{option.label}</Option>
    })

      const sendFormValues = async () => {
            await fetch('/restaurants/informations', {
            method:'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : `token=${props.tokenToDisplay}&clientele=${clienteleOptionChoosen}&restaurantOption=${restaurantOptionChoosen}&foodOption=${foodOptionChoosen}&pricing=${pricing}`
        })
        
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
                <Steps current={1} style={{paddingTop:40}}>
                    <Step title="Créer un compte" />
                    <Step title="Renseigner vos informations" />
                    <Step title="Récapitulatif"/>
                </Steps>
            </Col>
            <Col span={4}></Col>
        </Row>
        <Form name="complex-form" onFinish={sendFormValues}>
        <Row style={{display:'flex', paddingTop:'60px'}}>
            <Col offset={3} span={3}>
                <span>Gamme de prix</span>
            </Col>
            <Col offset={0} span={10}>
                <Form.Item>
                <Radio.Group onChange={(e) => SetPricing(e.target.value)} value={pricing}>
                    <Row style={{display:'flex'}} justify={'space-around'} >
                        <Col span={6}>
                            <Radio value={0}>$</Radio>
                        </Col>
                        <Col span={6}>
                            <Radio value={1}>$$</Radio>
                        </Col>
                        <Col span={6}>
                            <Radio value={2}>$$$</Radio>
                        </Col>
                    </Row>
                </Radio.Group>
                </Form.Item>
            </Col>
        </Row>
        <Row  style={{paddingTop:40}}>
            <Col offset={3} span={3}>
                <span>Clientèle</span>
            </Col>
            <Col span={18}>
            <Row>
                <Col span={6}>
                    <Form.Item label="clientele">
                    <Select 
                    onChange={(e)=>setClienteleOptionChoosen(e)}
                    style={{width:'80%'}}
                    mode='multiple'
                    name={'clientele'}
                    className="basic-multi-select"
                    classNamePrefix="select">
                   <Option value='touristique'>Touristique</Option>
                   <Option value='quartier'>De Quartier</Option>
                   <Option value='jeune'>Jeune</Option>
                   <Option value='agée'>Agée</Option>
                   {dataClienteleOptionToAdd}
                    </Select>
                    </Form.Item>
                </Col>
                <Col style={{display:'flex', alignItems:'flex-start', justifyContent:'flex-end', paddingRight:5}} span={6}><span>Ajoutez vos propres infos :</span> </Col>
                <Col span={6}> 
                    <Input 
                    style={{ width: 100 }}
                        onChange={(e) => setClienteleOptionToAdd(e.target.value)} 
                        value={clienteleOptionToAdd}
                    />
                    <Button style={{ height: 30 }} type="primary" onClick={()=>addClienteleItem(clienteleOptionToAdd)}>Add</Button>
                </Col>    
            </Row>
        </Col>  
        </Row>
        <Row  style={{paddingTop:40}}>
            <Col offset={3} span={3}>
                <span>Restaurant</span>
            </Col>
            <Col span={18}>
            <Row>
                <Col span={6}>
                    <Form.Item  label='restaurant'>
                    <Select
                    onChange={(e)=>setRestaurantOptionChoosen(e)}
                    style={{width:'80%'}}
                    mode='multiple'
                    name={'restaurant'}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    >
                    <Option value='calme'>Calme</Option>
                    <Option value='animé'>Animé</Option>
                    <Option value='branché'>Branché</Option>
                    <Option value='sobre'>Sobre</Option>
                    {dataRestaurantOptionToAdd}
                    </Select>
                    </Form.Item>
                </Col>
                <Col style={{display:'flex', alignItems:'flex-start', justifyContent:'flex-end', paddingRight:5}} span={6}><span>Ajoutez vos propres infos :</span> </Col>
                <Col span={6}> 
                    <Input 
                    style={{ width: 100 }}
                        onChange={(e) => setRestaurantOptionToAdd(e.target.value)} 
                        value={restaurantOptionToAdd}
                    />
                    <Button style={{ height: 30 }} type="primary" onClick={()=>addRestaurantItem(restaurantOptionToAdd)}>Add</Button>
                </Col>    
            </Row>
            </Col>  
        </Row>
        <Row  style={{paddingTop:40}}>
            <Col offset={3} span={3}>
                <span>Nourriture</span>
            </Col>
            <Col span={18}>
            <Row>
                <Col span={6}>
                    <Form.Item label='food'>
                    <Select
                    onChange={(e)=>setFoodOptionChoosen(e)}
                    style={{width:'80%'}}
                    mode='multiple'
                    name={'food'}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    >
                    <Option value='francaise'>Française</Option>
                    <Option value='italienne'>Italienne</Option>
                    <Option value='japonaise'>Japonaise</Option>
                    <Option value='healthy'>Healthy</Option>
                    {dataFoodOptionToAdd}
                    </Select>
                    </Form.Item>
                </Col>
                <Col style={{display:'flex', alignItems:'flex-start', justifyContent:'flex-end', paddingRight:5}} span={6}><span>Ajoutez vos propres infos :</span> </Col>
                <Col span={6}> 
                    <Input 
                    style={{ width: 100 }}
                        onChange={(e) => setFoodOptionToAdd(e.target.value)} 
                        value={foodOptionToAdd}
                    />
                    <Button style={{ height: 30 }} type="primary" onClick={()=>addFoodItem(foodOptionToAdd)}>Add</Button>
                </Col>    
            </Row>
            </Col>
        </Row>
        <Row style={{paddingTop:20}}>
            <Col offset={17} span={4}>
            <Form.Item>
                <Link to='/signUpRestauC'>
                    <Button  type="primary" htmlType="submit"  onClick={()=> sendFormValues()}>
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
function mapStateToProps(state) {
    return { tokenToDisplay: state.token }
  }
    
  export default connect(
    mapStateToProps, 
    null
  )(SignUpRestauB);
