DROP DATABASE IF EXISTS `72tukuDB`;
CREATE DATABASE `72tukuDB`;

SHOW DATABASES;
USE `72tukuDB`;

CREATE TABLE thread_list(
	thread_id int auto_increment NOT NULL PRIMARY KEY,
	category_id int NOT NULL,
	thread_name varchar(50) NOT NULL,
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
	category_name varchar(25) NOT NULL,
	category_num int NOT NULL UNIQUE
);
SHOW WARNINGS;

ALTER TABLE thread_list ADD FOREIGN KEY (category_id) REFERENCES category(category_id);
SHOW WARNINGS;
ALTER TABLE comment ADD FOREIGN KEY (thread_id) REFERENCES thread_list(thread_id);
SHOW WARNINGS;

INSERT INTO category(category_id,category_name,category_num) VALUES (null,'test_1',1);
INSERT INTO category(category_id,category_name,category_num) VALUES (null,'test_2',2);
INSERT INTO category(category_id,category_name,category_num) VALUES (null,'test_3',3);
INSERT INTO category(category_id,category_name,category_num) VALUES (null,'test_4',4);
INSERT INTO category(category_id,category_name,category_num) VALUES (null,'test_5',5);

INSERT INTO thread_list(thread_id,category_id,thread_name,thread_time,closed_flag) VALUES(null,1,'test_1','2022-01-12 11:35:01',0);
INSERT INTO thread_list(thread_id,category_id,thread_name,thread_time,closed_flag) VALUES(null,1,'test_2','2022-01-12 11:35:02',0);
INSERT INTO thread_list(thread_id,category_id,thread_name,thread_time,closed_flag) VALUES(null,1,'test_3','2022-01-12 11:35:03',0);
INSERT INTO thread_list(thread_id,category_id,thread_name,thread_time,closed_flag) VALUES(null,1,'test_4','2022-01-12 11:35:04',0);
INSERT INTO thread_list(thread_id,category_id,thread_name,thread_time,closed_flag) VALUES(null,1,'test_5','2022-01-12 11:35:05',0);

INSERT INTO comment(comment_id,thread_id,comment,comment_time) VALUES(null,1,'test_1_1','2022-01-12 11:35:01');
INSERT INTO comment(comment_id,thread_id,comment,comment_time) VALUES(null,2,'test_2_2','2022-01-12 11:35:02');
INSERT INTO comment(comment_id,thread_id,comment,comment_time) VALUES(null,3,'test_3_3','2022-01-12 11:35:03');
INSERT INTO comment(comment_id,thread_id,comment,comment_time) VALUES(null,4,'test_4_4','2022-01-12 11:35:04');
INSERT INTO comment(comment_id,thread_id,comment,comment_time) VALUES(null,5,'test_5_5','2022-01-12 11:35:05');