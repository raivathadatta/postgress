

const employee = require("../controllers/employee.controller")

module.exports = (app, authenticateJWT) => {
    var router = require("express").Router();

    router.post('/login', employee.login)
    router.post('/', authenticateJWT, employee.createEmployee);
    router.put('/', authenticateJWT, employee.updateEmployee)
    router.delete('/', authenticateJWT, employee.deleteEmployee)
    router.get('/', authenticateJWT, employee.getALLEmployees)
    router.get('/fetch', authenticateJWT, employee.fetchEmployeeByCategory)
    router.get('/update', authenticateJWT, employee.updateEmployee)
    app.use('/api/employee', router)
}
