const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const remplatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", remplatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    await collection.insertMany([data]);
    res.render("home");
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (check && check.password === req.body.password) {
            res.render("home");
        } else {
            res.send("Wrong Password");
        }
    } catch (error) {
        res.send("Wrong Details");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
