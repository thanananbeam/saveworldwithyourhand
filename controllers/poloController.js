const express = require('express')
var router = express.Router();

var scriptsABC = [{ script: '/assets/polo.js' }];
var styleABC = [{ style: '/assets/polo.css' }];

router.get("/index/", (req, res) => {
  res.render("polo/index", {
    scripts: scriptsABC,
    styles: styleABC
  })
})

module.exports = router;