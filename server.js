const express = require('express');
const cors  = require('cors') 
const app = express();
const PORT = 3032

// const pool = require('./app/models/db.js');
const { createEmployee } = require('./app/controllers/employee.controller.js');

app.use(express.json());

var corsOptions = {
    origin: "http://localhost:3032"
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    console.log("hello")
    res.send("hello you are connected to employee serer")
})
require("./app/routes/employee.routs.js")(app)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
