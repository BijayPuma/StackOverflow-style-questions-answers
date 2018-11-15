const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.Promise = global.Promise;

//connect to Mongoose
mongoose
  .connect(
    "mongodb://localhost/questionsAnswers",
    {
      useMongoClient: true
    }
  )
  .then(() => console.log("MongoDB Connected.."))
  .catch(err => console.log(err));

//Load Question Model
require("./models/Questions");
const Question = mongoose.model("questions");

//Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Index Route
app.get("/", (req, res) => {
  const title = "Welcome";

  res.render("index", {
    title: title
  });
});

//About Route
app.get("/about", (req, res) => {
  res.render("about");
});

//Questions index Page where your question will be posted
app.get("/questions", (req, res) => {
  Question.find({}).then(questions => {
    res.render("./questions/index", {
      questions: questions
    });
  });
});

//Add Question Form
app.get("/questions/addquestions", (req, res) => {
  res.render("questions/addquestions");
});

//Edit Question Form
app.get("/questions/edit/:id", (req, res) => {
  Question.findOne({
    _id: req.params.id
  }).then(question => {
    res.render("./questions/edit", {
      quesiton: question
    });
  });
});

//Process Form
app.post("/questions", (req, res) => {
  Question.create({
    title: req.body.title,
    question: req.body.question
  }).then(ideas => {
    res.redirect("./questions/index");
  });
});

//Edit Form Process
app.put("/questions/:id", (req, res) => {
  Question.findOne({
    _id: req.params.id
  }).then(idea => {
    //new values
    question.title = req.body.title;
    question.question = req.body.question;
    question.save().then(question => {
      res.redirect("/questions");
    });
  });
});

//Delete Question
app.delete("/questions/:id", (req, res) => {
  Question.remove({ _id: req.params.id }).then(() => {
    res.redirect("/questions");
  });
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
