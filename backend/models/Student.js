import User from "./User.js";

class Student extends User {
  constructor(studentId, name, email, passwordHash, academicDetails = {}) {
    super(studentId, name, email, passwordHash); 
    this.academicDetails = academicDetails;   
  }

  register() {
    // Logic for registering the student on the platform
  }

  updateProfile() {
    // Logic for updating student-specific details
  }

  createTopic(topicData) {
    // Logic for creating a new topic
  }

  subscribeTopic(topicId) {
    // Logic for subscribing to an existing topic
  }

  viewTutorResponses(topicId) {
    // Logic for viewing tutor responses for a topic
  }
}

// Export the Student class
export default Student;
