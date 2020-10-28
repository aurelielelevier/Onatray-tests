export default function(isTalent = '' , action){

    if(action.type == 'AddTalent'){
        console.log('added', action.isTalent)
        return action.isTalent
    }else{
        return isTalent 
    }
}