import User from "./User.js";

class Tutor extends User {
  constructor(tutorId, name, email, passwordHash, modulesAssigned = []) {
    super(tutorId, name, email, passwordHash);
    this.modulesAssigned = modulesAssigned;             
  }

  createTopic(topicData) {
    // Logic for creating a new topic
  }

  respondToQuery(queryId, responseContent) {
    // Logic for responding to a student query
  }

  uploadResource(resourceData) {
    // Logic for uploading learning material (video, PDF, etc.)
  }

  provideFeedback(studentId, queryId) {
    // Logic for giving feedback to a student
  }
}

export default Tutor;
