var express = require("express");
var router = express.Router();
const cors = require("./cors");

var fs = require("fs");
var flightsDataSet;
fs.readFile("./data/dataset.json", "utf8", function (err, data) {
  if (err) throw err;
  flightsDataSet = JSON.parse(data);
});

/* GET flights listing. */
router.route("/").get(cors.corsWithOptions, function (req, res, next) {
  const { date, origin, destination } = req.query;

  const flights = flightsDataSet
    .filter(
      (flight) =>
        flight.data > date &&
        flight.origin === origin &&
        flight.destination === destination &&
        flight.availability > 0
    )
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);

  res.send(flights);
});

module.exports = router;
