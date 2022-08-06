\c mande_db

/* Initial users */
INSERT INTO users(user_phone, user_name, email) VALUES ('3148528895', 'Sebastian Caicedo', 'sdrivert@hotmail.com');
INSERT INTO users(user_phone, user_name, email) VALUES ('3014579535', 'Laura Moyano', 'laumoya@hotmail.com');
INSERT INTO users(user_phone, user_name, email) VALUES ('3127676379', 'Nicolas Silva', 'nicosilzu@hotmail.com');

/* Initial employees */
INSERT INTO employees(id_employee, employee_name, email) VALUES ('1003952041', 'Laura Moyano', 'lili@hotmail.com');

/* Initial works */
INSERT INTO works(id_work, work_name) VALUES (1, 'English teacher');
INSERT INTO works(id_work, work_name) VALUES (2, 'chef');
INSERT INTO works(id_work, work_name) VALUES (3, 'veterinarian');
INSERT INTO works(id_work, work_name) VALUES (4, 'Teacher musician');
INSERT INTO works(id_work, work_name) VALUES (5, 'Driver');

/* Initial employeework */
INSERT INTO employeework('1003952041', 2, 10000);
