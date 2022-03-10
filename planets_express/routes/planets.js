var express = require("express");
var router = express.Router();
const cors = require("./cors");

var fs = require("fs");
var planets;
fs.readFile("./data/planets.json", "utf8", function (err, data) {
  if (err) throw err;
  planets = JSON.parse(data);
});

/* GET planets listing. */
router.route("/").get(cors.corsWithOptions, function (req, res, next) {
  res.send(planets);
});

module.exports = router;
