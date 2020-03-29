const express = require('express')
var router = express.Router();

var scriptsABC = [{ script: '/assets/home.js' }];
var styleABC = [{ style: '/assets/home.css' }];

router.get("/index/", (req, res) => {
  res.render("home/index", {
    title: 'test polo',
    scripts: scriptsABC,
    styles: styleABC
  })
})

module.exports = router;