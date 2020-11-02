export default function(restauInfo={},action){

    if(action.type == 'addRestauInfo'){
        console.log('addRestauInfo', action.restauInfo)
        return action.restauInfo
    }else{
        return restauInfo 
    }
}