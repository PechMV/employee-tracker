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

    .then(answer => {
        console.log('answer', answer);
        switch (answer.action) {
            case promptMessages.viewAllEmployees:
                viewAllEmployees();
                break;

            case promptMessages.addEmployee:
                addEmployee();
                break;

            case promptMessages.updateRole:
                updateRole();
                break;

            case promptMessages.viewAllRoles:
                viewAllRoles();
                break;

            case promptMessages.addRole:
                addRole();
                break;

            case promptMessages.addDepartment:
                addDepartment();
                break;

            case promptMessages.quit:
                connnection.end();
                break;
        }
    });
}

function viewAllEmployees() {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

async function addEmployee() {
    const addname = await inquirer.prompt(askName());
    connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What is the employee role?: '
            }
        ]);
        let roleID;
        for (const row of res) {
            if (row.title === role) {
                roleID = row.id;
                continue;
            }
        }
        connection.query('SELECT * FROM employee', async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => '${res.first_name} ${res.last_name}');
            choices.push('none');
        });
        console.log('Employee has been added. Please view all employees to verify...');
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: addname.first,
                last_name: addname.last,
                role_id: roleID,
            },
            (err, res) => {
                if (err) throw err;
                prompt();
            }
        );
    });
};

function viewAllRoles() {
    const query = 'SELECT role.title';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY ROLE');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

function askId() {
    return ([
        {
            name: 'name',
            type: 'input',
            message: 'What is the employee ID?: '
        }
    ]);
}

async function updateRole() {
    const employeeId = await inquirer.prompt(askId());
    connection.query('SELECT role.id, role.title FROM role ORDER BY role.id', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res.title),
                message: 'What is the new employee role?: '
            }
        ]);
        let roldId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        connection.query(`UPDATE employee
        SET role_id = ${roleId}
        WHERE employeeId.id = ${employeeId.name}`, async (err, res) => {
            if (err) throw err;
            console.log('Role has been updated..')
            prompt();
        });
    });
}

function askName() {
    return ([
        {
            name: 'first',
            type: 'input',
            message: 'Enter the first name'
        },
        {
            name: 'last',
            type: 'input',
            message: 'Enter the last name'
        }
    ]);
}