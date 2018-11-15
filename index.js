const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

//connect to Mongoose
mongoose
  .connect("mongodb://localhost/questionsAnswers")
  .then(() => console.log("MongoDB Connected.."))
  .catch(err => console.log(err));

//Load Question Model
require("./models/questions");
const Question = mongoose.model("questions");

//Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

//Questions index Page where your question will be posted
app.get("/questions/index", (req, res) => {
  Question.find({})
    .sort({ date: "desc" })
    .then(questions => {
      res.render("./questions/index", {
        questions: questions
      });
    });
});

//Add Question Form
app.get("/questions/addquestions", (req, res) => {
  res.render("./questions/addquestions");
});

//Post Process Form
app.post("/questions", (req, res) => {
  Question.create({
    title: req.body.title,
    question: req.body.question
  }).then(ideas => {
    res.redirect("./questions/index");
  });
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
