CREATE DATABASE campuslearn;

-- STUDENT table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    academic_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TUTOR table (tutors are also students, so we link to students)
CREATE TABLE tutors (
    tutor_id SERIAL PRIMARY KEY,
    student_id INT UNIQUE REFERENCES students(student_id) ON DELETE CASCADE
    module_id INT REFERENCES modules(module_id) ON DELETE CASCADE
);

-- Modules table
CREATE TABLE modules (
    module_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TOPIC table
CREATE TABLE topics (
    topic_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT REFERENCES students(student_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    module_id INT REFERENCES modules(module_id) ON DELETE CASCADE
);

-- SUBSCRIPTIONS (students subscribing to topics)
CREATE TABLE subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    topic_id INT REFERENCES topics(topic_id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RESOURCE table
CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(topic_id) ON DELETE CASCADE,
    uploaded_by INT REFERENCES tutors(tutor_id) ON DELETE CASCADE,
    type VARCHAR(50), -- e.g., video, pdf, quiz
    file_path TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- QUERY table
CREATE TABLE queries (
    query_id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(topic_id) ON DELETE CASCADE,
    created_by INT REFERENCES students(student_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RESPONSE table
CREATE TABLE responses (
    response_id SERIAL PRIMARY KEY,
    query_id INT REFERENCES queries(query_id) ON DELETE CASCADE,
    tutor_id INT REFERENCES tutors(tutor_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MESSAGE table
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    receiver_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NOTIFICATION table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    recipient_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    type VARCHAR(50), -- e.g., "newTopic", "newResponse"
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);