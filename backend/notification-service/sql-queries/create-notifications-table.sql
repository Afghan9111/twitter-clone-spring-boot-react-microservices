create database if not exists `notifications`;

use `notifications`;

create table if not exists `notifications` (
	`notification_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `notification_type` ENUM( 'LIKES' , 'RETWEET','REPLY', 'FOLLOW') NOT NULL,
    `notification_status` ENUM('READ', 'UNREAD') NOT NULL DEFAULT 'UNREAD',
    `notification_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `notified_user_id` INT NOT NULL,
    `triggered_by_user_id` INT NOT NULL,
    
	INDEX (`notified_user_id`),
    INDEX (`notification_status`),
    INDEX (`notification_time`)
);