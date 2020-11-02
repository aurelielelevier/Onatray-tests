export default function(adresse = {} , action){

    if(action.type == 'AddAdress'){
        console.log('adresse ajoutée au store :', action.adresse)
        return action.adresse
    }else {
        return adresse 
    }
}