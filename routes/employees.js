const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

router.get("/", (req, res) => {
    Employee.find({})
        .then((employees) => {
            res.render("index", { employees: employees });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error"); // Trả về phản hồi lỗi cho client
        });
});

router.get("/employee/new", (req, res) => {
    res.render("new");
});

router.post("/employee/new", (req, res) => {
    let newEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary,
    };

    Employee.create(newEmployee)
        .then((employee) => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error"); // Trả về phản hồi lỗi cho client
        });
});

module.exports = router;
