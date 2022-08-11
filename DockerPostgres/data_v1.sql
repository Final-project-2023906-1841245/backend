\c mande_db

-- /* Initial users */
INSERT INTO users(user_phone, user_name, email,user_description) VALUES ('31428895', 'Sebastian Caicedo', 'sdrivert@hotmail.com','Happy');
INSERT INTO users(user_phone, user_name, email,user_description ) VALUES ('3014579535', 'Laura Moyano', 'laumoya@hotmail.com', 'Passionate fot the nature');
INSERT INTO users(user_phone, user_name, email, user_description) VALUES ('3127676479', 'Nicolas Silva', 'nicosilzu@hotmail.com', 'Sad man');
UPDATE users SET geolocation = ST_MakePoint(-70.201, 42.103) WHERE user_phone='3014579535';



-- /* Initial employees */
INSERT INTO employees(id_employee, employee_name, email, employee_description) VALUES ('1003952041', 'Dario Gomez', 'dario@hotmail.com', 'I want to work');
INSERT INTO employees(id_employee, employee_name, email, employee_description) VALUES ('666777', 'Gustavo Petro', 'gus@hotmail.com', 'I am an enterprising');
INSERT INTO employees(id_employee, employee_name, email, employee_description) VALUES ('31690420', 'Maluma', 'maluma@hotmail.com', 'Famous singer');
INSERT INTO employees(id_employee, employee_name, email, employee_description) VALUES ('1006166420', 'Tiranosaurio', 'trex@hotmail.com', 'Sad rino');

UPDATE employees SET geolocation = ST_MakePoint(-76.517438, 3.438921) WHERE id_employee='1003952041';
UPDATE employees SET geolocation = ST_MakePoint(-72.9385, 41.6643) WHERE id_employee='666777';
UPDATE employees SET geolocation = ST_MakePoint(-70.500, 42.3643) WHERE id_employee='31690420';
UPDATE employees SET geolocation = ST_MakePoint(-70.500, 42.6643) WHERE id_employee='1006166420';



-- /* Initial works */
INSERT INTO works(work_name) VALUES ( 'English Teacher');
INSERT INTO works(work_name) VALUES ( 'Chef');
INSERT INTO works(work_name) VALUES ( 'Veterinarian');
INSERT INTO works(work_name) VALUES ( 'Music Teacher');
INSERT INTO works(work_name) VALUES ( 'Driver');
INSERT INTO works(work_name) VALUES ( 'Plumber');
INSERT INTO works(work_name) VALUES ( 'Mason');
INSERT INTO works(work_name) VALUES ( 'Carpenter');
INSERT INTO works(work_name) VALUES ( 'Electrician');
INSERT INTO works(work_name) VALUES ( 'Roofer');
INSERT INTO works(work_name) VALUES ( 'Baby Sister');
INSERT INTO works(work_name) VALUES ( 'Farmer');


-- /* Initial employeework */
INSERT INTO employeework VALUES ('1003952041', 2, 10000);
INSERT INTO employeework VALUES('31690420', 1, 5000);
INSERT INTO employeework VALUES('1006166420', 2, 20000);

