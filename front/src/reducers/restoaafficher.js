export default function(restoaafficher='',action){

    if(action.type == 'restoaafficher'){
        console.log('resto_id', action.id)
        return action.id
    }else{
        return restoaafficher 
    }
}