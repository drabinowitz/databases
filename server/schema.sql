CREATE DATABASE chat;

USE chat;

/*CREATE TABLE messages (
   Describe your table here.
);
*/
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
`id` INTEGER NOT NULL AUTO_INCREMENT,
`created_at` DATETIME NULL DEFAULT NULL,
`text` VARCHAR(160) NULL DEFAULT NULL,
`id_rooms` INTEGER NOT NULL,
`id_users` INTEGER NOT NULL,
PRIMARY KEY (`id`)
) COMMENT 'message table';

-- ---
-- Table 'rooms'
--
-- ---

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
`id` INTEGER NOT NULL AUTO_INCREMENT,
`name` VARCHAR(20) NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE (`name`)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (id_rooms) REFERENCES `rooms` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
