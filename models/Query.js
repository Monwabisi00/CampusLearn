class Query {
  constructor(queryId, topicId, content, createdBy, createdAt = new Date()) {
    this.queryId = queryId;       
    this.topicId = topicId;   
    this.content = content;     
    this.createdBy = createdBy;  
    this.createdAt = createdAt;
    this.responses = [];         
  }

  // Methods

  addResponse(response) {
    // response is expected to be an instance of Response
    this.responses.push(response);
  }

  viewResponses() {
    // Return all responses for this query
    return this.responses;
  }
}

export default Query;
