const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

const promptMessages = {
    viewAllEmployees: 'View All Employees',
    addEmployee: "Add Employee",
    updateRole: 'Update Employee Role',
    viewAllRoles: 'View All Roles',
    addRole: 'Add Role',
    viewAllDepartment: 'View All Department',
    addDepartment: 'Add Department',
    quit: "Quit"
};

function prompt() {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            promptMessages.viewAllEmployees,
            promptMessages.addEmployee,
            promptMessages.updateRole,
            promptMessages.viewAllRoles,
            promptMessages.addRole,
            promptMessages.addDepartment,
            promptMessages.quit
        ]
    })
    }