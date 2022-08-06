CREATE DATABASE mande_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mande_db

CREATE TABLE users(
	user_phone TEXT PRIMARY KEY,
  user_name TEXT UNIQUE NOT NULL,
	email TEXT NOT NULL
);

CREATE TABLE employees(
	id_employee TEXT PRIMARY KEY,
  employee_name TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
	isFree BOOLEAN
);

CREATE TABLE works(
	id_work INTEGER PRIMARY KEY,
  work_name TEXT UNIQUE NOT NULL	
);

CREATE TABLE employeework(
  id_employee TEXT,
  id_work INTEGER,
  price INTEGER,
  PRIMARY KEY(id_employee, id_work),
  FOREIGN KEY(id_employee) REFERENCES employees(id_employee),
  FOREIGN KEY(id_work) REFERENCES works(id_work)
);
