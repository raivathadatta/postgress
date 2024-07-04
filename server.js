const express = require('express');
const cors  = require('cors') 
const app = express();
const PORT = 3032


app.use(express.json());

var corsOptions = {
    origin: "http://localhost:3032"
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    console.log("hello")
    res.send("hello you are connected to employee server")
})
require("./app/routes/employee.routs.js")(app)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
