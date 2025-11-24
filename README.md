# Nexus

docker-compose up --build

create database nexus_db

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM('active','inactive','banned') DEFAULT 'active'
);