export default function(zone=[],action){

    if(action.type == 'addZone'){
        console.log('zone ajoutée', action.zone)
        return action.zone
    } else {
        return zone 
    }
}