
class User {
  constructor(userId, name, email, passwordHash) {
    this.userId = userId;             
    this.name = name;                 
    this.email = email;               
    this.passwordHash = passwordHash; 
  }

  login() {
    // Logic for user login
  }

  logout() {
    // Logic for user logout
  }

  updateProfile(updatedDetails) {
    // Logic for updating common user details
  }
}

export default User;
