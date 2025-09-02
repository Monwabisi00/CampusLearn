class Topic{
  constructor(topicId, title, description, createdBy, createdAt = new Date()){
    this.topicId = topicId;          
    this.title = title;
    this.description = description;  
    this.createdBy = createdBy;      
    this.createdAt = createdAt;      
  }

  broadcastTopic() {
    // Logic for notifying subscribers about the new topic
  }

  addSubcriber(studentId) {
    // Logic for adding a student to a topic
  }

  addQuery(query) {
    // Logic for adding a query to the topic
  }
}

export default Topic;