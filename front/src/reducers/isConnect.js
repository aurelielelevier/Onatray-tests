export default function(isConnect = {isSignIn:false, isTalent:false, isRestau:false} , action){
//console.log('action is connect', action)

    if(action.type == 'addConnect'){
    
        console.log('added is connect', action.isConnect)

        var newConnect = action.isConnect

        return newConnect
    }
    
    // else if (action.type =='disconnect'){
    //     console.log('disconnect is connect')
    //    var  newIsConnect = {}
    //     return newIsConnect
   // }
    else {
        return isConnect 
    }
}