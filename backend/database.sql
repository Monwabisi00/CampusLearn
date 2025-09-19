CREATE DATABASE campuslearn;

-- ------------------------
-- 1. STUDENTS table
-- ------------------------
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    academic_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------
-- 2. MODULES table
-- ------------------------
CREATE TABLE modules (
    module_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------
-- 3. TUTORS table
-- ------------------------
CREATE TABLE tutors (
    tutor_id SERIAL PRIMARY KEY,
    student_id INT UNIQUE REFERENCES students(student_id) ON DELETE CASCADE,
    module_id INT REFERENCES modules(module_id) ON DELETE CASCADE
);

-- ------------------------
-- 4. TOPICS table
-- ------------------------
CREATE TABLE topics (
    topic_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT REFERENCES students(student_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    module_id INT REFERENCES modules(module_id) ON DELETE CASCADE
);

-- ------------------------
-- 5. SUBSCRIPTIONS table
-- ------------------------
CREATE TABLE subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    topic_id INT REFERENCES topics(topic_id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------
-- 6. QUERIES table
-- ------------------------
CREATE TABLE queries (
    query_id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(topic_id) ON DELETE CASCADE,
    created_by INT REFERENCES students(student_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------
-- 7. RESPONSES table
-- ------------------------
CREATE TABLE responses (
    response_id SERIAL PRIMARY KEY,
    query_id INT REFERENCES queries(query_id) ON DELETE CASCADE,
    tutor_id INT REFERENCES tutors(tutor_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------
-- 8. RESOURCES table
-- ------------------------
CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(topic_id) ON DELETE CASCADE,
    uploaded_by INT REFERENCES tutors(tutor_id) ON DELETE CASCADE,
    type VARCHAR(50), -- e.g., video, pdf, quiz
    file_path TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------
-- 9. MESSAGES table
-- ------------------------
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    receiver_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------
-- 10. NOTIFICATIONS table
-- ------------------------
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    recipient_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    type VARCHAR(50), -- e.g., "newTopic", "newResponse"
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);
