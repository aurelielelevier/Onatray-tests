import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import Header from '../Header'

import {Row, Col, Card} from 'antd'
import {EditOutlined} from "@ant-design/icons"


function SignUpTalentD (props) {

    const [talentFormationInfo, setTalentFormationInfo] = useState([])
    const [talentExperiencetInfo, setTalentExperienceInfo] = useState([])
    const [langage, setlangage] = useState([])
    const [currently, setCurrently] = useState('')
    const [currentJob, setCurrentJob] = useState("")
    const [jobSearch, setJobSearch] = useState([])
    const [contractSearch, setContractSearch] = useState([])

    var dataFormation = "Vous n'avez pas renseigné de formations"
    var dataExperience = "Vous n'avez pas renseigné d'éxperiences"
    var dataLangage = "Vous n'avez pas renseigné les langues que vous parlés"
    var dataJob = "Aucun"
    var dataContract = "Aucun"
    useEffect(() => {

        console.log('talentInfo',props.talentInfoToDisplay )
        console.log('talentLocalisationInfo',props.talentLocalisationInfoToDisplay )
        console.log('talentcompletinfo',props.talentCompletInfoToDisplay )


            if(!props.talentCompletInfoToDisplay.langage){     
            }
            else{
                setlangage(props.talentCompletInfoToDisplay.langage)
            }
            if(!props.talentCompletInfoToDisplay.formation){     
            }
            else{
                setTalentFormationInfo(props.talentCompletInfoToDisplay.formation)
            }
            if(!props.talentCompletInfoToDisplay.experience){     
            }
            else{
                setTalentExperienceInfo(props.talentCompletInfoToDisplay.experience)
            }

            if(props.talentCompletInfoToDisplay.enRecherche == true){
                    setCurrently('Vous êtes en recherche')
            }else {
                setCurrently("Vous ne recherchez pas d'emploie pour le moment")
            }
            if(props.talentCompletInfoToDisplay.enPoste == true){
                setCurrentJob("Vous êtes en poste")
            }else {
                setCurrentJob("Vous n'avez pas d'emploie pour le moment")
            }
            if(!props.talentCompletInfoToDisplay.job){     
            }
            else{
               setJobSearch(props.talentCompletInfoToDisplay.job)
            }
            if(!props.talentCompletInfoToDisplay.contrat){     
            }
            else{
               setContractSearch(props.talentCompletInfoToDisplay.contrat)
            }

                console.log("CONTRATSEARCH", contractSearch)
      }, []);

        if(talentFormationInfo.length != 0){
            var dataFormation = talentFormationInfo.map((formation, i) => {
               
                    return (
                        <span> <p style={{fontWeight:'bold'}}> Formation{i+1} </p>
                        <p><span style={{fontWeight:'bold'}}> École :</span> {formation.school} <span style={{fontWeight:'bold'}}> Diplôme :</span> {formation.diploma}  </p>
                        <p><span style={{fontWeight:'bold'}}> Ville :</span> {formation.citys} <span style={{fontWeight:'bold'}}> Année d'obtention :</span>{formation.year} </p>
                        </span>
                    )
           })
        }
        if(talentExperiencetInfo.length != 0){
            var dataExperience = talentExperiencetInfo.map((expereience, i) => {
               
                    return (
                        <span> <p style={{fontWeight:'bold'}}> Experience {i+1} </p>
                        <p> <span style={{fontWeight:'bold'}}> Entreprise :</span> {expereience.firm} <span style={{fontWeight:'bold'}}>  Villes : </span> {expereience.city}  </p>
                        <p> <span style={{fontWeight:'bold'}}> Poste : </span>{expereience.job} </p>
                        <p> <span style={{fontWeight:'bold'}}> Date de début : </span>{expereience.startDate} <span style={{fontWeight:'bold'}}> Date de fin : </span> {expereience.endDate} </p>
                        </span>
                    )
           })
        }
        if(langage.length != 0){
            var dataLangage = langage.map((langues, i) => {
               
                    return (
                        <p>{langues}</p>
                    )
           })
        }
        
        if(jobSearch.length != 0){
            var dataJob = jobSearch.map((job,i)=>{
                return(
                <p>{job}</p>
                )
            })
        }
        if(contractSearch.length != 0){
            var dataContract = contractSearch.map((contract,i)=>{
                return(
                <p>{contract}</p>
                )
            })
        }
        

    return(
        <div>
            <Header/>
            <Row style={{paddingTop:50}}>
                <Col offset={2} span={7} >
                    <Card title="Vos informations" extra={<EditOutlined/>} style={{ width: 300 }}>
                        <p><span style={{fontWeight:'bold'}}>Prenom :</span> {props.talentInfoToDisplay.firstName}</p>
                        <p><span style={{fontWeight:'bold'}}>Nom : </span>{props.talentInfoToDisplay.lastName}</p>
                        <p><span style={{fontWeight:'bold'}}>Email :</span> {props.talentInfoToDisplay.email}</p>
                        <p><span style={{fontWeight:'bold'}}>N° de telephone :</span>{props.talentInfoToDisplay.phone}</p>
                    </Card>
                </Col>
                <Col  span={7} >
                    <Card title="Vos formations" extra={<EditOutlined/>} style={{ width: 300 }}>
                        {dataFormation}
                    </Card>
                </Col>
                <Col span={7} >
                    <Card title="Vos experiences" extra={<EditOutlined/>} style={{ width: 300 }}>
                      {dataExperience}
                      </Card>
                </Col>
            </Row>
            <Row style={{paddingTop:50}}>
                <Col offset={2} span={7} >
                    <Card title="Actuellement" extra={<EditOutlined/>} style={{ width: 300 }}>
                        <p>{currentJob}</p>
                        <p>{currently}</p>
                        <p>Vous recherchez pour les postes suivant : {dataJob} </p>  
                        <p>Vous recherchez pour les contrats suivant : {dataContract} </p> 
                    </Card>
                </Col>
                <Col  span={7} >
                    <Card title="Langues parlées" extra={<EditOutlined/>} style={{ width: 300 }}>
                        {dataLangage}
                    </Card>
                </Col>

            </Row>
        </div>
    )
   
}
function mapStateToProps(state) {
    return {  talentInfoToDisplay : state.talentInfo, talentCompletInfoToDisplay : state.talentCompletInfo, talentLocalisationInfoToDisplay : state.talentLocalisationInfo}
  }
    
  export default connect(
    mapStateToProps, 
    null
  )(SignUpTalentD);
