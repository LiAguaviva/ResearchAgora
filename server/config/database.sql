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
    CONSTRAINT fk_user_6 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_field_1 FOREIGN KEY (field_id)
		REFERENCES field(field_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- CREATE TABLE user (
	-- user_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
   -- user_name VARCHAR (50),
   -- user_lastname VARCHAR (50),
   -- user_email VARCHAR (100) UNIQUE NOT NULL,
   -- field_id INT UNSIGNED,
   -- user_country VARCHAR (100),
   --  user_city VARCHAR (100),
   --  user_description VARCHAR (250),
   --  user_password VARCHAR (255) NOT NULL,
    -- user_avatar VARCHAR (250),
   --  user_type TINYINT UNSIGNED DEFAULT 2, -- 1 admin / 2 researcher
   --  user_proficiency VARCHAR (50), -- student /lab worker / doctorant / PhD / postDoc
   --  user_is_verified BOOLEAN NOT NULL DEFAULT 0, -- 0 not verified / 1 is verified
   --  user_is_disabled BOOLEAN NOT NULL DEFAULT 0, -- logical delete
   --  CONSTRAINT fk_field_1 FOREIGN KEY (field_id)
		-- REFERENCES field(field_id) ON DELETE CASCADE ON UPDATE CASCADE
-- );  



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
    project_is_deleted BOOLEAN NOT NULL DEFAULT 0,
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
    offer_tile VARCHAR (255) NOT NULL,
    offer_description VARCHAR (255) NOT NULL,
    number_of_position SMALLINT UNSIGNED NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_project_2 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE offer_skill (
	offer_id INT UNSIGNED NOT NULL,
	skill_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_offer_1 FOREIGN KEY (offer_id)
		REFERENCES offer(offer_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_skill_1 FOREIGN KEY (skill_id)
		REFERENCES skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE project_skill (
	project_id INT UNSIGNED NOT NULL,
	skill_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_project_3 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_skill_2 FOREIGN KEY (skill_id)
		REFERENCES skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_skill (
	user_id INT UNSIGNED NOT NULL,
	skill_id BIGINT UNSIGNED NOT NULL,
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
    CONSTRAINT fk_user_4 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_5 FOREIGN KEY (reviewed_user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    -- user_id(target_user)
    -- user_id(author)
);



/*


CREATE TABLE message (
	message_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    message_content VARCHAR (255) NOT NULL,
    message_date_time DATETIME DEFAULT CURRENT_TIMESTAMP, -- YYYY-MM-DD --HH-MM-SS
    message_is_read BOOLEAN NOT NULL DEFAULT 0
    -- project_id
    -- recieve_id (user_id)
    -- sender_id (user_id1)
    
);



CREATE TABLE notification (
	notification_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    notification_content VARCHAR (100) NOT NULL,
    notification_created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    notification_type SMALLINT NOT NULL  -- project invitation / request / normal notification / new message
    -- receiver_id (user_id)
    -- sender_id (user_id)
);
*/




-- CREATE TABLE request (
-- request_status TINYINT(2) UNSIGNED NOT NULL DEFAULT 0,  -- 0 pending / 1 accepted / 2 declined
-- request_requested_on DATE DEFAULT (CURRENT_DATE)
-- user_id
-- project_id
-- announcement_id
-- );


