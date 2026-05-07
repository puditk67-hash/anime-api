CREATE TABLE animes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  studio VARCHAR(255),
  episodes INT,
  rating DOUBLE,
  image TEXT,
  description TEXT,
  likes INT DEFAULT 0
);