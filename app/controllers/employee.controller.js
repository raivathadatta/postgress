
const Employee = require("../models/employees.model")
exports.createEmployee = async (req, res) => {

    if (!(req.body[first_name] && req.body[last_name] && req.body[department] && req.body[salary])) {
        res.status(400).send("in correct data some data is missing ")
        return
    }
    const newEmployee = new Employee(req.body)
    console.log(newEmployee, "new employee")

    try {
        const response = await Employee.createNewEmployee(Object.values(newEmployee))

        res.status(202).send(response.rows)
    } catch (e) {
        res.status(505).send(e.message)
    }
}

exports.updateEmployee = async (req, res) => {
    if (!(req.body[first_name] && req.body[last_name] && req.body[department] && req.body[salary])) {
        res.status(400).send("in correct data some data is missing ")
        return
    }
    try {
        const newEmployee = new Employee(req.body)
        const employeeId = req.query.id
        if (!employeeId) {
            res.status(404).send("in correct format")
            return
        }
        if (typeof employeeId != number) {
            res.status(404).send("in correct format")
            return
        }

        const response = await Employee.upDateEmployeeByEmployeeId(employeeId, Object.values(newEmployee))
        if (response.rows.length < 1) {
            res.status(404).send("no data found")
            return
        }
        res.status(205).send(response.rows)
    } catch (e) {
        res.status(505).send(e.message)
    }

}

exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.query.id
        if (!employeeId) {
            res.status(404).send("in correct format")
            return
        }
        if (typeof employeeId != number) {
            res.status(404).send("in correct format")
            return
        }
        const response = await Employee.deleteEmployeeById(employeeId)
        if (response.rows.length < 1) {
            res.status(404).send("no data found")
            return
        }
        console.log(response)
        res.status(200).send(response)
    } catch (e) {
        res.status(505).send(e.message)
    }

}
exports.getALLEmployees = async (req, res) => {
    try {

        const response = await Employee.getAllEmployees()
        if (response.rows.length < 1) {
            res.status(404).send("no data found")
            return
        }
        res.status(200).send(response.rows)
    } catch (e) {
        res.status(505).send(e.message)

    }


}

// this.first_name = obj.first_name,
// this.last_name = obj.last_name,
// this.department = obj.department,
// this.salary = obj.salary
exports.fetchEmployeeByCategory = async (req, res) => {
    const { column, value } = req.query
    console.log(req.query)
    console.log(column,value)
    const categories = ["employee_id", "first_name", "last_name", "department", "salary"]
    if (!categories.includes(column)) {
        res.status(404).json("no such category exists")
        return
    }
    if (column === "employee_id") {
        if (typeof value != 'number') {
            res.status(404).send("not a correct format")
            return
        }

    } else {
        if ((typeof value === 'number' && value)) {
            res.status(404).send("not a correct format")
            return
        }
    }
    try {
        const response = await Employee.fetchEmployeesByCategory(column, [value])
        if (response.rows.length < 1) {
            res.status(404).send("no data found")
            return
        }
        res.status(202).send(response.rows)

    } catch (err) {
        console.log(err)
        res.status(505).send(err.message)
    }

}