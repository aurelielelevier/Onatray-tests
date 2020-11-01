export default function(adresse = {} , action){

    if(action.type == 'AddAdress'){
        console.log('added', action.adresse)
        return action.adresse
    }else {
        return adresse 
    }
}