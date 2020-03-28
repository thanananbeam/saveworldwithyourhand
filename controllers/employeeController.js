const express = require('express')
const mongoose = require('mongoose');
var router = express.Router();
const Employee = mongoose.model("EmployeeDB")

router.get("/add/", (req, res) => {
  res.render("employee/Add", {
    viewTitle: "Insert Employee"
  })
})

router.post("/add/", (req, res) => {
  insertRecord(req, res)
})

router.get("/list/", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs
      })
    } else {
      console.log("Error in ")
    }
  })
})

function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName
  employee.email = req.body.email
  employee.mobile = req.body.mobile
  employee.city = req.body.city

  employee.save((err, doc) => {
    if (!err) {
      res.redirect("/employee/list")
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body)
        res.render("employee/Add", {
          viewTitle: "Insert Emp",
          employee: req.body
        })
      }
      console.log("error")
    }
  })
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate({
    _id: req.body._id
  }, req.body, {
    new: true
  }, (err, doc) => {
    if (!err) {
      res.redirect('/employee/list')
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body)
        res.render("employee/Edit", {
          viewTitle: "Update Emp",
          employee: req.body
        })
      }
    }
  })
}

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = err.errors[field].message
        break;
      default:
        break;
    }
  }
}

router.get("/edit/:id/", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("employee/Edit", {
        viewTitle: "update employee",
        employee: doc
      })
    }
  })
})

router.post("/edit/:id", (req, res) => {
  updateRecord(req, res)
})

router.get('/delete/:id', (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {

    if (!err) {
      res.redirect("/employee/list")
    } else {
      console.log("error" + err)
    }
  })

})

module.exports = router;