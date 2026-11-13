USE appdb;
CREATE TABLE names (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO names (name) VALUES ('Clement'), ('Mbaduko');