const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// const repeat = require('application()')



//anotherFile
const DB = {
  ViewAllDepartments() {
    console.log('View All Departments');
  },

  ViewAllRoles() {
    console.log('View All Roles');
  },
  ViewAllEmployees() {
    console.log('View All Employees');
  },
  AddADepartment() {
    console.log('Add A Departments');
},
  AddARole() {
    console.log('Add A Role');
  },
  UpdateAnEmployeeRole() {
    console.log('Update An Employee Role');
  }, Quit() {
    console.log('You selected Quit');
  },
};

module.exports = DB;