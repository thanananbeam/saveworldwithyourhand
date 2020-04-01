const express = require('express')
var router = express.Router();

var scriptsABC = [{ script: '/assets/ment.js' }];
var styleABC = [{ style: '/assets/ment.css' }];

router.get("/index/", (req, res) => {
  res.render("ment/index", {
    scripts: scriptsABC,
    styles: styleABC
  })
})

module.exports = router;