const employee = require("../controllers/employee.controller")
module.exports = (app) => {
    var router = require("express").Router();
    router.post('/', employee.createEmployee);
    router.put('/', employee.updateEmployee)
    router.delete('/', employee.deleteEmployee)
    router.get('/', employee.getALLEmployees)
    router.get('/fetch',employee.fetchEmployeeByCategory)
    app.use('/api/employee', router)

}