export default function(chatRoomId = {idToSend : "", expediteur:"", destinataire : ""}, action) {
  
    if(action.type == 'sendId') {
      var newId = action.chatRoomId
      return newId;
    } else {
      return chatRoomId;
    }
    
  }