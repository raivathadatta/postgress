const pool = require("./db.js")

const Employee = function (obj) {
    this.first_name = obj.first_name,
        this.last_name = obj.last_name,
        this.department = obj.department,
        this.salary = obj.salary
}

Employee.createNewEmployee = async function (values) {

    console.log(values)
    const text = "insert into  employees (first_name,last_name,department,salary)  VALUES ($1, $2, $3, $4 ) RETURNING *; "
    return await pool.query(text, values);
}

Employee.upDateEmployeeByEmployeeId = async function (id, value) {
    const text = `UPDATE employees  SET first_name = $1, last_name = $2, department = $3, salary = $4 WHERE employee_id = $5 RETURNING *;`
    return await pool.query(text, [...value, id])
}

Employee.deleteEmployeeById = async function (employee_id) {
    const text = 'delete from employees where employee_id = $1'
    return await pool.query(text, [employee_id])
}

Employee.getAllEmployees = async function(){
    const text = "select * from employees"
    return await pool.query(text)
}
Employee.fetchEmployeesByCategory = async function(category,values){
    console.log(category,values)
    const text = `select * from  employees where ${category} = $1`
    return await pool.query(text, values)
}




module.exports = Employee