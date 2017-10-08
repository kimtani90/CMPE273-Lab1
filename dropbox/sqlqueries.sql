CREATE TABLE files (

    filename varchar(255) NOT NULL,
    filepath varchar(500),
    fileparent varchar(500),
    isfile varchar(1),
    PRIMARY KEY (filepath)
);


CREATE TABLE userfiles (
    ID int NOT NULL AUTO_INCREMENT,
    filepath varchar(500),
    email varchar(500),
    PRIMARY KEY (ID),
FOREIGN KEY (filepath) REFERENCES files(filepath),
FOREIGN KEY (email) REFERENCES users(email)

);

CREATE TABLE users (

    firstname varchar(255) NOT NULL,
    lastname varchar(255),    
    email varchar(500),
    password varchar(255),
    contact varchar(255),
    interests varchar(255),
    lastlogin varchar(255),
    PRIMARY KEY (email)
);


insert into files (filename, filepath, isfile) values ('test.doc', '/uploads/kimtani90@gmail.com/test.doc', 'T' );
insert into users values ('Dishant', 'Kimtani', 'abc11@gmail.com', 'abcd', '8888888888', 'cricket', NOW());
insert into userfiles (filepath, email) values ('/uploads/kimtani90@gmail.com/test.doc', 'abc@gmail.com');


select f.* from files f, userfiles u where u.email='abc@gmail.com' and f.filepath=u.filepath;


