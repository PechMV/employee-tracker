SELECT role.id, role.title FROM role ORDER BY role.id;
SELECT * FROM employee;

SELECT department.id, department.name FROM department ORDER BY department.id;

SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role.id)
    LEFT JOIN department on (department.id = role.department_id)
    ORDER BY department.name;

SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
FROM employee
LEFT JOIN role ON (role.id = employee.role_id)
LEFT JOIN department ON (department.id = role.department.id)
ORDER BY role.title;