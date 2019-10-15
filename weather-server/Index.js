const express = require("express");
const app = express();
const mongoose = require("mongoose");
const parser = require("body-parser");
const cors = require("cors");

let { Report } = require("./model.js");

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

var request = require("request");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/WeatherData", {
  useNewUrlParser: true
});

app.get("/getData", (req, res) => {
  Report.find()
    .then(data => {
      res.json(data);
      console.log(data);
    })
    .catch(err =>
      res.json({
        message: "Failed"
      })
    );
});

app.get("/getData/:city", (req, res) => {
  console.log("city", req.params.city);
  let city = req.params.city;
  request(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=19610237ae6acd5f6dbd0dc45fda71e3`,
    function(error, response, body) {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      // console.log("body:", JSON.stringify(body)); // Print the HTML for the Google homepage.

      res.json(body);
    }
  );

  app.post("/postData", (req, res) => {
    let request = req.body;
    console.log(request);
    let report = new Report(request);

    report
      .save()
      .then(() =>
        res.json({
          message: "Success"
        })
      )
      .catch(() =>
        res.json({
          message: "Failed"
        })
      );
  });
});

app.listen(3030, () => {
  console.log("Server running");
});
