export default function(zone=[],action){

    if(action.type == 'addZone'){
        console.log('zone ajoutée', action.zone)
        return action.zone
    }
    // else if(action.type ='disconnect') {
    //      var newZone  = []
    //     return newZone 
    // }
    else {
        return zone 
    }
}