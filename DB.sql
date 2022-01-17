DROP DATABASE IF EXISTS `72tukuDB`;
CREATE DATABASE `72tukuDB`;

SHOW DATABASES;
USE `72tukuDB`;

CREATE TABLE thread_list(
	thread_id int auto_increment NOT NULL PRIMARY KEY,
	category_id int NOT NULL,
	thread_name varchar(32) NOT NULL,
	thread_time datetime NOT NULL,
	closed_flag boolean NOT NULL
);
SHOW WARNINGS;

CREATE TABLE comment(
	comment_id int auto_increment NOT NULL,
	thread_id int NOT NULL,
	comment varchar(255) NOT NULL,
	comment_time datetime NOT NULL,
	PRIMARY KEY (comment_id,thread_id)
);
SHOW WARNINGS;

CREATE TABLE category(
	category_id int auto_increment NOT NULL PRIMARY KEY,
	category_name varchar(16) NOT NULL
);
SHOW WARNINGS;

ALTER TABLE thread_list ADD FOREIGN KEY (category_id) REFERENCES category(category_id);
SHOW WARNINGS;
ALTER TABLE comment ADD FOREIGN KEY (thread_id) REFERENCES thread_list(thread_id);
SHOW WARNINGS;
