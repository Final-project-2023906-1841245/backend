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

CREATE TABLE works(
	id_work INTEGER PRIMARY KEY,
  work_name TEXT UNIQUE NOT NULL,
	
);
