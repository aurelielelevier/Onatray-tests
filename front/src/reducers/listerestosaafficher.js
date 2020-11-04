export default function(listerestoaafficher='',action){

    if(action.type == 'listerestoaafficher'){
        console.log('listerestoaafficher', action.liste)
        return action.liste
    }
    // else if(action.type ='disconnect') {
    //     var newList  = ''
    //     return newList 
   // }
    else{
        return listerestoaafficher 
    }
}