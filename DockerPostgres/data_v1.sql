\c mande_db

/* Initial users */
INSERT INTO users(user_phone, user_name, email, user_description) VALUES ('3148528895', 'Sebastian Caicedo', 'sdrivert@hotmail.com', 'Passionate software developer');
INSERT INTO users(user_phone, user_name, email, user_description) VALUES ('3014579535', 'Laura Moyano', 'laumoya@hotmail.com', 'animalist and artist');
INSERT INTO users(user_phone, user_name, email, user_description) VALUES ('3127676379', 'Nicolas Silva', 'nicosilzu@hotmail.com', 'I only live for the moment');

/* Initial employees */
INSERT INTO employees(id_employee, employee_name, email, employee_description) VALUES ('1003952041', 'Laura Moyano', 'lili@hotmail.com', 'Happy, Happy');

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
