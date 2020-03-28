require('./models/db')

const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparse = require('body-parser')

const employeeController = require('./controllers/employeeController')
const homeController = require('./controllers/homeController')


var app = express();
app.use(bodyparse.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyparse.json())
app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'mainLayout',
  layoutsDir: __dirname + "/views/layouts/"
}))

app.set('view engine', 'hbs')

app.listen(3000, () => {
  console.log('express server started at port : 3000')
})


app.use('/home', homeController)
app.use('/employee', employeeController)


//default
app.get('/', function (req, res) {
  res.redirect('/home/index');
});