
class Notification {
  constructor(notificationId, recipientId, type, content, createdAt = new Date(), isRead = false) {
    this.notificationId = notificationId; 
    this.recipientId = recipientId;      
    this.type = type;                   
    this.content = content;             
    this.createdAt = createdAt;         
    this.isRead = isRead;                
  }

  sendNotification() {
    // Logic to send notification (could push to UI or email service)
    
  }

  markAsRead() {
    // Logic to mark the notification as read
    
  }
}

export default Notification;
