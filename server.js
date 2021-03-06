require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparse = require("body-parser");

const employeeController = require("./controllers/employeeController");
const homeController = require("./controllers/homeController");
const poloController = require("./controllers/poloController"); // คืออะไร?
const covidController = require("./controllers/covidController");
const mentController = require("./controllers/mentController");
const gameController = require("./controllers/gameController");

var app = express();
app.use(
  bodyparse.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyparse.json());
app.set("views", path.join(__dirname, "/views/"));

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);

app.set("view engine", "hbs");

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`express server started at port : ${port}`);
});

// Register app
app.use("/home", homeController);
app.use("/polo", poloController); // คืออะไร?
app.use("/covid", covidController);
app.use("/employee", employeeController);
app.use("/ment", mentController);
app.use("/game", gameController);

//default
app.get("/", function (req, res) {
  res.redirect("/home/index");
});