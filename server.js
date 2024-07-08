const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');


require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
const port = process.env.PORT
console.log(port ,secretKey)


const app = express();
const PORT = 3032

app.use(express.json());

var corsOptions = {
    origin: "http://localhost:3032"
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("hello you are connected to employee server")
})




const authenticateJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader;
    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


require("./app/routes/employee.routs.js")(app,authenticateJWT)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
