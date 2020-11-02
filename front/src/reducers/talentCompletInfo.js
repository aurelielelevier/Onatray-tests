export default function(talentCompletInfo=[],action){

    if(action.type == 'addCompletInfo'){
        console.log('addCompletInfo', action.talentCompletInfo)
        return action.talentCompletInfo
    }else{
        return talentCompletInfo 
    }
}