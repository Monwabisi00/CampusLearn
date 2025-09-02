class Message {
  constructor(messageId, senderId, receiverId, content, sentAt = new Date()) {
    this.messageId = messageId;  
    this.senderId = senderId;     
    this.receiverId = receiverId; 
    this.content = content;       
    this.sentAt = sentAt;         
  }

  sendMessage() {
    // Logic to send a message
    
  }

  viewMessage() {
    // Logic to view the message
    
  }
}

export default Message;
