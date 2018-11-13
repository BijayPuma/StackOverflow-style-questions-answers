const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
// hbs.registerPartials(__dirname + "/views/partials");

const QA = require("./controllers/questionsController");

const app = express();
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "hbs");

app.use("/", QA);

app.listen(3000, () => {
  console.log("App is running");
});
