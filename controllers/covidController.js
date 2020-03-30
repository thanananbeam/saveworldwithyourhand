const express = require('express')
var router = express.Router();

var scriptsABC = [{
  script: '/assets/covid.js'
}];
var styleABC = [{
  style: '/assets/covid.css'
}];

router.get("/index/", (req, res) => {
  res.render("covid/index", {
    title: 'test covid',
    scripts: scriptsABC,
    styles: styleABC
  })
})

module.exports = router;