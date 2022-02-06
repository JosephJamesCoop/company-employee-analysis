INSERT INTO departments (department)
VALUES
  ('Clothing'),
  ('Furniture'),
  ('Outdoors'),
  ('Registers');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Employee', '25000.00', 1),
  ('Manager', '45000.00', 1),
  ('Employee', '25000.00', 2),
  ('Manager', '45000.00', 2),
  ('Employee', '25000.00', 3),
  ('Manager', '45000.00', 3),
  ('Employee', '25000.00', 4),
  ('Manager', '45000.00', 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Jack', 'Johnson', '1', '0'),
  ('John', 'Jones', '2', '1'),
  ('Joe', 'Jackson', '3', '0'),
  ('Josh', 'James', '4', '3'),
  ('Jake', 'Jenkins', '5', '0'),
  ('Jill', 'Johnston', '6', '5'),
  ('Jenny', 'Jordan', '7', '0'),
  ('Janet', 'Jacobs', '8', '7'),
  ('Jacob', 'Jensen', '2', '1'),
  ('Juan', 'Jacinto', '4', '3'),
  ('Joanne', 'Jacobson', '6', '5'),
  ('Jordan', 'Jennings', '8', '7');
