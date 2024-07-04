const express = require('express');
const app = express();
const PORT = 3032

const pool = require('./app/models/db.js');
const { createEmployee } = require('./app/controllers/employee.controller.js');

app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    console.log("hello")
    res.send("hello you are connected to employee serer")
})
require("./app/routes/employee.routs.js")(app)


// app.post('/employees', async (req, res) => {
//     //// pass the response to controller 
//     console.log(req.body, "helloeheheh")
//     // try {
//     const response = await createEmployee(req.body)
//     if (response.error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//     }
//     // const { rows } = await pool.query('SELECT * FROM employees');
//     // const employeeObj = req.body

//     // console.log(rows)
//     console.log('res')
//     console.log(response.data)
//     res.json(response.data);
//     // } catch (err) {
//     //     console.error('Error executing query', err);

//     // }
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
