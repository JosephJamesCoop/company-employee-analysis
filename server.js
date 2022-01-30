const inquirer = require("inquirer");
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
// const DB = require("./routes/apiRoutes/roles.js");
// const db = require('./db/connection');


// const db = require('./db/connection');
// const routes = require('./routes/roles.js');

// Express middleware
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
// // use API routes
// app.use('/api', routes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});




//one file
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
    })
    application();
  },

  ViewAllRoles() {
    console.log('View All Roles');
    const sql = `SELECT * FROM role`; 
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
    });
    application();
  },

  ViewAllEmployees() {
    console.log('View All Employees');
    const sql = `SELECT * FROM employee`; 
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
    });
    application();
  },
  
  AddADepartment() {
    console.log('Add A Departments');
  inquirer.prompt([
      {
      type: 'input',
      name: 'name',
      message: 'Please select a Name for the new Department: ',
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
      message: 'Please select a title for the new role: ',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Please select a salary for the new role: (no $ or , ) ',
    },
    {
      type: 'input',
      name: 'deptId',
      message: 'Please select a department ID for the new role: ',
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


    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    db.query(sql, params, (err, rows) => {
      if (err) throw err;
      console.table(rows);
    });
  },
  UpdateAnEmployeeRole() {
    console.log('Update An Employee Role');


    
  }, Quit() {
    console.log('You selected Quit');
  },
};









// third file
async function application() {
  const { menuChoice } = await userPrompts.promptHomeMenu();
  if (menuChoice === 'Quit') return console.log('Goodbye!');
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