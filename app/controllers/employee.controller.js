
const { error } = require("console")
const Employee = require("../models/employees.model")
exports.createEmployee = async (req, res) => {

    if (!(req.body["first_name"] && req.body["last_name"] && req.body["department"] && req.body["salary"])) {
        res.status(400).json({ data: null, error: "in correct data some data is missing " })
        return
    }
    const newEmployee = new Employee(req.body)
    console.log(newEmployee, "new employee")

    try {
        const response = await Employee.createNewEmployee(Object.values(newEmployee))

        res.status(202).json({ data: response.rows, error: null })
    } catch (e) {
        res.status(505).send(e.message)
    }
}

exports.updateEmployee = async (req, res) => {
    console.log(req.body)
    if (!(req.body["first_name"] && req.body["last_name"] && req.body["department"] && req.body["salary"])) {
        res.status(400).json({ data: null, error: "in correct data some data is missing " })
        return
    }
    try {
        const newEmployee = new Employee(req.body)
        const employeeId = req.query.id
        if (!employeeId) {
            res.status(400).json({ data: null, error: "in correct format" })
            return
        }
        if (!parseInt(employeeId)) {
            res.status(400).json({ data: null, error: "incorrect format of employeeId" })
        }

        const response = await Employee.upDateEmployeeByEmployeeId(employeeId, Object.values(newEmployee))
        if (response.rows.length < 1) {
            res.status(404).json({ data: [], error: "no data found" })
            return
        }
        res.status(200).json({ data: response.rows, error: null })
    } catch (e) {
        res.status(505).json({ data: null, error: e.message })
    }

}

exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.query.id
        if (!employeeId) {
            res.status(400).json({ data: null, error: "in correct format" })
            return
        }
        if (!parseInt(employeeId)) {
            res.status(400).json({ data: null, error: "incorrect format of employeeId" })
        }
        const response = await Employee.deleteEmployeeById(employeeId)
        if (response.rows.length < 1) {
            res.status(404).json({ data: [], error: "no data found" })
            return
        }
        console.log(response)
        res.status(200).json({ data: response, error: null })
    } catch (e) {
        res.status(505).json({ data: null, error: e.message })
    }

}
exports.getALLEmployees = async (req, res) => {
    try {

        const response = await Employee.getAllEmployees()
        if (response.rows.length < 1) {
            res.status(404).json({ data: [], error: "no data found" })
            return
        }
        res.status(200).json({ data: response.rows, error: null })
    } catch (e) {
        res.status(505).json({ data: null, error: e.message })

    }


}


exports.fetchEmployeeByCategory = async (req, res) => {
    const { category, value } = req.query
    console.log(req.query)
    console.log(category, value)
    try {
        const categories = ["employee_id", "first_name", "last_name", "department", "salary"]
        if (!categories.includes(category)) {
            res.status(400).json({ data: null, error: "no such category exists" })
            return
        }
        if (category === "employee_id") {
            if (typeof Number(value) != 'number') {
                res.status(400).json({ data: null, error: "not a correct format" })
                return
            }

        } else {
            if ((typeof value === 'number' && value)) {
                res.status(400).json({ data: null, error: "not a correct format" })

                return
            }
        }

        const response = await Employee.fetchEmployeesByCategory(category, [value])
        if (response.rows.length < 1) {
            res.status(404).json({ data: [], error: "no data found" })

            return
        }
        res.status(202).json({ data: response.rows, error: null })

    } catch (err) {
        console.log(err)
        res.status(505).json({ data: null, error: err.message })
    }

}

/// send data as form of json 