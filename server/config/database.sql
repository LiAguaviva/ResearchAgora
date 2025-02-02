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
    user_description VARCHAR (500),
    user_password VARCHAR (255) NOT NULL,
    user_avatar VARCHAR (250),
    user_type TINYINT UNSIGNED DEFAULT 2, -- 1 admin / 2 researcher
    user_proficiency VARCHAR (50), -- student /lab worker / doctorant / PhD / postDoc
    user_current_lab VARCHAR (100), -- current laboratory
    user_current_boss VARCHAR (100), -- current head
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
    project_description VARCHAR (2000) NOT NULL,
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


CREATE TABLE review (
	user_id INT UNSIGNED NOT NULL,
    reviewed_user_id  INT UNSIGNED NOT NULL,
    review_content TEXT,
    review_created_on DATETIME DEFAULT CURRENT_TIMESTAMP, 
    review_is_deleted BOOLEAN NOT NULL DEFAULT 0,
    review_rate tinyint(5) NOT NULL, 
    CONSTRAINT chk_review_rate CHECK (review_rate BETWEEN 1 AND 5),
    CONSTRAINT unique_reviewer_reviewed UNIQUE (user_id, reviewed_user_id),
    CONSTRAINT fk_user_4 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_5 FOREIGN KEY (reviewed_user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
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
    message_content VARCHAR (255) NOT NULL,
    message_date_time DATETIME DEFAULT CURRENT_TIMESTAMP, 
    message_is_read BOOLEAN NOT NULL DEFAULT 0,
    sender_id INT UNSIGNED NOT NULL,
    receiver_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_user_8 FOREIGN KEY (sender_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_9 FOREIGN KEY (receiver_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
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


CREATE TABLE notification (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    type INT NOT NULL, 
    -- sender_user_id INT UNSIGNED,
    content VARCHAR(255) NOT NULL,
    is_read TINYINT(1) DEFAULT 0, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    -- project_id INT UNSIGNED NULL, 
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

DELETE FROM user WHERE user_id = 23;

 select * from user;
 select * from user_skill;
 select * from user_field;
 SELECT * FROM project_skill;
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
 SELECT * FROM notification;
 
 


-- 123456sS$
