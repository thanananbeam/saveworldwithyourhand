const express = require('express')
var router = express.Router();

var scriptsABC = [{ script: '/assets/game.js' }];
var styleABC = [{ style: '/assets/game.css' }];

router.get("/index/", (req, res) => {
  res.render("game/index", {
    scripts: scriptsABC,
    styles: styleABC
  })
})

module.exports = router;