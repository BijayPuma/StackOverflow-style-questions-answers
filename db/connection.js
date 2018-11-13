const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/questionsAnswers",
  { useNewUrlParser: true }
);

mongoose.Promise = Promise;

module.exports = mongoose;
