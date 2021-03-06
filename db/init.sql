CREATE TABLE Accounts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(30) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	seen INT DEFAULT 0,
	user_type INT NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE
);

CREATE TABLE UserTypes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL,
	description VARCHAR(255)
);

CREATE TABLE Students (
	account_id INT UNIQUE NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	birth_date DATE,
	biography_text TEXT,
	school VARCHAR(100),
	program VARCHAR(100),
	graduation_year DATE,
	resume_url TEXT,
	profile_pic_url TEXT
);

CREATE TABLE Recruiter (
	account_id INT UNIQUE NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	phone_number VARCHAR(13),
	company_name VARCHAR(100) NOT NULL,
	company_logo_url TEXT
);

CREATE TABLE Chat (
	id INT AUTO_INCREMENT PRIMARY KEY,
	sender_id INT NOT NULL,
	receiver_id INT NOT NULL,
	content TEXT NOT NULL,
	created_at DATE NOT NULL
);

/*
CREATE TABLE Addresses (
	id INT AUTO_INCREMENT PRIMARY KEY,
	city TEXT NOT NULL,
	state TEXT NOT NULL,
	street_address TEXT NOT NULL,
	zip VARCHAR(50) NOT NULL,
	hash TEXT NOT NULL
);*/

CREATE TABLE RecruiterAdverts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title TEXT NOT NULL,
	body TEXT NOT NULL,
	field VARCHAR(120) NOT NULL,
	city TEXT NOT NULL,
	website TEXT NOT NULL,
	contact VARCHAR(120) NOT NULL,
	positions INT NOT NULL,
	deadline_date DATE NOT NULL,
	posted_by INT NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE
);

CREATE TABLE StudentAdverts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title TEXT NOT NULL,
	body TEXT NOT NULL,
	field VARCHAR(120) NOT NULL,
	contact VARCHAR(120) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	posted_by INT NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE
);

ALTER TABLE Accounts
ADD FOREIGN KEY (user_type) REFERENCES UserTypes(id);

ALTER TABLE Students
ADD FOREIGN KEY (account_id) REFERENCES Accounts(id);

ALTER TABLE Recruiter
ADD FOREIGN KEY (account_id) REFERENCES Accounts(id);

ALTER TABLE Chat
ADD FOREIGN KEY (sender_id) REFERENCES Accounts(id),
ADD FOREIGN KEY (receiver_id) REFERENCES Accounts(id);

ALTER TABLE RecruiterAdverts
ADD FOREIGN KEY (posted_by) REFERENCES Accounts(id);

/*ADD FOREIGN KEY (address) REFERENCES Addresses(id),*/

ALTER TABLE StudentAdverts
ADD FOREIGN KEY (posted_by) REFERENCES Accounts(id);

INSERT INTO UserTypes (name, description) VALUES ("Student", "Student user access type");
INSERT INTO UserTypes (name, description) VALUES ("Recruiter", "Recruiter user access type");
/*INSERT INTO Addresses (city, state, street_address, zip, hash) VALUES ("Jkpg", "Jönköping", "test 1", "55320", "1");*/