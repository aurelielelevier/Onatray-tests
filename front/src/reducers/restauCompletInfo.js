export default function(restauCompletInfo={},action){

    if(action.type == 'addRestauCompletInfo'){
        console.log('addRestauCompletInfo', action.restauCompletInfo)
        return action.restauCompletInfo
    }else{
        return restauCompletInfo 
    }
}