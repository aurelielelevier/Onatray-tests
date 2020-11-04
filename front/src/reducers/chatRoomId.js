export default function(chatRoomId = {idToSend : "", expediteur:"", destinataire : ""}, action) {
  
    if(action.type == 'sendId') {
      var newId = action.chatRoomId
      return newId;
    } 
    // else if(action.type ='disconnect') {
    //   var newChatRoomId  = {idToSend : "", expediteur:"", destinataire : ""}
    //   return newChatRoomId 
    // }
    else {
      return chatRoomId;
    }
    
  }