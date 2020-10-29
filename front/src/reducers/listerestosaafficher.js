export default function(listerestoaafficher='',action){

    if(action.type == 'listerestoaafficher'){
        console.log('listerestoaafficher', action.liste)
        return action.liste
    }else{
        return listerestoaafficher 
    }
}