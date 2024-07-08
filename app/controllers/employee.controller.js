
const db = require("../models")

require("dotenv").config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY
// dotenv.config();
exports.login = async (req, res) => {

    console.log("login in")
    const token = jwt.sign({ userId: "global" }, secretKey, { expiresIn: '1h' });
    console.log(token)
    res.json({ token });



}

exports.createEmployee = async (req, res) => {

    if (!(req.body["first_name"] && req.body["last_name"] && req.body["department"] && req.body["salary"])) {
        res.status(400).json({ data: null, error: "in correct data some data is missing " })
        return
    }
    if (!parseInt(req.body["salary"])) {
        res.status(400).json({ data: null, error: "incorrect format of salary" })
    }

    try {
        const response = await db.employees.create(req.body)
        console.log(response, "data added successfully ", req.body)
        res.status(202).json({ data: response, error: null })
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
        // const newEmployee = new Employee(req.body)
        const employeeId = req.query.id
        if (!employeeId) {
            res.status(400).json({ data: null, error: "in correct format" })
            return
        }
        if (!parseInt(employeeId)) {
            res.status(400).json({ data: null, error: "incorrect format of employeeId" })
        }
        const response = await db.employees.update(req.body, { where: { id: employeeId } })
        // const response = await Employee.upDateEmployeeByEmployeeId(employeeId, Object.values(newEmployee))
        if (Object.keys(response).length < 1) {
            res.status(404).json({ data: [], error: "no data found" })
            return
        }
        res.status(200).json({ data: response, error: null })
    } catch (e) {
        res.status(505).json({ data: null, error: e.message })
    }

}

exports.deleteEmployee = async (req, res) => {
    console.log("delete is called")
    try {
        const employeeId = req.query.id
        if (!employeeId) {
            res.status(400).json({ data: null, error: "in correct format" })
            return
        }
        if (!parseInt(employeeId)) {
            res.status(400).json({ data: null, error: "incorrect format of employeeId" })
        }
        const response = await db.employees.destroy({ where: { id: employeeId } })
        if (Object.keys(response).length < 1) {
            res.status(404).json({ data: [], error: "no data found" })
            return
        }
        console.log(response)
        res.status(204).json({ data: response, error: null })
    } catch (e) {
        res.status(505).json({ data: null, error: e.message })
    }

}
exports.getALLEmployees = async (req, res) => {
    try {
        console.log("find all is called")

        const response = await db.employees.findAll({ raw: true })
        console.log(response)
        if (response.length < 1) {
            res.status(404).json({ data: [], error: "No data found" })
            return
        }
        res.status(200).json({ data: response, error: null })
    } catch (e) {
        res.status(505).json({ data: null, error: e.message })

    }


}


exports.fetchEmployeeByCategory = async (req, res) => {
    console.log("called fetch employee by category")
    const { category, value } = req.query
    console.log(req.query)
    console.log(category, value)
    try {
        const categories = ["id", "first_name", "last_name", "department", "salary"]
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

        const response = await db.employees.findAll({
            raw: true,
            where: {
                [category]: value
            }
        })
        if (response.length < 1) {
            res.status(404).json({ data: [], error: "no data found" })

            return
        }
        res.status(202).json({ data: response, error: null })

    } catch (err) {
        console.log(err)
        res.status(505).json({ data: null, error: err.message })
    }

}



