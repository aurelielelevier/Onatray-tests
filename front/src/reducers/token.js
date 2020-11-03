export default function(token='',action){

    if(action.type == 'addToken'){
        console.log('added', action.token)
        return action.token
    }else if(action.type == 'disconnect'){
        console.log('déconnecté')
        return ''
    } else {
        return token 
    }
}