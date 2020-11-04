export default function(token='',action){
    //console.log('action token', action)
    if(action.type == 'addToken'){
        console.log('added token', action.token)
        return action.token

    }
    // else if(action.type ='disconnect') {
    //     console.log('disconnect token')
    //     var newToken  = ''
    //     return newToken 
    //}
    else {
        return token 
    }
}