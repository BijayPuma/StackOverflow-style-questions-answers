const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const QuestionsSchema = new mongoose.Schema({
  title: String,
  description: String,
  answered: Boolean,
  answers: {
    type: Schema.Types.ObjectId,
    ref: "Answers"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Questions = mongoose.model("Questions", QuestionsSchema);
module.exports = Questions;
