INSERT INTO department (area)
VALUES
  ('Clothing'),
  ('Furniture'),
  ('Outdoors'),
  ('Registers');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Employee', '25001.00', 1),
  ('Manager', '45001.00', 1),
  ('Employee', '25002.00', 2),
  ('Manager', '45002.00', 2),
  ('Employee', '25003.00', 3),
  ('Manager', '45003.00', 3),
  ('Employee', '25004.00', 4),
  ('Manager', '45004.00', 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Jack', 'clothingManager', '1', '0'),
  ('John', 'clothingEmployee1', '2', '1'),
  ('Joe', 'furnitureManager', '3', '0'),
  ('Josh', 'furnitureEmployee1', '4', '3'),
  ('Jake', 'outdoorsManager', '5', '0'),
  ('Jill', 'outdoorsEmployee1', '6', '5'),
  ('Jenny', 'registerManager', '7', '0'),
  ('Janet', 'registerEmployee1', '8', '7'),
  ('Jacob', 'clothingEmployee2', '2', '1'),
  ('Juan', 'furnitureEmployee2', '4', '3'),
  ('Joanne', 'outdoorsEmployee2', '6', '5'),
  ('Jordan', 'registerEmployee2', '8', '7');
