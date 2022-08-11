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

CREATE EXTENSION postgis;

CREATE TABLE users(
	user_phone TEXT PRIMARY KEY,
  user_name TEXT UNIQUE NOT NULL,
	email TEXT NOT NULL,
  geolocation geography(point),
  user_description TEXT
);

CREATE TABLE employees(
	id_employee TEXT PRIMARY KEY,
  employee_name TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  geolocation geography(point),
  employee_description TEXT
);

CREATE TABLE works(
	id_work SERIAL PRIMARY KEY,
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

CREATE TABLE hires(
  id_hire SERIAL PRIMARY KEY,
  id_employee TEXT,
  id_work INTEGER,
  user_phone TEXT,
  hire_date DATE,
  hire_description TEXT,
  hire_paymethod TEXT,
  FOREIGN KEY(id_employee) REFERENCES employees(id_employee),
  FOREIGN KEY(id_work) REFERENCES works(id_work),
  FOREIGN KEY(user_phone) REFERENCES users(user_phone)
);

CREATE OR REPLACE FUNCTION getWorkers(work text, phone text) RETURNS TABLE(
  employee_name TEXT, work_name TEXT, price INTEGER, distance float
)
AS $$
BEGIN
  DROP TABLE IF EXISTS result;
  CREATE TEMP TABLE result AS SELECT e.employee_name, wk.work_name, e.geolocation, ew.price
  FROM employees as e 
  JOIN employeework ew ON e.id_employee=ew.id_employee
  JOIN works as wk ON ew.id_work=wk.id_work WHERE wk.work_name=work;

  RETURN QUERY SELECT e.employee_name, e.work_name, e.price, ST_Distance(e.geolocation, usuar.geolocation) as distance
  from result e,
  lateral(
    select geolocation from users where user_phone=phone
  ) as usuar
  order by distance limit 5;
  DROP TABLE result;
END; $$

LANGUAGE 'plpgsql';
