import bcrypt from 'bcryptjs';

// In-memory user store with a default admin user.
// The password '''1234567''' is hashed and stored.
const salt = await bcrypt.genSalt(10);
const passwordHash = await bcrypt.hash('1234567', salt);
const users = [
  {
    id: 1,
    name: 'Admin',
    email: 'Admin@gmail.com',
    password: passwordHash,
  }
];
let userIdCounter = 2;

const mockPool = {
  query: async (text, params) => {
    console.log(`[MOCK DB] Executing query: ${text.trim()}`, params);

    // Signup: INSERT INTO users
    if (text.includes("INSERT INTO users")) {
      const [name, email, password] = params;
      const newUser = {
        id: userIdCounter++,
        name,
        email,
        password, // This is the hashed password from auth.js
      };
      users.push(newUser);
      console.log("[MOCK DB] User created:", newUser);
      console.log("[MOCK DB] All users:", users);
      return { rows: [newUser] };
    }

    // Login/Signup check: SELECT * FROM users
    if (text.includes("SELECT * FROM users")) {
      const [email] = params;
      const user = users.find((u) => u.email === email);
      console.log(`[MOCK DB] Found user for email ${email}:`, user);
      return { rows: user ? [user] : [] };
    }

    return { rows: [] };
  },
  // Add an empty end method to prevent errors when it's called in db-init.js
  end: () => {
      console.log("[MOCK DB] Connection pool ended.");
  }
};

export default mockPool;
