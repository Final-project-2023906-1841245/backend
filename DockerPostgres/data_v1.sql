\c mande_db

/* Initial users */
INSERT INTO users(user_phone, user_name, email) VALUES ('31428895', 'Sebastian Caicedo', 'sdrivert@hotmail.com');
INSERT INTO users(user_phone, user_name, email) VALUES ('3014579535', 'Laura Moyano', 'laumoya@hotmail.com');
INSERT INTO users(user_phone, user_name, email) VALUES ('3127676479', 'Nicolas Silva', 'nicosilzu@hotmail.com');
UPDATE users SET geolocation = ST_MakePoint(-70.201, 42.103) WHERE user_phone='3014579535';



/* Initial employees */
INSERT INTO employees(id_employee, employee_name, email) VALUES ('1003952041', 'Dario Gomez', 'dario@hotmail.com');
INSERT INTO employees(id_employee, employee_name, email) VALUES ('666777', 'Gustavo Petro', 'gus@hotmail.com');
UPDATE employees SET geolocation = ST_MakePoint(-72.9385, 41.6643) WHERE id_employee='666777';
UPDATE employees SET geolocation = ST_MakePoint(-76.517438, 3.438921) WHERE id_employee='1003952041';

/* Initial works */
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


/* Initial employeework */
INSERT INTO employeework VALUES ('1003952041', 2, 10000);
