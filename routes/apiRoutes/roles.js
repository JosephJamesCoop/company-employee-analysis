const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inquirer = require("inquirer");
const { application } = require('express');
const repeat = require('../../server.js')



//anotherFile
const DB = {
  ViewAllDepartments() {
    console.log('View All Departments');
    const sql = `SELECT * FROM departments`; 
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
    });
  },

  ViewAllRoles() {
    console.log('View All Roles');
    const sql = `SELECT * FROM role`; 
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
    });
  },

  ViewAllEmployees() {
    console.log('View All Employees');
    const sql = `SELECT * FROM employee`; 
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
    });
  },
  
  AddADepartment() {
    console.log('Add A Departments');
  inquirer.prompt([
      {
      type: 'input',
      name: 'department',
      message: 'Please select a Name for the new department',
    }
  ]).then(
  department => {
const dept = department.department;
    const sql = `INSERT INTO departments (department)
  VALUES (?)`;
  const params = [dept];
  db.query(sql, params, (err, rows) => {
    if (err) throw err;
    console.log(`Added ${dept} to Departments`);
  });
}).then(repeat);

},
  AddARole() {
    console.log('Add A Role');


   const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];
  db.query(sql, params, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
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

module.exports = DB;