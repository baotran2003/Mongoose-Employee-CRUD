const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

router.get("/", (req, res) => {
    Employee.find({})
        .then((employees) => {
            res.render("index", { employees: employees });
        })
        .catch((err) => {
            req.flash("error_msg", "Error: " + err);
            res.redirect("/");
        });
});

// create new employee
router.get("/employee/new", (req, res) => {
    res.render("new");
});

// search employee
router.get("/employee/search", (req, res) => {
    res.render("search", { employee: "" });
});

router.get("/employee", (req, res) => {
    let searchQuery = { name: req.query.name };

    Employee.findOne(searchQuery)
        .then((employee) => {
            res.render("search", { employee: employee });
        })
        .catch((err) => {
            req.flash("error_msg", "Employee search failed: " + err);
            res.redirect("/");
        });
});

// save Employee after Create.
router.post("/employee/new", (req, res) => {
    let newEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary,
    };

    Employee.create(newEmployee)
        .then((employee) => {
            req.flash("success_msg", "Employee data added to database successfully.");
            res.redirect("/");
        })
        .catch((err) => {
            req.flash("error_msg", "Employee save failed: " + err);
            res.redirect("/");
        });
});

// Search Employee
router.get("/edit/:id", (req, res) => {
    let searchQuery = { _id: req.params.id };
    Employee.findOne(searchQuery)
        .then((employee) => {
            res.render("edit", { employee: employee });
        })
        .catch((err) => {
            console.log(err);
            req.flash("error_msg", "Employee edit failed: " + err);
            res.redirect("/");
        });
});

// updated employee button
router.put("/edit/:id", (req, res) => {
    let searchQuery = { _id: req.params.id };

    Employee.updateOne(searchQuery, {
        $set: {
            name: req.body.name,
            designation: req.body.designation,
            salary: req.body.salary,
        },
    })
        .then((employee) => {
            req.flash("success_msg", "Employee updated successfully.");
            res.redirect("/");
        })
        .catch((err) => {
            req.flash("error_msg", "Employee update failed: " + err);
            res.redirect("/");
        });
});

// delete Employee
router.delete("/delete/:id", (req, res) => {
    let searchQuery = { _id: req.params.id };

    Employee.deleteOne(searchQuery)
        .then((employee) => {
            req.flash("success_msg", "Employee deleted successfully.");
            res.redirect("/");
        })
        .catch((err) => {
            req.flash("error_msg", "Employee deleted failed: " + err);
            res.redirect("/");
        });
});
module.exports = router;
