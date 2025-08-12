create database if not exists `connections`;

use `connections`;

CREATE TABLE IF NOT EXISTS `connections` (
    connection_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    follower_id INT NOT NULL,
    followee_id INT NOT NULL,

    UNIQUE (follower_id, followee_id),
    
    CHECK (follower_id <> followee_id)
);

CREATE TABLE IF NOT EXISTS `blocked_users` (
    blocker_id INT NOT NULL,
    blocked_id INT NOT NULL,
    blocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blocker_id, blocked_id)
);