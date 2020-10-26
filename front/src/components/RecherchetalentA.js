import React, {useState,Text} from 'react'
import 'antd/dist/antd.less';
import '../App.less'
import Header from './Header'
import { Button, Select, Form, Col, Row,Card,Avatar } from 'antd';
import {
    ExpandAltOutlined,
    SendOutlined,
    HeartOutlined,
    HeartFilled
    
  } from "@ant-design/icons"

const { Option } = Select
const { Meta } = Card

function RecherchetalentA() {


const Submitform = values => {
        console.log('Received values of form:', values);
        console.log(posterecherché)
        console.log(typedecontrat)
        };


const [posterecherché,setposterecherché]= useState('')
const [typedecontrat,settypedecontrat]= useState('')
const [liketalent,setliketalent]=useState(false)


function onliketalent(){
    setliketalent(true)
}
function ondisliketalent(){
    setliketalent(false)
}

  
/// Tableaux à remplacer par des base de données
let Talents = [
    {name: "name1", lastName: "lastname", email: "email", phone: "phone",  avatar: "url", lookingForJob:'oui', working:"non",},
    {name: "name2",  lastName: "lastname2",email: "email2",  phone: "phone2",avatar: "url2",  lookingForJob:'oui2',working:"non2",},
    {name: "name3",lastName: "lastname3", email: "email3",  phone: "phone3",avatar: "url3", lookingForJob:'oui3',working:"non3"},
    {name: "name4",lastName: "lastname4", email: "email4",  phone: "phone4",avatar: "url4", lookingForJob:'oui4',working:"non4"}]

let formation=[{name:"name1", school :"school1", city: 'city1',diploma:'diploma1', year:1995}, 
    {name:"name1",school :"school2", city: 'city2',diploma:'diploma2',year:2002},
    {name:"name2",school :"school1", city: 'city1',diploma:'diploma1',year:2003},
    {name:"name3", school :"school&", city: 'city1',diploma:'diploma1',year:2004},
    {name:"name3",school:"school2",city:"city2",diploma:"diploma1",year:2012}]

let experience= [{ name:"experience1",year:2018},{name:"experience2",year:2015},{name:"experience3",year:2020}]

/// liste formation trier par date
let sortedformation = [...formation];
        sortedformation.sort((a, b) => {
            if (a.year > b.year) {
            return -1;
            }
            if (a.year < b.year) {
            return 1;
            }
            return 0;
        })

/// liste expérience trier par date
let sortedexperience = [...experience];
sortedformation.sort((a, b) => {
    if (a.year > b.year) {
    return -1;
    }
    if (a.year < b.year) {
    return 1;
    }
    return 0;
})


var talentslist = Talents.map((Talents,i) => {
    
    return (
        <Col className="gutter-row" span={5}>
        <Card
            key={i}
            style={{
                margin:'10px'
            }}
            cover={
            <img
                alt="example"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            }
            actions={[
            <SendOutlined key="sendOutlined"/>,
            liketalent === false ?<HeartOutlined onClick={() => onliketalent()} key="HeartOutlined" />  : <HeartFilled onClick={() => ondisliketalent()} key= "HeartFilled"/>,
            <ExpandAltOutlined key="ExpandAltOutlined" />
            ]} >
            <Meta/>
            <h2>{Talents.name}</h2>
            <p style={{fontWeight: "bold"}}>Formations</p>
            <p>{sortedformation[0].year} -{sortedformation[0].school} - {sortedformation[0].name}</p>
            <p>{sortedformation[1].year} -{sortedformation[1].school} - {sortedformation[1].name}</p>

            <p style={{fontWeight: "bold"}}>Expérience</p>
            <p>{sortedexperience[0].year} - {sortedexperience[0].name}</p>
            <p>{sortedexperience[1].year} - {sortedexperience[1].year}</p>
            
            
        </Card>
    </Col>
    )
  })

return(
                     
<div>
<Header/>

<Row style={{backgroundColor:"#4B6584", height:"150px", display:"flex", justifyContent:"center", alignItems:'center', marginBottom:"15px"}}>
    
    <Col span={18} >
    <Form name="complex-form"  autoComplete="off" layout='inline'>
    
        <Col flex={2}>
                <Form.Item label="Poste recherché" style={{color: '#ffffff'}}>
                    <Select 
                    showSearch
                    onChange={(e)=>setposterecherché(e)}
                   
                    name={'Poste recherché'}
             
                    className="basic-multi-select"
                    classNamePrefix="select">
                        <Option value='Serveur'>Serveur</Option>
                        <Option value='Cuisiner'>Cuisinier</Option>
                        <Option value='Comis'>Comis</Option>
                
                    </Select>
                </Form.Item>
            </Col>

            <Col flex={3}>
                <Form.Item label="Type de contrat">
                    <Select 
                    showSearch
        
                    onChange={(e)=>settypedecontrat(e)}
                    name={'language'}
                    className="basic-multi-select"
                    classNamePrefix="select">
                        <Option value='CDI'>CDI</Option>
                        <Option value='CDD'>CDD</Option>
                        <Option value='Mi Temps'>Mi Temps</Option>
                        <Option value='Interim<'>Interim</Option>
                
                    </Select>
                </Form.Item>
            </Col>
            <Form.Item>
            <Button onClick={Submitform()} type="primary" > Rechercher</Button>
            </Form.Item>
    </Form>
</Col>
</Row>
<Row style={{display:"flex", justifyContent:"center", alignItems:'center'}}>

    {talentslist}
    
</Row>



</div>

    )
}
export default RecherchetalentA;