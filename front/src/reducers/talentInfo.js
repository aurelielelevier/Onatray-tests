export default function(talentInfo={},action){

    if(action.type == 'addInfo'){
        console.log('addInfo', action.talentInfo)
        return action.talentInfo
    }else{
        return talentInfo 
    }
}