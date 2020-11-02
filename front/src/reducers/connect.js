export default function(isConnect = {} , action){

    if(action.type == 'AddConnect'){
        console.log('added', action.isConnect)
        return action.isConnect
    }else if (action.type =='disconnect'){
        console.log('disconnect', action.isConnect)
        return action.isConnect
    }else {
        return isConnect 
    }
}