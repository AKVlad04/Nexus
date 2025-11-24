<?php
// Acum ne conectăm la serviciul definit în docker-compose ca 'db'
$host = 'db'; 
// În interiorul rețelei Docker, MySQL ascultă mereu pe 3306
$port = '3306';      
$db   = 'nexus_db';
$user = 'root';
$pass = 'parola';
$charset = 'utf8mb4';

// Restul codului rămâne la fel...
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
// ...
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Eroare conexiune DB: " . $e->getMessage());
}