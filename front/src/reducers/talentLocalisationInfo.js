export default function(talentLocalisationInfo={},action){

    if(action.type == 'addLocalisationInfo'){
        console.log('addLocalisationInfo', action.talentLocalisationInfo)
        return action.talentLocalisationInfo
    }else{
        return talentLocalisationInfo 
    }
}