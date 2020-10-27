import React, {useState} from 'react'
import 'antd/dist/antd.less';
import '../App.less'
import Header from './Header'
import { Button, Select, Form, Col, Row,Card } from 'antd';
import Cardtalent from './Cartestalents/Cardtalent'

const { Option } = Select
const { Meta } = Card

function RecherchetalentA(props) {


const Submitform = values => {
        console.log('Received values of form:', values);
        console.log(posterecherché)
        console.log(typedecontrat)
        };


const [posterecherché,setposterecherché]= useState('')
const [typedecontrat,settypedecontrat]= useState('')
const [liketalent,setliketalent]=useState(false)


  
/// Tableaux à remplacer par des base de données
let talents = [
    {firstName: "name1", adresse:'4 impasse des roses' ,lastName: "lastname", email: "email", phone: "phone",  avatar: "url", lookingForJob:'oui', working:"non", src:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.0UTCKEezWBVn-ba2TJvsLQHaEL%26pid%3DApi&f=1'},
    {firstName: "Patrick",  adresse:'4 impasse des roses' ,lastName: "Brubru",email: "email2",  phone: "phone2",avatar: "url2",  lookingForJob:'oui2',working:"non2", src:'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.nuitsdesaintjacques.com%2Fwp-content%2Fuploads%2F2018%2F11%2FPatrick-Bruel.jpg&f=1&nofb=1'},
    {firstName: "name3", adresse:'4 impasse des roses' ,lastName: "lastname3", email: "email3",  phone: "phone3",avatar: "url3", lookingForJob:'oui3',working:"non3", src:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.OWmF8e8nYQrcU1s6zBByBgAAAA%26pid%3DApi&f=1'},
    {firstName: "didier",adresse:'4 impasse des roses' , lastName: "lastname4", email: "email4",  phone: "phone4",avatar: "url4", lookingForJob:'oui4',working:"non4",src:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.pubdwO5qsupbBYPTmLvRzwAAAA%26pid%3DApi&f=1'}]

let formation=[{name:"name1", school :"school1", city: 'city1',diploma:'diploma1', year:1995}, 
    {name:"name1",school :"school2", city: 'city2',diploma:'diploma2',year:2002},
    {name:"name2",school :"school1", city: 'city1',diploma:'diploma1',year:2003},
    {name:"name6", school :"school&", city: 'city1',diploma:'diploma1',year:2004},
    {name:"name3",school:"school2",city:"city2",diploma:"diploma1",year:2012}]

let experience= [{firm:"firm1",startingDate:2018, endingDate:2019, job:'serveur',city:'Toulouse'}]

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
console.log("sortedexperience", sortedexperience)
/// ne garde que les deux dernières formations
let formationshorten=[]
  for (var i= 0; i<2; i++){
        if(sortedformation[i]){
            formationshorten.push({
                year: sortedformation[i].year,
                name: sortedformation[i].name,
                school:sortedformation[i].school,
            })
        }else{
                formationshorten.push({
                    year:'',
                    name:'',
                    school:'',
                })
            }
        }

let experienceshorten=[]
for (var i= 0; i<2; i++){
    if(sortedexperience[i]){
        experienceshorten.push({
            year: sortedexperience[i].year,
            name: sortedexperience[i].name,
        })
    }else{
        experienceshorten.push({
                year:'',
                name:'',
                school:'',
            })
        }
    }

var talentslist = talents.map((talents,i) => {
    return (
       <Cardtalent key={i} src={talents.src} talent={talents} sortedexperience={sortedexperience} sortedformation={sortedformation} formationyear1={formationshorten[0].year} formationyear2={formationshorten[1].year} formationschool1={formationshorten[0].school} formationschool2={formationshorten[1].school} formationname1={formationshorten[0].name} formationname2={formationshorten[1].name} experienceyear1={experienceshorten[0].year} experienceyear2={experienceshorten[1].year} experiencename1={experienceshorten[0].name} experiencename2={experienceshorten[1].name} />
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