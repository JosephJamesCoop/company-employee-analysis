const inquirer = require("inquirer");
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Password!23',
    database: 'employees'
  },
  console.log('Connected to the employees database.')
);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// main question
const userPrompts = {
  promptHomeMenu() {
    return inquirer.prompt([{
      type: 'list',
      name: 'menuChoice',
      message: 'What would you like to do?',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit']
    }])
  }
};

const DB = {
  ViewAllDepartments() {
    console.log('View All Departments');
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      application();
    });
    
  },

  ViewAllRoles() {
    console.log('View All Roles');
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      application();
    });
  },

  ViewAllEmployees() {
    console.log('View All Employees');
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      application();
    });
  },

  AddADepartment() {
    console.log('Add A Departments');
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Please type a name for the new Department: ',
      }
    ]).then(
      department => {
        const name = department.name;
        const sql = `INSERT INTO departments (department)
  VALUES (?)`;
        const params = [name];
        db.query(sql, params, (err, rows) => {
          if (err) throw err;
          console.log(`Added ${name} to Departments`);
        })
        DB.ViewAllDepartments();
      })
  },

  AddARole() {
    console.log('Add A Role');
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Please type a title for the new role: ',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Please type a salary for the new role: (no $ or , ) ',
      },
      {
        type: 'input',
        name: 'deptId',
        message: 'Please type a department ID for the new role: ',
      },
    ]).then(
      role => {
        const title = role.title;
        const salary = role.salary;
        const deptId = role.deptId
        const sql = `INSERT INTO role (title, salary, department_id)
  VALUES (?, ?, ?)`;
        const params = [title, salary, deptId];
        db.query(sql, params, (err, rows) => {
          if (err) throw err;
          console.log(`Added ${title, salary, deptId} to Role`);
        })
        DB.ViewAllRoles();
      })
  },
  AddAnEmployee() {
    console.log('Add An Employee');
    inquirer.prompt([
      {
        type: 'input',
        name: 'fName',
        message: "Please type the new employee's First Name:",
      },
      {
        type: 'input',
        name: 'lName',
        message: "Please type the new employee's Last Name:",
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Please type a department ID for the new employee: ',
      },
      {
        type: 'input',
        name: 'manId',
        message: 'Please type a manager ID for the new employee: ',
      },
    ]).then(
      employee => {
        const fName = employee.fName;
        const lName = employee.lName;
        const deptId = employee.roleId
        const manId = employee.manId
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?, ?, ?, ?)`;
        const params = [fName, lName, deptId, manId];
        db.query(sql, params, (err, rows) => {
          if (err) throw err;
          console.log(`Added ${fName, lName, deptId, manId} to Role`);
        })
        DB.ViewAllEmployees();
      })
  },
  UpdateAnEmployeeRole() {
    console.log('Update An Employee Role');

    console.log('Modify an Employee');
    const sql = `SELECT * FROM employee`;
    const employeeList = [];
    db.query(sql, (err, rows) => {
      if (err) throw err;
      for (let i = 0; i < rows.length; i++) {
        employeeList.push(JSON.stringify(rows[i]))
      }
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeChoice',
          message: 'Who would you like to update?',
          choices: employeeList,
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Please type a department ID for the new employee: ',
        },
        {
          type: 'input',
          name: 'manId',
          message: 'Please type a manager ID for the new employee: ',
        },
      ]).then(
        employee => {
          const splitted = employee.employeeChoice.split('"');
          const partOne = splitted[2];
          const partTwo = partOne.split(':');
          const idNum = partTwo[1].replace(',', '');
          console.log("test", idNum);
          const fName = splitted[5];
          const lName = splitted[9];
          const deptId = employee.roleId
          const manId = employee.manId
          const sql = `UPDATE employee SET role_id = ${deptId}, manager_id = ${manId} WHERE id = ${idNum};`;

          db.query(sql, (err, rows) => {
            if (err) throw err;
            console.log(`Updated role-id to ${deptId} and manager_id to ${manId} for ${fName}, ${lName} `);
          })
          DB.ViewAllEmployees();
        })
    })
  },
};

async function application() {
  const { menuChoice } = await userPrompts.promptHomeMenu();
  if (menuChoice === 'Quit') return process.exit(console.log('Goodbye!'));
  DB[menuChoice.split(' ').join('')]();
};

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

application();