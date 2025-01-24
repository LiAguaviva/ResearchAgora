-- drop database research_agora;
CREATE DATABASE research_agora;
USE research_agora;
CREATE TABLE field (
	field_id INT UNSIGNED PRIMARY KEY,
    field_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE user (
	user_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_name VARCHAR (50),
    user_lastname VARCHAR (50),
    user_email VARCHAR (100) UNIQUE NOT NULL,
    user_country VARCHAR (100),
    user_city VARCHAR (100),
    user_description VARCHAR (250),
    user_password VARCHAR (255) NOT NULL,
    user_avatar VARCHAR (250),
    user_type TINYINT UNSIGNED DEFAULT 2, -- 1 admin / 2 researcher
    user_proficiency VARCHAR (50), -- student /lab worker / doctorant / PhD / postDoc
    user_is_verified BOOLEAN NOT NULL DEFAULT 0, -- 0 not verified / 1 is verified
    user_is_disabled BOOLEAN NOT NULL DEFAULT 0 -- logical delete
);
CREATE TABLE user_field (
	user_id INT UNSIGNED NOT NULL,
	field_id INT UNSIGNED NOT NULL,
    user_field_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_user_6 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_field_1 FOREIGN KEY (field_id)
		REFERENCES field(field_id) ON DELETE CASCADE ON UPDATE CASCADE
);
 
 
CREATE TABLE project (
	project_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    project_title VARCHAR (255) NOT NULL,
    project_city VARCHAR (90),
    project_country VARCHAR (100),
    project_description VARCHAR (500) NOT NULL,
    project_type BOOLEAN NOT NULL DEFAULT 0, -- 0 = public / 1 = private
	project_status TINYINT NOT NULL DEFAULT 1, -- 1 = active / 2 = completed / 3 = paused
    project_outcome VARCHAR (100), -- manuscript, patent, etc.
    project_link VARCHAR(255),   -- link to external page where the outcome is stored
    project_created_on DATE DEFAULT (CURRENT_DATE),
    project_completed_on DATE,
    project_max_member INT UNSIGNED NOT NULL,
    project_updated_on DATE DEFAULT (CURRENT_DATE),
    project_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    creator_user_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_user_1 FOREIGN KEY (creator_user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE user_project (
	user_id INT UNSIGNED NOT NULL,
    project_id INT UNSIGNED NOT NULL,
	status TINYINT UNSIGNED NOT NULL DEFAULT 1, -- 1 = to be confirmed / 2 = member / 3 = out of project / 4= interested in
	CONSTRAINT fk_user_2 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_project_1 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE skill (
	skill_id BIGINT UNSIGNED PRIMARY KEY,
    skill_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE offer (
	offer_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    project_id INT UNSIGNED NOT NULL,
    offer_title VARCHAR (255) NOT NULL,
    offer_description VARCHAR (255) NOT NULL,
    number_of_position SMALLINT UNSIGNED NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_project_2 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE offer_skill (
	offer_id INT UNSIGNED NOT NULL,
	skill_id BIGINT UNSIGNED NOT NULL,
	offer_skill_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_offer_1 FOREIGN KEY (offer_id)
		REFERENCES offer(offer_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_skill_1 FOREIGN KEY (skill_id)
		REFERENCES skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE project_skill (
	project_id INT UNSIGNED NOT NULL,
	skill_id BIGINT UNSIGNED NOT NULL,
     project_skill_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_project_3 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_skill_2 FOREIGN KEY (skill_id)
		REFERENCES skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE user_skill (
	user_id INT UNSIGNED NOT NULL,
	skill_id BIGINT UNSIGNED NOT NULL,
    user_skill_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_user_3 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_skill_3 FOREIGN KEY (skill_id)
		REFERENCES skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE  review (
	user_id INT UNSIGNED NOT NULL,
    reviewed_user_id  INT UNSIGNED NOT NULL,
    review_content TEXT,
    review_created_on DATETIME DEFAULT CURRENT_TIMESTAMP, -- timestamp?
    review_is_deleted BOOLEAN NOT NULL DEFAULT 0,
    review_rate tinyint(5) NOT NULL, 
    CONSTRAINT chk_review_rate CHECK (review_rate BETWEEN 1 AND 5),
    CONSTRAINT unique_reviewer_reviewed UNIQUE (user_id, reviewed_user_id),
    CONSTRAINT fk_user_4 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_5 FOREIGN KEY (reviewed_user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    -- user_id(target_user)
    -- user_id(author)
);
 
 
CREATE TABLE request (
request_status TINYINT(2) UNSIGNED NOT NULL DEFAULT 0,  -- 0 pending / 1 accepted / 2 declined,
request_requested_on DATE DEFAULT (CURRENT_DATE),
user_id INT UNSIGNED NOT NULL,
project_id INT UNSIGNED NOT NULL,
offer_id INT UNSIGNED,
  CONSTRAINT fk_user_7 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_project_4 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_offer_2 FOREIGN KEY (offer_id)
		REFERENCES offer(offer_id) ON DELETE CASCADE ON UPDATE CASCADE
);
 
 
CREATE TABLE message (
    message_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    message_content VARCHAR(255) NOT NULL,
    message_date_time DATETIME DEFAULT CURRENT_TIMESTAMP, -- Message timestamp
    message_is_read BOOLEAN NOT NULL DEFAULT 0, -- Read status
    sender_id INT UNSIGNED NOT NULL, -- Sender of the message
    receiver_id INT UNSIGNED NOT NULL, -- Receiver of the message
    project_id INT UNSIGNED, -- Project related to the message
    CONSTRAINT fk_user_sender FOREIGN KEY (sender_id)
        REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_receiver FOREIGN KEY (receiver_id)
        REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project FOREIGN KEY (project_id)
        REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);
 
 
 
CREATE TABLE invitation (
invitation_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
invitation_status TINYINT(2) UNSIGNED NOT NULL DEFAULT 0,  -- 0 pending / 1 accepted / 2 declined,
invitation_send_on DATE DEFAULT (CURRENT_DATE),
sender_id INT UNSIGNED NOT NULL,
receiver_id INT UNSIGNED NOT NULL,
project_id INT UNSIGNED NOT NULL,
offer_id INT UNSIGNED,
  CONSTRAINT fk_user_10 FOREIGN KEY (sender_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_user_11 FOREIGN KEY (receiver_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_project_5 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_offer_3 FOREIGN KEY (offer_id)
		REFERENCES offer(offer_id) ON DELETE CASCADE ON UPDATE CASCADE
);
 
 
/*
CREATE TABLE notification (
	notification_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    notification_content VARCHAR (100) NOT NULL,
    notification_created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    notification_type SMALLINT NOT NULL  -- project invitation / request / normal notification / new message
    -- receiver_id (user_id)
    -- sender_id (user_id)
);
*/

-- Insert Fields
INSERT INTO field (field_id, field_name) VALUES
(1, 'Biotechnology'),
(2, 'Computer Science'),
(3, 'Physics'),
(4, 'Chemistry'),
(5, 'Environmental Science'),
(6, 'Mechanical Engineering'),
(7, 'Electrical Engineering'),
(8, 'Mathematics'),
(9, 'Medicine'),
(10, 'Psychology');
 
-- Insert Users
INSERT INTO user (user_name, user_lastname, user_email, user_country, user_city, user_description, user_password, user_avatar, user_type, user_proficiency, user_is_verified) VALUES
('Ali', 'Besmi', 'ali.besmi@gmail.com', 'USA', 'New York', 'Researcher in CS', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar1.jpg', 2, 'PhD', 1),
('Jane', 'Smith', 'jane.smith@email.com', 'Canada', 'Toronto', 'Biotech Innovator', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar2.jpg', 1, 'PostDoc', 1),
('Alice', 'Johnson', 'alice.johnson@email.com', 'UK', 'London', 'Physicist', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar3.jpg', 2, 'Doctorant', 0),
('Bob', 'Brown', 'bob.brown@email.com', 'Australia', 'Sydney', 'Environmental Research', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar4.jpg', 2, 'Student', 1),
('Clara', 'Wilson', 'clara.wilson@email.com', 'Germany', 'Berlin', 'Chemist', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar5.jpg', 2, 'PhD', 1),
('Dave', 'Martin', 'dave.martin@email.com', 'France', 'Paris', 'Mathematician', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar6.jpg', 2, 'PostDoc', 1),
('Eva', 'Taylor', 'eva.taylor@email.com', 'Spain', 'Madrid', 'Medical Doctor', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar7.jpg', 1, 'Doctorant', 0),
('Frank', 'Lee', 'frank.lee@email.com', 'Italy', 'Rome', 'Psychologist', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar8.jpg', 2, 'PhD', 1),
('Grace', 'Harris', 'grace.harris@email.com', 'Netherlands', 'Amsterdam', 'Engineer', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar9.jpg', 2, 'Student', 1),
('Henry', 'White', 'henry.white@email.com', 'Brazil', 'Sao Paulo', 'Biologist', '$2b$10$KpMYUNCNIBhw/nIv8E.PXeVwEH69YXBZGV0tBiDLYlrNssgh9//zS', 'path_to_avatar10.jpg', 2, 'PostDoc', 1);
 
-- Insert User Fields
INSERT INTO user_field (user_id, field_id) VALUES
(1, 2), (2, 1), (3, 3), (4, 5), (5, 4), (6, 7), (7, 8), (8, 9), (9, 6), (10, 10);
 
-- Insert Projects
INSERT INTO project (project_title, project_city, project_country, project_description, project_type, project_status, project_outcome, project_link, project_max_member, creator_user_id) VALUES
('AI Research', 'San Francisco', 'USA', 'Artificial Intelligence in medicine', 0, 1, 'Manuscript', 'http://linktoproject.com', 5, 1),
('Gene Editing', 'Toronto', 'Canada', 'CRISPR Cas9 gene editing', 1, 2, 'Patent', 'http://linktogenediting.com', 3, 2),
('Quantum Computing', 'Vancouver', 'Canada', 'Research on quantum algorithms', 0, 1, 'Manuscript', 'http://quantumcomp.com', 4, 3),
('Sustainable Energy', 'Berlin', 'Germany', 'Solar energy efficiency', 0, 1, 'Manuscript', 'http://solarnergy.com', 6, 4),
('Drug Discovery', 'Boston', 'USA', 'New drugs for chronic diseases', 1, 2, 'Patent', 'http://drugdiscovery.com', 4, 5),
('Machine Learning', 'London', 'UK', 'ML techniques for finance', 0, 1, 'Manuscript', 'http://mlfinance.com', 5, 6),
('Space Exploration', 'Moscow', 'Russia', 'Technologies for Mars', 1, 2, 'Manuscript', 'http://spacexmars.com', 7, 7),
('Neuroscience', 'Paris', 'France', 'Brain-computer interfaces', 0, 1, 'Manuscript', 'http://neuroscience.com', 3, 8),
('Mechanical Design', 'Milan', 'Italy', 'Innovative machine designs', 1, 2, 'Patent', 'http://mechdesign.com', 5, 9),
('Cognitive Therapy', 'Madrid', 'Spain', 'New therapies for depression', 0, 1, 'Manuscript', 'http://cogtherapy.com', 4, 10);
 
-- Insert User Projects
INSERT INTO user_project (user_id, project_id, status) VALUES
(1, 1, 2), (2, 2, 2), (3, 3, 2), (4, 4, 2), (5, 5, 2),
(6, 6, 2), (7, 7, 2), (8, 8, 2), (9, 9, 2), (10, 10, 2);
 
-- Insert Skills
INSERT INTO skill (skill_id, skill_name) VALUES
(1001, 'Python'),
(1002, 'Genetic Engineering'),
(1003, 'Data Analysis'),
(1004, 'Quantum Mechanics'),
(1005, 'Solar Cell Fabrication'),
(1006, 'Pharmacology'),
(1007, 'Machine Learning'),
(1008, 'Rocket Science'),
(1009, 'Neuroimaging'),
(1010, 'Cognitive Behavioral Therapy');
 
-- Insert Offers
INSERT INTO offer (project_id, offer_title, offer_description, number_of_position) VALUES
(1, 'Data Scientist', 'Looking for an experienced data scientist', 2),
(2, 'Genetic Researcher', 'Need a geneticist familiar with CRISPR', 1),
(3, 'Quantum Physicist', 'Expert in quantum computing needed', 2),
(4, 'Energy Engineer', 'Solar energy specialist needed', 3),
(5, 'Pharmacist', 'Looking for a clinical pharmacist', 2),
(6, 'ML Expert', 'Expert in financial models with ML', 1),
(7, 'Rocket Engineer', 'Engineer with experience in spacecraft', 3),
(8, 'Neuroscientist', 'Experience with BCI is a must', 2),
(9, 'Mechanical Engineer', 'Innovative mechanical engineer needed', 2),
(10, 'Therapist', 'Therapist specialized in CBT needed', 3);
 
-- Insert Offer Skills
INSERT INTO offer_skill (offer_id, skill_id) VALUES
(1, 1001), (2, 1002), (3, 1004), (4, 1005), (5, 1006),
(6, 1007), (7, 1008), (8, 1009), (9, 1007), (10, 1010);
 
-- Insert Project Skills
INSERT INTO project_skill (project_id, skill_id) VALUES
(1, 1001), (2, 1002), (3, 1004), (4, 1005), (5, 1006),
(6, 1007), (7, 1008), (8, 1009), (9, 1007), (10, 1010);
 
-- Insert User Skills
INSERT INTO user_skill (user_id, skill_id) VALUES
(1, 1001), (2, 1002), (3, 1004), (4, 1005), (5, 1006),
(6, 1007), (7, 1008), (8, 1009), (9, 1007), (10, 1010);
 
-- Insert Reviews
INSERT INTO review (user_id, reviewed_user_id, review_content, review_rate) VALUES
(1, 2, 'Excellent collaborator with innovative ideas.', 5),
(2, 3, 'Great mentor, highly recommended.', 4),
(3, 4, 'Very dedicated and hardworking.', 5),
(4, 5, 'Innovative thinker and a team player.', 4),
(5, 6, 'Expert in the field, highly skilled.', 5),
(6, 7, 'Great leadership and problem-solving skills.', 4),
(7, 8, 'Very knowledgeable and helpful.', 5),
(8, 9, 'Outstanding researcher with great insights.', 4),
(9, 10, 'Dedicated and highly professional.', 5),
(10, 1, 'Excellent skills in project management.', 4);
 
-- Insert Requests
INSERT INTO request (request_status, user_id, project_id, offer_id) VALUES
(0, 3, 1, 1),
(1, 1, 2, 2),
(0, 4, 3, 3),
(1, 2, 4, 4),
(0, 5, 5, 5),
(1, 6, 6, 6),
(0, 7, 7, 7),
(1, 8, 8, 8),
(0, 9, 9, 9),
(1, 10, 10, 10);
 
-- Insert Messages
INSERT INTO message (message_content, message_date_time, message_is_read, sender_id, receiver_id, project_id) VALUES
('Can you update the project docs?', CURRENT_TIMESTAMP, 0, 1, 2, 1),
('Review the latest submission ASAP.', CURRENT_TIMESTAMP, 1, 2, 1, 2),
('Please confirm the meeting time.', CURRENT_TIMESTAMP, 0, 3, 4, 3),
('Need your input on the draft.', CURRENT_TIMESTAMP, 1, 4, 5, 4),
('Can you handle the presentation?', CURRENT_TIMESTAMP, 0, 5, 6, 5),
('Reminder: Project deadline approaching.', CURRENT_TIMESTAMP, 1, 6, 7, 6),
('Urgent: Review the calculations.', CURRENT_TIMESTAMP, 0, 7, 8, 7),
('Lets discuss the recent findings.', CURRENT_TIMESTAMP, 1, 8, 9, 8),
('Update on project status needed.', CURRENT_TIMESTAMP, 0, 9, 10, 9),
('Your feedback on the prototype is required.', CURRENT_TIMESTAMP, 1, 10, 1, 10);
 
-- Insert Invitations
INSERT INTO invitation (invitation_status, sender_id, receiver_id, project_id, offer_id) VALUES
(0, 1, 3, 1, 1),
(1, 2, 1, 2, 2),
(0, 3, 4, 3, 3),
(1, 4, 2, 4, 4),
(0, 5, 6, 5, 5),
(1, 6, 7, 6, 6),
(0, 7, 8, 7, 7),
(1, 8, 9, 8, 8),
(0, 9, 10, 9, 9),
(1, 10, 1, 10, 10);
 
select * from user;
select * from user_skill;
select * from user_field;
SELECT * FROM project_skill;
-- UPDATE user SET user_is_disabled = 0 WHERE user_id = 3;
SELECT * FROM project;
SELECT * FROM skill;
SELECT * FROM offer;
SELECT * FROM user_project;
SELECT * FROM project_skill;
SELECT * FROM offer_skill;
SELECT * FROM request;
SELECT * FROM message;
SELECT * FROM invitation;
SELECT * FROM review;
-- insert into review (user_id,reviewed_user_id,review_content,review_rate) values (4,1,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quod?",4);
insert into user_project  (user_id,project_id,status) values (2,1,2);

# 123456sS$