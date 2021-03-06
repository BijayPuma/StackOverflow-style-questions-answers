const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");

//Load Question model
const QuestionsModel = require("../models/questions");
// const Question = mongoose.model("questions");
//
//Index Route
router.get("/", (req, res) => {
  const title = "Welcome";

  res.render("index", {
    title: title
  });
});

//About Route
router.get("/about", (req, res) => {
  res.render("about");
});

//Questions index Page where your question will be posted
router.get("/questions", (req, res) => {
  QuestionsModel.find({}).then(questions => {
    res.render("./questions/index", { questions });
  });
});

//Add Question Form
router.get("/questions/addquestions", (req, res) => {
  res.render("questions/addquestions");
});

//Process Form
router.post("/questions", (req, res) => {
  QuestionsModel.create({
    title: req.body.title,
    question: req.body.questions
  })
    .then(ideas => {
      res.redirect("/questions");
    })
    .catch(err => {
      console.log(err);
    });
});

//Edit Question Form
router.get("/questions/edit/:id", (req, res) => {
  QuestionsModel.findOne({
    _id: req.params.id
  }).then(edit => {
    res.render("./questions/edit", edit);
  });
});

//Update Question
router.put("/questions/update/:id", (req, res) => {
  QuestionsModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  }).then(question => {
    res.redirect("/questions");
  });
});

//Delete Question
router.get("/questions/delete/:id", (req, res) => {
  QuestionsModel.findOneAndDelete({ _id: req.params.id }).then(() => {
    res.redirect("/");
  });
});

module.exports = router;
