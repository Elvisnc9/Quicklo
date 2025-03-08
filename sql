create database Quicklo_App;
use Quicklo_Database;


CREATE TABLE UserData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    googleId VARCHAR(255) UNIQUE NOT NULL,
    displayName VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    authMethod ENUM('jwt', 'google') NOT NULL DEFAULT 'google',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


select * from UserData;
SELECT authMethod from userData;
Select * from UserData where authMethod = 'jwt' ;


select * from UserData where authMethod = 'jwt';

Delete from UserData where id='3';
update UserData set email = 'elvisngwu18@gmail.com ' where id ='1';

CREATE INDEX idx_email ON UserData(email);

ALTER TABLE UserData AUTO_INCREMENT = 1;


update UserData set username = 'ElvisNc' where id = '1';
