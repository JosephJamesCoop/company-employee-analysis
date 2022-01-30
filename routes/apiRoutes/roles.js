const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inquirer = require("inquirer");
const { application } = require('express');
// const repeat = require('application()')



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
},

  AddARole() {
    console.log('Add A Role');
  },

  AddAnEmployee() {
    console.log('Add An Employee');
  },

  UpdateAnEmployeeRole() {
    console.log('Update An Employee Role');
  }, 
  
  Quit() {
    console.log('You selected Quit');
  },
};

module.exports = DB;