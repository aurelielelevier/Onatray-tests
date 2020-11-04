export default function(restoaafficher='',action){

    if(action.type == 'restoaafficher'){
        console.log('resto_id', action.id)
        return action.id
    }
    // else if(action.type ='disconnect') {
    //     var newRestoAaffiche  = ''
    //     return newRestoAaffiche 
    // }
    else{
        return restoaafficher 
    }
}