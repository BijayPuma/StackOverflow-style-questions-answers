const express = require("express");
const router = express.Router();
const Questions = require("../models/questionModel");

router.get("/", (req, res) => {
  res.redirect("/questions");
});

router.get("/questions", (req, res) => {
  Questions.find().then(questions => {
    res.render("layout");
  });
});

router.get("/questions/new", (req, res) => {
  res.render("new");
});

router.get("/questions/new/edit", (req, res) => {
  res.render("edit");
});

router.post("/questions/new", (req, res) => {
  Questions.create({
    title: req.body.title,
    description: req.body.description
  }).then(question => {
    res.redirect("/questions/" + question.id);
  });
});

router.get("/questions/:id", (req, res) => {
  Questions.findOne({ _id: req.params.id }).then(question => {
    res.render("show", question);
  });
});

// router.get("/questions/edit/:id", (req, res) => {
//   Questions.findOne({ _id: req.params.id }).then(question => {
//     res.render("edit", question);
//   });
// });

// router.get("/questions/delete/:id", (req, res) => {
//   Questions.findOneAndRemove({ _id: req.params.id }).then(() => {
//     res.redirect("/");
//   });
// });

module.exports = router;
