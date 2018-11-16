const mongoose = require("../db/connection");

const Schema = mongoose.Schema;

//Create Schema
const QuestionSchema = new Schema({
  title: {
    type: String
    // required: true
  },
  question: {
    type: String
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const questions = mongoose.model("questions", QuestionSchema);

module.exports = questions;

// $ heroku config:set MLAB_URL=mongodb://questionsanswers:bijayrai1@ds161856.mlab.com:61856/questionsanswers
