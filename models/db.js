const mongoose = require('mongoose');
//mongodb://localhost:27017/EmployeeDB
mongoose.connect('mongodb://heroku_ssxfd5qz:spto9vj6faanedtflcatsm0hpa@ds263639.mlab.com:63639/heroku_ssxfd5qz', {
  useNewUrlParser: true
}, (err) => {
  if (!err) {
    console.log('connect db')
  } else {
    console.log('error db' + err)
  }
});

require('./employeeDB.model');