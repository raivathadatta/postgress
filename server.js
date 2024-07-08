const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');

// const crypto = require('crypto');

require('dotenv').config();
// const secretKey = "secretKey";
const secretKey = process.env.SECRET_KEY;
const port = process.env.PORT
console.log(port ,secretKey)


const app = express();
const PORT = 3032

// const secretKey = "secretKey"
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




const authenticateJWT = (req, res, next) => {
    // console.log(secretKey,"//////////")
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    const token = authHeader;
    console.log(token)
    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
            req.user = user;
            console.log(user)
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
