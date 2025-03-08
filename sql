use quicklo;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    googleId VARCHAR(255) UNIQUE NOT NULL,
    displayName VARCHAR(255) NOT NULL,
    authMethod ENUM('jwt', 'google') NOT NULL DEFAULT 'google',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


select * from users;
