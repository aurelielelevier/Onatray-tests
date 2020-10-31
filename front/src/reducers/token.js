export default function(token='',action){

    if(action.type == 'addToken'){
        console.log('added', action.token)
        return action.token
    }else if(action.type == 'deconnexion'){
        console.log('déconnecté')
        return ''
    } else {
        return token 
    }
}