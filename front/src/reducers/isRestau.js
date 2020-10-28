export default function(isRestau = '' , action){

    if(action.type == 'AddRestau'){
        console.log('added', action.isRestau)
        return action.isRestau
    }else{
        return isRestau 
    }
}