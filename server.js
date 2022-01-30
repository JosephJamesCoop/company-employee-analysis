const inquirer = require("inquirer");
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const DB = require("./routes/apiRoutes/roles.js");


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

// third file
async function application() {
  const { menuChoice } = await userPrompts.promptHomeMenu();
  if (menuChoice === 'Quit') return console.log('Goodbye!');
  DB[menuChoice.split(' ').join('')]();
  application();
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


// module.exports = application()