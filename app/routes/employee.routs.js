const employee = require("../controllers/employee.controller")
module.exports = (app) => {
    var router = require("express").Router();
    router.post('/', employee.createEmployee);
    router.put('/', employee.updateEmployee)
    router.delete('/', employee.deleteEmployee)
    router.get('/', employee.getALLEmployees)
    router.get('/fetch',employee.fetchEmployeeByCategory)
    router.get('/fetch/api',employee.updateEmployee)
    app.use('/api/employee', router)
}