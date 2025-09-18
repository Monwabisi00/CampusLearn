
class Response {
  constructor(responseId, queryId, tutorId, content, createdAt = new Date()) {
    this.responseId = responseId; 
    this.queryId = queryId;       
    this.tutorId = tutorId;     
    this.content = content;       
    this.createdAt = createdAt;   
  }

  editResponse(newContent) {
    // Logic for editing the response content
    this.content = newContent;
  }

  deleteResponse() {
    // Logic for deleting the response 
    this.content = "[deleted]";
  }
}

export default Response;
