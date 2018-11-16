const mongoose = require("mongoose");

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

mongoose.model("questions", QuestionSchema);


// $ heroku config:set MLAB_URL=mongodb://questionsanswers:bijayrai1@ds161856.mlab.com:61856/questionsanswers