const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "inp required! "
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  city: {
    type: String
  }
});

mongoose.model('EmployeeDB', employeeSchema)