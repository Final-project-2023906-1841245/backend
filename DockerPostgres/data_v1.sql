\c mande_db

/* Initial users */
INSERT INTO users(user_phone, user_name, email) VALUES ('3148528895', 'Sebastian Caicedo', 'sdrivert@hotmail.com');
INSERT INTO users(user_phone, user_name, email) VALUES ('3014579535', 'Laura Moyano', 'laumoya@hotmail.com');
INSERT INTO users(user_phone, user_name, email) VALUES ('3127676379', 'Nicolas Silva', 'nicosilzu@hotmail.com');

/* Initial employees */
INSERT INTO employees(id_employee, employee_name, email) VALUES ('1003952041', 'Laura Moyano', 'lili@hotmail.com');

/* Initial works */
INSERT INTO works( work_name) VALUES ( 'English Teacher');
INSERT INTO works( work_name) VALUES ( 'Chef');
INSERT INTO works(work_name) VALUES ( 'Veterinarian');
INSERT INTO works(work_name) VALUES ( 'Music Teacher');
INSERT INTO works(work_name) VALUES ( 'Driver');

/* Initial employeework */
INSERT INTO employeework VALUES ('1003952041', 2, 10000);
