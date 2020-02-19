DROP TABLE IF EXISTS `script_user_rw`;

CREATE TABLE `script_user_rw` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `script_file_id` int(11) DEFAULT NULL,
  `mlsql_user_id` int(11) DEFAULT NULL,
  `is_owner` int(11) DEFAULT NULL,
  `readable` int(11) DEFAULT NULL,
  `writable` int(11) DEFAULT NULL,
  `is_delete` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `script_file_id` (`script_file_id`),
  KEY `mlsql_user_id` (`mlsql_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `script_file`;

CREATE TABLE `script_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `has_caret` int(11) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_dir` int(11) DEFAULT NULL,
  `content` text,
  `is_expanded` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `api_nav_item`;
CREATE TABLE `api_nav_item` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL,
  `action` varchar(256) DEFAULT NULL,
  `api_nav_id` int(11) DEFAULT NULL,
  `step` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `api_nav`;
CREATE TABLE `api_nav` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT '',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;